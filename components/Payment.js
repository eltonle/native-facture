import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import api from "./api";
import moment from 'moment';

import Icon from 'react-native-vector-icons/FontAwesome';

function Payment({ route }) {
  const { userId } = route.params;
  const [paiements, setPaiements] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const fetchPaiements = async () => {
      setLoad(true);
      try {
        const response = await api.get(`/paymentClient/${userId}`);
        setPaiements(response.data);
        console.log(response.data);
        console.log(userId);
        setLoad(false);
      } catch (error) {
        console.log(error);
        setLoad(false);
      }
    };

    fetchPaiements();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}><Icon name="credit-card" size={24} color="#192a56"/> Mes paiements</Text>
      </View>

      {load ? (
        <View style={styles.loadingContainer}>
          <Text>Loading ...</Text>
        </View>
      ) : (
        <>
          {paiements.length > 0 ? (
            paiements.map((paiement) => (
              <View style={styles.card} key={paiement.id}>
                <View style={styles.leftContent}>
                  <Text style={styles.numeroFacture}>
                    Paiement №#{paiement.id}
                  </Text>
                </View>
                <View style={styles.rightContent}>
                  <Text style={styles.montant}>
                    {paiement.received_amount.toLocaleString("fr-FR", {
                      style: "currency",
                      currency: "XOF",
                    })}
                  </Text>
                  <Text style={styles.datePaiement}>
                    {moment(paiement.updated_at).format("YYYY-MMM-DD")}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.no}>
              <Text>Vous n'avez aucun paiement 👈</Text>
            </View>
          )}

        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "#1abc9c",
    fontWeight: "bold",
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  leftContent: {
    alignItems: "flex-start",
  },
  rightContent: {
    alignItems: "flex-end",
  },
  numeroFacture: {
    fontSize: 18,
    fontWeight: "bold",
  },
  montant: {
    fontSize: 16,
    fontWeight: "bold",
  },
  datePaiement: {
    fontSize: 14,
    color: "#888888",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "#1abc9c",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  header: {
    height: 60,
    backgroundColor: "#7f8c8d",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  no: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 250,
  },
});

export default Payment;
