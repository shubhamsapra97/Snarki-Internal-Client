import { gql } from "@apollo/client";

export const CLAIM_RESTAURANT_STATUS_UPDATE = gql`
    mutation claimRequestUpdate(
        $_id: String!
        $status: String!
        $reason: String!
    ) {
        claimRequestUpdate(
            _id: $_id
            status: $status
            reason: $reason
        ) {
            code
            message
        }
    }
`;
