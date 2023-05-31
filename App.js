import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Facture from "./components/Facture";
import FactureDetail from "./components/FactureDetail";
import Payment from "./components/Payment";
import Contact from "./components/Contact";
import Accueil from "./components/Accueil";
import * as SecureStore from "expo-secure-store";

const Stack = createNativeStackNavigator();

export default function App() {
  const [islogged, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Fonction pour vérifier le token dans le SecureStore
    const checkToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");

        if (token) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          console.log("Pas de token trouvé dans SecureStore");
        }
      } catch (error) {
        setIsLoggedIn(false);
        console.error(error);
      }
    };

    checkToken();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator > 
        {!islogged ? (

          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
          >
            {(props) => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
         
          
        ) : (
          <>
          <Stack.Screen
            name="Accueil"
            options={{ headerShown: false }}
          >
            {(props) => <Accueil {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
         
            <Stack.Screen
              name="Facture"
              component={Facture}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="FactureDetail"
              component={FactureDetail}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Payment"
              component={Payment}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Contact"
              component={Contact}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
      {islogged && <NavBar />}
    </NavigationContainer>
  );
}
