import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';
import Loading from '../../components/Loading';
import axios from 'axios';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  Pokemon,
  Avatar,
  Name,
} from './styles';

export default function Home({ navigation }) {
  const [pokemons, setPokemons] = useState([]);
  const [pokemon, setPokemon] = useState('');
  const [nextPage, setNextPage] = useState('');
  const [previousPage, setPreviousPage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    showPokemons();
  }, []);

  async function showPokemons(page) {
    try {
      setLoading(true);
      let response;
      if (page) {
        response = await axios.get(page);
      } else {
        response = await api.get(`/pokemon/?limit=18`);
      }
      const pokemons = response.data.results;
      if (response.data.next) {
        setNextPage(response.data.next);
      }
      if (response.data.previous) {
        setPreviousPage(response.data.previous);
      }
      setPokemons(pokemons);
    } catch (error) {
      Alert.alert('Atenção', 'Não foi possível listar os pókemons');
    } finally {
      setLoading(false);
    }
  }

  function renderPokemon({ item }) {
    let image;
    if (item.sprites?.front_default) {
      image = item.sprites.front_default;
    } else {
      const url = item.url;
      const index = url.split('/')[url.split('/').length - 2];
      image = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${index}.png?raw=true;`;
    }

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Pokemon', { item })}
      >
        <Pokemon>
          <Avatar source={{ uri: image }} />
          <Name>{item.name}</Name>
        </Pokemon>
      </TouchableOpacity>
    );
  }

  async function searchPokemon() {
    try {
      setLoading(true);
      if (pokemon.length === 0) {
        return showPokemons();
      }
      const response = await api.get(`/pokemon/${pokemon}`);
      setPokemons([response.data]);
      setNextPage(null);
      setPreviousPage(null);
    } catch (error) {
      Alert.alert('Atenção', 'Pókemon não encontrado');
    } finally {
      setLoading(false);
    }
  }

  function renderButtons() {
    if (loading) {
      return <View />;
    }
    return (
      <View style={styles.footer}>
        {previousPage ? (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => showPokemons(previousPage)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Anterior</Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}
        {nextPage ? (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => showPokemons(nextPage)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Próxima</Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
    );
  }

  return (
    <Container>
      <Form>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Procurar pókemon"
          value={pokemon}
          onChangeText={(name) => setPokemon(name)}
          returnKeyType="send"
          onSubmitEditing={searchPokemon}
        />
        <SubmitButton onPress={searchPokemon}>
          <Icon name="search" size={20} color="#FFF" />
        </SubmitButton>
      </Form>
      <List
        data={pokemons}
        keyExtractor={(user) => user.name}
        renderItem={renderPokemon}
        numColumns={3}
        ListFooterComponent={renderButtons}
      />
      <Loading isLoading={loading} />
    </Container>
  );
}

const styles = {
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  footer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    padding: 10,
    backgroundColor: '#3266AF',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
};
