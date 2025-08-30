import { createRef } from "react";
import styled from "styled-components";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import TodoItem from "./TodoItem";

const NoTodosMessage = styled.div`
  text-align: center;
  margin-top: 0.5rem;
  font-style: italic;
  font-weight: 700;
  color: ${props => props.theme.alertText};
`;

export default function TodoList({
  todos,
  toggleDone,
  deleteTodo,
  t,
  filter,
  filteredTodos,
}) {
  const nodeRefs = {};

  return (
    <>
      {filter === "completed" && filteredTodos.length === 0 && (
        <NoTodosMessage>{t("noCompleted")}</NoTodosMessage>
      )}

      {todos.length > 0 && (
        <TransitionGroup component="ul">
          {todos.map(todo => {
            if (!nodeRefs[todo.id]) nodeRefs[todo.id] = createRef();

            return (
              <CSSTransition
                key={todo.id}
                timeout={300}
                classNames="todo"
                nodeRef={nodeRefs[todo.id]}
              >
                <TodoItem
                  t={t}
                  ref={nodeRefs[todo.id]}
                  todo={todo}
                  toggleDone={toggleDone}
                  deleteTodo={deleteTodo} 
                />
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      )}
    </>
  );
}
