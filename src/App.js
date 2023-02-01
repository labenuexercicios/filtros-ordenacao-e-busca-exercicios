import { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import pokemons from "./pokemon/pokemon.json";
import PokemonCard from "./components/PokemonCard/PokemonCard";
import { getColors } from "./utils/ReturnCardColor";
import Header from "./components/Header/Header.js";
import { type } from "@testing-library/user-event/dist/type";
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
  const [typeFilter, setTypeFilter] = useState("");
  const [alfabeticoFilter, setAlfabeticoFilter] = useState("");


  return (
    <>
      <GlobalStyle />
      <Header
        idFilter={idFilter}
        setIdFilter={setIdFilter}
        pesquisa={pesquisa}
        setPesquisa={setPesquisa}
        typeFilter = {typeFilter}
        setTypeFilter = {setTypeFilter}
        alfabeticoFilter = {alfabeticoFilter}
        setAlfabeticoFilter = {setAlfabeticoFilter}
      />
      <CardsContainer>
        {pokemons.filter((pokemon) => {
          return idFilter ? pokemon.id.includes(idFilter) : pokemon
        })
          .filter((pokemon) => {
            return pokemon.name.english.toLowerCase().includes(pesquisa.toLowerCase());
          })
          .filter((pokemon) =>{
            if(pokemon.type.includes(typeFilter)){
              return pokemon;
            }
            else if(!typeFilter){
              return pokemons;
            }
          })
          .sort((atual, proximo) => {
            if(alfabeticoFilter === "crescente"){
              if(atual.name.english < proximo.name.english){
                return -1;
              }
              else if(atual.name.english > proximo.name.english){
                return 1;
              }
              else{
                return pokemons;
              }
            }
            if(alfabeticoFilter === "decrescente"){
              if(atual.name.english < proximo.name.english){
                return 1;
              }
              else if(atual.name.english > proximo.name.english){
                return -1;
              }
              else{
                return 0;
              }
            }
            else{
              return pokemons;
            }
          })
          .map((pokemon) => {
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
