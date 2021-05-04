import { useQuery } from "@apollo/client";
import React, { useContext } from "react";

import { Grid, Transition, Container, Divider, Icon } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import { FETCH_TODOS_QUERY } from "../util/graphql";

import TodoCard from "../components/TodoCard";
import TodoForm from "../components/TodoForm";

function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data: { getTodos: todos } = {} } = useQuery(
    FETCH_TODOS_QUERY
  );

  return (
    <Container>
      {user ? (
        <Container>
          {
            <Grid.Row>
              <TodoForm />
            </Grid.Row>
          }
          {<Divider />}
          {loading ? (
            <h1>Loading Todos...</h1>
          ) : (
            <Transition.Group>
              {todos &&
                todos.map((todo) => (
                  <Grid.Row key={todo.id}>
                    <TodoCard todo={todo} />
                  </Grid.Row>
                ))}
            </Transition.Group>
          )}
        </Container>
      ) : (
        <Container textAlign="center">
          <h1 style={{ marginTop: 20, marginBottom: 20 }}>
            Login or Register to use TODO
          </h1>
          <Icon name="sticky note" size="massive" color="grey" />
        </Container>
      )}
    </Container>
  );
}

export default Home;
