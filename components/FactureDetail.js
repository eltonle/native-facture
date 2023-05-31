import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import Icone from "react-native-vector-icons/FontAwesome";
import Popup from "./Popup";
import api from "./api";

function FactureDetail({ route }) {
  const { detailId } = route.params;
  const navigation = useNavigation();
  const [factureDetail, setFactureDetail] = useState([]);
  const [load, setLoad] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const fetchFacturesDetails = async () => {
      setLoad(true);
      try {
        const response = await api.get(
          `/mes-factures/facture-detail/${detailId}`
        );
        setFactureDetail(response.data);
        console.log(response.data);
        setLoad(false);
      } catch (error) {
        console.log(error);
        setLoad(false);
        setFactureDetail([]);
      }
    };

    fetchFacturesDetails();
  }, [detailId]);

  return (
    <View
      style={{
        paddingTop: 20,
        paddingHorizontal: 10,
        paddingBottom: 80,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",

          height: 60,
          backgroundColor: "#1abc9c",
        }}
      >
        {/* Icône de retour */}
        <TouchableOpacity onPress={handleBack}>
          <Icon name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        {/* Titre de l'en-tête */}
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>
          Facture Detail
        </Text>
        {/* Espacement pour l'icône de retour */}
        <View style={{ width: 24 }} />
      </View>

      <ScrollView>
        {load ? (
          <View style={styles.loadingContainer}>
            <Text>Loading ...</Text>
          </View>
        ) : (
          <>
            <View style={styles.container}>
              <View style={styles.detailsContainer}>
                <View style={styles.listHeader}>
                  <View style={styles.listContent}>
                    <Text style={styles.listItem}>
                      <Text style={styles.label}>
                        Facture: -------------------
                      </Text>{" "}
                      №{factureDetail.id}
                    </Text>
                    <Text style={styles.listItem}>
                      <Text style={styles.label}>
                        Entretien: ------------------
                      </Text>{" "}
                      {factureDetail.maintenance_fees} FCFA
                    </Text>
                    <Text style={styles.listItem}>
                      <Text style={styles.label}>
                        N.index: --------------------
                      </Text>{" "}
                      {factureDetail.finals} m3
                    </Text>

                    <Text style={styles.listItem}>
                      <Text style={styles.label}>
                        D.index: ---------------------
                      </Text>{" "}
                      {factureDetail.initial} m3
                    </Text>

                    <Text style={styles.listItem}>
                      <Text style={styles.label}>
                        m3: ---------------------
                      </Text>{" "}
                      {parseFloat(factureDetail.finals) -
                        parseFloat(factureDetail.initial)}{" "}
                      m3
                    </Text>

                    <Text style={styles.listItem}>
                      <Text style={styles.label}>
                        Prix U.: ------------------
                      </Text>{" "}
                      {factureDetail.units} FCFA
                    </Text>
                    <Text style={styles.listItem}>
                      <Text style={styles.label}>
                        Penalites: -------------------
                      </Text>{" "}
                      {factureDetail.penality} FCFA
                    </Text>
                    <Text style={styles.listItem}>
                      <Text style={styles.label}>
                        Consomation: -------------
                      </Text>{" "}
                      {(parseFloat(factureDetail.finals) -
                        parseFloat(factureDetail.initial)) *
                        factureDetail.units}{" "}
                      FCFA
                    </Text>
                    <Text style={styles.listItem}>
                      <Text style={styles.label}>
                        Montant verce: -------------
                      </Text>{" "}
                      {factureDetail.received_amount} FCFA
                    </Text>
                    <Text style={styles.listItem}>
                      <Text style={styles.label}>
                        Solde: --------------------
                      </Text>{" "}
                      <Text style={styles.dueAmount}>
                        {factureDetail.due_amount}
                      </Text>{" "}
                      FCFA
                    </Text>
                    <Text style={styles.listItem}>
                      <Text style={styles.label}>
                        Date Limite: --------------
                      </Text>{" "}
                      {factureDetail.due_date}
                    </Text>
                    <Text style={styles.listItem}>
                      <Text style={styles.label}>
                        Statut: --------------------
                      </Text>{" "}
                      <Text
                        style={[
                          styles.status,
                          factureDetail.status === "Paid"
                            ? styles.paid
                            : styles.unpaid,
                        ]}
                      >
                        {factureDetail.status}
                      </Text>
                    </Text>
                    <Text style={[styles.listItem, styles.espacee]}>
                      <Text style={styles.textCol}>
                        Index Total: --------------
                      </Text>{" "}
                      {parseFloat(factureDetail.finals) -
                        parseFloat(factureDetail.initial)} m3
                    </Text>
                    <Text style={styles.listItem}>
                      <Text style={styles.textCol}>Montant Total: -------</Text>{" "}
                      {factureDetail.amount} FCFA
                    </Text>
                    {factureDetail.status === "Paid" ? (
                      <Text style={styles.textMoney}>
                        Facture réglée{" "}
                        <Icone
                          name="check"
                          size={24}
                          color="green"
                          style={styles.icon}
                        />
                      </Text>
                    ) : (
                      <Text style={styles.textMoney}>
                        Régler vos factures par OM ou MOMO en cliquant sur le
                        bouton ci-dessous.
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                marginBottom: 70,
                alignItems: "center",
                paddingTop: 10,
              }}
            >
              {factureDetail.status === "Unpaid" ? (
                <Popup />
              ) : (
                <Text style={styles.textMoney}>
                  <Icone
                    name="check"
                    size={24}
                    color="green"
                    style={styles.icon}
                  />
                  <Icone
                    name="check"
                    size={24}
                    color="green"
                    style={styles.icon}
                  />
                  <Icone
                    name="check"
                    size={24}
                    color="green"
                    style={styles.icon}
                  />
                </Text>
              )}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 300,
    color: "#1abc9c",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  detailsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  listHeader: {
    backgroundColor: "#d1ccc0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  listContent: {
    paddingTop: 10,
  },
  listItem: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    fontWeight: "bold",
  },
  label: {
    fontWeight: "bold",
    marginRight: 5,
    fontSize: 18,
  },
  dueAmount: {
    fontWeight: "bold",
    color: "red",
  },
  status: {
    fontWeight: "bold",
  },
  paid: {
    color: "green",
  },
  unpaid: {
    color: "red",
  },
  espacee: {
    marginTop: 20,
  },
  textCol: {
    fontWeight: "bold",
    fontSize: 20,
  },
  textMoney: {
    marginTop: 20,
    fontStyle: "italic",
    color: "#666",
    textAlign: "center",
  },
});

export default FactureDetail;
