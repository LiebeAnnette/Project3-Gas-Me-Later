import { gql } from "@apollo/client";

export const GET_TRIPS = gql`
  query GetTrips {
    getTrips {
      _id
      startLocation
      endLocation
      miles
      date
    }
  }
`;

export const GET_TOTAL_MILES = gql`
  query GetTotalMiles {
    getTotalMiles
  }
`;

export const GENERATE_REPORT = gql`
  query GenerateReport {
    generateReport
  }
`;
