import { useContext } from "react";
import { AuthContext } from "../context/auth";

import { Card } from "semantic-ui-react";
import DeleteButton from "./DeleteButton";
import ToggleButton from "./ToggleButton";

function TodoCard({ todo: { body, id, createdAt, username, isCompleted } }) {
  const { user } = useContext(AuthContext);

  return (
    <Card fluid>
      <Card.Content>
        {user && user.username === username && <DeleteButton todoId={id} />}
        {user && user.username === username && (
          <ToggleButton todoId={id} isCompleted={isCompleted} />
        )}
        <Card.Header>{body}</Card.Header>
        {/* <Card.Meta>{moment(createdAt).fromNow(true)} ago</Card.Meta> */}
      </Card.Content>
    </Card>
  );
}

export default TodoCard;
