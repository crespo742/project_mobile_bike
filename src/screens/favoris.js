import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components';

const Favoris = (props) => {
  
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await AsyncStorage.getItem('@model');
      if (result !== null) {
        setFavorites(JSON.parse(result));
      }
    }
    fetchData();
  }, []);

  const handleDeleteFavorite = async (index) => {
    const newFavorites = [...favorites];
    newFavorites.splice(index, 1);
    setFavorites(newFavorites);
    await AsyncStorage.setItem('@model', JSON.stringify(newFavorites));
  }

  const renderItem = ({ item, index }) => (
    <View>
      <Text>{item.make}</Text>
      <Text>{item.model}</Text>
      <Text>{item.year}</Text>
      <Text>{item.power}</Text>
      <StyledButton onPress={() => handleDeleteFavorite(index)}>
        <Text>wsh quel bail</Text>
      </StyledButton>
    </View>
  );

  return (
    <View>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const StyledButton = styled.TouchableOpacity`
  background-color: white;
  border: 1px solid black;
  padding: 10px;
  border-radius: 5px;
  text-align:center;
`;

export default Favoris;