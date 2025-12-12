import { ObjectId } from "mongodb";




export type VideoGame = {
    _id?: string,
    title: string,
    price: number,
    year: string
}


export type User={
    _id:ObjectId,
    email:string,
    videogames: string[]
}


export type TokenPayload = {
    userId: string;
}