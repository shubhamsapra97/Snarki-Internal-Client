import { gql } from "@apollo/client";

export const GET_CLAIM_REQUESTS = gql`
    query getClaimRequests {
        getClaimRequests {
            code
            message
            requests {
                _id
                user {
                    role
                    email
                    verified
                }
                restaurant {
                    _id
                    name
                    address
                    city
                    state
                    postalCode
                    claimed
                }
            }
        }
    }
`;

export const GET_CLAIM_REQUEST = gql`
    query getClaimRequest(
        $_id: String!
    ) {
        getClaimRequest(
            _id: $_id
        ) {
            code
            message
            requests {
                _id
                user {
                    role
                    email
                    verified
                }
                restaurant {
                    _id
                    name
                    address
                    city
                    state
                    postalCode
                    claimed
                    contact
                    hours
                    cuisines
                    location {
                        coordinates
                    }
                }
            }
        }
    }
`;
