import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "../components/styles";

const Planner = () => {

  const marqueeItems = [
    "Client Birthday: John Doe - 11/23",
    "Client Birthday: Jane Smith - 11/24",
    "Client Birthday: Michael Brown - 11/25",
    "Client Birthday: Emily Davis - 11/26",
    "Client Birthday: David Wilson - 11/27",
    "Client Birthday: Sarah Johnson - 11/28",
    "Client Birthday: Chris Martinez - 11/29",
    "Client Birthday: Amanda Taylor - 11/30",
    "Client Birthday: Robert Thomas - 12/01",
    "Client Birthday: Olivia Lee - 12/02",
  ];

  const buttonTitles = [
    { title: "Daily Priorities", icon: "today" },
    { title: "Main Calendar", icon: "calendar-today" },
    { title: "Client Calendar", icon: "person" },
    { title: "Court Calendar", icon: "gavel" },
    { title: "Appointments", icon: "event" },
    { title: "Deadline Tasks", icon: "assignment" },
  ];

  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startScrolling = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scrollX, {
            toValue: -1500, // Adjust this value based on the total width of marquee text
            duration: 30000, // Duration for one full scroll
            useNativeDriver: true,
          }),
          Animated.timing(scrollX, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    startScrolling();
  }, [scrollX]);

  return (
    <View style={styles.container_planner}>
      {/* Header */}
      <Header title="Planner" />

      {/* Auto-Scrolling Marquee */}
      <TouchableOpacity style={styles.marqueeContainer_planner}>
        <Animated.View
          style={[
            styles.marqueeContent_planner,
            { transform: [{ translateX: scrollX }] },
          ]}
        >
          {marqueeItems.map((item, index) => (
            <Text key={index} style={styles.marqueeText_planner}>
              {item} |{" "}
            </Text>
          ))}
        </Animated.View>
      </TouchableOpacity>

      {/* Buttons */}
      <View style={styles.buttonContainer_planner}>
        {buttonTitles.map((button, index) => (
          <View key={index} style={styles.buttonWrapper_planner}>
            <LinearGradient
              colors={["#1E3C72", "#2A5298"]}
              style={styles.buttonGradient_planner}
            >
              <TouchableOpacity style={styles.buttonContent_planner}>
                <MaterialIcons
                  name={button.icon}
                  size={32}
                  color="#FFF"
                  style={styles.buttonIcon_planner}
                />
                <Text style={styles.buttonText_planner}>{button.title}</Text>
              </TouchableOpacity>
            </LinearGradient>
            {index < buttonTitles.length - 1 && <View style={styles.divider_planner} />}
          </View>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footerContainerWrapper}>
        <Footer currentScreen="Search" />
      </View>
    </View>
  );
};

export default Planner;

