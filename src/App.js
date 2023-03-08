import { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import pokemons from "./pokemon/pokemon.json";
import PokemonCard from "./components/PokemonCard/PokemonCard";
import { getColors } from "./utils/ReturnCardColor";
import Header from "./components/Header/Header.js";
const GlobalStyle = createGlobalStyle`
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Inter", sans-serif;
  
  }
`;
const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(440px, 1fr));
  justify-items: center;
`;
function App() {
  const [pesquisa, setPesquisa] = useState("");
  const [idFilter, setIdFilter] = useState("");
  const [tipo,setTipo]=useState("")
  const[ordenar,setOrdenar]=useState("")

  const onChangeTipo=(event)=>{
    setTipo(event.target.value)
  }

  const onChangeOrdenar=(event)=>{
    setOrdenar(event.target.value)
  }

  return (
    <>
      <GlobalStyle />
      <Header
        idFilter={idFilter}
        setIdFilter={setIdFilter}
        pesquisa={pesquisa}
        setPesquisa={setPesquisa}
        tipo={tipo}
        onChangeTipo={onChangeTipo}
        onChangeOrdenar={onChangeOrdenar}
      />
      <CardsContainer>
        {pokemons.filter((pokemon) => {
          return idFilter ? pokemon.id.includes(idFilter) : pokemon
          
        })
          .filter((pokemon) => {
            return pokemon.name.english.toLowerCase().includes(pesquisa.toLowerCase());
          }).filter((pokemon)=>{
            if(tipo){
              return pokemon.type.includes(tipo)
            }else{
              return pokemon
            }
          }).sort((a,b)=>{
            if(ordenar === "crescente"){
               return a.name.english.toLowerCase().localeCompare(b.name.english.toLowerCase())
            } else if(ordenar === "decrescente"){
              return b.name.english.localeCompare(a.name.english,{sensitivity:"base"})
            }
          }).map((pokemon) => {
            return (
              <PokemonCard
                cardColor={getColors(pokemon.type[0])}
                key={pokemon.id}
                pokemon={pokemon}
              />
            );
          })}
      </CardsContainer>
    </>
  );
}

export default App;
