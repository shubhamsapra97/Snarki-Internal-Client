import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
    mutation registerUser(
        $email: String!,
        $role: String!,
        $password: String!
    ) {
        register(
            role: $role
            email: $email
            password: $password
        ) {
            code
            message
        }
    }
`;
