import dotenv from "dotenv"
import { ApolloServer } from "apollo-server";
import { connectmongodb } from "./mongo/conexion"

dotenv.config()


const app = async () => {
  await connectmongodb();
};



app().catch(err=>console.error(err));