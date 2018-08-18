/* eslint-disable no-undef */
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

const Add = ({ onAddNewObject, onChangeNewObject, newObject }) => {
  const geocodeCoordsAndChangeNewObject = (geocodeCity, geocodeAddress) => {
    ymaps.geocode([...newObject.map]).then(result => {
      const fullAddress = result.geoObjects
        .get(0)
        .properties.get("metaDataProperty.GeocoderMetaData.Address.Components");

      const likeEvent = {
        target: {}
      };

      const address = [];
      let city = "";

      for (let addressProp of fullAddress) {
        if (addressProp.kind === "locality") {
          city = addressProp.name;
        }

        if (addressProp.kind === "street") {
          address.push(addressProp.name);
        }

        if (addressProp.kind === "house") {
          address.push(addressProp.name);
        }
      }
      if (geocodeCity) {
        likeEvent.target.name = "city";
        likeEvent.target.value = city || "";
        changeNewObject(likeEvent);
      }

      if (geocodeAddress) {
        likeEvent.target.name = "address";
        likeEvent.target.value = address.join(",") || "";
        changeNewObject(likeEvent);
      }
    });
  };

  const changeNewObject = event => {
    onChangeNewObject(event.target.name, event.target.value);
  };

  const getFullAddress = () =>
    [...newObject.city, ...newObject.address].join(",");

  const handleCityOrAddressChange = event => {
    changeNewObject(event);

    const geocodeController = {
      city: false,
      address: false
    };

    if (event.target.name === "city") {
      geocodeController.address = !newObject.address;
    } else {
      geocodeController.city = !newObject.city;
    }

    ymaps.geocode(getFullAddress()).then(result => {
      const coords = result.geoObjects.get(0).geometry.getCoordinates();
      changeCoordinates("mapX", coords[0], geocodeController);
      changeCoordinates("mapY", coords[1], geocodeController);
    });
  };

  const changeCoordinates = (name, value, geocodeController) => {
    const likeEvent = {
      target: {}
    };

    likeEvent.target.name = name;
    likeEvent.target.value = value;

    changeNewObject(likeEvent);
    geocodeCoordsAndChangeNewObject(
      geocodeController.city,
      geocodeController.address
    );
  };

  const handleMapChange = event => {
    const mapCoords = event.get("target").geometry.getCoordinates();
    const geocodeController = {
      city: true,
      address: true
    };

    if (mapCoords[0] !== newObject.map[0]) {
      changeCoordinates("mapX", mapCoords[0], geocodeController);
    }

    if (mapCoords[1] !== newObject.map[1]) {
      changeCoordinates("mapY", mapCoords[1], geocodeController);
    }
  };

  const handleDefault = event => changeNewObject(event);

  return (
    <Container>
      <Form action="" method="post" onSubmit={onAddNewObject}>
        <Form.Field>
          <label>City</label>
          <Input
            placeholder="Type your city here..."
            name="city"
            onChange={handleCityOrAddressChange}
            value={newObject.city}
          />
          <label>Address</label>
          <Input
            placeholder="Type your address here..."
            name="address"
            onChange={handleCityOrAddressChange}
            value={newObject.address}
          />
        </Form.Field>
        <Form.Field>
          <label>Coordinates</label>
          <Input
            placeholder="Type lan here..."
            type="number"
            name="mapX"
            onChange={handleDefault}
            value={newObject.map && newObject.map[0]}
          />
          <Input
            placeholder="Type lon here..."
            type="number"
            name="mapY"
            onChange={handleDefault}
            value={newObject.map && newObject.map[1]}
          />
          <YMaps>
            <Map
              state={{
                center: [...newObject.map],
                zoom: 17
              }}
            >
              <GeoObject
                name="map"
                geometry={{
                  type: "Point",
                  coordinates: [...newObject.map]
                }}
                onGeometryChange={handleMapChange}
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
            onChange={handleDefault}
          />
        </Form.Field>
        <Form.Field>
          <label>Price</label>
          <Input
            placeholder="Type price here..."
            name="price"
            type="number"
            onChange={handleDefault}
          />
        </Form.Field>
        <Form.Field>
          <label>Communications</label>
          <Checkbox
            label="Sewage"
            name="com.sewage"
            onChange={changeNewObject}
          />
          <Checkbox label="Water" name="com.water" onChange={changeNewObject} />
          <Checkbox label="Light" name="com.light" onChange={changeNewObject} />
          <Checkbox label="Gas" name="com.gas" onChange={changeNewObject} />
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <TextArea
            placeholder="Type description here..."
            name="description"
            onChange={handleDefault}
          />
        </Form.Field>
        <Form.Field>
          <label>Phone</label>
          <Input
            placeholder="Type your phone here..."
            name="phone"
            onChange={handleDefault}
          />
        </Form.Field>
        <Form.Field>
          <label>E-Mail</label>
          <Input
            placeholder="Type your e-mail here..."
            name="email"
            onChange={handleDefault}
          />
        </Form.Field>
        <Form.Field>
          <label>Photos</label>
          <Input
            placeholder="Type your photos here..."
            name="photos"
            onChange={handleDefault}
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
      newObject: { ...store.objects.newObject }
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
