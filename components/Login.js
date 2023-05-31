import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Logo from '../assets/logo.png'
import api from './api';


const Login = ({ setIsLoggedIn, ...props }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    
    setLoading(true);
    try {
      const response = await api.post('/login', {
        email: email,
        password :password,
      });
      console.log(response.data.token);
      
      const  token  = response.data.token;
      await SecureStore.setItemAsync('token', token);
      setIsLoggedIn(true);
      props.navigation.navigate('Accueil')

    

    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error.response.data.message); 
      
    }
  };

  return (
    

    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.title}>Connexion</Text>

      {error !== '' && <Text style={styles.error}>{error}</Text>}
      
 
      <TextInput
        style={styles.input}
        placeholder="Adresse e-mail"
        value={email}
        onChangeText={(text) =>{ setEmail(text), setError('')}}
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={(text) =>{ setPassword(text), setError('')}}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        {!loading ? <Text style={styles.buttonText}>Se connecter</Text>: 
         <Text style={styles.buttonLoad}>loading ...</Text>
        }
      </TouchableOpacity>
    </View>
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    marginTop: 20,
    width: '80%'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonLoad: {
    color: '#16a085',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  error:{
    color: '#e74c3c',
    fontSize: 16,
    marginBottom:5,
    fontWeight:'bold',
  }
});

export default Login;
