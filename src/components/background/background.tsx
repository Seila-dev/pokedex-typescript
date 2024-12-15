import { useContext } from 'react';
import { ThemeContext, themes } from '../../contexts/theme-context';
import styled from 'styled-components';
// import { Theme } from '../../contexts/theme-context';

export const Background = () => {
    const { theme } = useContext(ThemeContext)!; // Adicionando o operador de non-null assertion (!) para garantir que o valor não será `undefined`.

    return (
        // <StyledBackground style={{backgroundColor: themes[theme].background }} />
        <StyledBackground backgroundColor={themes[theme].background} />
    );
}

// interface StyledBackgroundProps {
//   theme: Theme;
// }
interface StyledBackgroundProps {
    backgroundColor: string;
}

const StyledBackground = styled.div<StyledBackgroundProps>`
    min-height: 100vh;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    transition: 0.2s ease-in;
    background-color: ${({ backgroundColor }) => backgroundColor}
`;
