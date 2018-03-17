import { YMaps, Map } from 'react-yandex-maps';
import React from 'react';
import {withRouter} from "react-router-dom";
import { Container } from 'semantic-ui-react'

const mapState = { center: [44.616687, 33.525432], zoom: 10 };

const YandexMap = () => {
    return (
        <Container>
            <YMaps>
                <Map state={mapState}>
                </Map>
            </YMaps>
        </Container>
    );
};

export default withRouter( YandexMap );