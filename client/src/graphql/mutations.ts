// client/src/graphql/mutations.ts
import { gql } from "@apollo/client";

export const ADD_TRIP = gql`
  mutation AddTrip(
    $startLocation: String!
    $endLocation: String!
    $miles: Int!
    $date: String!
  ) {
    addTrip(
      startLocation: $startLocation
      endLocation: $endLocation
      miles: $miles
      date: $date
    ) {
      _id
      startLocation
      endLocation
      miles
      date
      userId
    }
  }
`;

export const DELETE_TRIP = gql`
  mutation DeleteTrip($id: ID!) {
    deleteTrip(id: $id)
  }
`;
