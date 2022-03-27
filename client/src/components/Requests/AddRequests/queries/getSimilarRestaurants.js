import { gql } from "@apollo/client";

export const GET_SIMILAR_RESTAURANTS = gql`
    query getSimilarRestaurants(
        $_id: String!
    ) {
        getSimilarRestaurants(
            _id: $_id
        ) {
            code
            message
            restaurants {
                name
                address
                city
                state
                postalCode
                cuisines
                hours
                contact
                location {
                    coordinates
                }
                claimed
            }
        }
    }
`;
