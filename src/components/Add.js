import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { YMaps, Map, GeoObject } from "react-yandex-maps";
import {
  Container,
  Input,
  Form,
  Button,
  Checkbox,
  TextArea
} from "semantic-ui-react";
import {
  addNewObjectFromForm,
  resetNewObjectFromForm,
  changeNewObjectFromForm
} from "../actions/objects";

const Add = ({ onAddNewObject, onChangeNewObject, mapState }) => {
  const changeObject = e => {
    onChangeNewObject(e.target.name, e.target.value);
  };

  return (
    <Container>
      <Form action="" method="post" onSubmit={onAddNewObject}>
        <Form.Field>
          <label>Address</label>
          <Input
            placeholder="Type your address here..."
            name="address"
            onChange={changeObject}
          />
        </Form.Field>
        <Form.Field>
          <label>Coordinates</label>
          <Input placeholder="Type lan here..." type="number" />
          <Input placeholder="Type lon here..." type="number" />
          <YMaps>
            <Map state={mapState}>
              <GeoObject
                geometry={{
                  type: "Point",
                  coordinates: mapState.center
                }}
                properties={{
                  iconContent: "Set coordinates",
                  hintContent: "Drag me"
                }}
                options={{
                  draggable: true
                }}
              />
            </Map>
          </YMaps>
        </Form.Field>
        <Form.Field>
          <label>Quantity of squares</label>
          <Input
            placeholder="Type quantity of squares here..."
            name=""
            type="number"
          />
        </Form.Field>
        <Form.Field>
          <label>Price</label>
          <Input placeholder="Type price here..." type="number" />
        </Form.Field>
        <Form.Field>
          <label>Communications</label>
          <Checkbox label="Sewage" />
          <Checkbox label="Water" />
          <Checkbox label="Light" />
          <Checkbox label="Gas" />
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <TextArea placeholder="Type description here..." />
        </Form.Field>
        <Form.Field>
          <label>Phone</label>
          <Input placeholder="Type your phone here..." />
        </Form.Field>
        <Form.Field>
          <label>E-Mail</label>
          <Input placeholder="Type your e-mail here..." />
        </Form.Field>
        <Form.Field>
          <label>Photos</label>
          <Input placeholder="Type your photos here..." />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default withRouter(
  connect(
    store => ({
      ...store,
      mapState: {
        center: [44.616687, 33.525432],
        zoom: 10
      }
    }),
    dispatch => {
      return {
        onAddNewObject: ev => {
          ev.preventDefault();
          dispatch(addNewObjectFromForm());
          dispatch(resetNewObjectFromForm());
        },
        // onResetNewObject : () => {
        //   dispatch(resetNewObjectFromForm());
        // },
        onChangeNewObject: (inputType, inputValue) => {
          dispatch(changeNewObjectFromForm(inputType, inputValue));
        }
      };
    }
  )(Add)
);
