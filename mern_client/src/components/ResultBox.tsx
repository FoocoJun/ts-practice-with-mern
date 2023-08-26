import React from 'react';
import { Info } from '../types/info';
import styled from 'styled-components';
import Span from './common/Span';

interface ResultBoxProps {
  info: Info;
  onClick: (info: Info) => void;
}

const StyledResultBox = styled.div`
  padding: 16px 0;
  cursor: pointer;

  .place-name {
    margin-bottom: 6px;
  }

  & + & {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

function ResultBox({ info, onClick }: ResultBoxProps) {
  return (
    <StyledResultBox onClick={() => onClick(info)}>
      <div className="place-name">
        <Span size="title">{info.placeName}</Span>
      </div>
      <div>
        <Span size="small" color="grey">
          {info.addressName}
        </Span>
      </div>
    </StyledResultBox>
  );
}

export default React.memo(ResultBox);
