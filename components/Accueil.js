import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import Icon from "react-native-vector-icons/FontAwesome";
import moment from 'moment';
import api from "./api";


const Accueil = ({ setIsLoggedIn, ...props }) => {
  const [id, setUserId] = useState(null);
  const [totalPaye, setTotalPaye] = useState(null);
  const [totalDue, setTotalDue] = useState(null);
  const [totalAvoir, setTotalAvoirs] = useState(null);
  const [nbrFacture, setNbreFacture] = useState(null);
  const [dernierPay, setDernierPay] = useState([]);
  const [dernierFac, setDernierFac] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeconnexion = async () => {
    setIsLoading(true);
    try {
      await api.post("/logout", null);

      await SecureStore.deleteItemAsync("token");
      setIsLoggedIn(false);
      props.navigation.navigate("Login");

      setIsLoading(false);
     
    } catch (error) {
      console.error(error);
      
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fonction pour vérifier si l'utilisateur est connecté
    const checkIfUserIsLoggedIn = async () => {
      try {
        const response = await api.get("/user");
        setUserId(response.data.data.id);
        console.log(response.data.data.id);
      } catch (error) {
        console.error(error);
      }
    };

    checkIfUserIsLoggedIn();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response1 = await api.get(`/paymenttotal/${id}`);
        setTotalPaye(response1.data);

        const response2 = await api.get(`/dueamounttotal/${id}`);
        setTotalDue(response2.data);

        const response3 = await api.get(`/les-avoirs/${id}`);
        setTotalAvoirs(response3.data);

        const response4 = await api.get(`/derniers-paiements/${id}`);
        setDernierPay(response4.data);

        const response6 = await api.get(`/derniers-factures/${id}`);
        setDernierFac(response6.data);
        console.log("repose:",response6.data);

        const response5 = await api.get(`/factures-impays/${id}`);
        setNbreFacture(response5.data);

        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        setTotalPaye(null);
        setTotalDue(null);
        setTotalAvoirs(null);
        setDernierPay([]);
      }
    };

    fetchData();
  }, [id, setTotalPaye, setTotalDue, setTotalAvoirs, setDernierPay]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}><Icon name="home" size={24} color="#192a56"/>Accueil</Text>
        <TouchableOpacity onPress={handleDeconnexion}>
          <View style={styles.deconnexionContainer}>
            <Text style={styles.deconnexionText}>Déconnexion</Text>
            <Icon name="sign-out" size={20} color="red" />
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView style={{ paddingTop: 20 }}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text>Loading ...</Text>
          </View>
        ) : (
          <>
            <View style={styles.card1}>
              <View style={styles.contentContainer}>
                <View style={styles.iconContainer}>
                  <Ionicons name="ios-cash" size={30} color="#fff" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.priceText}>
                    {totalPaye === null
                      ? "0"
                      : totalPaye.toLocaleString("fr-FR", {
                          style: "currency",
                          currency: "XOF",
                        })}
                  </Text>
                  <Text style={styles.descriptionText}>Total Payés</Text>
                </View>
              </View>
            </View>

            <View style={styles.card3}>
              <View style={styles.contentContainer}>
                <View style={styles.iconContainer}>
                  <Ionicons name="ios-cash" size={30} color="#fff" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.priceText}>
                    {totalAvoir === null
                      ? "0"
                      : totalAvoir.toLocaleString("fr-FR", {
                          style: "currency",
                          currency: "XOF",
                        })}
                  </Text>
                  <Text style={styles.descriptionText}>Les Avoirs</Text>
                </View>
              </View>
            </View>

            <View style={styles.card2}>
              <View style={styles.contentContainer}>
                <View style={styles.iconContainer}>
                  <Ionicons name="ios-cash" size={30} color="#fff" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.priceText}>
                    {totalDue === null
                      ? "0"
                      : totalDue.toLocaleString("fr-FR", {
                          style: "currency",
                          currency: "XOF",
                        })}
                  </Text>
                  <Text style={styles.descriptionText}>Total Impayés</Text>
                </View>
              </View>
            </View>

            <View style={styles.card4}>
              <View style={styles.contentContainer}>
                <View style={styles.iconContainer}>
                  <Ionicons name="ios-cash" size={30} color="#fff" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.priceText}>
                    {nbrFacture === null ? "0" : nbrFacture}
                  </Text>
                  <Text style={styles.descriptionText}>Factures impayés</Text>
                </View>
              </View>
            </View>

            

            {/* list facture */}
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}> 12 Dernieres factures</Text>
            </View>
            <View style={styles.headerr}>
              <Text style={styles.headerText}>№# </Text>
              <Text style={styles.headerText}>A.index </Text>
              <Text style={styles.headerText}>N.index </Text>
              {/* <Text style={styles.headerText}>Date</Text> */}
              <Text style={styles.headerText}>Pénalités</Text>
              <Text style={styles.headerText}>Montant restant</Text>
            </View>

            {dernierFac.length > 0 ? (
            
            (dernierFac.map((item, index) => (
              <View key={index} style={styles.row}>
                <Text style={[styles.cell, styles.cellBorder]}>№#{item.id}</Text>
                <Text style={[styles.cell, styles.cellBorder]}>{item.initial}</Text>
                <Text style={[styles.cell, styles.cellBorder]}>{item.finals}</Text>
                <Text style={[styles.cell, styles.cellBorder]}>{item.penality.toLocaleString("fr-FR", {
                      style: "currency",
                      currency: "XOF",
                    })}</Text>
                {/* <Text style={[styles.cell, styles.cellBorder]}>{moment(item.updated_at).format("YYYY-MMM-DD")}</Text> */}
                <Text style={[styles.cell, styles.cellBorder]}>{item.due_amount.toLocaleString("fr-FR", {
                      style: "currency",
                      currency: "XOF",
                    })}</Text>
              </View>
            )))
           
          ) : (
            <View style={styles.no}>
              <Text>Vous n'avez aucune Facture 👈</Text>
            </View>
          )}



            {/* list paye */}

            <View style={styles.titleContainer}>
              <Text style={styles.titleText}> 12 Derniers Paiements</Text>
            </View>
      
            <View style={styles.headerr}>
              <Text style={styles.headerText}>№# </Text>
              <Text style={styles.headerText}>Date</Text>
              <Text style={styles.headerText}>Montant Payé</Text>
            </View>
      
             {dernierPay.length > 0 ? (
            
              (dernierPay.map((item, index) => (
                <View key={index} style={styles.row}>
                  <Text style={[styles.cell, styles.cellBorder]}>№#  {item.id}</Text>
                  <Text style={[styles.cell, styles.cellBorder]}>{moment(item.updated_at).format("YYYY-MMM-DD")}</Text>
                  <Text style={[styles.cell, styles.cellBorder]}> {item.received_amount.toLocaleString("fr-FR", {
                        style: "currency",
                        currency: "XOF",
                      })}</Text>
                </View>
              )))
             
            ) : (
              <View style={styles.no}>
                <Text>Vous n'avez aucun paiement 👈</Text>
              </View>
            )}

           
            <View style={styles.citation}>
              <Text style={styles.citationText}>
              <Icon name="quote-left" size={10} color="#192a56"/>  Le règlement régulier de ses factures permet de maintenir une bonne réputation et de renforcer sa crédibilité auprès des autres.<Icon name="quote-right" size={10} color="#192a56"/>
               </Text>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  card4: {
    backgroundColor: "#C03221",
    borderRadius: 8,
    padding: 16,
    elevation: 4,
    marginBottom: 10,
  },
  card3: {
    backgroundColor: "#2c2c54",
    borderRadius: 8,
    padding: 16,
    elevation: 4,
    marginBottom: 10,
  },
  card1: {
    backgroundColor: "#1AA053",
    borderRadius: 8,
    padding: 16,
    elevation: 4,
    marginBottom: 10,
  },
  card2: {
    backgroundColor: "#3A57E8",
    borderRadius: 8,
    padding: 16,
    elevation: 4,
    marginBottom: 10,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconContainer: {
    marginRight: 16,
    
  },
  textContainer: {
    marginLeft: 16,
  },
  priceText: {
    fontSize: 18,
    fontWeight: "bold",
    color:'#fff'
  },
  descriptionText: {
    fontSize: 14,
    marginTop: 4,
    color:'#fff'
  },

  // header

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 60,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  deconnexionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  deconnexionText: {
    fontSize: 16,
    color: "red",
    marginRight: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "#1abc9c",
    fontWeight: "bold",
    marginTop: 225,
  },


  no: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 150,
  },
  citation: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
    marginTop: 10,
    fontWeight:'bold'
  },
  citationText: {
    fontSize:11,
    fontWeight:'500'
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderBottomWidth: 3,
    borderBottomColor: "#ccc",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color:'#3A57E8'
  },

  //list autre 
  headerr: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#000',
    padding: 6,
    backgroundColor: '#f2f2f2', // Couleur de fond pour les en-têtes
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#000',
  },
  cell: {
    flex: 1,
    fontSize: 12,
    padding: 8,
    fontWeight:'bold',
  },
  cellBorder: {
    borderRightWidth: 1, // Bordure à droite de chaque cellule
    borderColor: '#000',
  },
});

export default Accueil;
