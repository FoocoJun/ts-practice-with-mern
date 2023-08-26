import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}

  a {
    text-decoration: none;
    color: black;
  }

  * {
    box-sizing: border-box;
  }

  html,body {
    height: 100%;
  }

  #root {
    height: 100%;
  }

  input:focus {
    outline: none;
  }
`;

export default GlobalStyles;
