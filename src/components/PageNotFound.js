import React from "react";
import { withRouter } from "react-router-dom";
import { Container } from "semantic-ui-react";

const PageNotFound = () => {
  return <Container>This is 404 : page not found</Container>;
};

export default withRouter(PageNotFound);
