import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';
import api from "./api";

function Facture({ route }) {
  const { userId } = route.params;
  const [factures, setFactures] = useState([]);
  const [load, setLoad] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    // Fonction pour vérifier si l'utilisateur est connecté
    const checkIfUserIsLoggedIn = async () => {
      setLoad(true);
      try {
        const response = await api.get(`/facturation/${userId}`);
        // setUserId(response.data.data.id);
        setFactures(response.data);
        setLoad(false);
        console.log(response.data);
      } catch (error) {
        console.error(error);
        setLoad(false);
      }
    };

    checkIfUserIsLoggedIn();
  }, []);


  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header1}>
          <Text style={styles.headerText}><Icon name="credit-card" size={24} color="#192a56"/> Mes Factures</Text>
        </View>

        {load ? (
          <View style={styles.loadingContainer}>
            <Text>Loading ...</Text>
          </View>
        ) : (
          <>
            <View style={styles.rowContainer}>
              <Text style={[styles.cell, styles.header]}>Date</Text>
              <Text style={[styles.cell, styles.header]}>Montant</Text>
              <Text style={[styles.cell, styles.header]}>Statut</Text>
              <Text style={[styles.cell, styles.header]}>Action</Text>
            </View>

            {factures.map((facture) => (
              <TouchableOpacity
                key={facture.id}
                onPress={() =>
                  navigation.navigate("FactureDetail", { detailId: facture.id })
                }
              >
                <View style={styles.rowContainer} key={facture.id}>
                <Text style={styles.cell}>{facture.due_date}</Text>
                  <Text style={styles.cell}>
                    {" "}
                    {facture.amount.toLocaleString("fr-FR", {
                      style: "currency",
                      currency: "XOF",
                    })}
                  </Text>
                  <Text style={styles.cell}>{facture.status}</Text>
                  <Text style={styles.cell}><Icon name="eye" size={24} color={'#192a56'} /> Detail</Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
    color: "#1abc9c",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  header1: {
    height: 60,
    backgroundColor: "#7f8c8d",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },

  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
  },
  header: {
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
  },
});

export default Facture;
