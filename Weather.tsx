import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

type WeatherData = {
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
  name: string;
};

const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState<string>(''); // To store user input
  const [inputCity, setInputCity] = useState<string>('London'); // Default city to display weather

  const fetchWeather = async (cityName: string) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=4c7767e39afe7e378ffab65f62886446&units=metric`
      );
      setWeatherData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setLoading(false);
    }
  };

  // Fetch weather when the component mounts or when the inputCity changes
  useEffect(() => {
    fetchWeather(inputCity);
  }, [inputCity]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!weatherData) {
    return <Text>Unable to fetch weather data.</Text>;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter city"
        value={city}
        onChangeText={(text) => setCity(text)}
      />
      <Button title="Get Weather" onPress={() => setInputCity(city)} />
      
      {weatherData && (
        <>
          <Text style={styles.cityName}>{weatherData.name}</Text>
          <Text style={styles.temperature}>{weatherData.main.temp}°C</Text>
          <Text style={styles.description}>{weatherData.weather[0].description}</Text>
          <Text style={styles.humidity}>Humidity: {weatherData.main.humidity}%</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '80%',
  },
  cityName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
  },
  temperature: {
    fontSize: 24,
    marginTop: 10,
  },
  description: {
    fontSize: 18,
    marginTop: 10,
  },
  humidity: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default Weather;
