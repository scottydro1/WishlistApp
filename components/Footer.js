import React, { useState, useEffect, useContext } from "react";
import {
  Animated,

  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Text,
  Modal,
  Dimensions,


} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../components/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { UIContext } from "../contexts/UIcontext"; // Import UserProvider

const Footer = ({ currentScreen }) => {
  const { isDarkMode, setIsDarkMode, isModalOpen, setIsModalOpen, isRadialOpen, setisRadialOpen, isMenuOpen, setisMenuOpen } = useContext(UIContext);

  const AnimateFooter = useState(new Animated.Value(0))[0];
  const formOpacityAnim = useState(new Animated.Value(0))[0]; // For the login form

  const Animradial1Y = useState(new Animated.Value(0))[0]; // Vertical
  const Animradial1X = useState(new Animated.Value(0))[0]; // Horizontal 

  const Animradial2Y = useState(new Animated.Value(0))[0]; // Vertical
  const Animradial2X = useState(new Animated.Value(0))[0]; // Horizontal  

  const Animradial3Y = useState(new Animated.Value(0))[0]; // Vertical
  const Animradial3X = useState(new Animated.Value(0))[0]; // Horizontal

  const Animradial4Y = useState(new Animated.Value(0))[0]; // Vertical
  const Animradial4X = useState(new Animated.Value(0))[0]; // Horizontal

  const Animradial5Y = useState(new Animated.Value(0))[0]; // Vertical
  const Animradial5X = useState(new Animated.Value(0))[0]; // Horizontal

  const navigation = useNavigation();
  const [menuOpen, setMenuOpen] = useState(false);
  const icons = {
    Dashboard: {
      unselect: require("../assets/img/ui_icons/home_unselect.png"),
      select: require("../assets/img/ui_icons/home_select.png"),
    },
    Documents: {
      unselect: require("../assets/img/ui_icons/forms_unselect.png"),
      select: require("../assets/img/ui_icons/forms_select.png"),
    },
    Search: {
      unselect: require("../assets/img/ui_icons/search_unselect.png"),
      select: require("../assets/img/ui_icons/search_select.png"),
    },
    Messages: {
      unselect: require("../assets/img/ui_icons/messages_unselect.png"),
      select: require("../assets/img/ui_icons/messages_select.png"),
    },
  };
  const OpenPlusRadial = () => {
    if (isRadialOpen) {

      setisRadialOpen(false)
    }
    else {
      setisRadialOpen(true)
    }
    // ok start opening each plus radial button
    Animated.parallel([
      Animated.timing(Animradial1Y, {
        toValue: -Dimensions.get("window").height * 0.1, // Move up
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(Animradial1X, {
        toValue: -Dimensions.get("window").width * -.03, // Move left
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(Animradial2Y, {
        toValue: -Dimensions.get("window").height * 0.15, // Move up
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(Animradial2X, {
        toValue: -Dimensions.get("window").width * -0, // Move left
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(Animradial3Y, {
        toValue: -Dimensions.get("window").height * 0.22, // Move up
        duration: 112,
        useNativeDriver: true,
      }),
      Animated.timing(Animradial3X, {
        toValue: -Dimensions.get("window").width * -0, // Move left
        duration: 100,
        useNativeDriver: true,
      }),

      Animated.timing(Animradial4Y, {
        toValue: -Dimensions.get("window").height * 0.15, // Move up
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(Animradial4X, {
        toValue: -Dimensions.get("window").width * -0, // Move left
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(Animradial5Y, {
        toValue: -Dimensions.get("window").height * 0.1, // Move up
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(Animradial5X, {
        toValue: -Dimensions.get("window").width * .03, // Move left
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(formOpacityAnim, {
        toValue: 1, // Fade in the form
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }
  const ShowMenu = () => {
    console.log(menuOpen)
    if (menuOpen) {
      setMenuOpen(false);
    } else {
      setMenuOpen(true);

    }

    Animated.parallel([
      Animated.timing(AnimateFooter, {
        toValue: -Dimensions.get("window").height * 0.805,
        duration: 500,
        useNativeDriver: true,
      }),

    ]).start(() => {
      console.log("Login Animation Completed");
    });
  };

  useEffect(() => {
    if (!isRadialOpen) {
      Animated.parallel([
        Animated.timing(Animradial1X, {
          toValue: 0, // Reset the top image
          duration: 100, // Animation duration in milliseconds
          useNativeDriver: true,
        }),
        Animated.timing(Animradial1Y, {
          toValue: 0, // Reset the top image
          duration: 100, // Animation duration in milliseconds
          useNativeDriver: true,
        }),
        Animated.timing(Animradial2X, {
          toValue: 0, // Reset the top image
          duration: 100, // Animation duration in milliseconds
          useNativeDriver: true,
        }),
        Animated.timing(Animradial2Y, {
          toValue: 0, // Reset the top image
          duration: 100, // Animation duration in milliseconds
          useNativeDriver: true,
        }),
        Animated.timing(Animradial3X, {
          toValue: 0, // Reset the top image
          duration: 100, // Animation duration in milliseconds
          useNativeDriver: true,
        }),
        Animated.timing(Animradial3Y, {
          toValue: 0, // Reset the top image
          duration: 100, // Animation duration in milliseconds
          useNativeDriver: true,
        }),

        Animated.timing(Animradial4X, {
          toValue: 0, // Reset the top image
          duration: 100, // Animation duration in milliseconds
          useNativeDriver: true,
        }),
        Animated.timing(Animradial4Y, {
          toValue: 0, // Reset the top image
          duration: 100, // Animation duration in milliseconds
          useNativeDriver: true,
        }),
        Animated.timing(Animradial5X, {
          toValue: 0, // Reset the top image
          duration: 100, // Animation duration in milliseconds
          useNativeDriver: true,
        }),
        Animated.timing(Animradial5Y, {
          toValue: 0, // Reset the top image
          duration: 100, // Animation duration in milliseconds
          useNativeDriver: true,
        }),
        Animated.timing(formOpacityAnim, {
          toValue: 0, // Fade out the form
          duration: 50, // Animation duration in milliseconds
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isRadialOpen]);

  return (
    <Animated.View style={[styles.footerGroup,
    { transform: [{ translateY: AnimateFooter }] }, // Use the animated value here
    ]}>
      <ImageBackground
        source={require("../assets/img/bgs/footer.png")} // Footer background image
        style={[
          styles.footerContainer,
          { width: "100%" },
        ]}
        resizeMode="stretch" // Ensure the image stretches without cutting off edges
      >
        {/* Home/Dashboard Button */}
        <View style={[
          styles.footerButton,

        ]}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Dashboard");
            }}
          >
            <Image
              source={
                currentScreen === "Dashboard"
                  ? icons.Dashboard.select
                  : icons.Dashboard.unselect
              }
              style={[styles.icon_footer, { alignSelf: "center" }]}
              resizeMode="contain"
            />
            <Text style={styles.footerText}>Dashboard</Text>

          </TouchableOpacity>
          <View
            style={[
              styles.activeIndicator,
              {
                backgroundColor:
                  currentScreen === "Dashboard" ? "#007BFF" : "transparent",
              },
            ]}
          />
        </View>

        {/* Messages Button */}
        <View style={styles.footerButton}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Messages");
            }}
          >
            <Image
              source={
                currentScreen === "Messages"
                  ? icons.Messages.select
                  : icons.Messages.unselect
              }
              style={[styles.icon_footer, { alignSelf: "center" }]}
              resizeMode="contain"
            />
            <Text style={styles.footerText}>Messages</Text>

          </TouchableOpacity>
          <View
            style={[
              styles.activeIndicator,
              {
                backgroundColor:
                  currentScreen === "Messages" ? "#007BFF" : "transparent",
              },
            ]}
          />
        </View>

        {/* Central Add Button */}
        <View style={styles.addButtonContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => OpenPlusRadial()}
          >
            <Image
              source={require("../assets/img/ui_icons/plus.png")}
              style={styles.addIcon}
              resizeMode="contain"
            />

          </TouchableOpacity>
        </View>
        {/* halfcircle */}
        <Animated.View style={[styles.addButtonContainer_circle,
        {
          position: "absolute", left: 35, bottom: -130, zIndex: -2,
        }, { opacity: formOpacityAnim }]}>
          <TouchableOpacity
            style={[styles.addButton_halfcircle, { width: 350, height: 350, backgroundColor: "transparent" }]}
          >
            <Image
              source={require("../assets/img/bgs/halfcircle.png")}
              style={{ width: "100%", height: "100%", tintColor: "#22BABB" }}
              resizeMode="contain"
            />

          </TouchableOpacity>
        </Animated.View>

        {/* RADIAL BUTTON 1 */}
        <Animated.View style={[styles.addButtonContainer,
        {
          position: "absolute", bottom: -10, left: 40, zIndex: -1, transform: [
            { translateY: Animradial1Y },
            { translateX: Animradial1X },
          ],
        }]}>
          <TouchableOpacity
            style={[styles.addButton, { width: 60, height: 60, }]}
          >
            <Image
              source={require("../assets/img/ui_icons/plus.png")}
              style={{ width: "50%", height: "50%" }}
              resizeMode="contain"
            />

          </TouchableOpacity>
        </Animated.View>

        {/* RADIAL BUTTON 2 */}
        <Animated.View style={[styles.addButtonContainer,
        {
          position: "absolute", bottom: -10, left: 110, zIndex: -1, transform: [
            { translateY: Animradial2Y },
            { translateX: Animradial2X },
          ],
        }]}>
          <TouchableOpacity
            style={[styles.addButton, { width: 60, height: 60, backgroundColor: "#fff", }]}
          >
            <Image
              source={require("../assets/img/ui_icons/plus.png")}
              style={{ width: "50%", height: "50%" }}
              resizeMode="contain"
            />

          </TouchableOpacity>
        </Animated.View>

        {/* RADIAL BUTTON 3 */}
        <Animated.View style={[styles.addButtonContainer,
        {
          position: "absolute", bottom: -60, left: 180, zIndex: -1, transform: [
            { translateY: Animradial3Y },
            { translateX: Animradial3X },
          ],
        }]}>
          <TouchableOpacity
            style={[styles.addButton, { width: 60, height: 60, backgroundColor: "#fff", }]}
          >
            <Image
              source={require("../assets/img/ui_icons/plus.png")}
              style={{ width: "50%", height: "50%" }}
              resizeMode="contain"
            />

          </TouchableOpacity>
        </Animated.View>

        {/* RADIAL BUTTON 4 */}
        <Animated.View style={[styles.addButtonContainer,
        {
          position: "absolute", bottom: -10, left: 250, zIndex: -1, transform: [
            { translateY: Animradial4Y },
            { translateX: Animradial4X },
          ],
        }]}>
          <TouchableOpacity
            style={[styles.addButton, { width: 60, height: 60, backgroundColor: "#fff", }]}
          >
            <Image
              source={require("../assets/img/ui_icons/plus.png")}
              style={{ width: "50%", height: "50%" }}
              resizeMode="contain"
            />

          </TouchableOpacity>
        </Animated.View>

        {/* RADIAL BUTTON 5 */}
        <Animated.View style={[styles.addButtonContainer,
        {
          position: "absolute", bottom: -10, left: 320, zIndex: -1, transform: [
            { translateY: Animradial5Y },
            { translateX: Animradial5X },
          ],
        }]}>
          <TouchableOpacity
            style={[styles.addButton, { width: 60, height: 60, backgroundColor: "#fff", }]}
          >
            <Image
              source={require("../assets/img/ui_icons/plus.png")}
              style={{ width: "50%", height: "50%" }}
              resizeMode="contain"
            />

          </TouchableOpacity>
        </Animated.View>



        {/* Search Button */}
        <View style={styles.footerButton}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Planner");
            }}
          >
            <Image
              source={
                currentScreen === "Search"
                  ? icons.Search.select
                  : icons.Search.unselect
              }
              style={styles.icon_footer}
              resizeMode="contain"
            />
            <Text style={styles.footerText}>Search</Text>

          </TouchableOpacity>
          <View
            style={[
              styles.activeIndicator,
              {
                backgroundColor:
                  currentScreen === "Search" ? "#007BFF" : "transparent",
              },
            ]}
          />
        </View>

        {/* Documents Button */}
        <View style={styles.footerButton}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Caseload");
            }}
          >
            <Image
              source={
                currentScreen === "Documents"
                  ? icons.Documents.select
                  : icons.Documents.unselect
              }
              style={[styles.icon_footer, { alignSelf: "center" }]}
              resizeMode="contain"
            />
            <Text style={styles.footerText}>Documents</Text>

          </TouchableOpacity>

          <View
            style={[
              styles.activeIndicator,
              {
                backgroundColor:
                  currentScreen === "Documents" ? "#007BFF" : "transparent",
              },
            ]}
          />
        </View>
      </ImageBackground>
      {/* MENU STARTS_____________--------------------------_------------ */}
      {/* MENU STARTS_____________--------------------------_------------ */}
      {/* MENU STARTS_____________--------------------------_------------ */}
      {/* MENU STARTS_____________--------------------------_------------ */}
      {/* MENU STARTS_____________--------------------------_------------ */}
      {/* MENU STARTS_____________--------------------------_------------ */}
      {/* MENU STARTS_____________--------------------------_------------ */}
      {/* MENU STARTS_____________--------------------------_------------ */}
      {/* MENU STARTS_____________--------------------------_------------ */}
      {/* MENU STARTS_____________--------------------------_------------ */}
      {/* MENU STARTS_____________--------------------------_------------ */}
      {/* MENU STARTS_____________--------------------------_------------ */}

    </Animated.View >

  );
};

export default Footer;


// <View style={[styles.menuContainer, { bottom: -565, width: "100%", }]}>
// {/* Top Buttons */}
// <View style={{ flexDirection: "row", alignItems: "center" }}>
//   <Text style={[styles.title_header, { fontFamily: "Poppins-Bold" }]}>
//     Quick Actions
//   </Text>
//   {/* <TouchableOpacity
//     style={styles.helpTipButton}
//     onPress={() =>
//       AlertModalAPI.show(
//         "Quick Actions",
//         "Quick Actions provide customized shortcuts to your commonly used features! Select an empty Quick Action button to set one up, or edit an existing Quick Action button!"
//       )
//     }
//   >
//     <Text style={styles.helpTipButtonText}>?</Text>
//   </TouchableOpacity> */}
// </View>

// <View style={styles.QuickActionContainer}>
//   <View style={styles.quickactionGrid}>
//     {/* Quick Action 1 */}
//     <View style={styles.quickActionItem}>
//       <TouchableOpacity
//         style={styles.QuickActionButton}
//         onPress={() => {
//           navigation.navigate("Caseload");
//         }}
//       >
//         <Image
//           source={require("../assets/img/ui_icons/client.png")}
//           style={styles.QuickActionicon}
//           resizeMode="contain"
//         />
//       </TouchableOpacity>

//     </View>
//     <View style={styles.quickActionItem}>
//       <TouchableOpacity
//         style={styles.QuickActionButton}
//         onPress={() => {
//           navigation.navigate("Caseload");
//         }}
//       >
//         <Image
//           source={require("../assets/img/ui_icons/form2.png")}
//           style={styles.QuickActionicon}
//           resizeMode="contain"
//         />
//       </TouchableOpacity>

//     </View>
//     <View style={styles.quickActionItem}>
//       <TouchableOpacity
//         style={styles.QuickActionButton}
//         onPress={() => {
//           navigation.navigate("Caseload");
//         }}
//       >
//         <Image
//           source={require("../assets/img/ui_icons/time.png")}
//           style={styles.QuickActionicon}
//           resizeMode="contain"
//         />
//       </TouchableOpacity>

//     </View>
//     <View style={styles.quickActionItem}>
//       <TouchableOpacity
//         style={styles.QuickActionButton}
//         onPress={() => {
//           navigation.navigate("Caseload");
//         }}
//       >
//         <Image
//           source={require("../assets/img/ui_icons/calendar2.png")}
//           style={styles.QuickActionicon}
//           resizeMode="contain"
//         />
//       </TouchableOpacity>

//     </View>
//     <View style={styles.quickActionItem}>
//       <TouchableOpacity
//         style={styles.QuickActionButton}
//         onPress={() => {
//           navigation.navigate("Caseload");
//         }}
//       >
//         <Image
//           source={require("../assets/img/ui_icons/camera.png")}
//           style={styles.QuickActionicon}
//           resizeMode="contain"
//         />
//       </TouchableOpacity>

//     </View>
//   </View>
// </View>


// <View style={styles.divider} />
// {/* Quick Action Button */}



// {/* Navigation Buttons */}
// <View style={styles.navigationGrid}>
//   <TouchableOpacity
//     style={styles.navButton}
//     onPress={() => {
//       navigation.navigate("Caseload");
//     }}
//   >
//     <Image
//       source={require("../assets/img/ui_icons/caseload.png")}
//       style={styles.navicon}
//       resizeMode="contain"
//     />
//     <Text style={styles.navButtonText}>Caseload</Text>
//   </TouchableOpacity>
//   <TouchableOpacity
//     style={styles.navButton}
//     onPress={() => {
//       navigation.navigate("Planner");
//     }}
//   >
//     <Image
//       source={require("../assets/img/ui_icons/planner.png")}
//       style={styles.navicon}
//       resizeMode="contain"
//     />
//     <Text style={styles.navButtonText}>Planner</Text>
//   </TouchableOpacity>
//   <TouchableOpacity
//     style={styles.navButton}
//     onPress={() => {
//       navigation.navigate("Tasks");
//     }}
//   >
//     <Image
//       source={require("../assets/img/ui_icons/task.png")}
//       style={styles.navicon}
//       resizeMode="contain"
//     />
//     <Text style={styles.navButtonText}>Tasks</Text>
//   </TouchableOpacity>
//   <TouchableOpacity
//     style={styles.navButton}
//     onPress={() => {
//       navigation.navigate("Profile");
//     }}
//   >
//     <Image
//       source={require("../assets/img/ui_icons/account.png")}
//       style={styles.navicon}
//       resizeMode="contain"
//     />
//     <Text style={styles.navButtonText}>Profile</Text>
//   </TouchableOpacity>
// </View>
// <View style={styles.divider} />

// <View style={styles.topButtons}>
//   <TouchableOpacity
//     onPress={() => {
//       navigation.navigate("Settings");
//     }}
//   >
//     <MaterialIcons name="settings" size={24} color="#333" />
//   </TouchableOpacity>
//   <TouchableOpacity onPress={() => setMenuOpen(false)}>
//     <MaterialIcons name="close" size={24} color="#333" />
//   </TouchableOpacity>
// </View>
// </View>

