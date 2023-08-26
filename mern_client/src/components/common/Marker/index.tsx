import React from 'react';
import { Position } from '../../../types/info';
import './Marker.css';

interface MarkerProps {
  map: naver.maps.Map;
  position: Position;
  content: string;
  onClick?: () => void;
}

function Marker({ map, position, content, onClick }: MarkerProps) {
  React.useEffect(() => {
    let marker: naver.maps.Marker | null = null;

    if (map) {
      marker = new naver.maps.Marker({
        map,
        position,
        icon: {
          content,
        },
      });
    }

    if (onClick) {
      naver.maps.Event.addListener(marker, 'click', onClick);
    }

    return () => {
      marker?.setMap(null);
    };
  }, [content, map, onClick, position]);

  return null;
}

export default Marker;
