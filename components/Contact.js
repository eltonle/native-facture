import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import Icon from 'react-native-vector-icons/FontAwesome';

function Contact() {
  const watNumber = '+237692248128'
  const numberwhatsap = `https://wa.me/${watNumber}`; // Remplacez 692248128 par le numéro de téléphone souhaité
  const numberCall = "tel:+237692248128"; // Remplacez 692248128 par le numéro de téléphone souhaité

  const handleCall = () => {
    Linking.openURL(numberCall);
  };

  const handleWhatsApp = () => {
    Linking.openURL(numberwhatsap)
    .then(() => console.log('Conversation WhatsApp ouverte'))
    .catch((error) => console.error('Erreur lors de l\'ouverture de la conversation WhatsApp ou telephonique:', error));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}><Icon name="users" size={24} color="#192a56"/> Contacter</Text>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <TouchableOpacity style={styles.button} onPress={handleCall}>
          <Ionicons name="call" size={30} style={styles.iconTel} />
          <Text style={styles.buttonText}>Appeler</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleWhatsApp}>
          <FontAwesome name="whatsapp" size={30} style={styles.iconWat} />
          <Text style={styles.buttonText}>WhatsApp</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    marginTop: 20,
  },
  header: {
    height: 60,
    backgroundColor: "#7f8c8d",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  contentContainer: {
    flexGrow: 1,
    padding: 16,
    marginTop: 150,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2c3e50",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    marginLeft: 10,
  },
  iconTel: {
    color: "#007BFF",
  },
  iconWat: {
    color: "#25D366",
  },
});

export default Contact;
