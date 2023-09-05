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
  const [typeSelected, setTypeSelected] = useState() // implementei o usestate
  const [orderSelected, setOrderSelected] = useState("order") // implementei o usestate

  return (
    <>
      <GlobalStyle />
      <Header
        typeSelected={typeSelected} // passei por props os estados
        setTypeSelected={setTypeSelected} // passei por props os estados
        orderSelected={orderSelected} // passei por props os estados
        setOrderSelected={setOrderSelected} // passei por props os estados
        idFilter={idFilter}
        setIdFilter={setIdFilter}
        pesquisa={pesquisa}
        setPesquisa={setPesquisa}
      />
      <CardsContainer>
        {pokemons.filter((pokemon) => {
          return idFilter ? pokemon.id.includes(idFilter) : pokemon
        })
          .filter((pokemon) => {
            return pokemon.name.english.toLowerCase().includes(pesquisa.toLowerCase());
          })

          /* Filter exercicio: 2
          Criei uma função usando uma verificação condicional com if
          caso o tipo do pokemon na posição[0] e [1] for igual o estado passado na captura do select, retorna o card
          caso contrario retorna todos os cards */  

          .filter((pokemon) => {
            if (pokemon.type[0] === typeSelected || pokemon.type[1] === typeSelected) {
              return true
            } else if (!typeSelected) {
              return pokemons
            }
          })

          /* Filtro de ordenação exercicio 3: 
          Aqui  foi usado o metodo sort visto no video do conteudo do assincrono, e passado os parametros.
          Depois foi criado uma condicional com if, caso a fosse selecionado o orderSelected igual o type passado para ele
          retornava os cards comparados com ele mesmo. E em nenhum caso, retorna o estado inicial order.
          */

          .sort((currentPokemon, nextPokemon) => {
            if (orderSelected === "asc") {
              return currentPokemon.name.english.localeCompare(nextPokemon.name.english);
            } else if (orderSelected === "desc") {
              return nextPokemon.name.english.localeCompare(currentPokemon.name.english);
            } else {
              return "order";
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
