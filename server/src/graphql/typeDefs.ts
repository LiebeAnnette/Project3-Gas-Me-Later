import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Weather {
    description: String
    temp: Float
    icon: String
  }

  type Trip {
    _id: ID!
    startLocation: String!
    endLocation: String!
    miles: Int!
    date: String!
    userId: String!
    weather: Weather
  }

  type Query {
    getTrips: [Trip!]!
    generateReport: String!
  }

  type Mutation {
    addTrip(
      startLocation: String!
      endLocation: String!
      miles: Int!
      date: String!
    ): Trip

    deleteTrip(id: ID!): Boolean
  }
`;

export default typeDefs;
