import { gql } from 'apollo-server';

export const typeDefs = gql`



    type VideoGame {
        _id: ID
        title: String
        price: Int
        year: String
    
    
    }

    type User {
        _id: ID!
        email: String!
        videogames: [VideoGame]!
    }

    type Query {
        me: User
        videoGames: [VideoGame]!
        videoGame(id: ID!): VideoGame
    
    }
    type Mutation {
    
        register(email: String!, password: String!) : String!

        login(email: String!, password: String!) : String!

        addVideogame(title: String!, price: Int!, year: String!): VideoGame!

        addVideoGametoUser(videoID: String!): User!
    }

`;