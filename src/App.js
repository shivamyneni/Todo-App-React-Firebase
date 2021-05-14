import "./App.css";
import { useEffect, useState } from "react";
import Main from "./components/Main/Main";
import Auth from "./components/Auth/Auth";
import Loading from "./components/loading/loading";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

const App = () => {
  const [loading, setloading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 3000);
  }, []);

  return (
    <div className="App">
      {loading ? (
        <div className="fade">
          <Loading />
        </div>
      ) : (
        <Router>
          <Switch>
            <Route path="/Main" component={Main} exact />
            <Route path="/Auth" component={Auth} exact />
            <Redirect to="/Auth" from="*" />
          </Switch>
        </Router>
      )}
    </div>
  );
};

export default App;
