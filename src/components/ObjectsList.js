import React from "react";
import { Container, List, Image } from "semantic-ui-react";
import { connect } from "react-redux";

const ObjectsList = props => {
  return (
    <Container>
      {props.objects.map(object => {
        return (
          <Container key={object.id}>
            <List as="ul">
              <List.Item as="li">
                {object.id}. {object.city},{object.address}
              </List.Item>
              <List.Item as="li">
                Coords: {object.map[0]},{object.map[1]}
              </List.Item>
              <List.Item as="li">Price: {object.price}</List.Item>
              <List.Item as="li">
                Communications: {parseComms(object.com)}
              </List.Item>
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
      })}
    </Container>
  );
};

const parseComms = com =>
  Object.keys(com).reduce((communications, key) => {
    return (communications += (com[key] && key) || " ");
  }, "");

export default connect(store => ({ objects: [...store.objects.objects] }))(
  ObjectsList
);
