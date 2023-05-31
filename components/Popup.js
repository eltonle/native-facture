import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  Image,
  Linking,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import mtnImg from "../assets/mtn-money.png";
import orangeImg from "../assets/orange-money.png";

const Popup = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  
  // const numberOrange = "#150*47*609594#";
  const numberOrange = "#150*47*609594#";
  const numberMtn = "*126*4*611153#";

  const handlePhoneCall = (numberCall) => {
    Linking.openURL(`tel:${numberCall}`);
  };
 
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={togglePopup}> 
        <Text style={styles.openButton}>
          <Icon name="bank" size={24} color="#fff" style={styles.icon} />
          Payer votre facture 🤝
        </Text>
      </TouchableOpacity>

      <Modal visible={showPopup} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.container1}>
              <TouchableOpacity onPress={() => handlePhoneCall(numberOrange)}>
                <Image source={orangeImg} style={styles.image} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handlePhoneCall(numberMtn)}>
                <Image source={mtnImg} style={styles.image} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={togglePopup}>
              <Text style={styles.closeButton}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      // Autres styles de votre choix
    },
    modalContainer: {
      flex: 1,
      flexDirection:'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: 300,
      height: 300,
      backgroundColor: '#f7f1e3',
      borderRadius: 10,
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 50,
      height: 50,
      width: 100,
      height: 100,
      marginVertical: 10,
      marginRight: 5,
      // Autres styles de votre choix
    },
    closeButton: {
      marginTop: 20,
      fontSize: 16,
      color: 'blue',
    }, 
     openButton: {
        fontSize: 16,
        color: "#fff",
        textDecorationLine: "underline",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#40407a",
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
      },
      container1: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
      },
     
  });

export default Popup;
