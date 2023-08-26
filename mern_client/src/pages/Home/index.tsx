import React from 'react';
import { infoListAtom } from '../../atoms/info';
import MapContainer from '../../components/MapContainer';
import Navigation from '../../components/Navigation';
import { useSetAtom } from 'jotai';
import MarkerListContainer from '../../components/MarkerListContainer';
import { useQuery } from 'react-query';
import { getInfoList } from '../../apis/info';

function Home() {
  const setInfoList = useSetAtom(infoListAtom);
  const { status } = useQuery('info', getInfoList, {
    select: (result) => result.data.data,
    onSuccess: (infoList) => {
      setInfoList(infoList);
    },
  });

  if (status === 'loading') return <MapContainer />;

  return (
    <>
      <Navigation />
      <MapContainer />
      <MarkerListContainer />
    </>
  );
}

export default Home;
