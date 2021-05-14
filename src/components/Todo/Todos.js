import React from "react";
import { auth } from "../../firebaseconfig";
import firebase from "../../firebaseconfig";
import "./Todos.css";

const Todos = (props) => {
  const db = firebase.firestore();
  const toggle = () => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .collection("tasks")
      .doc(props.id)
      .update({
        progress: !props.progress,
      });
  };

  const deleteItem = () => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .collection("tasks")
      .doc(props.id)
      .delete();
  };

  return (
    <div className="Main-li-div">
      <div className="taskname-div">
        <p>{props.taskname}</p>
        {props.progress ? (
          <h6 id="inprogress">Inprogress</h6>
        ) : (
          <h6 id="complete">Completed</h6>
        )}
      </div>
      <div className="icons-div">
        {props.progress ? (
          <img
            onClick={toggle}
            alt="completeicon"
            src="https://img.icons8.com/windows/20/ffffff/task-completed.png"
          />
        ) : (
          <img
            onClick={toggle}
            alt="checkicon"
            src="https://img.icons8.com/windows/20/ffffff/hourglass-sand-top.png"
          />
        )}
        <img
          onClick={deleteItem}
          alt="deleteicon"
          src="https://img.icons8.com/color/20/000000/delete-forever.png"
        />
      </div>
    </div>
  );
};

export default Todos;
