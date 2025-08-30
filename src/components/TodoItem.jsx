import styled from "styled-components";
import { forwardRef } from "react";

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    transform: translateX(5px);
    background-color: ${props =>
      props.theme.background === "#111827" ? "#1f2937" : "#f1f1f1"};
    border-radius: 4px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Text = styled.span.withConfig({
  shouldForwardProp: prop => prop !== "done",
})`
  text-decoration: ${props => (props.done ? "line-through" : "none")};
  cursor: pointer;
  color: ${props => props.theme.text};
  transition: all 0.2s ease;
  flex: 1;
`;

const DeleteButton = styled.button`
  background-color: ${props => props.theme.deleteButton};
  color: white;
  border: none;
  padding: 0.3rem 0.6rem;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.deleteHover};
    transform: scale(1.1);
  }

  @media (max-width: 600px) {
    margin-top: 0.5rem;
  }
`;

const TodoItem = forwardRef(({ todo, toggleDone, t, deleteTodo }, ref) => (
  <ListItem ref={ref}>
    <Text done={todo.done} onClick={() => toggleDone(todo.id)}>
      {todo.text}
    </Text>
    <DeleteButton onClick={() => deleteTodo(todo.id)}>
      {t("deleteButton")}
    </DeleteButton>
  </ListItem>
));

export default TodoItem;
