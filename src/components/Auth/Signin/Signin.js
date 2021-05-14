import React from "react";
import { auth } from "../../../firebaseconfig";
import { useState } from "react";
import "./Signin.css";
import { useHistory } from "react-router-dom";

const Signin = (props) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [pwd, setpwd] = useState("");
  const [error, seterror] = useState(false);
  const signin = () => {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      ) &&
      pwd !== ""
    ) {
      seterror(false);
      props.toggle(true, false);
    } else {
      seterror(true);
    }
    auth
      .signInWithEmailAndPassword(email, pwd)
      .then((res) => {
        console.log("user Logged in!");
        props.toggle(false, false);
        history.push("/Main");
      })
      .catch((err) => {
        props.toggle(false, true);
        console.log("Incorrect details");
      });
  };
  return (
    <div className="Main-form-div">
      <div className="form-div">
        <div className="user-form-div">
          <h5>Username</h5>
          <input onChange={(e) => setEmail(e.target.value)}></input>
        </div>
        <div className="pwd-form-div">
          <h5>Password</h5>
          <input
            type="password"
            onChange={(e) => setpwd(e.target.value)}
          ></input>
        </div>
        {error || props.er ? (
          <div className="error">
            <img
              alt="error"
              src="https://img.icons8.com/pastel-glyph/20/ff4b4b/warning-triangle.png"
            />
            <p>Incorrect Details!</p>
          </div>
        ) : (
          <div className="error">
            <p></p>
          </div>
        )}
        <div className="button-form-div">
          <button onClick={signin}>LOGIN</button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
