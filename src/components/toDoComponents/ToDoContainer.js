import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import TodoCard from "./TodoCard";
import "./ToDoContainer.css";

function ToDoContainer() {
  const API_URL = "http://localhost:5005";
  //const API_URL = 'https://jungle-green-macaw-sock.cyclic.app';

  const { user } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");

  const [toDosList, setTodos] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [content, setContent] = useState("");

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const handleCompleted = (todo) => {
    const requestBody = { id: todo._id, completed: !todo.completed };
    axios
      .post(`${API_URL}/todos/edit`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((newObj) => {
        const newTodos = toDosList.map((t) => {
          if (t._id === newObj.data._id) {
            t.completed = !t.completed;
          }
          return t;
        });
        setTodos(newTodos);
      });
  };

  const getAllTodos = () => {
    axios
      .get(`${API_URL}/todos/${user._id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setTodos(response.data);
        setFilteredList(response.data);
        return response.data;
      });
  };

  const getActiveTodos = () => {
    const active = toDosList.filter((todo) => {
      return !todo.completed;
    });
    setFilteredList(active);
  };

  const getCompletedTodos = () => {
    const completed = toDosList.filter((todo) => {
      return todo.completed;
    });
    setFilteredList(completed);
  };

  const handleDeleted = (id) => {
    axios
      .delete(`${API_URL}/todos/delete/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => getAllTodos());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { content, user: user._id };

    console.log(user);
    axios
      .post(`${API_URL}/todos/new`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setTodos([...toDosList, response.data]);
        setFilteredList([...toDosList, response.data]);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        console.log(errorDescription);
      });

    setContent("");
  };

  // Get all todos of the user
  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <div>
      <TodoCard
        setFilteredList={setFilteredList}
        filteredList={filteredList}
        content={content}
        toDosList={toDosList}
        handleCompleted={handleCompleted}
        handleContent={handleContent}
        handleSubmit={handleSubmit}
        handleDeleted={handleDeleted}
        getActiveTodos={getActiveTodos}
        getAllTodos={getAllTodos}
        getCompletedTodos={getCompletedTodos}
      />
    </div>
  );
}

export default ToDoContainer;
