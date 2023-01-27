import React, { useState } from "react";
import "./TodoCard.css";

function TodoCard(props) {
  const [filterId, setFilterId] = useState("all");

  const handleFiltering = (e) => {
    const id = e.target.id;
    setFilterId(id);

    if (e.target.id === "active") {
      props.getActiveTodos();
    } else if (e.target.id === "completed") {
      props.getCompletedTodos();
    } else if (e.target.id === "all") {
      props.setFilteredList(props.toDosList);
    }
  };
  return (
    <div className="todo-container">
      <div className="todo-filters">
        <p
          className={filterId === "all" ? "active" : ""}
          onClick={handleFiltering}
          id="all"
        >
          All
        </p>
        <p
          className={filterId === "active" ? "active" : ""}
          onClick={handleFiltering}
          id="active"
        >
          Active
        </p>
        <p
          className={filterId === "completed" ? "active" : ""}
          onClick={handleFiltering}
          id="completed"
        >
          Completed
        </p>
      </div>
      <div className="todo-content">
        <ul className="content-list">
          {props.filteredList.map((todo) => (
            <li className="todo-element" key={todo.id}>
              {todo.completed ? <del>{todo.content}</del> : todo.content}
              <input
                type={"checkbox"}
                checked={todo.completed}
                onClick={() => {
                  props.handleCompleted(todo);
                }}
                onChange={() => {}}
                id={todo._id}
                className="check-class"
              ></input>
              <label className="complete-label" htmlFor={todo._id}></label>

              <input
                type={"checkbox"}
                checked={todo.completed}
                onClick={() => {
                  props.handleDeleted(todo._id);
                }}
                onChange={() => {}}
                id={`a${todo._id}`}
                className="delete-class"
              ></input>
              <label className="delete-label" htmlFor={`a${todo._id}`}></label>
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={props.handleSubmit}>
        <input
          className="todo-input"
          placeholder="New to do"
          value={props.content}
          onChange={props.handleContent}
        />
      </form>
    </div>
  );
}

export default TodoCard;
