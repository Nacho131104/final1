import { ObjectId } from "mongodb";




export type VideoGame = {
    _id?: ObjectId,
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