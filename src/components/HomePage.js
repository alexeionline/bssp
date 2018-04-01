import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import YandexMap from "./YandexMap";
import { fetchObjects } from "../actions/objects";
import ObjectsList from "./ObjectsList";

class HomePage extends Component {
  componentDidMount = () => {
    this.props.getObjectsFromDB();
  };

  render = () => {
    return (
      <Container>
        <YandexMap />
        <ObjectsList />
      </Container>
    );
  };
}

export default connect(
  state => {
    return {
      ...state
    };
  },
  dispatch => {
    return {
      getObjectsFromDB: () => {
        dispatch(fetchObjects());
      }
    };
  }
)(withRouter(HomePage));
