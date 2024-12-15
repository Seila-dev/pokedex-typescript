import pokemonLogo from '../../assets/pokemonlogo.svg'
import { styled } from "styled-components"
import { ThemeTogglerButton } from '../theme-toggler-button/theme-toggler-button'
import { Link } from 'react-router-dom'

export const Header = () => {

    return (
        <Headers>
            <LogoDiv>
                <LinkDirection to={"/"}>
                    <Logo src={pokemonLogo} alt="Pokemon Logo" />
                </LinkDirection>
            </LogoDiv>
            <ThemeTogglerButton />
        </Headers>
    )
}

const Headers = styled.header`
    display: flex;
    justify-content: center;
    padding: 20px 100px;
    align-items: center;
    @media(max-width: 600px){
        flex-direction: column;
        padding: 20px;
        width:100%;
    }
`

const LogoDiv = styled.div`
    width: 100%;
        @media(max-width: 600px){
        align-items: center;
        justify-content: center;
        display: flex;
        margin-bottom: 20px
    }
`

const Logo = styled.img`
    width: 250px;
`

const LinkDirection = styled(Link)`
    width: fit-content;
`