import { gql } from 'apollo-server';

export const typeDefs = gql`

    type VideoJuego {
        _id: ID!
        title: String!
        price: Int!
        year: Int!
    }

    type User{
        _id:ID!
        email: String!
        password: String!
        videogames:[VideoJuego]!
    }

    type Query {

        me: User
        getVideogame(_id: String!): VideoJuego 

    }

    type Mutation {
    
        register(email: String!, password: String!) : String!

        login(email: String!, password: String!) : String!

        addVideoGametoUser(videoID: String!, userID: String!): User
S
    }

`;