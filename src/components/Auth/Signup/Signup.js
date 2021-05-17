import React from "react";
import { auth } from "../../../firebaseconfig";
import { useState } from "react";
import "./signup.css";
import { useHistory } from "react-router-dom";

const Signup = (props) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [pwd, setpwd] = useState("");
  const [error, seterror] = useState(false);

  const signup = () => {
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
      .createUserWithEmailAndPassword(email, pwd)
      .then((res) => {
        props.toggle(false, false);
        history.push("/Main");
      })
      .catch((err) => {
        props.toggle(false, true);
      });
  };

  return (
    <div className="Main-form-div">
      <div className="form-div">
        <div className="user-form-div">
          <p>Username</p>
          <input
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className="pwd-form-div">
          <p>Password</p>
          <input
            placeholder="password"
            type="password"
            onChange={(e) => setpwd(e.target.value)}
          ></input>
        </div>
        {error || props.er ? (
          <div className="error">
            <img
              alt="erroricon"
              src="https://img.icons8.com/pastel-glyph/32/ff4b4b/warning-triangle.png"
            />
            <p>Incorrect Details!</p>
          </div>
        ) : (
          <div className="error">
            <p></p>
          </div>
        )}
        <div className="button-form-div">
          <button onClick={signup}>SIGN UP</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
