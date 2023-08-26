import React from 'react';
import styled from 'styled-components';

interface ShadowBoxProps {
  children?: React.ReactNode;
}

const StyledShadowBox = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
  max-width: 404px;
  border-radius: 10px;
  padding: 6px 8px;
  box-shadow: rgb(0 0 0 / 16%) 0 3px 6px 0;
  border: 1px solid #e8e8e8;
  box-sizing: border-box;
  z-index: 101; //navermap 100
  background: #ffffff;
`;

function ShadowBox({ children }: ShadowBoxProps) {
  return <StyledShadowBox>{children}</StyledShadowBox>;
}

export default React.memo(ShadowBox);
