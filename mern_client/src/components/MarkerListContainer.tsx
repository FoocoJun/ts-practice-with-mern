import React from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { mapAtom } from '../atoms/map';
import { infoListAtom, selectedInfoAtom } from '../atoms/info';
import Marker from './common/Marker';
import InfoWindow from './common/InfoWindow';
import { createInfo } from '../apis/info';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { HttpCode } from '../types/httpCode';

interface MarkerListContainerProps {
  type?: 'home' | 'upload';
}

function MarkerListContainer({ type }: MarkerListContainerProps) {
  const map = useAtomValue(mapAtom);
  const infoList = useAtomValue(infoListAtom);
  const [selectedInfo, setSelectedInfo] = useAtom(selectedInfoAtom);

  const { mutate } = useMutation(createInfo, {
    onSuccess: () => {
      alert('업로드 성공');
    },
    onError: (error: AxiosError) => {
      const errorStatus = error.response?.status;
      if (errorStatus === HttpCode.CONFLICT) {
        alert('중복 된 데이터 입니다.');
      } else {
        alert('서버 에러');
      }
    },
  });

  const onSubmit = React.useCallback(() => {
    if (!selectedInfo) {
      return;
    }
    mutate(selectedInfo);
  }, [mutate, selectedInfo]);

  if (!map || !infoList.length) return null;
  return (
    <>
      {infoList.map((info) => (
        <Marker
          key={info.id}
          map={map}
          position={info.position}
          content={'<div class="marker"/>'}
          onClick={() => {
            setSelectedInfo(info);
          }}
        />
      ))}
      {selectedInfo && (
        <Marker
          map={map}
          position={selectedInfo.position}
          content={'<div class="marker marker--selected" />'}
          onClick={() => {
            setSelectedInfo(null);
          }}
        />
      )}
      <InfoWindow
        map={map}
        selectedInfo={selectedInfo}
        onSubmit={type === 'upload' ? onSubmit : undefined}
      />
    </>
  );
}

export default MarkerListContainer;
