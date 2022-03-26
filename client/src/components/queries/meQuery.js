import { gql } from "@apollo/client";

export const ME_QUERY = gql`
    query meQuery {
        me {
            code
            message
            meData {
                email
                role
                verified
            }
        }
    }
`;
