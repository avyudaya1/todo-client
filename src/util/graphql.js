import gql from 'graphql-tag'

export const FETCH_TODOS_QUERY = gql`
    {
        getTodos{
            id
            body
            isCompleted
            username
            createdAt
        }
    }
`