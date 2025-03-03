import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView, // Optional for better scrolling behavior
} from "react-native";
import { useCustomFonts } from "../assets/fonts";

export default function Login({ navigation }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await useCustomFonts();
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // Optionally show a loading spinner here
  }

  return (
    <View>
      {!menuOpen && (
        <View style={styles.buttonContainer}>
          <LinearGradient
            colors={["#D8CAB8", "#D1BB9E"]}
            start={{ x: 0.5, y: 0.1 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.gradientButton}
          >
            <TouchableOpacity
              style={styles.buttonInner}
              onPress={() => setShowLoginForm(true)}
            >
              <Text style={[styles.buttonText, { fontFamily: "Poppins-Bold" }]}>
                Login
              </Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={["#DAF5FF", "#D1E9F6"]}
            start={{ x: 0.5, y: 0.1 }}
            end={{ x: 0.5, y: 0.5 }}
            style={styles.gradientButton}
          >
            <TouchableOpacity
              style={styles.buttonInner}
              onPress={() => setIsRegistering(true)}
            >
              <Text
                style={[styles.buttonText1, { fontFamily: "Poppins-Bold" }]}
              >
                Register
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      )}
    </View>
  );
}
