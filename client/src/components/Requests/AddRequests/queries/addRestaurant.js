import { gql } from "@apollo/client";

export const ADD_RESTAURANT_STATUS_UPDATE = gql`
    mutation addRequestUpdate(
        $_id: String!
        $status: String!
        $reason: String!
    ) {
        addRequestUpdate(
            _id: $_id
            status: $status
            reason: $reason
        ) {
            code
            message
        }
    }
`;
