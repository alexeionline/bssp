import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Container, List, Image } from "semantic-ui-react";

const SomeObject = ({ object }) => {
  return (
    <Container>
      <List as="ul">
        <List.Item as="li">
          {object.id}. {object.city},{object.address}
        </List.Item>
        <List.Item as="li">
          Coords: {object.map[0]},{object.map[1]}
        </List.Item>
        <List.Item as="li">Price: {object.price}</List.Item>
        <List.Item as="li">Communications: {parseComms(object.com)}</List.Item>
        <List.Item as="li">Description: {object.description}</List.Item>
        <List.Item as="li">Phone: {object.phone}</List.Item>
        <List.Item as="li">Email: {object.email}`}</List.Item>
        <List.Item as="li">
          {object.photos.map(photo => (
            <Image key={photo} src={photo} size="small" />
          ))}
        </List.Item>
      </List>
    </Container>
  );
};

const parseComms = com =>
  Object.keys(com).reduce((communications, key) => {
    return (communications += (com[key] && key) || " ");
  }, "");

export default connect((store, ownProps) => {
  return {
    object: store.objects.objects.find(
      object => object.id === +ownProps.match.params.objectID
    )
  };
})(SomeObject);
