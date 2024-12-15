import { Header } from "../components/header/header";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from "react";
import { Background } from '../components/background/background';
import { Button } from "./button/button";
import { ThemeContext, themes } from "../contexts/theme-context";


interface ApiResponse {
    results: { name: string; url: string }[];
}

interface PokemonDetails {
    id: number;
    name: string;
    sprites: {
        front_default: string;
    }
}

interface Pokemon {
    id: number;
    name: string;
    image: string;
}

async function getApi(offSet: number): Promise<ApiResponse> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offSet}&limit=10`);
    return await response.json();
}

async function getPokemonDetails(url: string): Promise<PokemonDetails> {
    const response = await fetch(url);
    return await response.json();
}

export const PokemonList = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [offSet, setOffSet] = useState<number>(0);

    const addNewPokemonsToArray = (): void => {
        setOffSet(offset => offset + 10);
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const data: ApiResponse = await getApi(offSet);
                const detailedPokemon: Pokemon[] = await Promise.all(data.results.map(async pokemon => {
                    const details: PokemonDetails = await getPokemonDetails(pokemon.url);
                    return {
                        id: details.id,
                        name: details.name,
                        image: details.sprites.front_default,
                    }
                }))

                setPokemons(prevPokemons => [...prevPokemons, ...detailedPokemon]);
                setLoading(false);
            } catch (error: any) {
                console.error("Erro ao buscar os dados:", error); // Adicionando um log do erro
                setError(error.message || "Houve um erro inesperado"); // Exibindo a mensagem do erro real
                setLoading(false);
            }

        }
        fetchData()

    }, [offSet])

    const { theme } = useContext(ThemeContext)!;


    if (loading) return <Loading>Carregando...</Loading>;
    if (error) return <Loading> {error} </Loading>

    return (

        <main>
            <Header />
            <Section className='pokemon-list'>
                <H2 color={themes[theme].color}>Todos os Pokemóns</H2>
                <div className="container">
                    <Ul className='pokemon-cards'>
                        {pokemons.map((pokemon: Pokemon, index) => (
                            <Li key={index} className='card'>
                                <Link to={`/pokemon/${pokemon.id}`}>
                                    <PokemonImage>
                                        <Img src={pokemon.image} alt={pokemon.name} />
                                    </PokemonImage>
                                    <PokemonTitle>
                                        <H3>{pokemon.name}</H3>
                                    </PokemonTitle>
                                </Link>
                            </Li>
                        ))}
                    </Ul>
                </div>
            </Section>
            <Button className="bottom-button" onClick={addNewPokemonsToArray}>Mostrar mais pokémons</Button>
            <Background />
        </main>
    )
}

const Loading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
`

const Section = styled.section`
    padding: 80px;
    display: flex;
    flex-direction: column;
`

const H2 = styled.h2`
    margin-bottom: 50px;
    color: #3b4cca;
    color: ${({ color }) => color};
    text-align: center;
    @media(max-width:390px){
        font-size: 18px;
    }
`

const Ul = styled.ul`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 40px;
`

const Li = styled.li`
    background-color: #fff;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.15s ease-in-out;
    &:hover {
        transform: scale(1.05);
    }
`

const Img = styled.img`
    width: 200px;
`

const H3 = styled.h3`
    color: #e9ecef;
`

const PokemonTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: #3b4cca;
    border-radius: 0 0 10px 10px;
`

const PokemonImage = styled.div`
    width: 100%;
    padding: 50px 30px;
`