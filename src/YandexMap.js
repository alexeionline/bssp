import { YMaps, Map } from 'react-yandex-maps';
import React from 'react';

const mapState = { center: [44.616687, 33.525432], zoom: 10 };

const YandexMap = () => (
    <YMaps>
        <Map state={mapState}>
        </Map>
    </YMaps>
);

export default YandexMap;