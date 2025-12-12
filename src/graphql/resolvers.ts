import { IResolvers } from "@graphql-tools/utils";
import { getDb } from "../mongo/conexion";
import { ObjectId } from "mongodb";
import { insertarUsuario, comprobarContraseña } from "../utils/users";
import { signToken } from "../utils/auth";
import { VideoGame, User } from "../utils/types";

const colleccionVideojuegos = "VideoJuegos"
const colleccionUsuarios = "Usuarios"

export const resolvers: IResolvers = {
  User: {
    videogames: async (parent: User) => {
      const db = getDb();
      const videoGamesIDs = (parent.videogames || []).map((vd) =>
        typeof vd === "string" ? new ObjectId(vd) : vd
      );
      return db.collection(colleccionVideojuegos).find({ _id: { $in: videoGamesIDs } }).toArray();
    },
  },

  Query: {
    me: async (_, __, { user }) => {
      if (!user) return null;
      return user
    },
    videoGame :async(_, {id}) =>{
      const result = getDb().collection(colleccionVideojuegos).findOne({_id: new ObjectId(id)})
      if (!result) return null
      return result
    },
    videoGames: async () =>{
      const db = getDb()
      return await db.collection(colleccionVideojuegos).find().toArray()
    }
  },

  Mutation: {
    register: async (_, {  email, password }) => {
      const userId = await insertarUsuario(email, password);
      return signToken(userId)
    },

    login: async (_, { email, password }) => {
      const user = await comprobarContraseña(email, password);
      if (!user) {
        throw new Error("Credenciales incorrectas");
      }
      return signToken(user._id.toString())
    },
    addVideogame: async(_,{title, price, year}) =>{
      const db = getDb()

      const result = await db.collection(colleccionVideojuegos).insertOne({
        title,
        price,
        year
      })
      return {
        _id: result.insertedId,
        title,
        price,
        year
      }
    },
    addVideoGametoUser: async(_, { id }: { id: string }, { user }) => {
      if (!user) throw new Error("No puedes añadir videojuegos");
      const db = getDb();

      console.log(user)
      const videogame = await db.collection(colleccionVideojuegos).findOne({ _id: new ObjectId(id) });
      if (!videogame) throw new Error("No existe este videojuego");
      console.log(videogame)

      await db.collection(colleccionUsuarios).updateOne(
        { _id: user._id },
        { $addToSet: { videogames: new ObjectId(id) } } // 👈 aquí el cambio
      );

      const updateUser = await db.collection(colleccionUsuarios).findOne({ _id: user._id });
      if (!updateUser) {
        throw new Error("Usuario no encontrado después de actualizar");
      }
      return updateUser;
    }

  },
};
