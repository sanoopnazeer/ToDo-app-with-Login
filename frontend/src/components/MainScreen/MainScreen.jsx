import React, { useEffect, useState } from "react";
import "./MainScreen.css";
import Task from "../Task";
import { addItem, getAllNotes } from "../../axios/services/noteService";

const MainScreen = () => {
  const [item, setItem] = useState("");
  const [allnotes, setAllnotes] = useState("");
  const [update, setUpdate] = useState([]);

  const {user} = JSON.parse(localStorage.getItem("user"))
  console.log(user)

  const fetchData = async () => {
    const data = await getAllNotes(user._id);
    if (data.status) {
      setAllnotes(data.allNotes);
    }
  };

  useEffect(() => {
    fetchData();
  }, [update]);

  const handleUpdate = (id) => {
    setUpdate(id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (item) {
      await addItem(item, user._id);
      setItem("");
      fetchData();
    } else {
      alert("Please enter something");
    }
  };

  return (
    <div className="mainscreen">
      <div className="container">
        <div className="createnote-container">
          <h1>WELCOME TO NOTE TAKER</h1>
          <hr />
          <div className="input-area">
            <input
              type="text"
              name="item"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              placeholder="Add item..."
            />
            <button className="btn btn-primary" onClick={handleSubmit}>
              Add note
            </button>
          </div>
        </div>

        {allnotes &&
          allnotes.map((task) => {
            return <Task content={task} handleUpdate={handleUpdate} />;
          })}
      </div>
    </div>
  );
};

export default MainScreen;
