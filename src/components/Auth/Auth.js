import { auth } from "../../firebaseconfig";
import { useState, useEffect } from "react";
import "./Auth.css";
import { useHistory } from "react-router-dom";
import Signin from "../Auth/Signin/Signin";
import Loading from "../loading/loading";
import Signup from "../Auth/Signup/Signup";

const Auth = () => {
  const [authType, setauthType] = useState("signin");
  const history = useHistory();
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        history.push("/Main");
      } else {
        console.log("user logged out!");
      }
    });
  }, []);

  const toggle = (x, y) => {
    console.log(x);
    setloading(x);
    seterror(y);
  };
  return (
    <div className="Auth">
      {authType === "signin" ? (
        loading && error === false ? (
          <Loading />
        ) : (
          <div class="container">
            <div className="sign">
              <p>To-Do Login✌</p>
            </div>
            <Signin toggle={toggle} er={error} />
            <p>
              New here?
              <span onClick={() => setauthType("signup")}>
                Create Account😏
              </span>
            </p>
          </div>
        )
      ) : loading && error === false ? (
        <Loading />
      ) : (
        <div class="container">
          <div className="sign">
            <p>To-Do Signup😍</p>
          </div>
          <Signup toggle={toggle} er={error} />
          <p>
            Already have An Account?
            <span onClick={() => setauthType("signin")}> Sign In👻</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Auth;
