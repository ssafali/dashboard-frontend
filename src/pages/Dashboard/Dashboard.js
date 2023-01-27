import React, { useState } from "react";
import "./Dashboard.css";
import Weather from "../../components/Weather/Weather";
import WeatherSmall from "../../components/Weather/WeatherSmall";
import Clock from "../../components/Clock-Pomodoro/Clock";
import todoSVG from "../../assets/misc/todo-2.svg";
import newsSVG from "../../assets/misc/newspaper.svg";
import notesSVG from "../../assets/misc/notes.svg";
import PomodoroTimer from "../../components/Clock-Pomodoro/Pomodoro/PomodoroTimer"
import NewsContainer from "../../components/News/NewsContainer";
import ToDoContainer from "../../components/toDoComponents/ToDoContainer";
import NotesContainer from "../../components/Notes/NotesContainer";
import Navbar from "../../components/Navbar/Navbar";

function Dashboard() {
  const [toDoActive, setTodoActive] = useState(false);
  const [newsActive, setNewsActive] = useState(false);
  const [notesActive, setNotesActive] = useState(false);
  const [weatherActive, setWeatherActive] = useState(true);
  const [clockActive, setClockActive] = useState(true);
  const [navbarActive, setNavbarActive] = useState(true);
  const [pomodoroActive, setPomodoroActive] = useState(false);

  const [weather, setWeather] = useState("small");

  const changeWeather = () => {
    if (weather === "small") {
      setWeather("big");
    } else {
      setWeather("small");
    }
  };
  return (
    <div className="dashboard">
      {/* <JournalContainer/> */}

    {navbarActive && (<Navbar/>)}

      <div>
        <div >
        {pomodoroActive && (
          <PomodoroTimer
            setClockActive={setClockActive}
            setWeatherActive={setWeatherActive}
            setNavbarActive={setNavbarActive}
            setPomodoroActive={setPomodoroActive}
          />
        )}
          {clockActive && (
          <div>
            <Clock 
                  setNewsActive={setNewsActive}
                  setNotesActive={setNotesActive}
                  setWeatherActive={setWeatherActive}
                  setClockActive={setClockActive}
                  setNavbarActive={setNavbarActive}
                  setPomodoroActive={setPomodoroActive}
            />
          </div>
          )}
          {weatherActive && (
            <div className="weather">
              <div className="weather-small" onClick={() => changeWeather()}>
                {weather === "small" && <WeatherSmall />}
              </div>
              <div className="weather-big" onClick={() => changeWeather()}>
                {weather === "big" && <Weather />}
              </div>
            </div>
          )}
        </div>
      {!pomodoroActive &&(        
      <div className="icons-svg">
          <div className="icon-item-news">
            <img
              onClick={() => {
                setNewsActive(!newsActive)
                setNotesActive(false)
                setWeatherActive(true);
                setClockActive(true);
                setNavbarActive(true);
          }
              }
              className="news-svg"
              src={newsSVG}
              width="50px"
              alt="newsSVG"
            />
            <p>News</p>
          </div>

          <div className="icon-item-notes">
            <img
              onClick={() => {
                setNotesActive(!notesActive); 
                setWeatherActive(!weatherActive);
                setClockActive(!clockActive);
                setNavbarActive(!navbarActive);
                setNewsActive(false)
               }}
              className="notes-svg"
              src={notesSVG}
              width="40px"
              alt="todoSVG"
            />
            <p>Notes</p>
          </div>

          <div className="icon-item-todo">
            <img
              onClick={() => setTodoActive(!toDoActive)}
              className="todo-svg"
              src={todoSVG}
              width="78px"
              alt="todoSVG"
            />
            <p>To do</p>
          </div>
        </div>)}
        {toDoActive && (
          <div className="show-todo">
            <ToDoContainer />
          </div>
        )}
              

        {newsActive && (
          <div className="show-news">
            <NewsContainer notesActive={notesActive} />
          </div>
        )}

        {notesActive && (
          <div className="show-notes">
            <NotesContainer />
            
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
