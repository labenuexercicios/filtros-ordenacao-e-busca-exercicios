import React from "react";
import { Container } from "./styles";

const Header = (props) => {
  const pokemontypesArray = [
    "Normal",
    "Fire",
    "Water",
    "Grass",
    "Flying",
    "Fighting",
    "Poison",
    "Electric",
    "Ground",
    "Rock",
    "Psychic",
    "Ice",
    "Bug",
    "Ghost",
    "Steel",
    "Dragon",
    "Dark",
    "Fairy",
  ];

  const handleSearch = (e) => {
    props.setPesquisa(e.target.value);
  };

  const handleIdSearch = (e) => {
    props.setIdFilter(e.target.value);
  };
// criei duas funções para fazer o controle dos inputs

  const handleSelect = (e) => {
    props.setTypeSelected(e.target.value);
  };
  
  const handleOrderSelected = (e) => {
    props.setOrderSelected(e.target.value);
  };

  return (
    <Container>
      <input
        type="number"
        placeholder="Buscar por id"
        onChange={handleIdSearch}
        value={props.idFilter}
      />
      <input
        type="text"
        placeholder="Buscar por nome"
        onChange={handleSearch}
        value={props.pesquisa}
      />
<select 
  onChange={handleOrderSelected} // adicionei função no onchange 
  value={props.orderSelected} // adicionei a variavel de estado no value
>
  <option value="order">Ordenar</option>
  <option value="asc">Crescente</option>
  <option value="desc">Decrescente</option> 
</select>

      <select
        name="tipo"
        id="tipo"
        onChange={handleSelect} // adicionei função no onchange 
        value={props.typeSelected} // adicionei a variavel de estado no value
      >
        <option value="">Selecione um tipo</option>
        {pokemontypesArray.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

    </Container>
  );
};

export default Header;
