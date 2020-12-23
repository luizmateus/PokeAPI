import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Header,
  Avatar,
  Name,
  Stats,
  BaseStat,
  StatName,
  StatsView,
  StatsInfo,
} from './styles';

export default function Pokemon({ route }) {
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    showPokemon();
  }, []);

  async function showPokemon() {
    let pokemon;
    if (route.params.item.url) {
      const response = await axios.get(route.params.item.url);
      pokemon = response.data;
    } else {
      pokemon = route.params.item;
    }
    setPokemon(pokemon);
  }

  return (
    <Container>
      <Header>
        <Avatar source={{ uri: pokemon.sprites?.front_default }} />
        <Name>{pokemon.name}</Name>
      </Header>
      <Stats
        data={pokemon.stats}
        keyExtractor={(pokemon) => pokemon.name}
        renderItem={({ item }) => (
          <StatsView>
            <StatsInfo>
              <StatName>{item.stat.name.toUpperCase()}</StatName>
              <BaseStat>{item.base_stat}</BaseStat>
            </StatsInfo>
          </StatsView>
        )}
      />
    </Container>
  );
}
