import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  SafeAreaView,
  StatusBar,
  Modal,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../contexts/UserContext"; // Import UserContext here
import { useCustomFonts } from "../assets/fonts";
import { MaterialIcons } from "@expo/vector-icons";
import { ModalAPI } from "../components/AlertModal";
import { styles } from "../components/styles";
import { UIContext } from "../contexts/UIcontext"; // Import UserProvider
import AlertModal from "../components/AlertModal";


export default function Header({ title, hasSpacer = true, scrollY }) {
  const { isDarkMode, setIsDarkMode, isModalOpen, setIsModalOpen, isRadialOpen, setisRadialOpen, isMenuOpen, setisMenuOpen } = useContext(UIContext);

  const [fontsLoaded, setFontsLoaded] = useState(false);

  const navigation = useNavigation();
  // Access the global user state from UserContext
  // Access the global user state from UserContext
  const { user } = useContext(UserContext);

  // Dynamically set the account holder's first name (fallback to "Guest")
  const accountHolderName = user?.attributes?.given_name.charAt(0).toUpperCase() + user?.attributes?.given_name.slice(1).toLowerCase() || "Guest";
  const backgroundColor = scrollY
    ? scrollY.interpolate({
      inputRange: [0, 200],
      outputRange: ["fff", "#fff"],
      extrapolate: "clamp",
    })
    : "#fff";
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
    <>
      <SafeAreaView style={styles.safeArea_header}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <Animated.View style={[styles.headerContainer, { backgroundColor }]}>
          <AlertModal />
          <View style={styles.leftSection}>

            <TouchableOpacity
              style={styles.profileSection_header}
              onPress={() => navigation.navigate("Account")}
            >
              <Text
                style={[styles.greetingText, { fontFamily: "Poppins-Regular" }]}
              >
                Hi, {accountHolderName}
              </Text>

              <Image
                source={require("../assets/img/clients/bryant.png")}
                style={styles.profilePicture_header}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => { setisRadialOpen(false); if (isMenuOpen) { setisMenuOpen(false) } else { setisMenuOpen(true) } }}
            >
              <Image
                source={require("../assets/img/ui_icons/menu3.png")}
                style={styles.icon_header}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <Text style={[styles.title_header, { fontFamily: "Poppins-Bold" }]}>
            {title}
          </Text>

        </Animated.View>

      </SafeAreaView>

      {hasSpacer && <View style={styles.spacer} />}

      <Modal
        transparent={true}
        visible={isMenuOpen}
        animationType="slide"
        onRequestClose={() => setisMenuOpen(false)}
      >
        {/* Overlay to close menu */}
        <TouchableOpacity
          style={styles.overlay_header}
          onPress={() => setisMenuOpen(false)}
        />
        {/* Menu Container */}
        <View style={styles.menuContainer}>
          {/* Top Buttons */}
          <View style={styles.topButtons}>
            <TouchableOpacity
              onPress={() => {
                setisMenuOpen(false);
                navigation.navigate("Login");
              }}
            >
              <MaterialIcons name="settings" size={30} color="#4DC8C8" />
            </TouchableOpacity>


            <TouchableOpacity onPress={() => setisMenuOpen(false)}>
              <MaterialIcons name="close" size={30} color="#333" />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />
          {/* Quick Action Button */}

          <View style={{ flexDirection: "row", alignItems: "center", marginTop: -10 }}>
            <Text style={[styles.quickactionstitle_header, { fontFamily: "Poppins-Bold" }]}>
              Quick Actions
            </Text>
            <TouchableOpacity
              style={styles.helpTipButton}
              onPress={() =>
                ModalAPI.showAlert(
                  "Quick Actions",
                  "Quick Actions provide customized shortcuts to your commonly used features! Select an empty Quick Action button to set one up, or edit an existing Quick Action button!"
                )
              }
            >
              <Text style={styles.helpTipButtonText}>?</Text>
            </TouchableOpacity>
          </View>


          <View style={styles.QuickActionContainer}>
            <View style={styles.quickactionGrid}>
              {/* Quick Action 1 */}
              <View style={styles.quickActionItem}>
                <TouchableOpacity
                  style={styles.QuickActionButton}
                  onPress={() => {
                    setisMenuOpen(false);
                    navigation.navigate("Caseload");
                  }}
                >
                  <Image
                    source={require("../assets/img/ui_icons/form2.png")}
                    style={styles.QuickActionicon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <Text
                  style={styles.QuickActionButtonText}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  Form: DA556
                </Text>
              </View>
              {/* Quick Action 2 */}
              <View style={styles.quickActionItem}>
                <TouchableOpacity
                  style={styles.QuickActionButton_Empty}
                  onPress={() => {
                    setisMenuOpen(false);
                    navigation.navigate("Caseload");
                  }}
                >
                  <Image
                    source={require("../assets/img/ui_icons/placeholder.png")}
                    style={styles.QuickActionicon_Empty}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <Text
                  style={styles.QuickActionButtonText}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  ...
                </Text>
              </View>

              {/* Quick Action 3 */}
              <View style={styles.quickActionItem}>
                <TouchableOpacity
                  style={styles.QuickActionButton_Empty}
                  onPress={() => {
                    setisMenuOpen(false);
                    navigation.navigate("Caseload");
                  }}
                >
                  <Image
                    source={require("../assets/img/ui_icons/placeholder.png")}
                    style={styles.QuickActionicon_Empty}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <Text
                  style={styles.QuickActionButtonText}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  ...
                </Text>
              </View>

              {/* Quick Action 4 */}
              <View style={styles.quickActionItem}>
                <TouchableOpacity
                  style={styles.QuickActionButton_Empty}
                  onPress={() => {
                    setisMenuOpen(false);
                    navigation.navigate("Caseload");
                  }}
                >
                  <Image
                    source={require("../assets/img/ui_icons/placeholder.png")}
                    style={styles.QuickActionicon_Empty}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <Text
                  style={styles.QuickActionButtonText}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  ...
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.divider} />

          {/* Navigation Buttons */}
          <View style={styles.navigationGrid}>
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => {
                setisMenuOpen(false);
                navigation.navigate("Caseload");
              }}
            >
              <Image
                source={require("../assets/img/ui_icons/caseload.png")}
                style={styles.navicon}
                resizeMode="contain"
              />
              <Text style={styles.navButtonText}>Caseload</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => {
                setisMenuOpen(false);
                navigation.navigate("Planner");
              }}
            >
              <Image
                source={require("../assets/img/ui_icons/planner.png")}
                style={styles.navicon}
                resizeMode="contain"
              />
              <Text style={styles.navButtonText}>Planner</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => {
                setisMenuOpen(false);
                navigation.navigate("Tasks");
              }}
            >
              <Image
                source={require("../assets/img/ui_icons/task.png")}
                style={styles.navicon}
                resizeMode="contain"
              />
              <Text style={styles.navButtonText}>Tasks</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => {
                setisMenuOpen(false);
                navigation.navigate("Profile");
              }}
            >
              <Image
                source={require("../assets/img/ui_icons/account.png")}
                style={styles.navicon}
                resizeMode="contain"
              />
              <Text style={styles.navButtonText}>Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

