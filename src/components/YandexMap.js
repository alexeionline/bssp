import { YMaps, Map, Placemark } from "react-yandex-maps";
import React from "react";
import { Container } from "semantic-ui-react";
import { connect } from "react-redux";

const mapState = { center: [44.616687, 33.525432], zoom: 10 };

const YandexMap = props => {
  return (
    <Container>
      <YMaps>
        <Map state={mapState}>
          {props.objects.map(object => {
            return (
              <Placemark
                key={object.id + Date.now()}
                geometry={{ coordinates: object.map }}
                properties={{
                  hintContent: object.address,
                  balloonContent: object.description
                }}
              />
            );
          })};
        </Map>
      </YMaps>
    </Container>
  );
};

export default connect(store => ({ objects: [...store.objects.objects] }))(
  YandexMap
);
