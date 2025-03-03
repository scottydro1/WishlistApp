import React, { useEffect, useState, createContext } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "./screens/Dashboard";
import Forms from "./screens/Forms";
import Caseload from "./screens/Caseload";
import Planner from "./screens/Planner";
import Login from "./screens/login";
import Onboarding from "./screens/onboarding";
import PlacementProvider from "./screens/PlacementProvider";
import ClientPage from "./screens/ClientPage";
import AddClient from "./screens/AddClient";
import AddCase from "./screens/AddCase";
import Messages from "./screens/Messages";
import { Amplify, Auth } from "aws-amplify";
import awsconfig from "./aws-exports";
import { UserProvider } from "./contexts/UserContext";
import { UIProvider } from "./contexts/UIcontext";
import { styles } from "./components/styles";
import { useCustomFonts } from "./assets/fonts";

Amplify.configure(awsconfig);

const Stack = createStackNavigator();

const SplashScreen = () => (
  <View style={styles.splashContainer}>
    <Image
      source={require("./assets/img/logo/logo_white.png")} // Ensure path is correct
      style={styles.logo_appjs}
      resizeMode="contain"
    />
    <ActivityIndicator size="large" color="#fff" />
  </View>
);

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadFonts() {
      try {
        await useCustomFonts(); // Loads your custom fonts
        setFontsLoaded(true);
      } catch (err) {
        console.error("Error loading fonts:", err);
      }
    }
    loadFonts();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();
        if (currentUser) {
          setUser({ attributes: currentUser.attributes });
          console.log("Authenticated user attributes:", currentUser.attributes);
        }
      } catch (error) {
        console.log("No authenticated user found. Redirecting to login.");
        setUser(null);
      } finally {
        // Add a delay before setting isLoading to false
        setTimeout(() => {
          setIsLoading(false);
        }, 3500); // 2-second delay
      }
    };

    fetchUserData();
  }, []);


  // Render the splash screen until loading is complete
  if (isLoading || !fontsLoaded) {
    return <SplashScreen />;
  }

  return (
    <UserProvider value={{ user, setUser }}>
      <UIProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={user ? "Dashboard" : "Login"}>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PlacementProvider"
              component={PlacementProvider}
              options={{ headerShown: true, title: "Placement Provider" }}
            />

            <Stack.Screen
              name="Onboarding"
              component={Onboarding}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Forms"
              component={Forms}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Caseload"
              component={Caseload}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ClientPage"
              component={ClientPage}
              options={{ headerShown: true, title: "Client Details" }}
            />
            <Stack.Screen
              name="Planner"
              component={Planner}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddClient"
              component={AddClient}
              options={{ headerShown: false, title: "Add New Client" }}
            />
            <Stack.Screen
              name="AddCase"
              component={AddCase}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Messages"
              component={Messages}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </UIProvider>
    </UserProvider>
  );
}
