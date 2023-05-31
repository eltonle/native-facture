import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';


import api from './api';

const NavBar = () => {

    const navigation = useNavigation();
    const [activePage, setActivePage] = useState('Accueil');  
    
    const [id, setUserId] = useState(null);  

   
    useEffect(() => {
        // Fonction pour vérifier si l'utilisateur est connecté
        const checkIfUserIsLoggedIn = async () => {
          try {
            const response = await api.get('/user');
            setUserId(response.data.data.id);
          } catch (error) {
            console.error(error);
          }
        };
      
        checkIfUserIsLoggedIn();
      }, []);

   
  return (
   <View style={styles.container}>

    <TouchableOpacity 
    style={[
        styles.iconContainer,
        activePage === 'Accueil' && styles.activeIconContainer,
      ]}
    onPress={() => {navigation.navigate('Accueil'); setActivePage('Accueil')}}
    >
      <Icon name="home" size={24} color={activePage === 'Accueil'? '#fff':'#000'} />
      <Text style={[styles.text, activePage === 'Accueil' && styles.activeText]}>Accueil</Text>
    </TouchableOpacity>

    <TouchableOpacity  style={[
        styles.iconContainer,
        activePage === 'Facture' && styles.activeIconContainer,
      ]}
      onPress={() => {
        navigation.navigate('Facture', { userId: id });
        setActivePage('Facture');
      }}
    >
      <Icon name="file" size={24} color={activePage === 'Facture'? '#fff':'#000'} />
      <Text style={[styles.text, activePage === 'Facture' && styles.activeText]}>Mes factures</Text>
    </TouchableOpacity>
    <TouchableOpacity  style={[
        styles.iconContainer,
        activePage === 'Payment' && styles.activeIconContainer,
      ]}
      onPress={() => {
        navigation.navigate('Payment', { userId: id });
        setActivePage('Payment');
      }}
    >
      <Icon name="credit-card" size={24} color={activePage === 'Payment'? '#fff':'#000'} />
      <Text style={[styles.text, activePage === 'Payment' && styles.activeText]}>Mes paiements</Text>
    </TouchableOpacity>

    <TouchableOpacity style={[
        styles.iconContainer,
        activePage === 'Contact' && styles.activeIconContainer,
      ]}
      onPress={() => {
        navigation.navigate('Contact');
        setActivePage('Contact');
      }}
    >
      <Icon name="envelope" size={24} color={activePage === 'Contact'? '#fff':'#000'} />
      <Text style={[styles.text, activePage === 'Contact' && styles.activeText]}>Contacter</Text>
    </TouchableOpacity>

  </View>
      
   
    
  );

};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#1abc9c',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex:1
  },
  activeIconContainer: {
    fontWeight: 'bold', 
  },
  iconContainer: {
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    marginTop: 4,
  },
  activeText: {
    color: '#fff'
  },
});

export default NavBar;
