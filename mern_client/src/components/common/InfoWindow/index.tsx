import React from 'react';
import { Info } from '../../../types/info';
import './InfoWindow.css';

interface InfoWindowProps {
  map: naver.maps.Map;
  selectedInfo: Info | null;
  onSubmit?: () => void;
}

function InfoWindow({ map, selectedInfo, onSubmit }: InfoWindowProps) {
  const [infoWindow, setInfoWindow] =
    React.useState<naver.maps.InfoWindow | null>(null);

  React.useEffect(() => {
    const _infoWindow = new naver.maps.InfoWindow({
      content: '',
      backgroundColor: 'transparent',
      borderWidth: 0,
      disableAnchor: true,
      pixelOffset: new naver.maps.Point(10, -20),
    });

    setInfoWindow(_infoWindow);

    return () => {
      _infoWindow?.setMap(null);
    };
  }, []);

  React.useEffect(() => {
    if (!infoWindow || !map) return;
    if (selectedInfo) {
      infoWindow.setContent(InfoWindowMaker(selectedInfo, onSubmit));
      infoWindow.open(map, selectedInfo.position);
    } else {
      infoWindow.close();
    }
  });

  return null;
}

function InfoWindowMaker(selectedInfo: Info, onSubmit?: () => void) {
  const infoWindowBox = document.createElement('div');
  infoWindowBox.className = 'info-box';

  const infoWindowPlace = document.createElement('div');
  infoWindowPlace.className = 'info-box__place';
  infoWindowPlace.innerHTML = selectedInfo.placeName;

  const infoWindowAdress = document.createElement('div');
  infoWindowAdress.className = 'info-box__adress';
  infoWindowAdress.innerHTML = selectedInfo.addressName;

  infoWindowBox.appendChild(infoWindowPlace);
  infoWindowBox.appendChild(infoWindowAdress);

  if (onSubmit) {
    const infoWindowSubmit = document.createElement('div');
    infoWindowSubmit.className = 'info-box__submit';
    infoWindowSubmit.innerHTML = '등록';
    infoWindowSubmit.onclick = onSubmit;
    infoWindowBox.appendChild(infoWindowSubmit);
  }

  return infoWindowBox;
}

export default InfoWindow;
