import React from "react";
import { auth } from "../../firebaseconfig";
import firebase from "../../firebaseconfig";
import "./Main.css";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import Todos from "../Todo/Todos";

const Main = () => {
  const db = firebase.firestore();
  const history = useHistory();
  const [taskname, settaskname] = useState("");
  const [tasks, settasks] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);

  const signout = () => {
    auth.signOut();
    history.push("/Auth");
  };

  const getTodos = () => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .collection("tasks")
      .orderBy("timestamp")
      .onSnapshot((querySnapshot) => {
        settasks(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            taskname: doc.data().taskname,
            progress: doc.data().progress,
          }))
        );
      });

    console.log(tasks);
  };

  const addtask = () => {
    if (taskname) {
      db.collection("users").doc(auth.currentUser.uid).collection("tasks").add({
        taskname: taskname,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        mail: auth.currentUser.email,
        progress: true,
      });
      settaskname("");
      console.log(tasks);
    }
  };

  const enterkey = (e) => {
    if (e.key === "Enter") addtask();
  };
  return (
    <div class="Main-Task-div">
      <div className="title-div">
        <div className="signout-div">
          <h3>Todo App✌</h3>
          <button onClick={signout} className="signoutbtn">
            LOG OUT
          </button>
        </div>
        <div className="addtask-div">
          <input
            onKeyPress={enterkey}
            value={taskname}
            className="searchText"
            onChange={(e) => settaskname(e.target.value)}
            type="text"
          ></input>
          <img
            id="closebtn"
            alt="addicon"
            src="https://img.icons8.com/metro/23/ffab2e/checked.png"
            onClick={addtask}
          />
        </div>
      </div>

      <div className="Todo-div">
        {tasks.map((task) => (
          <Todos
            taskname={task.taskname}
            progress={task.progress}
            id={task.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Main;
