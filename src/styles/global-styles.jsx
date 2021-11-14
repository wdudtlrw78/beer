import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`


  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
    font-family: 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
  }


  li {
    list-style: none;
  }

  button {
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  
  }

  button:active,
  button:focus,
  button.active {
    background-image: none;
    outline: 0;
    -webkit-box-shadow: none;
    box-shadow: none; 
  }



`;

export default GlobalStyle;
