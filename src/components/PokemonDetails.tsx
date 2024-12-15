import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "./header/header";
import styled from "styled-components";
import { Background } from "./background/background";
import pokemonBackground from '../assets/background.jpg'

async function getApi(id: string) {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return await response.data
}

// interface Sprites {
//     front_default: string;
// }

// interface TypeDetails {
//     name: string;
// }

// interface PokemonType {
//     slot: number;
//     type: TypeDetails;
// }

interface AbilityLanguage {
    name: string;
}

interface AbilityUrl {
    flavor_text: string;
    language: AbilityLanguage;
}

interface Ability {
    name: string;
    descriptions: AbilityUrl[];
}

interface Pokemon {
    name: string;
    image: string;
    id: number;
    types: string[];
    moves: string[];
    abilities: Ability[];
    firstTypeColor: string;
}

export const PokemonDetails = () => {
    const { id } = useParams<{ id: string }>(); 

    const [pokemon, setPokemon] = useState<Pokemon>({
        name: '',
        image: '', 
        id: 0,
        types: [],
        moves: [],
        abilities: [],
        firstTypeColor: '',
    });
    const [ loading, setLoading] = useState<Boolean>(true);
    const [ error, setError ] = useState<String | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getApi(id!);
                const types: string[] = data.types.map((type: { type: { name: string}}) => type.type.name);
                const filteredMoves: string[] = data.moves.slice(0, 10).map((move: { move: { name: string }}) => move.move.name);

                const abilities: string[] = data.abilities.map((ability: { ability: { url: string }}) => ability.ability.url);
                const abilitiesData = await fetchAbilities(abilities);

                setPokemon({
                    name: data.name,
                    image: data.sprites.front_default,
                    id: data.id,
                    types: types,
                    moves: filteredMoves,
                    abilities: abilitiesData,
                    firstTypeColor: getTypeColor(types[0]),
                });

                setLoading(false)
            } catch (error) {
                setError("Algo de errado aconteceu..")
                setLoading(false)
            }
        }

        if (id) fetchData();
    }, [id])

    const fetchAbilities = async (urls: string[]): Promise<Ability[]> => {
        const abilities: Ability[] = await Promise.all(
            urls.map(async (url) => {
                const response = await axios.get(url);
                const abilityData = await response.data;
                const abilityDescriptions: AbilityUrl[] = abilityData.flavor_text_entries.filter((text: AbilityUrl) => text.language.name === 'en').map((text: any) => ({
                    flavor_text: text.flavor_text,
                    language: text.language,
                }));

                return {
                    name: abilityData.name,
                    descriptions: abilityDescriptions,
                };
            })
        );

        // Retorna uma atualização da array abilities, que contém todas as habiliades (Nome e descrição).
        return abilities.filter((ability, index, self) => {
            return index === self.findIndex(a => ability.descriptions === a.descriptions);
        });

        
    };

    if (loading) return <Loading>Carregando..</Loading>
    if (error) return <div>[error]</div>


    return(
        <>
        <Header />
        <Main>
                <Title>Pokemon Info</Title>
                <Container>
                    <PokemonImage className='imagemPokemon'>
                        <Image src={pokemon.image} alt={pokemon.name} />
                    </PokemonImage>
                    <PokemonDescriptions className="descricaoPokemon">
                        <StyledPokemonName color={pokemon.firstTypeColor}>
                            {pokemon.name}
                        </StyledPokemonName>
                        <h3>Pokédex No. {pokemon.id} </h3>
                        <Tipos>
                            <h3>Tipo: </h3>
                            {pokemon.types.map((type, index) => (
                                <PokemonTipo type={type} key={index}>{type}</PokemonTipo>
                            ))}
                        </Tipos>
                        <h3>Moves:</h3>
                        {pokemon.moves.map((move, index) => (
                            <p key={index}>- {move}</p>
                        ))}
                        <h3>Habilidades:</h3>
                        {pokemon.abilities.map((ability, index) => (
                            <AbilitiesInfo key={index}>
                                <p>- {ability.name} </p>
                                                             

                                {ability.descriptions.map((desc, index) => (
                                    <p key={index}> {desc.flavor_text}</p>
                                ))
                                }
                            </AbilitiesInfo>
                        ))}

                    </PokemonDescriptions>
                </Container>
                
                <Background />
            </Main>
        </>
    )
}

const getTypeColor = (type: any) => {
    switch (type) {
        case "fire":
            return "#ef8843";
        case "dragon":
            return "orangered";
        case "fairy":
            return "pink";
        case "flying":
            return "#dfba9a";
        case "psychic":
            return "purple";
        case "water":
            return "#3d51ff";
        case "grass":
            return "green";
        case "electric":
            return "yellow";
        case "bug":
            return "brown";
        case "poison":
            return "purple";
        case "fighting":
            return "red";
        default:
            return "gray";
    }
};

const Main = styled.main`
    padding: 30px 50px;
    display: flex;
    flex-direction: column;
    background: #29e094;
    @media (max-width: 337px){
        padding: 20px;
    }
`

const Container = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 40px;
    width: 100%;
    @media (max-width: 931px){
        flex-direction: column;
        margin-top: 30px;
        gap: 40px;
    }
`

const Title = styled.h2`
    margin-bottom: 5px;
    text-align: center;
    margin-bottom: 10px;
`

const Loading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
`

const PokemonImage = styled.div`
    background-image: url(${pokemonBackground});
    border: 10px solid #a3a6fa;
    outline: 10px solid #f4f19f;
    width: 400px;
    border-radius: 30px;
    height: 100%;
    @media (max-width: 447px){
        width: 100%;
    }
`

const Image = styled.img`
    width: 100%;
`

const StyledPokemonName = styled.h3`
    background-color: ${props => props.color};
    padding: 10px;
    border-radius: 10px;
    font-style: italic;
    color: white;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 10px;
`

const Tipos = styled.div`
    display: flex;
    align-items: center;
    @media(max-width:350px){
        flex-direction: column;
    }
`

const PokemonTipo = styled.div<{ type: string }>`
    background-color: ${props => getTypeColor(props.type)};
    padding: 5px 10px;
    margin: 5px;
    border-radius: 5px;
    color: white;
`

const AbilitiesInfo = styled.div`
    background-color: #839d62b3;
    border-radius: 10px;
    margin: 10px 0px;
    padding: 5px 10px;
`

const PokemonDescriptions = styled.div`
    @media (max-width: 931px){
        width: 100%;
    }
`
