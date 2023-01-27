import React from "react";
import pinSVG from "../../assets/misc/pin-black.svg";
import deleteSVG from "../../assets/misc/delete.svg";

function FilterPinned(props) {
    const checkNumberOfPinned = () => {
        const f = props.filteredList.filter((note) => note.pinned);
        return f.length
    }
  return (
    <div className="pinned-notes show-notes">
      {props.filteredList.length > 0 && (
        <>
          {props.filteredList
            .map((note, index) => {
                if(note.pinned) {
              return (
                <form className="form" key={index} id={note._id} style={{backgroundColor: props.newColor}}>
                  <div className="top-title-pin">
                    <input
                      className="new-title"
                      spellCheck={false}
                      autoComplete="off"
                      type="text"
                      value={note.title}
                      name="title"
                      onChange={(event) => {
                        props.handleFormChange(index, event);
                      }}
                    />
                    <img
                      src={pinSVG}
                      alt="pin icon"
                      className="pin-btn-black"
                      id="pin-btn-black"
                      onClick={() => {
                        props.handlePinned(note, !note.pinned);                        
                        if(checkNumberOfPinned() < 2) {
                          props.setLarge();
                          console.log(checkNumberOfPinned())
                        } else {
                          props.setSmall();
                        }
                    }}
                    />
                  </div>

                  <textarea
                    className="new-content"
                    type="text"
                    spellCheck={false}
                    autoComplete="off"
                    value={note.content}
                    name="content"
                    onChange={(event) => {
                        props.handleFormChange(index, event);
                    }}
                  />
                  <div className="bottom-buttons" name="category">
                    <button
                      className={`category-btn ${note.category}`}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      {note.category}
                    </button>

                    <div className="save-cancel-btn" id={index}>
                      <button
                        className="save-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          props.handleUpdate(note);
                          props.handleButtons(index);
                        }}
                        type="submit"
                      >
                        save
                      </button>
                      <button
                        className="cancel-btn"
                        type="reset"
                        onClick={(e) => {
                          e.preventDefault();
                          props.getAllNotes();
                          props.handleButtons(index);
                        }}
                      >
                        cancel
                      </button>
                    </div>

                    <img
                      src={deleteSVG}
                      alt="delete icon"
                      className="delete-btn"
                      onClick={() => {
                        props.handleDeleted(note._id);
                      }}
                    />
                  </div>
                </form>
              )};
            })}
        </>
      )}
    </div>
  );
}

export default FilterPinned;

// {filteredList.filter((note) => !note.pinned)
//     .map((note, index) => {
//       return (

//       )
