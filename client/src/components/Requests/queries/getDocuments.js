import { gql } from "@apollo/client";

export const GET_DOCUMENTS = gql`
    query getDocuments(
        $_id: String!
        $type: String!
    ) {
        getDocuments(
            _id: $_id
            type: $type
        ) {
            code
            message
            documentUrls
        }
    }
`;
