import React from 'react';
import { infoListAtom, selectedInfoAtom } from '../../atoms/info';
import MapContainer from '../../components/MapContainer';
import MarkerListContainer from '../../components/MarkerListContainer';
import Navigation from '../../components/Navigation';
import { useResetAtom } from 'jotai/utils';
import SearchBoard from '../../components/SearchBoard';

function Upload() {
  const resetInfoList = useResetAtom(infoListAtom);
  const resetSelectedInfo = useResetAtom(selectedInfoAtom);

  React.useEffect(() => {
    resetInfoList();
    resetSelectedInfo();
  }, [resetInfoList, resetSelectedInfo]);

  return (
    <>
      <Navigation type="upload" />
      <MapContainer />
      <MarkerListContainer type="upload" />
      <SearchBoard />
    </>
  );
}

export default Upload;
