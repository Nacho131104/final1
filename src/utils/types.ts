import { ObjectId } from "mongodb";




export type VideoJuego = {
    _id: ObjectId,
    title: string,
    price: number,
    year: number
}


export type User={
    _id:ObjectId,
    email:string,
    password:string,
    videogames: ObjectId[]
}


export type TokenPayload = {
    userId: string;
}