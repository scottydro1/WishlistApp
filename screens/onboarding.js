import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useCustomFonts } from "../assets/fonts";

const { width } = Dimensions.get("window");

// Array of slides with image, title, and description
const slides = [
  {
    id: "1",
    image: require("../assets/img/example1.png"),
    title: "Case and Client Management",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "2",
    image: require("../assets/img/example2.png"),
    title: "Complete Industry Standard Forms",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "3",
    image: require("../assets/img/example3.png"),
    title: "Virtual Planner With Notifications",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  },
];

export default function OnboardingScreen({ navigation }) {
  // Destructure navigation here
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await useCustomFonts();
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  // Function to handle Next button press
  const handleNext = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      navigation.navigate("Dashboard");
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    } else {
      navigation.navigate("Login");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Skip button at the top right */}
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => navigation.navigate("Dashboard")}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        {/* Content Container */}
        <View style={styles.contentContainer}>
          {/* Image */}
          <Image
            source={slides[currentSlideIndex].image}
            style={styles.image}
            resizeMode="contain"
          />

          {/* Title */}
          <Text style={[styles.title, { fontFamily: "Poppins-Bold" }]}>
            {slides[currentSlideIndex].title}
          </Text>

          {/* Description */}
          <Text
            style={[styles.description, { fontFamily: "Poppins-SemiBold" }]}
          >
            {slides[currentSlideIndex].description}
          </Text>

          {/* Dots Indicator */}
          <View style={styles.dotsContainer}>
            {slides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  currentSlideIndex === index && styles.activeDot,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Bottom buttons container */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.buttonContainer} onPress={handlePrev}>
            <LinearGradient
              colors={["#D8CAB8", "#D1BB9E"]}
              start={{ x: 0.5, y: 0.1 }}
              end={{ x: 0.5, y: 1 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Back</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonContainer} onPress={handleNext}>
            <LinearGradient
              colors={["#D8CAB8", "#D1BB9E"]}
              start={{ x: 0.5, y: 0.1 }}
              end={{ x: 0.5, y: 1 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Next</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  skipButton: {
    position: "absolute",
    top: 50,
    right: 20,
  },
  skipText: {
    fontSize: 16,
    color: "#888",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: width * 0.75,
    height: width * 0.75,
    borderRadius: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: "#747264",
    textAlign: "center",
    marginTop: 20,
  },
  description: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginVertical: 10,
    paddingHorizontal: 30,
  },
  dotsContainer: {
    flexDirection: "row",
    marginVertical: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ddd",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#c79043",
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    width: "40%",
  },
  button: {
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
