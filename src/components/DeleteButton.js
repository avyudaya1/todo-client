import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { Button, Confirm, Container } from "semantic-ui-react";

import { FETCH_TODOS_QUERY } from "../util/graphql";
import MyPopup from "../util/MyPopup";

function DeleteButton({ todoId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deleteTodoMutation] = useMutation(DELETE_TODO_MUTATION, {
    update(proxy) {
      setConfirmOpen(false);
      const data = proxy.readQuery({
        query: FETCH_TODOS_QUERY,
      });
      const todos = data.getTodos.filter((t) => t.id !== todoId);
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
    <>
      <MyPopup content={"Delete todo?"}>
        <Container>
          <Button
            circular
            size="tiny"
            color="red"
            icon="delete"
            floated="right"
            onClick={() => setConfirmOpen(true)}
          ></Button>
        </Container>
      </MyPopup>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deleteTodoMutation}
      />
    </>
  );
}

const DELETE_TODO_MUTATION = gql`
  mutation deleteTodo($todoId: ID!) {
    deleteTodo(todoId: $todoId)
  }
`;

export default DeleteButton;
