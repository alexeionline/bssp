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
          <label>City</label>
          <Input
            placeholder="Type your address here..."
            name="city"
            onChange={changeObject}
          />
          <label>Address</label>
          <Input
            placeholder="Type your address here..."
            name="address"
            onChange={changeObject}
          />
        </Form.Field>
        <Form.Field>
          <label>Coordinates</label>
          <Input
            placeholder="Type lan here..."
            type="number"
            name="mapX"
            onChange={changeObject}
            value={mapState.center[0]}
          />
          <Input
            placeholder="Type lon here..."
            type="number"
            name="mapY"
            onChange={changeObject}
            value={mapState.center[1]}
          />
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
            name="square"
            type="number"
            onChange={changeObject}
          />
        </Form.Field>
        <Form.Field>
          <label>Price</label>
          <Input
            placeholder="Type price here..."
            name="price"
            type="number"
            onChange={changeObject}
          />
        </Form.Field>
        <Form.Field>
          <label>Communications</label>
          <Checkbox label="Sewage" name="com.sewage" onChange={changeObject} />
          <Checkbox label="Water" name="com.water" onChange={changeObject} />
          <Checkbox label="Light" name="com.light" onChange={changeObject} />
          <Checkbox label="Gas" name="com.gas" onChange={changeObject} />
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <TextArea
            placeholder="Type description here..."
            name="description"
            onChange={changeObject}
          />
        </Form.Field>
        <Form.Field>
          <label>Phone</label>
          <Input
            placeholder="Type your phone here..."
            name="phone"
            onChange={changeObject}
          />
        </Form.Field>
        <Form.Field>
          <label>E-Mail</label>
          <Input
            placeholder="Type your e-mail here..."
            name="email"
            onChange={changeObject}
          />
        </Form.Field>
        <Form.Field>
          <label>Photos</label>
          <Input
            placeholder="Type your photos here..."
            name="photos"
            onChange={changeObject}
          />
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
