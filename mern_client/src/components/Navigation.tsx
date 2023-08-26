import React from 'react';
import ShadowBox from './common/ShadowBox';
import Button from './common/Button';
import Span from './common/Span';
import Divider from './common/Divider';
import Block from './common/Block';
import { GoPlus } from 'react-icons/go';
import { FiArrowLeft } from 'react-icons/fi';
import { BiSearch } from 'react-icons/bi';
import { selectAtom } from '../atoms/search';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';
import Input from './common/Input';
import useInput from '../hooks/useInput';
import { infoListAtom, selectedInfoAtom } from '../atoms/info';
import { useQuery } from 'react-query';
import { getInfoListBySearchKeyword } from '../apis/search';
import { mapAtom } from '../atoms/map';

interface NavigationProps {
  type?: 'home' | 'upload';
}

function Navigation({ type = 'home' }: NavigationProps) {
  const [select, setSelect] = useAtom(selectAtom);
  const { value, setValue, onChange } = useInput('');
  const setInfoList = useSetAtom(infoListAtom);
  const resetSelectedInfo = useResetAtom(selectedInfoAtom);
  const map = useAtomValue(mapAtom);

  const [keyword, setKeyword] = React.useState('');

  const { status } = useQuery(
    ['search', keyword],
    () => getInfoListBySearchKeyword(keyword),
    {
      enabled: !!keyword,
      select: (result) => result.data.data,
      onSuccess: (infoList) => {
        setInfoList(infoList);
        resetSelectedInfo();

        if (!map) return;

        const bounds = new naver.maps.LatLngBounds(
          new naver.maps.LatLng(0, 0),
          new naver.maps.LatLng(0, 0)
        );

        infoList.forEach((info) => {
          bounds.extend(info.position);
        });

        map.panToBounds(bounds);
      },
    }
  );

  const switchSelectValue = () => {
    setSelect(!select);
    if (!select) {
      resetSearchValue();
    }
  };

  const resetSearchValue = () => {
    setValue('');
  };

  const handleClickArrowBtn = () => {
    switchSelectValue();
  };

  const handleClickSearchBlock = () => {
    switchSelectValue();
  };

  const handleClickSearchBtn = () => {
    if (select) {
      onSubmit();
      return;
    }
    switchSelectValue();
  };

  const onSubmit = React.useCallback(() => {
    if (status === 'loading') {
      return;
    }
    setKeyword(value);
  }, [status, value]);

  return (
    <ShadowBox>
      {type === 'upload' && select ? (
        <Button onClick={handleClickArrowBtn}>
          <FiArrowLeft size={20} />
        </Button>
      ) : (
        <Button type="link" url="/">
          <Span size="title"> MERN</Span>
        </Button>
      )}
      <Divider />
      {select ? (
        <Input value={value} onChange={onChange} onSubmit={onSubmit} />
      ) : (
        <Block
          height="28px"
          onClick={type === 'upload' ? handleClickSearchBlock : undefined}
        />
      )}
      {type === 'upload' ? (
        <Button onClick={handleClickSearchBtn}>
          <BiSearch size={20} />
        </Button>
      ) : (
        <Button type="link" url="/upload">
          <GoPlus size={20} />
        </Button>
      )}
    </ShadowBox>
  );
}

export default Navigation;
