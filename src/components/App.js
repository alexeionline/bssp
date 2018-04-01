import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";

import Menu from "./AppMenu";
import About from "./About";
import Add from "./Add";
import SomeObject from "./SomeObject";
import PageNotFound from "./PageNotFound";
import HomePage from "./HomePage";

const App = () => {
  return (
    <Router>
      <Container>
        <Container>
          <Menu />
        </Container>
        <Container>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/about" component={About} />
            <Route path="/add" component={Add} />
            <Route path="/o/:objectID" component={SomeObject} />
            <Route component={PageNotFound} />
          </Switch>
        </Container>
      </Container>
    </Router>
  );
};

export default App;
