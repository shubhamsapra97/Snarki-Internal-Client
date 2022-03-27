import { gql } from "@apollo/client";

export const GET_REGISTER_REQUESTS = gql`
    query getRegisterRequests {
        getRegisterRequests {
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
                    name
                    address
                    city
                    state
                    postalCode
                }
                status
            }
        }
    }
`;

export const GET_REGISTER_REQUEST = gql`
    query getRegisterRequest(
        $_id: String!
    ) {
        getRegisterRequest(
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
                    name
                    address
                    city
                    state
                    postalCode
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
