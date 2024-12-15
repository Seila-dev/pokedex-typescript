import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: 'Pokemon';
        src: url('../fonts/pokemon.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
    }
    *{
        margin: 0;
        padding: 0;
        text-decoration: none;
        list-style-type: none;
        box-sizing: border-box;
        font-family: "Pokemon", sans-serif;
    }
    
    body{
        min-height: 100vh;
        font-family: 'Pokemon';
        min-width: 288px;
    }
`