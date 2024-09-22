import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Weather from './Weather';
import AddTask from './AddTask';
export default function App() {
  return (
    <View style={styles.container}>
      
      <Weather/>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:50,
  },
});
