import React, { useEffect, useRef, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDone } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { Todo } from "../../model";
import "./styles.css";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  todo: Todo;
  todos: Todo[];
  setToDos: React.Dispatch<React.SetStateAction<Todo[]>>;
  index: number;
};
const SingleToDo = ({ todo, todos, setToDos, index }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editToDo, setEditToDo] = useState<string>(todo.todo);

  const handleDone = (id: number) => {
    setToDos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setToDos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setToDos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editToDo } : todo))
    );
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <form
          className="todos__single"
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              ref={inputRef}
              value={editToDo}
              onChange={(e) => setEditToDo(e.target.value)}
              className="todos__single--text"
            />
          ) : todo.isDone ? (
            <s className="todos__single--text">{todo.todo}</s>
          ) : (
            <span className="todos__single--text">{todo.todo}</span>
          )}

          <div>
            <span
              className="icon"
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <FiEdit2 />
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
              <MdOutlineDone />
            </span>
            <span className="icon">
              <AiOutlineDelete onClick={() => handleDelete(todo.id)} />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleToDo;
