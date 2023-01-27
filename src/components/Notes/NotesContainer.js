import axios from "axios";
import React, { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../../context/auth.context";
import NewNote from "./NewNote";
import "./NotesContainer.css";
import deleteSVG from "../../assets/misc/delete.svg";
import FilterNotes from "./FilterNotes";
import pinSVG from "../../assets/misc/pin.svg";
import FilterPinned from "./FilterPinned";
import ChangeColor from "./ChangeColor";

function NotesContainer(props) {
  const API_URL = "http://localhost:5005";
  const { user } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");
  const [notesList, setNotes] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [addingNew, setAddingNew] = useState(false);
  const [changed, setChanged] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // const [hasPinned, setHasPinned] = useState(Boolean);
  const [byCategory, setByCategory] = useState(false);
  const [newColor, setNewColor] = useState('ivory');


  const ref = useRef(null);
  const saveCancel = useRef(null);

  // Get all notes
  const getAllNotes = () => {
    axios
      .get(`${API_URL}/notes/${user._id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setNotes(response.data);
        setFilteredList(response.data);
        return response.data;
      });
  };

  if (props.notesActive) {
    getAllNotes();  
  }

  const handleFormChange = (index, event) => {
    let data = [...filteredList];
    data[index][event.target.name] = event.target.value;
    setFilteredList(data);
    document.getElementById(index).style.visibility = "visible";
  };

  const handleButtons = (index) => {
    document.getElementById(index).style.visibility = "hidden";
  };

  const handleUpdate = (note) => {
    const requestBody = {
      id: note._id,
      title: note.title,
      content: note.content,
      category: note.category,
      pinned: note.pinned,
    };
    axios
      .post(`${API_URL}/notes/edit`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((newObj) => {
        setNotes(newObj);
      });
  };

  const handlePinned = (note, newState) => {
    const requestBody = { id: note._id, pinned: newState };
    axios
      .post(`${API_URL}/notes/edit-pinned`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((newObj) => {
        const newNotes = filteredList.map((n) => {
          if (n._id === note._id) {
            return { ...n, pinned: newState };
          }
          return n;
        });
        setFilteredList(newNotes);
        setNotes(newNotes);
      });
  };

  const handleDeleted = (id) => {
    axios
      .delete(`${API_URL}/notes/delete/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => getAllNotes());
  };

  const setSmall = () => {
    ref.current.style.height = "51vh";
    ref.current.style.marginTop = "37vh";
  };
  const setLarge = () => {
    ref.current.style.height = "83vh";
    ref.current.style.marginTop = "10px";
    ref.current.style.borderRadius = '10px'
  };



  const filterByCategory = (note) => {
    let data = filteredList.filter((n) => n.category === note.category);
    if (!byCategory) {
      setFilteredList(data);
    } else if(byCategory) {
      getAllNotes();
    }
  };

  useEffect(() => {
    getAllNotes();
    setSmall();
    // if (filteredList.some((note) => note.pinned)) {
    //   console.log("yeah");
    //   setSmall();
    // } else if(filteredList.every((note) => !note.pinned)) {
    //   console.log("nay");
    //   setLarge();
    // }
  }, []);

  return (
    <>
      {filteredList.some((note) => note.pinned) && (
        <FilterPinned
          filteredList={filteredList}
          handleFormChange={handleFormChange}
          handlePinned={handlePinned}
          handleUpdate={handleUpdate}
          handleButtons={handleButtons}
          getAllNotes={getAllNotes}
          handleDeleted={handleDeleted}
          // hasPinned={hasPinned}
          // setHasPinned={setHasPinned}
          setSmall={setSmall}
          setLarge={setLarge}
          newColor={newColor}
        />
      )}

      <div className="note-cards show-notes" ref={ref}>
        <div className="add-search">
          <FilterNotes
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filteredList={filteredList}
            setFilteredList={setFilteredList}
            notesList={notesList}
            setNotes={setNotes}
          />
          <button
            className="plus-btn"
            onClick={() => { 
              setAddingNew(!addingNew);
            }}
          >
            +
          </button>
            
          <div className="add-search-bottom">
            {byCategory && (<button className="show-all-btn" onClick={() => {getAllNotes(); setByCategory(!byCategory)}}>Show All Notes</button>)}
              <ChangeColor  onClick={(e) => console.log(e.target)} setNewColor={setNewColor}/>
              <div className="line">
                {/* <hr className='border-line'/> */}
              </div>
          </div>
        </div>
        {addingNew && (
          <NewNote
            addingNew={addingNew}
            setAddingNew={setAddingNew}
            filteredList={filteredList}
            setFilteredList={setFilteredList}
            setNotes={setNotes}
          />
        )}
        {filteredList.map((note, index) => {
          if (!note.pinned) {
            return (
              <form className="form" key={index} id={note._id} style={{backgroundColor: newColor}}>
                <div className="top-title-pin">
                  <input
                    className="new-title"
                    spellCheck={false}
                    autoComplete="off"
                    type="text"
                    value={note.title}
                    name="title"
                    onChange={(event) => {
                      setChanged(true);
                      handleFormChange(index, event);
                    }}
                  />
                  <img
                    src={pinSVG}
                    alt="pin icon"
                    className="pin-btn"
                    onClick={() => {
                      handlePinned(note, !note.pinned);
                      // setHasPinned(true);
                      setSmall();
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
                    setChanged(true);
                    handleFormChange(index, event);
                  }}
                />
                <div className="bottom-buttons" name="category">
                  <button
                    className={`category-btn ${note.category}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setByCategory(!byCategory)
                      filterByCategory(note);
                    }}
                  >
                    {note.category}
                  </button>

                  <div className="save-cancel-btn" id={index} name='save-cancel-btn' ref={saveCancel}>
                    <button
                      className="save-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        handleUpdate(note);
                        setChanged(false);
                        handleButtons(index);
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
                        getAllNotes();
                        setChanged(false);
                        handleButtons(index);
                      }}
                    >
                      cancel
                    </button>
                  </div>
                  <div className="delete-palette">
                    {/* <ChangeColor setNewColor={setNewColor} handleColor={handleColor(note._id)}/> */}
                    <img
                      src={deleteSVG}
                      alt="delete icon"
                      className="delete-btn"
                      onClick={() => {
                        handleDeleted(note._id);
                      }}
                    />
                  </div>
                </div>
              </form>
            );
          }
        })}
      </div>
    </>
    // <div className="todo-container">
    //   <div
    //     className="todo-cards"

    //   >
    //     {notesList.map((note) => {

    //       return (
    //         <NoteCard
    //           key={note._id}
    //           className="todo-card"
    //           title={note.title}
    //           content={note.content}
    //           category={note.category}
    //           handleChangeTitle={handleChangeTitle}
    //           handleChangeContent={handleChangeContent}
    //         />
    //       );
    //     })}
    //   </div>
    // </div>
  );
}
export default NotesContainer;
