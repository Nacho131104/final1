import { IResolvers } from "@graphql-tools/utils";
import { getDb } from "../mongo/conexion";
import { ObjectId } from "mongodb";
import { insertarUsuario, comprobarContraseña } from "../utils/users";
import { signToken } from "../utils/auth";
import { VideoGame, User } from "../utils/types";

export const resolvers: IResolvers = {
  User: {
    videogames: async (parent: User) => {
      const db = getDb();
      const videoGamesIDs = (parent.videogames || []).map((vd) =>
        typeof vd === "string" ? new ObjectId(vd) : vd
      );
      return db.collection("VideoJuegos").find({ _id: { $in: videoGamesIDs } }).toArray();
    },
  },

  Query: {
    me: async (_, __, { user }) => {
      if (!user) return null;
      return {
        _id: user._id,
        email: user.email,
        videogames: user.videogames || [],
      };
    },
  },

  Mutation: {
    register: async (_, { name, email, password }) => {
      const userId = await insertarUsuario(name, email, password);
      return {
        token: signToken(userId),
        user: { _id: userId, name, email },
      };
    },

    login: async (_, { email, password }) => {
      const user = await comprobarContraseña(email, password);
      if (!user) {
        throw new Error("Credenciales incorrectas");
      }
      return {
        token: signToken(user._id.toString()),
        user,
      };
    },
  },
};
