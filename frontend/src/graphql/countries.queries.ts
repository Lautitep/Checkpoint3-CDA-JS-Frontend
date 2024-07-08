import { gql } from "@apollo/client";

export const LIST_COUNTRIES = gql`
  query Countries {
    countries {
      code
      id
      emoji
      name
      continent {
        name
        id
      }
    }
  }
`;

export const FIND_COUNTRY = gql`
  query FindCountry($code: String!) {
    country(code: $code) {
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
