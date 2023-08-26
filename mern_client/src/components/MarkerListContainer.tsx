import React from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { mapAtom } from '../atoms/map';
import { infoListAtom, selectedInfoAtom } from '../atoms/info';
import Marker from './common/Marker';
import InfoWindow from './common/InfoWindow';
import { createInfo, deleteInfo } from '../apis/info';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { HttpCode } from '../types/httpCode';
import { useResetAtom } from 'jotai/utils';

interface MarkerListContainerProps {
  type?: 'home' | 'upload';
}

function MarkerListContainer({ type }: MarkerListContainerProps) {
  const map = useAtomValue(mapAtom);
  const infoList = useAtomValue(infoListAtom);
  const [selectedInfo, setSelectedInfo] = useAtom(selectedInfoAtom);
  const setInfoListAtom = useSetAtom(infoListAtom);
  const resetSelectedInfo = useResetAtom(selectedInfoAtom);

  const { mutate: mutateCreateInfo } = useMutation(createInfo, {
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

  const { mutate: mutateDeleteInfo } = useMutation(deleteInfo, {
    onSuccess: (data) => {
      alert('삭제 성공');
      resetSelectedInfo();
      setInfoListAtom(data.data);
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

  const onSubmitCreate = React.useCallback(() => {
    if (!selectedInfo) {
      return;
    }
    mutateCreateInfo(selectedInfo);
  }, [mutateCreateInfo, selectedInfo]);

  const onSubmitDelete = React.useCallback(() => {
    if (!selectedInfo) {
      return;
    }
    mutateDeleteInfo(selectedInfo.id);
  }, [mutateDeleteInfo, selectedInfo]);

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
        onSubmit={type === 'upload' ? onSubmitCreate : onSubmitDelete}
        type={type === 'upload' ? 'submit' : 'delete'}
      />
    </>
  );
}

export default MarkerListContainer;
