import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "../routers/Home";
import Detail from "../routers/Detail";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/:id" exact component={Detail} />
    </Router>
  );
};

export default App;
