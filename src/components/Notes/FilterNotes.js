import React, { useState } from "react";

function FilterNotes(props) {

    const handleFilterSearch = (e) => {
        props.setSearchTerm(e.target.value)

        const results = props.notesList.filter(note => {
            if(e.target.value === '') return props.notesList;
            return note.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
            note.content.toLowerCase().includes(e.target.value.toLowerCase())
        })
        props.setFilteredList(results)
    }

  return (
    <div className="">
      <input
        onChange={(e) => {handleFilterSearch(e);}}
        className="filter-text"
        type="search"
        value={props.searchTerm}
        placeholder="Search..."
      />
    </div>
  );
}

export default FilterNotes;
