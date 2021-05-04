import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { Button } from "semantic-ui-react";

import { FETCH_TODOS_QUERY } from "../util/graphql";

function ToggleButton({ todoId, isCompleted, callback }) {
  const mutation = TOGGLE_TODO_MUTATION;

  var status = isCompleted;

  const [toggleTodoMutation] = useMutation(mutation, {
    update(proxy) {
      const data = proxy.readQuery({
        query: FETCH_TODOS_QUERY,
      });
      const todos = data.getTodos;
      proxy.writeQuery({
        query: FETCH_TODOS_QUERY,
        data: { getTodos: todos },
      });
      if (callback) callback();
    },
    variables: {
      todoId,
    },
  });
  return (
    <Button
      circular
      size="medium"
      icon={status ? "check" : "circle outline"}
      color={status ? "green" : "grey"}
      floated="left"
      onClick={() => toggleTodoMutation()}
      style={{
        marginRight: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    ></Button>
  );
}

const TOGGLE_TODO_MUTATION = gql`
  mutation toggleTodoMutation($todoId: ID!) {
    toggleTodoStatus(todoId: $todoId) {
      id
      username
      body
      createdAt
      isCompleted
    }
  }
`;

export default ToggleButton;
