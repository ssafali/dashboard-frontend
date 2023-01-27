import React from "react";
import "./NoteCard.css";

function NoteCard(props) {
  return (
    <form className="form" onSubmit={props.handleSubmit}>
      <input
        autoFocus
        className="new-title"
        type="text"
        autoComplete="off"
        placeholder="Title"
        value={props.title}
        name="title"
        onChange={props.handleTitle}
      />
      <textarea
        className="new-content"
        type="text"
        autoComplete="off"
        placeholder="New note"
        value={props.content}
        name="content"
        onChange={props.handleContent}
      />
      <select className="categories" onChange={props.handleCategory}>
        <option value="general">general</option>
        <option value="home">home</option>
        <option value="work">work</option>
      </select>

      <div className="new-note-buttons">
        <button className="add-button" type="submit">
          add
        </button>
        <button
          className="cancel-button"
          type="reset"
          onClick={() => {
            props.handleSetAddingNew(false);
          }}
        >
          cancel
        </button>
      </div>
    </form>
  );
}

export default NoteCard;
