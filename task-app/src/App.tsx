import React, { useState } from "react";
import "./App.css";
import InputFeild from "./components/InputField/InputFeild";
import ToDoList from "./components/ToDoList/ToDoList";
import { Todo } from "./model";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [toDo, setToDo] = useState<string>("");
  const [toDos, setToDos] = useState<Todo[]>([]);
  const [completedToDos, setCompletedToDos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (toDo) {
      setToDos([...toDos, { id: Date.now(), todo: toDo, isDone: false }]);
      setToDo("");
    }
  };
  const onDragEnd = (result: DropResult) => 
  {
   const {source, destination} = result;
   if(!destination) return
   if(destination.droppableId === source.droppableId && destination.index === source.index) return;

   let add,
   active = toDos,
   complete = completedToDos;

   if(source.droppableId === "todoslist"){
    add = active[source.index];
    active.splice(source.index, 1)
   }else{ 
    add = complete[source.index];
    active.splice(source.index, 1)
   }
   if(destination.droppableId === "todoslist"){
    active.splice(destination.index, 0, add)
   }else{ 
    complete.splice(destination.index, 0, add)
   }
   setCompletedToDos(complete)
   setToDos(active)
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Tasks</span>

        <InputFeild toDo={toDo} setToDo={setToDo} handleAdd={handleAdd} />

        <ToDoList
          todos={toDos}
          setToDos={setToDos}
          completedToDos={completedToDos}
          setCompletedToDos={setCompletedToDos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
