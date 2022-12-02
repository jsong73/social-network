import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user{
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token 
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_THOUGHT = gql`
    mutation addThought($thoughtText: String!) {
         addThought(thoughtText: $thoughtText) {
             _id
            thoughtText
            username
            createdAt
            reactions {
                reactionId
                reactionBody
        }
    }
}
`;

export const ADD_REACTION = gql`
    mutation addReaction($reactionId: ID!, $reactionBody: String!) {
        addReaction(reactionId: $reactionId, reactionBody: $reactionBody){
            reactionId,
            reactionBody
        }
    }
`;
