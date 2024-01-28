import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation addUser($name: String, $email: String) {
    addUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;
