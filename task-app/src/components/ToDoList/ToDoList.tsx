import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Todo } from "../../model";
import SingleToDo from "../SingleToDo/SingleToDo";
import "./styles.css";

interface Props {
  todos: Todo[];
  setToDos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedToDos: Todo[];
  setCompletedToDos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const ToDoList: React.FC<Props> = ({
  todos,
  setToDos,
  completedToDos,
  setCompletedToDos,
}) => {
  return (
    <div className="container">
      <Droppable droppableId="todoslist">
        {(provided) => (
          <div
            className="todos"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active Tasks</span>
            {todos.map((todo, index) => (
              <SingleToDo
              index={index}
                todo={todo}
                todos={todos}
                key={todo.id}
                setToDos={setToDos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId="toDoComplete">
        {(provided) => (
          <div className="todos remove" ref={provided.innerRef} {...provided.droppableProps}>
            <span className="todos__heading">Completed Tasks</span>
            {completedToDos.map((todo, index) => (
              <SingleToDo
              index={index}
                todo={todo}
                todos={completedToDos}
                key={todo.id}
                setToDos={setCompletedToDos}
              />
            ))}
                {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default ToDoList;
