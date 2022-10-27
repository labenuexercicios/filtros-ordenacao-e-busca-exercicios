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
  const [typeFilter, setTypeFilter] = useState("");
  const [searchOrder, setSearchOrder] = useState("");
  const [sortingParameter, setSortingParameter] = useState("");

  return (
    <>
      <GlobalStyle />
      <Header
        idFilter={idFilter}
        setIdFilter={setIdFilter}
        pesquisa={pesquisa}
        setPesquisa={setPesquisa}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        searchOrder={searchOrder}
        setSearchOrder={setSearchOrder}
        sortingParameter={sortingParameter}
        setSortingParameter={setSortingParameter}
      />
      <CardsContainer>
        {pokemons
          .filter((pokemon) => {
            return idFilter ? pokemon.id.includes(idFilter) : pokemon
          })
          .filter((pokemon) => {
            return pokemon.name.english.toLowerCase().includes(pesquisa.toLowerCase());
          })
          .filter((pokemon) =>{
            return typeFilter ? pokemon.type.includes(typeFilter) : pokemons
          })
          .sort((currentPokemon, nextPorkemon) =>{
            switch (setSortingParameter){
            case "id":
              return currentPokemon.id - nextPorkemon.id
            case "type":
              return currentPokemon.type[0].localCompare(nextPorkemon.type[0])
              default:
            return currentPokemon.name.english.localeCompare(nextPorkemon.name.english)
         }})
          .sort(() => {
            if (searchOrder === "crescente"){
              return 1
            } else{
              return -1
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
