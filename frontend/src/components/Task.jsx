import React, { useEffect, useState } from "react";
import "./Task.css";
import { deleteNote, handleComplete, saveNote } from "../axios/services/noteService";
import Modal from "react-modal";

const Task = ({ content, handleUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [item, setItem] = useState("");

  useEffect(() => {
    setItem(content);
  }, [content]);

  const handleCheckboxChange = async (e, id) => {
    const isChecked = e.target.checked;
    const res = await handleComplete(id, isChecked);
    if (res.status) handleUpdate(id);
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setItem({...item.content, [name]:value});
    // console.log(item, content._id)
  };

  const handleEdit = async (id) => {
    const data = await saveNote(id, item.item)
    if(data.status){
      handleUpdate(id);
      setIsModalOpen(false);
    } 
  };

  const handleDelete = async (id) => {
    const data = await deleteNote(id);
    if (data.status) {
      handleUpdate(id);
    }
  };

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "none",
      borderRadius: "10px",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
      padding: "20px",
      backgroundColor: "lightblue",
      maxWidth: "400px",
      width: "100%",
      textAlign: "center",
      fontSize: "1.2rem",
      fontWeight: "bold",
      color: "#333",
    },
    button: {
      backgroundColor: "black",
    },
  };

  // custom styles for the buttons
  const buttonStyles = {
    border: "none",
    borderRadius: "5px",
    padding: "10px",
    margin: "10px",
    cursor: "pointer",
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "red",
  };

  return (
    <>
      <div className="note-history-section">
        <div className="note-history-container">
          <div className="note-history">
            <div className="left">
              <input
                type="checkbox"
                checked={content.isCompleted}
                onChange={(e) => handleCheckboxChange(e, content._id)}
              />
              {content.content}
            </div>
            <div className="right">
              <button onClick={() => setIsModalOpen(true)}>
                <i className="fa fa-edit"></i>
              </button>
              <Modal isOpen={isModalOpen} style={customStyles}>
                <h2>EDIT NOTE</h2>
                <div>
                  <input
                    type="text"
                    name="item"
                    value={item.content}
                    onChange={handleInputChange}
                  />
                </div>
                <button onClick={() => handleEdit(content._id)} style={buttonStyles}>
                  Save
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  style={buttonStyles}
                >
                  Cancel
                </button>
              </Modal>
              <button onClick={() => handleDelete(content._id)}>
                <i className="fa fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Task;
