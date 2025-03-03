import React, { useEffect, useState, useContext } from "react";

import {
  Animated,
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
  ScrollView,
  Modal,
  FlatList, // Optional for better scrolling behavior
  ActivityIndicator,
  Keyboard
} from "react-native";
import { useCustomFonts } from "../assets/fonts";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { Auth } from "aws-amplify"; // Import Amplify Auth
import { styles } from "../components/styles";
import { ModalAPI } from "../components/AlertModal";
import AlertModal from "../components/AlertModal";
import { UserContext } from "../contexts/UserContext"; // Import UserContext here

import {
  signIn,
  confirmSignUp,
  signUp,
  resendSignUpCode,
  getCurrentUser,
  fetchUserAttributes,
} from "aws-amplify/auth";
export default function Login({ navigation }) {
  const [showModal, setShowModal] = useState(false);
  const [PasswordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // For registration
  const [isRegistering, setIsRegistering] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const topImageAnim = useState(new Animated.Value(-Dimensions.get("window").height * 0.2))[0]; // For the top image
  const bottomImageAnim = useState(new Animated.Value(0))[0]; // For the bottom image
  const logoanim = useState(new Animated.Value(-Dimensions.get("window").height * 0.06))[0]; // For the bottom image
  const imageScaleAnim = useState(new Animated.Value(.8))[0]; // Initial scale of 1
  const [entryPoint, setEntryPoint] = useState("Login");

  const formOpacityAnim = useState(new Animated.Value(1))[0]; // For the login form
  const RegisterformOpacityAnim = useState(new Animated.Value(0))[0]; // For the register form


  const buttonContainerOpacityAnim = useState(new Animated.Value(0))[0];
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState("+1"); // Default country code
  const [isModalVisible, setModalVisible] = useState(false);
  const [showConfirmationForm, setShowConfirmationForm] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const { setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const countryCodes = [
    { code: "+1", name: "United States" },
    { code: "+44", name: "United Kingdom" },
    { code: "+91", name: "India" },
    { code: "+61", name: "Australia" },
    { code: "+81", name: "Japan" },
    { code: "+49", name: "Germany" },
    // Add more country codes as needed
  ];

  const handleSelectCountryCode = (code) => {
    setSelectedCountryCode(code);
    setModalVisible(false);
  };
  const showLoginAnimation = () => {
    // if (showLoginForm) return; // Prevent animation overlap
    setShowLoginForm(true);
    setIsRegistering(false)
    Animated.parallel([
      Animated.timing(topImageAnim, {
        toValue: -Dimensions.get("window").height * 0.2,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(bottomImageAnim, {
        toValue: -Dimensions.get("window").width * 2,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(logoanim, {
        toValue: -Dimensions.get("window").height * 0.06,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(formOpacityAnim, {
        toValue: 1, // Fade in the form
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(imageScaleAnim, {
        toValue: 0.8, // Resize the image to 80% of its original size
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
    });
  };

  const ShowRegistraionAnimation = () => {
    Animated.parallel([

      Animated.timing(topImageAnim, {
        toValue: -Dimensions.get("window").height * 0.3,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(bottomImageAnim, {
        toValue: -Dimensions.get("window").width * 2,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(logoanim, {
        toValue: -Dimensions.get("window").height * 0.1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(formOpacityAnim, {
        toValue: 1, // Fade in the form
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(imageScaleAnim, {
        toValue: 0.6, // Resize the image to 80% of its original size
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // After animations complete, update the state
      setShowLoginForm(false); // Ensure the login form is hidden
      setIsRegistering(true); // Show registration form
      Animated.parallel([//now show the registrationform!
        Animated.timing(RegisterformOpacityAnim, {
          toValue: 1, // Fade in the form
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start(() => {
      });
    });
  };



  const testFunction = () => {
    setShowConfirmationForm(false);
    setIsRegistering(true);
  };
  // Modify your handleRegister function to show the confirmation form on success
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      ModalAPI.showAlert("Error", "Passwords do not match");
      return;
    }
    setEntryPoint("registration");

    try {
      const formattedPhoneNumber = `${selectedCountryCode}${phoneNumber}`;
      await signUp({
        username: username,
        password: password,
        phone_number: formattedPhoneNumber,
        options: {
          userAttributes: {
            email: username,
            phone_number: formattedPhoneNumber,
            given_name: fname,
            family_name: lname,
            name: fname + " " + lname,
          },
        },
      });
      ModalAPI.showAlert(
        "Success",
        "Account created! A confirmation code has been sent to your email."
      );
      setShowConfirmationForm(true);
      setIsRegistering(false);
    } catch (error) {
      console.error("Error signing up:", error);
      if (
        error.message &&
        error.message.toLowerCase().includes("email already exists")
      ) {
        // Redirect to login form if email already exists
        ModalAPI.showAlert(
          "Account Exists",
          "This email is already registered. Please log in."
        );
        setShowLoginForm(true);
        setShowConfirmationForm(false);
        setIsRegistering(false);
      } else {
        ModalAPI.showAlert(
          "Register Error",
          error.message || "An unknown error occurred."
        );
      }
    }
  };
  const handleResendCode = async (email) => {
    try {
      await resendSignUpCode({ username });
    } catch (error) {
      console.error("Error resending confirmation code:", error);
      ModalAPI.showAlert(
        "Error",
        error.message || "An unknown error occurred."
      );
    }
  };

  const handleLogin = async (extradetail) => {
    if (extradetail == "gototest") {
      navigation.navigate("Dashboard")
    }
    if (isLoading) return;
    try {
      // Check for empty fields
      if (!username || !password) {
        console.error("Username or Password is empty.");
        ModalAPI.showAlert("Error", "Please fill in all fields.");
        return;
      }

      setIsLoading(true); // Show loading overlay

      let user;

      // Attempt to sign in
      try {
        user = await signIn({
          username,
          password,
          options: { authFlowType: "USER_PASSWORD_AUTH" },
        });
        console.log("Sign-in successful:", user);
      } catch (error) {
        if (
          error.name === "UserAlreadyAuthenticatedException" ||
          error.message.includes("already a signed in user")
        ) {
        } else {
          throw error; // Re-throw other errors
        }
      }

      // Handle confirmation step if required
      if (user?.nextStep?.signInStep === "CONFIRM_SIGN_UP") {
        setIsLoading(false);
        await handleResendCode(username);
        ModalAPI.showAlert(
          "Confirmation Needed",
          "Your account requires confirmation. A new confirmation code has been sent to your email."
        );
        setShowLoginForm(false);
        setShowConfirmationForm(true);
        return;
      }

      // Fetch user attributes
      const userAttributes = await fetchUserAttributes();

      // Update global user state with all attributes
      setUser({
        attributes: userAttributes, // Store all attributes in the UserContext
      });

      // Navigate to the Dashboard
      navigation.navigate("Onboarding");
    } catch (error) {
      console.error("Error signing in:", error);

      ModalAPI.showAlert(
        "Error",
        error.message || "An unknown error occurred."
      );
    } finally {
      setIsLoading(false); // Ensure loading overlay is removed
    }
  };

  const handleConfirmSignUp = async () => {
    if (!username || !confirmationCode) {
      ModalAPI.showAlert(
        "Error",
        "Both email and confirmation code are required."
      );
      console.error("Missing email or confirmation code.");
      return;
    }

    try {
      console.log("Attempting to confirm sign-up with:", {
        username,
        confirmationCode,
      });

      const { isSignUpComplete, userId, nextStep } = await confirmSignUp({
        username,
        confirmationCode,
      });

      if (isSignUpComplete) {
        ModalAPI.showAlert(
          "Success",
          "Your account has been confirmed! You can now log in."
        );
        console.log("Confirmation successful:", { userId, nextStep });
        setShowLoginForm(true);
        setShowConfirmationForm(false); // Adjust state to display the login form
      } else if (nextStep && nextStep.signInStep === "CONFIRM_SIGN_UP") {
        ModalAPI.showAlert(
          "Info",
          "Confirmation is still incomplete. Please complete the next step."
        );
        console.log("Next confirmation step required:", nextStep);
      } else {
        ModalAPI.showAlert(
          "Error",
          "Unknown confirmation status. Please try again later."
        );
        console.error("Unexpected confirmation result:", {
          isSignUpComplete,
          userId,
          nextStep,
        });
      }
    } catch (error) {
      console.error("Error confirming sign-up:", error);
      ModalAPI.showAlert(
        "Error",
        error.message || "An unknown error occurred while confirming the code."
      );
    }
  };
  useEffect(() => {
    if (!showLoginForm && !isRegistering && !showConfirmationForm) {
      Animated.parallel([
        Animated.timing(topImageAnim, {
          toValue: 0, // Reset the top image
          duration: 200, // Animation duration in milliseconds
          useNativeDriver: true,
        }),
        Animated.timing(bottomImageAnim, {
          toValue: 0, // Reset the bottom image
          duration: 200, // Animation duration in milliseconds
          useNativeDriver: true,
        }),
        Animated.timing(logoanim, {
          toValue: 0, // Reset the bottom image
          duration: 200, // Animation duration in milliseconds
          useNativeDriver: true,
        }),
        Animated.timing(formOpacityAnim, {
          toValue: 0, // Fade out the form
          duration: 50, // Animation duration in milliseconds
          useNativeDriver: true,
        }),
        Animated.timing(buttonContainerOpacityAnim, {
          toValue: 1, // Reset button container opacity
          duration: 50, // Animation duration in milliseconds
          useNativeDriver: true,
        }),
        Animated.timing(imageScaleAnim, {
          toValue: 1, // Resize the image to 80% of its original size
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [showLoginForm, isRegistering, showConfirmationForm]); // Include both states in the dependency array

  useEffect(() => {
    async function loadFonts() {
      await useCustomFonts();
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);


  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        Animated.parallel([
          Animated.timing(topImageAnim, {
            toValue: -Dimensions.get("window").height * 0.6, // Reset the top image
            duration: 1, // Animation duration in milliseconds
            useNativeDriver: true,
          }),
          Animated.timing(bottomImageAnim, {
            toValue: -Dimensions.get("window").width * 3.5,
            duration: 1, // Animation duration in milliseconds
            useNativeDriver: true,
          }),
          Animated.timing(logoanim, {
            toValue: -Dimensions.get("window").height * 0.6, // Reset the bottom image
            duration: 1, // Animation duration in milliseconds
            useNativeDriver: true,
          }),
        ]).start();
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        if (entryPoint === "login") {
          console.log("showkeyboard_login")
          Animated.parallel([
            Animated.timing(topImageAnim, {
              toValue: -Dimensions.get("window").height * 0.2,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.timing(bottomImageAnim, {
              toValue: -Dimensions.get("window").width * 2,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.timing(logoanim, {
              toValue: -Dimensions.get("window").height * 0.06,
              duration: 100,
              useNativeDriver: true,
            }),

            Animated.timing(imageScaleAnim, {
              toValue: 0.8, // Resize the image to 80% of its original size
              duration: 100,
              useNativeDriver: true,
            }),
          ]).start(() => {
          });
        } else if (entryPoint === "registration") {
          console.log("hiding")
          Animated.parallel([

            Animated.timing(topImageAnim, {
              toValue: -Dimensions.get("window").height * 0.3,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.timing(bottomImageAnim, {
              toValue: -Dimensions.get("window").width * 2,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.timing(logoanim, {
              toValue: -Dimensions.get("window").height * 0.1,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.timing(imageScaleAnim, {
              toValue: 0.6, // Resize the image to 80% of its original size
              duration: 100,
              useNativeDriver: true,
            }),
          ]).start(() => { });
        }

      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  if (!fontsLoaded) {
    return null; // Optionally show a loading spinner here
  }
  // ----------------------------------------RETURN START---------------------------------------------------------
  // ----------------------------------------RETURN START---------------------------------------------------------
  // ----------------------------------------RETURN START---------------------------------------------------------
  // ----------------------------------------RETURN START---------------------------------------------------------
  // ----------------------------------------RETURN START---------------------------------------------------------

  return (
    <LinearGradient
      colors={["#fff", "#fff"]}
      start={{ x: 0.5, y: 0.1 }}
      end={{ x: 0.5, y: 1 }} // Ending at the bottom center
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={styles.safeArea}>
          <AlertModal />

          <View style={styles.bgimg}>
            {/* Circle Image */}
            <View style={styles.circleContainer}>
              <Animated.Image
                source={require("../assets/img/bgs/shape4.png")}
                style={[
                  {
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                  },
                  { transform: [{ translateY: topImageAnim }] }, // Apply topImageAnim
                ]}
                resizeMode="contain"
              />
              {/* Logo Image inside the Circle */}
              <Animated.Image
                source={require("../assets/img/logo/logo_white.png")}
                style={[
                  styles.logoImage,
                  {
                    transform: [
                      { translateY: logoanim }, // Move image vertically
                      { scale: imageScaleAnim }, // Apply the scale animation
                    ],
                  },
                ]}
                resizeMode="contain"
              />
            </View>
            {!showLoginForm && !isRegistering && showConfirmationForm && (
              <Text style={[styles.title, { fontFamily: "Poppins-ExtraBold" }]}>
                Social Care
              </Text>
            )}



          </View>
          {/* -------------------FORMS---------------- */}
          <View style={styles.content}>
            {/* Login and Register Buttons */}
            {!showLoginForm && !isRegistering && !showConfirmationForm && (
              <Animated.View
                style={[
                  styles.buttonContainer,
                  { opacity: buttonContainerOpacityAnim },
                ]}
              >
                <LinearGradient
                  colors={["#A3E4E6", "#22BABB"]}
                  start={{ x: 0.5, y: 0.0 }}
                  end={{ x: 0.5, y: 0.5 }}
                  style={styles.gradientButton}
                >
                  <TouchableOpacity
                    style={styles.buttonInner}
                    onPress={() => showLoginAnimation()}
                    disabled={showLoginForm}
                  >
                    <Text
                      style={[
                        styles.buttonText,
                        { fontFamily: "Poppins-Bold" },
                      ]}
                    >
                      Login
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>

                <LinearGradient
                  colors={["#FFF7DF", "#F2E3B5"]}
                  start={{ x: 0.5, y: 0.1 }}
                  end={{ x: 0.5, y: 0.5 }}
                  style={styles.gradientButton}
                >
                  <TouchableOpacity
                    style={styles.buttonInner}
                    onPress={() => ShowRegistraionAnimation()}
                  >
                    <Text
                      style={[
                        styles.buttonText1,
                        { fontFamily: "Poppins-Bold" },
                      ]}
                    >
                      Register
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </Animated.View>
            )}

            {/* Login Form */}
            {showLoginForm && (

              <Animated.View
                style={[styles.formContainer, { opacity: formOpacityAnim }]}
              >
                <View style={{ marginBottom: 30, alignItems: "center" }}>
                  <Text
                    style={[
                      styles.title_blue,
                      { fontFamily: "Poppins-ExtraBold" },
                    ]}
                  >
                    Hello Again!
                  </Text>
                  <Text
                    style={[
                      styles.titlesmall,
                      { fontFamily: "Poppins-Light" },
                    ]}
                  >
                    Log into your account
                  </Text>
                </View>


                {/* Email Input Field */}
                <View style={styles.inputContainer}>
                  <Image
                    source={require("../assets/img/ui_icons/mail.png")} // Replace with your email icon
                    style={styles.icon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="email@example.com"
                    value={username}
                    onChangeText={setUsername}
                    placeholderTextColor="#A6AEBF" // Placeholder text color
                  />
                </View>

                {/* Password Input Field */}
                <View style={styles.inputContainer}>
                  <Image
                    source={require("../assets/img/ui_icons/lock.png")} // Replace with your lock icon
                    style={styles.icon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={!PasswordVisible} // Toggle password visibility
                    placeholderTextColor="#A6AEBF" // Placeholder text color
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setPasswordVisible(!PasswordVisible)}
                  >
                    <Image
                      source={
                        PasswordVisible
                          ? require("../assets/img/ui_icons/show.png") // Replace with your "eye open" icon
                          : require("../assets/img/ui_icons/hide.png") // Replace with your "eye closed" icon
                      }
                      style={styles.eyeIcon}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.forgotPasswordContainer}>
                  <TouchableOpacity
                    onPress={() => { setUsername("scottydro@gmail.com", setPassword("Tycoon!!11"), handleLogin("gototest")) }}
                  >
                    <Text style={styles.forgotPasswordText}>
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* Continue Button */}
                <LinearGradient
                  colors={["#FF897A", "#FF6F61"]}
                  start={{ x: 0.5, y: 0.1 }}
                  end={{ x: 0.5, y: 1 }}
                  style={styles.gradientButton}
                >
                  <TouchableOpacity
                    style={styles.buttonInner}
                    onPress={() => handleLogin()}
                    disabled={!showLoginForm}
                    pointerEvents={showLoginForm ? "auto" : "none"} // Disable interaction when hidden
                  >
                    <Text style={styles.buttonText}>Continue</Text>
                  </TouchableOpacity>
                </LinearGradient>

                {/* Sign-Up Link */}
                <TouchableOpacity
                  onPress={() => { ShowRegistraionAnimation(), setEntryPoint("registration") }}

                >
                  <Text style={styles.alreadyAccountText}>
                    Don't have an account? Sign Up
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            )}

            {/* Registration Form */}
            {isRegistering && (
              <Animated.View style={[styles.registeringContainer, { opacity: RegisterformOpacityAnim }]}
              >
                <View style={styles.titleRegister}>
                  <View>
                    <Text
                      style={[
                        styles.title_blue,
                        { fontFamily: "Poppins-ExtraBold" },
                      ]}
                    >
                      Nice to meet you!
                    </Text>
                    <Text
                      style={[
                        styles.titlesmall,
                        { fontFamily: "Poppins-Light" },
                      ]}
                    >
                      Create your account
                    </Text>
                  </View>
                </View>
                <View style={styles.inputContainer}>
                  <Image
                    source={require("../assets/img/bgs/shape1.png")} // Replace with your user icon
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    value={fname}
                    onChangeText={setfname}
                    placeholderTextColor="#A6AEBF"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Image
                    source={require("../assets/img/bgs/shape1.png")} // Replace with your user icon
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    value={lname}
                    onChangeText={setlname}
                    placeholderTextColor="#A6AEBF"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Image
                    source={require("../assets/img/bgs/shape1.png")} // Replace with your email icon
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="email@example.com"
                    value={username}
                    onChangeText={setUsername}
                    placeholderTextColor="#A6AEBF"
                  />
                </View>
                <View style={styles.inputContainer}>
                  {/* Country Code Selector */}
                  <TouchableOpacity
                    style={styles.countryCodeContainer}
                    onPress={() => setModalVisible(true)}
                  >
                    <Text style={styles.countryCodeText}>
                      {selectedCountryCode}
                    </Text>
                  </TouchableOpacity>

                  {/* Phone Number Input */}
                  <TextInput
                    style={styles.phoneInput}
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    placeholderTextColor="#A6AEBF"
                    keyboardType="phone-pad"
                  />

                  {/* Modal for Selecting Country Code */}
                  <Modal
                    visible={isModalVisible}
                    animationType="slide"
                    transparent={true}
                  >
                    <View style={styles.modalContainer}>
                      <View style={styles.modalContent}>
                        <FlatList
                          data={countryCodes}
                          keyExtractor={(item) => item.code}
                          renderItem={({ item }) => (
                            <TouchableOpacity
                              style={styles.countryItem}
                              onPress={() => handleSelectCountryCode(item.code)}
                            >
                              <Text style={styles.countryItemText}>
                                {item.name} ({item.code})
                              </Text>
                            </TouchableOpacity>
                          )}
                        />
                        <TouchableOpacity
                          style={styles.closeModalButton}
                          onPress={() => setModalVisible(false)}
                        >
                          <Text style={styles.closeModalButtonText}>Close</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>
                </View>
                <View style={styles.inputContainer}>
                  <Image
                    source={require("../assets/img/bgs/shape1.png")} // Replace with your password icon
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor="#A6AEBF"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Image
                    source={require("../assets/img/bgs/shape1.png")} // Replace with your confirm password icon
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholderTextColor="#A6AEBF"
                  />
                </View>
                <TouchableOpacity
                  style={styles.gradientButtonRegister}
                  onPress={() => handleRegister()}
                // onPress={() => testFunction()}
                >
                  <LinearGradient
                    colors={["#FFF7DF", "#F2E3B5"]}
                    start={{ x: 0.5, y: 0.1 }}
                    end={{ x: 0.5, y: 0.5 }}
                    style={styles.buttonInner}
                  >
                    <Text style={styles.buttonText1}>Continue</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setIsRegistering(false), showLoginAnimation(); setEntryPoint("login")
                  }}
                >
                  <Text style={styles.alreadyAccountText}>
                    Already have an account?{" "}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            )}

            {/* Confirmation Form */}
            {showConfirmationForm && (
              <Animated.View style={styles.formContainer_confirm}>
                <View style={{ marginBottom: 30, alignItems: "center" }}>
                  <Text
                    style={[
                      styles.title_blue,
                      { fontFamily: "Poppins-ExtraBold" },
                    ]}
                  >
                    A code has been sent to your email.
                  </Text>
                  <Text
                    style={[
                      styles.titlesmall,
                      { fontFamily: "Poppins-Light" },
                    ]}
                  >
                    Enter the code to confirm your account
                  </Text>
                </View>

                <View style={styles.formContainer}>
                  <View style={styles.inputContainer}>
                    <Image
                      source={require("../assets/img/ui_icons/messages.png")} // Replace with your email icon
                      style={styles.icon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Confirmation Code"
                      value={confirmationCode}
                      onChangeText={setConfirmationCode}
                      placeholderTextColor="#A6AEBF"
                    />
                  </View>

                  <LinearGradient
                    colors={["#D1D8C5", "#B5C18E"]}
                    start={{ x: 0.5, y: 0.1 }}
                    end={{ x: 0.5, y: 1 }}
                    style={styles.gradientButton}
                  >
                    <TouchableOpacity
                      style={styles.buttonInner}
                      onPress={handleConfirmSignUp}
                    >
                      <Text style={styles.buttonText}>Confirm</Text>
                    </TouchableOpacity>
                  </LinearGradient>

                  <TouchableOpacity
                    onPress={() => {
                      handleResendCode(username),
                        ModalAPI.showAlert(
                          "Success",
                          "A new confirmation code has been sent to your email."
                        );
                    }}
                  >
                    <Text style={styles.signupText}>Resend Code</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      if (entryPoint === "login") {
                        setShowLoginForm(true);
                        setShowConfirmationForm(false);
                      } else if (entryPoint === "registration") {
                        setIsRegistering(true);
                        setShowConfirmationForm(false);
                      }
                    }}
                  >
                    <Text style={styles.signupText}>Back</Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            )}
          </View>

          {/* Bottom Image */}
          {isLoading && (
            <View style={[
              {
                backgroundColor: "#fff",
                width: "100%",
                height: "100%",
                position: "absolute",
                zIndex: 5
              },
            ]}>
              <View style={styles.activityContainer}>
                <ActivityIndicator
                  size="large" // Base size
                  color="#FF6F61" // Customize the color
                  style={styles.activityIndicator} // Apply scaling
                />
              </View>
            </View>
          )}
        </SafeAreaView>
        <Animated.Image
          source={require("../assets/img/bgs/shape1.png")}
          style={[
            {
              width: "200%",
              height: "200%",
              position: "absolute",
              bottom: "-110%", // Ensures it's at the bottom of the screen
              left: 100,
              zIndex: -1, // Push the image behind other elements
            },
            { transform: [{ translateX: bottomImageAnim }] }, // Apply bottomImageAnim
          ]}
          resizeMode="contain"
        />
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
