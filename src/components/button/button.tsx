import { FC, ButtonHTMLAttributes } from 'react';
import { styled } from 'styled-components';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: FC<ButtonProps> = (props) => {
    return (
        <StyledButton {...props} />
    );
}

const StyledButton = styled.button`
    border-radius: 10px;
    width: 100%;
    cursor: pointer;
    padding: 5px 20px;
    border: none;
    height: 50px;
    background: #000;
    color: #fff; 
    display: flex;
    align-items: center;
    justify-content: center;

    &.bottom-button {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        width: auto;
        padding: 20px;
        @media(max-width:550px){
            font-size: 10px;
        }
    }
    `;