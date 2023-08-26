import React from 'react';
import Map from './common/Map';
import { mapAtom } from '../atoms/map';
import { useSetAtom } from 'jotai';
import { selectedInfoAtom } from '../atoms/info';

function MapContainer() {
  const setMap = useSetAtom(mapAtom);
  const setSelectedInfo = useSetAtom(selectedInfoAtom);
  const initMap = (map: naver.maps.Map) => {
    setMap(map);
    naver.maps.Event.addListener(map, 'click', () => {
      setSelectedInfo(null);
    });
  };
  return <Map width="100%" height="100%" initMap={initMap} />;
}

export default MapContainer;
