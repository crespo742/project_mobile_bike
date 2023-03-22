import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import styled from 'styled-components';
import Header from '../components/header';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

const Home = props => {

  const [bikes, setBikes] = useState([]);
  const [make, setMake] = useState('');
  const [url, setUrl] = useState(`https://api.api-ninjas.com/v1/motorcycles?make=${make}`);

  useFocusEffect(() => {
    AsyncStorage.getItem('token')
      .then(token => {
        if (!token) {
          props.navigation.navigate('Login');
        }
      })
      .catch(err => {
        console.log('🚀 ~ file: home.js:6 ~ Home ~ err', err);
      });
  });

  useEffect(() => {
    axios({
      method: "GET",
      url,
      headers: { 'X-Api-Key': 'f5W7nasxrAW6GVNKvJHyEg==dml17MunnVzfVATf' },
    }).then((res) => {
      console.log(url, res.data)
      setBikes(prevState => [...prevState, ...res.data]);
    }).catch(error => {
      console.log(error);
    });
  }, [url]);


  const handleNavigation = page => {
    props.navigation.navigate(page);
  };

  const BikeRow = ({ make, model, year, power }) => {

    const storeData = async (make, model, year, power) => {
      const existingData = await AsyncStorage.getItem('@model');
      const data = existingData ? JSON.parse(existingData) : [];
      const newData = [...data, { make, model, year, power }];
      const jsonValue = JSON.stringify(newData);
      await AsyncStorage.setItem('@model', jsonValue);
      console.log('Data stored successfully', newData);
    };


    return (
      <Wrapper>
        <StyledText>
          {make} - {model} - {year}- {power}
        </StyledText>
        <TouchableOpacity onPress={() => storeData(make, model, year, power)}>
          <StyledText>favoris</StyledText>
        </TouchableOpacity>
      </Wrapper>
    );
  };

  const handleButtonClick = make => {
    setMake(make);
    setUrl(`https://api.api-ninjas.com/v1/motorcycles?make=${make}`);
    setBikes([]);
  };
  return (
    <View>
      <Header />
      <Title>
        {make}
      </Title>
      <StyledButton onPress={() => handleNavigation('Favoris')}>
        <StyledText>Favoris</StyledText>
      </StyledButton>
      <Wrapper>
        <StyledButton onPress={() => handleButtonClick('Honda')}>
          <Text>
            Honda
          </Text>
        </StyledButton>
        <StyledButton onPress={() => handleButtonClick('Yamaha')}>
          <Text>
            Yamaha
          </Text>
        </StyledButton>
        <StyledButton onPress={() => handleButtonClick('Kawasaki')}>
          <Text>
            Kawasaki
          </Text>
        </StyledButton>
        <StyledButton onPress={() => handleButtonClick('Suzuki')}>
          <Text>
            Suzuki
          </Text>
        </StyledButton>
        <StyledButton onPress={() => handleButtonClick('Ktm')}>
          <Text>
            Ktm
          </Text>
        </StyledButton>
        <StyledButton onPress={() => handleButtonClick('Ducati')}>
          <Text>
            Ducati
          </Text>
        </StyledButton>
        <StyledButton onPress={() => handleButtonClick('Gas Gas')}>
          <Text>
            Gas Gas
          </Text>
        </StyledButton>
        <StyledButton onPress={() => handleButtonClick('Bmw')}>
          <Text>
            Bmw
          </Text>
        </StyledButton>
      </Wrapper>

      <FlatList
        data={bikes}
        onEndReached={() => {
          console.log('end reached');
        }}
        renderItem={({ item }) => (
          <BikeRow
            make={item.make}
            model={item.model}
            year={item.year}
            power={item.power}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const Title = styled.Text`
  text-align:center;
  font-size:25px
`;

const StyledButton = styled.TouchableOpacity`
  background-color: white;
  border: 1px solid black;
  padding: 10px;
  border-radius: 5px;
  text-align:center;
`;

const StyledText = styled.Text`
  color: black;
`;

const Wrapper = styled.Text`
  display:flex;
  align-items:center;
  flex-direction:column;
`;

export default Home;