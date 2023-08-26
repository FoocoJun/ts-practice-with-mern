import React from 'react';
import styled from 'styled-components';
import { selectAtom } from '../atoms/search';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { infoListAtom, selectedInfoAtom } from '../atoms/info';
import ResultBox from './ResultBox';
import { Info } from '../types/info';

const StyledSearchBoard = styled.div`
  width: 100%;
  max-width: 436px;
  height: 100%;
  position: absolute;
  background: #fff;
  top: 0px;
  padding: 74px 16px 16px 16px;

  .search-board-wrapper {
    height: 100%;
    overflow-y: scroll;
  }

  .no-data-text {
    text-align: center;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
`;

function SearchBoard() {
  const [select, setSelect] = useAtom(selectAtom);
  const infoList = useAtomValue(infoListAtom);
  const setSelectedInfo = useSetAtom(selectedInfoAtom);

  const handleClickResultBox = React.useCallback(
    (info: Info) => {
      setSelectedInfo(info);
      setSelect(!select);
    },
    [select, setSelect, setSelectedInfo]
  );
  return (
    <>
      {select && (
        <StyledSearchBoard>
          <div className="search-board-wrapper">
            {infoList && infoList.length !== 0 ? (
              infoList.map((info) => (
                <ResultBox
                  key={info.id}
                  info={info}
                  onClick={handleClickResultBox}
                />
              ))
            ) : (
              <div className="no-data-text">검색 결과가 없습니다.</div>
            )}
          </div>
        </StyledSearchBoard>
      )}
    </>
  );
}

export default SearchBoard;
