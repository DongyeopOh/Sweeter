import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, RouteProps } from "react-router-dom";

import Home from "./screens/Home";

const App: React.FunctionComponent = () => {
  useEffect(() => {
    fetch("/test")
      .then((res) => res.json())
      .then((res) => console.log(res));
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/" component={(props: RouteProps) => <Home {...props} />} />
      </Switch>
    </Router>
  );
};

export default App;
