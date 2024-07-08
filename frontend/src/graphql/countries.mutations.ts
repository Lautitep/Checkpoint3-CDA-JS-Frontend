import { gql } from "@apollo/client";

export const CREATE_COUNTRY = gql`
  mutation addCountry($data: NewCountryInput!) {
    addCountry(data: $data) {
      code
      continent {
        name
        id
      }
      emoji
      id
      name
    }
  }
`;
