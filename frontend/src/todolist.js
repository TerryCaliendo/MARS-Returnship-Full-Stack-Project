import "./index.css";
import Todo from "./todo";
import { useSelector } from "react-redux";

export default function TodoList({ id }) {
  let todoList = useSelector((store) => {
    return store.todoList;
  });
  console.log("rendering TodoList", id, todoList);
  return (
    <div className="TodoList">
      {todoList.map((todo) => {
        return <Todo key={todo.id} todo={todo} />;
      })}
    </div>
  );
}
