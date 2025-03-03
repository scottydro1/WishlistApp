import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Animated,
  StyleSheet,
  ActivityIndicator,
  TextInput
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { fetchClientsFromLambda } from "../contexts/AWSfetch";
import { UserContext } from "../contexts/UserContext";
import { useCustomFonts } from "../assets/fonts";
import { styles } from "../components/styles";
import { ModalAPI } from "../components/AlertModal";
import AlertModal from "../components/AlertModal";

const Caseload = () => {
  const navigation = useNavigation();

  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [clients, setClients] = useState([]);
  const [layoutMode, setLayoutMode] = useState("grid");
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  const { user } = useContext(UserContext);
  const userId = user?.attributes?.sub;
  const layouticons = {
    grid: require("../assets/img/ui_icons/grid.png"),
    list: require("../assets/img/ui_icons/list.png")
  }

  const getLayouticonByName = (name) => {
    switch (name) {
      case "grid":
        return layouticons.grid;
      case "list":
        return layouticons.list;
    }
  }
  useEffect(() => {
    async function loadFonts() {
      await useCustomFonts();
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  const fetchClients = async (userId) => {
    try {
      setIsLoading(true); // Start loading
      const fetchedClients = await fetchClientsFromLambda(userId);
      setClients(fetchedClients);
      setIsLoading(false); // End loading
    } catch (error) {
      console.error("Error fetching clients:", error);
      setIsLoading(false); // End loading even if there's an error
    }
  };

  useEffect(() => {
    if (userId) {
      fetchClients(userId);
    }
  }, [userId]);

  const renderClient = ({ item }) => {
    const calculateAge = (dob) => {
      const [month, day, year] = dob.split("/").map(Number);
      const birthDate = new Date(year, month - 1, day);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      return age;
    };

    const resolvedPhoto = item.photo
      ? { uri: item.photo }
      : require("../assets/img/avatars/boy.png");

    return (
      <LinearGradient
        colors={["#4DC8C8", "#22BABB"]}
        style={[
          styles.clientCard_caseload,
          layoutMode === "list" && styles.clientCardList,
          layoutMode === "grid" && { width: "48%" }, { marginLeft: 5 },
        ]}
      >
        <TouchableOpacity
          style={styles.notificationBell_caseload}
          onPress={() => console.log(`Notification for ${item.name}`)}
        >
          <MaterialIcons name="notifications" size={20} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.clientCardTouchable_caseload, { fontFamily: "Poppins-Bold" }]}
          onPress={() => {
            navigation.navigate("ClientPage", {
              client: { ...item, photo: resolvedPhoto.uri || resolvedPhoto },
            });
          }}
        >
          <Image source={resolvedPhoto} style={styles.clientPhoto_caseload} />
          <View style={styles.clientInfo_caseload}>
            <Text
              style={[styles.clientName_caseload, { fontFamily: "Poppins-ExtraBold" }]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.name}
            </Text>
            <Text style={[styles.clientDetails_caseload, { fontFamily: "Poppins-Regular" }]}>
              Age: {calculateAge(item.dob)}
            </Text>
          </View>
        </TouchableOpacity>
      </LinearGradient>
    );
  };

  return (
    <View style={styles.container_caseload}>
      <Header title="Cases" />
      {fontsLoaded && (

        <View style={styles.content_caseload}>
          <AlertModal />
          <View style={styles.clientsCard_caseload}>
            <View style={styles.clientsCardTitleHeader_caseload}>
              <Text
                style={[styles.clientsCardHeaderText_caseload, { fontFamily: "Poppins-ExtraBold" }]}

              >
                "Manage and track all client cases in one place, tailored to your workflow."

              </Text>
            </View>
            <View style={[styles.divider, { marginTop: 5 }]} />

            <View style={styles.clientsCardHeader_caseload}>
              {/* Add Client Button */}
              <View style={styles.addclient_buttongroup}>
                <TouchableOpacity
                  style={styles.addClientButton}
                  onPress={() => navigation.navigate("AddCase")}
                >
                  <Image
                    source={require("../assets/img/ui_icons/plus.png")}
                    style={styles.addicon_clientpage}
                  />
                  {/* <Text style={styles.addClientButtonText}> Add Client</Text> */}

                </TouchableOpacity>
              </View>

              {/* Search Bar */}
              <View style={styles.searchBarContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search cases..."
                  placeholderTextColor="#A6AEBF"
                  onChangeText={(text) => console.log("Search query:", text)} // Replace with your search logic
                />
                <View
                  style={styles.searchButton}
                  onPress={() => console.log("Search button pressed")}
                >
                  <Image
                    source={require("../assets/img/ui_icons/search_select.png")} // Replace with your search icon
                    style={styles.searchIcon}
                  />
                </View>
              </View>

              {/* Layout Buttons */}
              <View style={styles.layoutButtons}>
                <TouchableOpacity
                  style={[
                    styles.layoutButton,
                    layoutMode === "grid" && styles.layoutButtonActive,
                  ]}
                  onPress={() => {
                    setLayoutMode(layoutMode === "grid" ? "list" : "grid");
                  }}
                >
                  <Image
                    source={getLayouticonByName(layoutMode)}
                    style={[
                      styles.layoutButtonIcon,
                      { tintColor: "#FF6F61" },
                    ]}
                  />
                </TouchableOpacity>
              </View>
            </View>


            {isLoading ? ( // Show loading indicator
              <ActivityIndicator
                size="large"
                color="#0288D1"
                style={{ marginVertical: 20 }}
              />
            ) : (
              <FlatList
                key={layoutMode}
                data={clients}
                keyExtractor={(item) => item.clientid}
                renderItem={renderClient}
                horizontal={layoutMode === "carousel"}
                numColumns={layoutMode === "grid" ? 2 : 1}
                columnWrapperStyle={
                  layoutMode === "grid"
                    ? { alignItems: "center", marginBottom: 10 }
                    : null
                }
                ItemSeparatorComponent={
                  layoutMode === "carousel"
                    ? () => <View style={{ width: 5 }} />
                    : null
                }
                contentContainerStyle={
                  layoutMode === "carousel"
                    ? { paddingHorizontal: 0, marginHorizontal: -5 }
                    : layoutMode === "list"
                      ? { alignItems: "stretch" }
                      : null
                }
              />
            )}
          </View>
        </View>
      )}
      <View style={styles.footerContainerWrapper}>
        <Footer currentScreen="Cases" />
      </View>
    </View>
  );
};

export default Caseload;


