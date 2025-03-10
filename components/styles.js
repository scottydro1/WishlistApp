import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({

  //-------------------------------------------------APP.JS
  //-------------------------------------------------APP.JS
  //-------------------------------------------------APP.JS
  //-------------------------------------------------APP.JS

  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#22BABB", // Replace with your desired background color
  },
  logo_appjs: {
    width: 150, // Adjust the width to fit your logo
    height: 150, // Adjust the height to fit your logo
    marginBottom: 20, // Space between the logo and the text or activity indicator
  },
  splashText: {
    fontSize: 20,
    color: "#22BABB",
    marginBottom: 10, // Space between text and the activity indicator
  },
  // HEADER------------------------------------------------------------------
  // HEADER------------------------------------------------------------------
  // HEADER------------------------------------------------------------------
  // HEADER------------------------------------------------------------------
  // HEADER------------------------------------------------------------------
  // HEADER------------------------------------------------------------------
  safeArea_header: {
    backgroundColor: "transparent",
    marginBottom: 50
  },
  headerContainer: {
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#D9D9D9",
  },

  leftSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#fff"

  },
  title_header: {
    fontSize: 18,
    color: "#537188",
    marginLeft: 0,
    width: "100%",
    backgroundColor: "#fff"

  },
  quickactionstitle_header: {
    fontSize: 18,
    color: "#537188",
    marginLeft: 0,
  },
  iconButton: {
    width: 30,
    height: 30,
    justifyContent: 'flex-end',
    marginTop: 2,
    borderColor: "#B4B4B3",
    borderRadius: 5
  },
  icon_header: {
    width: "100%",
    height: "100%",
    tintColor: "#405D72",

  },
  navicon: {
    width: "60%",
    height: "60%",
  },
  QuickActionicon: {
    width: "80%",
    height: "80%",
    tintColor: '#fff'
  },
  QuickActionicon_Empty: {
    width: "80%",
    height: "80%",
    tintColor: '#FF6F61',
  },
  profileSection_header: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePicture_header: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    marginLeft: 10,
  },
  greetingText: {
    fontSize: 20,
    color: "#537188",
    marginRight: 5,
    marginTop: 5,
    backgroundColor: "#fff"

  },
  spacer: {
    height: 80,
  },
  overlay_header: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 0
  },
  menuContainer: {
    position: "absolute",
    top: Dimensions.get("screen").height * 0.055,
    width: "100%",
    alignSelf: "center",
    backgroundColor: "#FFF",
    padding: 20,
    height: "87%"

  },
  footerGroup: {
    bottom: 0, // Starts at the bottom
    width: "100%", // Ensures it spans the full width
    zIndex: 10, // Keeps it above other elements when animated
  },
  topButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#CCC",
    marginBottom: 20,
  },
  navigationGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },

  navButton: {
    width: 150,
    height: 150,
    borderRadius: 40,
    backgroundColor: "#22BABB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#758694",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  navButtonText: {
    marginTop: 5,
    fontSize: 14,
    color: "#FFF",
    textAlign: "center",
    fontFamily: "Poppins-Bold",
  },
  QuickActionContainer: {
    flexDirection: "row", // Align items in a row
    alignItems: "center", // Align items to the top
    paddingHorizontal: 10, // Add padding around the container
    backgroundColor: "#fff",
    borderRadius: 10

  },
  quickactionGrid: {
    flexDirection: "row", // Align items horizontally
    justifyContent: "space-between", // Align items to the left
    width: "100%"
  },
  quickActionItem: {
    marginRight: 10, // Add space between buttons
    alignItems: "center", // Center-align button and text
  },
  QuickActionButton: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#FF6F61",
    justifyContent: "center",
    alignItems: "center",
  },
  QuickActionButton_Empty: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  QuickActionButtonText: {
    marginTop: 5,
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    fontFamily: "Poppins-Bold",
    lineHeight: 18,
    maxWidth: 80, // Keep the width consistent with the button
  },
  helpTipButton: {
    width: 20, // Small circular size
    height: 20,
    borderRadius: 10, // Makes it circular
    backgroundColor: "#29747d", // Teal color
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8, // Adds spacing between the text and button
    marginBottom: 3
  },
  helpTipButtonText: {
    color: "#FFF", // White text for visibility
    fontSize: 12, // Small readable text
    fontWeight: "bold",
    textAlign: "center",
  },
  activeIndicator: {
    height: 3,               // Thickness of the blue line
    backgroundColor: "#29747d", // Blue color
    width: "20%",            // Adjust width (e.g., half the button's width)
    alignSelf: "center",     // Center the line within the button
    marginTop: 0,            // Add spacing above the line
    borderRadius: 2,         // Optional for rounded edges
  },

  // ----------------------------------FOOTER--------------------
  footerContainerWrapper: {
    position: "absolute", // Positioned at the bottom
    bottom: 0,           // Floating above the bottom edge
    alignItems: "center", // Ensures footer is horizontally centered
    zIndex: 10,           // Ensures it appears above other content
  },

  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "#FFFFFF", // Background color for visibility
    // borderRadius: 30,           // Rounded corners for the floating pill effect
    // paddingHorizontal: 20,      // Padding inside the footer
    height: 60,                 // Adjust height if necessary
    // shadowColor: "#758694",        // Add shadow for a floating effect
    // shadowOffset: { width: 0, height: 5 },
    // shadowOpacity: 0.2,
    // shadowRadius: 5,
    // elevation: 5,               // Add elevation for Android shadow
  },

  footerButton: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingTop: 2,
  },
  icon_footer: {
    width: 28,
    height: 28,
  },
  addButtonContainer: {
    bottom: 18, // Position relative to the bottom
    alignSelf: "center",
  },
  addButtonContainer_circle: {
    bottom: 18, // Position relative to the bottom
  },
  addButton: {
    backgroundColor: "#FFFFFF",
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#758694",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 10,
  },
  addButton_halfcircle: {
    backgroundColor: "#FFFFFF",

    alignItems: "center",

  },
  addIcon: {
    width: 28,
    height: 28,
  },
  footerText: {
    fontSize: 10,
    color: "#405D72",
    textAlign: "center",
    marginTop: 2,
    fontFamily: "Poppins-Bold",
  },
  // _______________________________________LOGIN___________________________________
  // _______________________________________LOGIN___________________________________
  // _______________________________________LOGIN___________________________________
  // _______________________________________LOGIN___________________________________
  activityContainer: {
    flex: 1, // Take up the entire screen
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Optional background overlay
  },
  activityIndicator: {
    transform: [{ scale: 2 }], // Scale up the size (e.g., 2x)
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
    marginTop: "-50%"
  },
  bgimg: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between", // Space between top and bottom elements
    position: "relative",
  },
  circleContainer: {
    position: "absolute",
    top: "-50%", // Move the circle up
    width: "150%",
    height: "150%",
    alignItems: "center",
    justifyContent: "center",
  },
  circleImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  logoImage: {
    width: "30%", // Adjust size as needed
    height: "30%",
    zIndex: 1, // Ensure the logo appears on top
    marginTop: "20%", // Adjust positioning
  },

  bottomImage: {
    width: "150%",
    height: 100, // Adjust height as needed
    position: "absolute",
    bottom: 0, // Align to the bottom of the screen
    borderWidth: 1,
  },
  logo1: {
    width: "100%",
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
  },

  logo2: {
    width: "100%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50%",
  },
  logoimg: {
    width: "100%",
    height: "100%",
  },
  gradientOverlay: {
    flex: 1,
    width: "100%",
  },
  titlebar: {
    width: "100%",
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "#D1BB9E",
    color: "#fff",
    marginTop: 0,
    paddingVertical: 10,
    marginBottom: 10,
  },
  titlebartext: {
    color: "#fff",
    fontSize: 40,
  },
  title: {
    fontSize: 40,
    fontWeight: "600",
    textAlign: "center",
    color: "#fff",
    top: 270,
  },

  title_blue_confirm: {
    fontSize: 40,
    fontWeight: "600",
    textAlign: "center",
    color: "#22BABB",
    top: 15,
  },
  titleRegister: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    color: "#A6AEBF",
  },
  title_blue: {
    fontSize: 40,
    fontWeight: "600",
    textAlign: "center",
    color: "#FFF",
  },
  titlesmall: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    color: "#FFF",
    marginBottom: 20,
    marginTop: -10
  },

  titlesmall_confirm: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    color: "#A6AEBF",
    top: 5,
  },
  buttonContainer: {
    width: "50%",
    marginBottom: 100,
  },
  gradientButton: {
    borderRadius: 10,
    marginBottom: 10,
  },
  gradientButtonRegister: {
    borderRadius: 10,
    width: "50%",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  buttonInner: {
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonText1: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  button: {
    paddingVertical: 10,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },

  formContainer: {
    width: "100%",
    height: "100%",
    marginBottom: 150,
    alignItems: "center",
    textAlign: "justify",
  },
  formContainer_confirm: {
    width: "100%",
    height: "100%",
    marginBottom: 30,
    alignItems: "center",
    textAlign: "justify",
  },
  registeringContainer: {
    width: "100%",
    height: "100%",
    marginBottom: 350,
    alignItems: "center",
    textAlign: "justify",
  },
  inputText: {
    color: "#A6AEBF",
  },

  loginButton: {
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    color: "#747264",
    fontWeight: "bold",
  },
  rightAlignContainer: {
    width: "100%", // Make sure the container takes full width
    flexDirection: "row",
    justifyContent: "flex-end", // Aligns content to the right
    marginBottom: 10,
  },
  rightText: {
    fontSize: 16,
    color: "#747264",
    fontWeight: "bold",
    fontFamily: "Poppins-ExtraBold",
    textAlign: "right", // Align text within Text component
  },
  signupText: {
    fontSize: 16,
    color: "#747264", // Make this color stand out
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  lefttextcontainer: {
    textAlign: "right",
    alignItems: "right",
    borderWidth: 1,
    width: "100%",
  },
  lefttext: {
    textAlign: "left",
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: "#A6AEBF", // Adjust icon color if needed
  },

  alreadyAccountText: {
    marginTop: 5,
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    textDecorationLine: "underline",
  },
  inputContainer_login: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    fontSize: 16
  },

  icon: {
    width: 20,
    height: 20,
    tintColor: "#888", // Optional: Color for your icons
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    color: "#A6AEBF", // Text color
  },
  eyeIcon: {
    width: 20,
    height: 20,
    tintColor: "#888", // Optional: Color for the eye icon
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    paddingRight: 10, // Optional: Add padding to align with input fields
  },
  forgotPasswordText: {
    color: "#fff", // Replace with your desired color
    fontWeight: "bold",
    fontSize: 14, // Adjust font size as needed
    textDecorationLine: "underline", // Underline the text
  },
  countryCodeContainer: {
    paddingHorizontal: 10,
    borderRightWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  countryCodeText: {
    fontSize: 16,
    color: "#333",
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#333",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    borderWidth: 5,
  },
  countryItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    width: "100%",
  },
  countryItemText: {
    fontSize: 16,
    color: "#333",
  },
  closeModalButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#22BABB",
    borderRadius: 5,
  },
  closeModalButtonText: {
    color: "#fff",
    fontSize: 16,
  },

  //   PLANNER
  container_planner: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  whiteHeader: {
    backgroundColor: "#FFF",
  },
  marqueeContainer_planner: {
    height: 50,
    backgroundColor: "#FFF",
    justifyContent: "center",
    paddingHorizontal: 10,
    marginBottom: 15,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderTopColor: "#DDD",
    borderBottomColor: "#DDD",
    shadowColor: "#758694",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    overflow: "hidden",
  },
  marqueeContent_planner: {
    flexDirection: "row",
    alignItems: "center",
  },
  marqueeText_planner: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginRight: 20,
    fontFamily: "sans-serif", // Example fun font
  },
  buttonContainer_planner: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    padding: 15,
  },
  buttonWrapper_planner: {
    marginBottom: 10,
  },
  buttonGradient_planner: {
    borderRadius: 10,
    overflow: "hidden",
  },
  buttonContent_planner: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  buttonIcon_planner: {
    marginBottom: 10,
  },
  buttonText_planner: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  divider_planner: {
    height: 1,
    backgroundColor: "#CCC",
    marginTop: 10,
  },

  //Caseload-------------------------------------------------------------

  container_caseload: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  content_caseload: {
    flex: 1,
    paddingHorizontal: 10,
  },
  clientsCard_caseload: {
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingVertical: 15,
    marginBottom: 20,
    paddingHorizontal: 0,
    shadowColor: "#758694",        // Shadow for a floating effect
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#D0D4CA"
  },
  clientsCardHeader_caseload: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,

  },

  clientsCardHeaderText_caseload: {
    marginLeft: 5,
    color: "#FF6F61",
    fontSize: 18
  },
  clientsCardTitleHeader_caseload: {
    borderRadius: 10,
    backgroundColor: '#fff',
    marginTop: -10

  },
  addClientButton: {
    backgroundColor: "#FFB703",
    borderRadius: 10,
    marginLeft: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  addclient_buttongroup: {

  },
  addicon_clientpage: {
    width: 30,
    height: 30,
    tintColor: '#EDEDED'
  },
  addClientButtonText: {
    color: "#FFF",
    fontSize: 12,
    fontFamily: "Poppins-ExtraBold",
  },

  clientCard_caseload: {
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,

  },
  clientCardList: {
    width: "100%",
    alignSelf: "center",
    alignItems: "center"
  },
  clientCardTouchable_caseload: {
    flexDirection: "row",
    alignItems: "center",
  },
  clientPhoto_caseload: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    resizeMode: "cover",
  },
  clientInfo_caseload: {
    flex: 1,
  },
  clientName_caseload: {
    fontSize: 16,
    color: "#FFF",
    fontFamily: "Poppins-Bold",
  },
  clientDetails_caseload: {
    fontSize: 14,
    color: "#DDD",
  },
  notificationBell_caseload: {
    position: "absolute",
    top: 6,
    right: 6,
  },
  layoutButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginRight: 5,
    backgroundColor: "#F5F5F5", // Neutral background
    borderRadius: 10,
    elevation: 2, // Shadow for modern look

  },

  layoutButton: {
    backgroundColor: "#FFFFFF", // Default background
    borderRadius: 8,
    marginHorizontal: 5,
  },

  layoutButtonActive: {
    backgroundColor: "#FFFFFF", // Highlight active button
    elevation: 3, // Elevated appearance for active button
  },

  layoutButtonIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginHorizontal: 10, // Adjust for spacing
    backgroundColor: "#F4F4F8",
    borderRadius: 10,
    shadowColor: "#758694", // Shadow color
    shadowOffset: { width: -2, height: 2 }, // Slight left offset
    shadowOpacity: 0.3, // Opacity of the shadow
    shadowRadius: 3, // Blur radius
    elevation: 4, // Required for Android
    overflow: "hidden",
  },

  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#333",
  },

  searchButton: {
    backgroundColor: "#22BABB", // Accent color for the button
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 0,
  },

  searchIcon: {
    height: 20,
    width: 20,
    tintColor: "#FFF", // Icon color
  },


  //   --------Menu----------------------------------------------

  // Dashboard


  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff', // white background for modal
    borderRadius: 10,
    padding: 20,
    shadowColor: '#758694',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10, // Shadow for Android
  },
  modalHeader: {
    backgroundColor: '#004c4c',
    padding: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
  },
  modalHeaderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalBody: {
    padding: 15,
  },
  inputField: {
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff"
  },
  inputContainer_register: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 10
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonPrimary: {
    backgroundColor: '#FF897A',
  },
  buttonSecondary: {
    backgroundColor: '#FF897A',
  },

  input_dashboard: {
    justifyContent: "center",
    borderWidth: 1,
    marginBottom: 5,
    padding: 10,
    width: "90%",
    borderRadius: 10
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  container_dashboard: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollContent_dashboard: {
    padding: 0,
    marginTop: -0,
  },
  caseloadContainerFullWidth: {
    width: '105%',
    backgroundColor: "transparent",
    marginBottom: 15,
    marginTop: 5,
    shadowColor: "#758694",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginLeft: -5,

  },
  calendarContainerFullWidth: {
    width: '105%',
    borderRadius: 0,
    overflow: "hidden",
    marginBottom: 15,
    marginLeft: -10,

  },
  calendarContainerGradient: {
    padding: 15,
  },
  sectionTitle_dashboard: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 5,
    marginLeft: 0,
  },
  dateContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
  },
  selectedDateContainer: {
    backgroundColor: "#22BABB",
  },
  dateText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#333",
  },
  dateNumber: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    color: "#333",
  },

  sectionTitle_dashboard2: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#758694",
    marginBottom: 10,
  },
  monthNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  monthTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  tribalBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#fff',
    marginTop: 5,
    borderRadius: 2,
  },
  titleBar_dashboard: {
    height: 2,
    backgroundColor: "#EEE",
    marginVertical: 10,
  },
  marqueeContainer_dashboard: {
    height: 50,
    backgroundColor: "#ff6f61",
    justifyContent: "center",
    paddingHorizontal: 10,
    //marginBottom: 15,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderTopColor: "#DDD",
    borderBottomColor: "#DDD",
    shadowColor: "#758694",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    overflow: "hidden",
    marginTop: 45,

  },
  marqueeContent_dashboard: {
    flexDirection: "row",
    alignItems: "center",

  },
  marqueeCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginRight: 5
  },
  marqueeText_dashboard: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    color: "#ff6f61",
    marginRight: 20,

  },
  calendarScrollContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,


  },
  calendarDayContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 80,
    borderRadius: 30,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 5,
    paddingVertical: 5,
    borderWidth: 5, borderColor: "#22babb"
  },
  calendarDayContainerToday: {
    backgroundColor: "#4dc8c8",
    borderColor: "#ff6f61"
  },
  calendarDayText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  calendarDayTextToday: {
    color: "#FFF",
  },
  calendarDaySubText: {
    fontSize: 12,
    color: "#666",
  },
  calendarDaySubTextToday: {
    color: "#FFF",
  },
  taskListContainer: {
    marginTop: 15,
    marginLeft: 10,
  },
  taskItem: {
    marginBottom: 10,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  taskDetail: {
    fontSize: 14,
    color: "#EEE",
  },
  taskDivider: {
    height: 1,
    backgroundColor: "#CCC",
    marginVertical: 10,
  },
  footerContainerWrapper: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: "#758694",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  clientCard_dashboard: {
    width: 300,
    marginRight: 1,
  },
  cardBackground: {
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
  },
  clientImage_dashboard: {
    width: 150,
    height: 150,
    borderRadius: 275,
    alignSelf: "center",
    marginBottom: 10,
  },
  notificationBell_dashboard: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  cardContent_dashboard: {
    alignItems: "center",
  },
  clientName_dashboard: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
  },
  statusText_dashboard: {
    fontSize: 14,
    color: "#FFF",
  },
  cardBorder: {
    height: 0,
    backgroundColor: "#DDD",
    marginTop: 0,
    marginHorizontal: 1,
    marginBottom: 1,
  },
  notificationBell_dashboard: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  //------------------------------------------ADD CASES----------------
  //------------------------------------------ADD CASES----------------
  //------------------------------------------ADD CASES----------------
  //------------------------------------------ADD CASES----------------
  //------------------------------------------ADD CASES----------------

  container_addcase: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    marginTop: 50,
  },
  headerBtns_addcase: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  icon_addcase: {
    width: "100%", // Adjust size as needed
    height: "100%", // Adjust size as needed
    alignSelf: "center", // Center the icon horizontally

  },
  headerButton_addcase: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center", // Center all content vertically
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: "#FFF", // Default background for unselected buttons
    borderColor: "#A6AEBF", // Grey border

    shadowColor: "#758694", // Darker shadow color
    shadowOffset: { width: 0, height: 4 }, // Stronger vertical offset
    shadowOpacity: 0.7, // Higher shadow opacity for a darker effect
    shadowRadius: 6, // Larger blur radius for softer shadow edges
    elevation: 10, // Higher elevation for Android
    borderBottomWidth: 5,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15

  },


  headerBtnActive_addcase: {
    // Gradient applied using `LinearGradient`

  },

  headerBtnText_addcase: {
    fontSize: 12,
    fontFamily: "Poppins-Bold",
    color: "#747264", // Grey text for unselected
  },

  headerBtnTextActive_addcase: {
    color: "#FFF", // White text for selected buttons
  },



  label_addcase: {
    fontSize: 14,
    marginBottom: 5,
    fontFamily: "Poppins-SemiBold",
    color: "#758694",
  },
  input_addcase: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    fontFamily: "Poppins-Regular",
    color: "#758694",
    backgroundColor: "#fff",

  },
  picker_addcase: {
    borderRadius: 10,
    fontFamily: "Poppins-Regular",
    color: "#758694",

  },
  submitButtonText_addcase: {
    backgroundColor: "#FF6F61",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    marginVertical: 15,
  },
  submitBtnText_addcase: {
    color: "#fff",
    fontFamily: "Poppins-Bold",
    fontSize: 16,
  },
  navbtnContainer_addcase: {
    height: 75,
    marginBottom: 20,
    flexDirection: "row",
    flexDirection: "row",
    justifyContent: "space-between", // Push buttons to opposite ends
    alignItems: "center",
    width: "100%", // Ensures the buttons span across the screen width
    paddingHorizontal: 20, // Add padding to the sides

  },
  navButton_addcase: {
    alignItems: "center",
    backgroundColor: "#0288D1",
    borderRadius: 10,
    padding: 20,
    paddingHorizontal: 25
  },
  navBtnText_addcase: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#fff",
  },
  selector_pointer: {
    marginBottom: -10, marginLeft: 20, width: 50, height: 50, tintColor: "#fff"
  },
  pointer_bar: {
    padding: 10,
    backgroundColor: "#EFF8FF",
    borderColor: "#D1D1D1",
    marginBottom: 0
  },

  point_bar_bg: {
    backgroundColor: "#fff",
    borderColor: "#DDDDDD"
  },
  formContainer_addcase: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 20,
    borderColor: "#EFF8FF",
    backgroundColor: "#EFF8FF",

  },
  composition_cardContainer: {
    flex: 1,
    borderColor: "#B3C8CF",
    borderRadius: 15,
    padding: 10,
    backgroundColor: "#EFF8FF",
  },
  composition_optionCard: {
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 120,
  },
  composition_cardimage: {
    marginLeft: 10,
    width: 50,
    height: 50,
    tintColor: "#EFF8FF",
  },
  composition_titlecontainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  composition_cardTitletext: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: "#758694",
  },
  composition_cardtext: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    color: "#758694",
  },
  fadeOutEffect: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0)", // Start transparent
    shadowColor: "#EFF8FF", // Slight gradient color to fade out
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  ButtonGroup_addCase: {
    flexDirection: "row",
    marginBottom: 10
  },
  ButtonGroupButtonLeft_addCase: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    textAlign: "center",
    alignItems: "center"
  },
  ButtonGroupButtonCenter_addCase: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    textAlign: "center",
    alignItems: "center"
  },
  ButtonGroupButtonRight_addCase: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    textAlign: "center",
    alignItems: "center"
  },
  ButtonGroupButtonInner_addCase: {
    alignItems: "center",
    alignSelf: "center"

  },
  ButtonGroupText_addCase: {
    alignSelf: "center",
    fontFamily: "Poppins-Bold"
  },
  rowContainer_nomargin: {
    flexDirection: "row"
  },
});


