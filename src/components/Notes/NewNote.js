import axios from "axios";
import React, { useState } from "react";
import "./NewNote.css";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";
import NoteCard from "./NoteCard";

function NewNote(props) {
  const API_URL = "http://localhost:5005";
  const { user } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("general");
  const [pinned, setPinned] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);


  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleContent = (e) => {
    setContent(e.target.value);
  };
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handlePinned = (e) => {
    setPinned(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { title, content, category, pinned, user: user._id };
    console.log(user);
    axios
      .post(`${API_URL}/notes/new`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        let updateNotes = props.filteredList;
        props.setNotes([...updateNotes, response.data]);
        props.setFilteredList([...updateNotes, response.data]);
      
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
        console.log(errorMessage)
      });
    setTitle("");
    setContent("");
    setCategory("");
    setPinned(false);
    props.setAddingNew(false);

  };
  return (
        <NoteCard
          title={title}
          content={content}
          category={category}
          handleTitle={handleTitle}
          handleContent={handleContent}
          handleCategory={handleCategory}
          handlePinned={handlePinned}
          handleSubmit={handleSubmit}
          handleAddingNew={props.addingNew}
          handleSetAddingNew={props.setAddingNew}          
        />
  );
}

export default NewNote;
