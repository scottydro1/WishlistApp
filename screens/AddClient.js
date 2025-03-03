import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { UserContext } from "../contexts/UserContext";
import { saveClientData } from "../contexts/AWSSend";
import { v4 as uuidv4 } from "uuid";
import { ModalAPI } from "../components/AlertModal";
import AlertModal from "../components/AlertModal";

const AddClient = ({ navigation }) => {
  const [activeSection, setActiveSection] = useState("Personal Information");
  const [animations, setAnimations] = useState({
    "Personal Information": new Animated.Value(1),
    "Allergies & Medications": new Animated.Value(1),
    Collaterals: new Animated.Value(1),
  });
  const { user } = useContext(UserContext);
  const userId = user?.attributes?.sub;
  const [clientData, setClientData] = useState({
    allergies: [],
    medications: [],
    caseManager: "",
    address: "",
    contactInfo: "",
    name: "",
    preferredName: "",
    dob: "",
    gender: "",
    pronouns: "",
    userId: userId
  });

  const handleButtonPress = (section) => {
    setActiveSection(section);
    Animated.sequence([
      Animated.timing(animations[section], {
        toValue: 1.1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(animations[section], {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const HandleSubmit = async (userId) => {
    try {
      // Add the userId to the clientData object
      const uniqueClientId = uuidv4(); // Generate a unique clientid
      const dataToSave = {
        ...clientData,
        clientid: uniqueClientId,
      };
      // Log the object for debugging purposes
      console.log("Client Data to Save:", JSON.stringify(dataToSave, null, 2));

      // Call the AWS save function
      await saveClientData(dataToSave);

      // Alert user of success
      ModalAPI.showAlert(
        "Success",
        "Data saved successfully!"
      )
    } catch (error) {
      console.error("Error saving client data:", error);
      ModalAPI.showAlert(
        "Error",
        "Failed to save data. Please try again!"
      )
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case "Personal Information":
        return (
          <View>
            <AlertModal />

            <Text style={styles.label}>Full Name:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter full name"
              value={clientData.name}
              onChangeText={(text) =>
                setClientData((prevState) => ({ ...prevState, name: text }))
              }
            />

            <Text style={styles.label}>Preferred Name:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter preferred name"
              value={clientData.preferredName}
              onChangeText={(text) =>
                setClientData((prevState) => ({ ...prevState, preferredName: text }))
              }
            />

            <Text style={styles.label}>Date of Birth:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter date of birth"
              value={clientData.dob}
              onChangeText={(text) =>
                setClientData((prevState) => ({ ...prevState, dob: text }))
              }
            />

            <Text style={styles.label}>Gender:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter gender"
              value={clientData.gender}
              onChangeText={(text) =>
                setClientData((prevState) => ({ ...prevState, gender: text }))
              }
            />

            <Text style={styles.label}>Pronouns:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter pronouns"
              value={clientData.pronouns}
              onChangeText={(text) =>
                setClientData((prevState) => ({ ...prevState, pronouns: text }))
              }
            />
          </View>

        );
      case "Allergies & Medications":
        return (
          <View>
            <Text style={styles.label}>Add Allergy:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter allergy"
              onChangeText={(text) =>
                setClientData((prevState) => ({
                  ...prevState,
                  allergies: [...prevState.allergies, text],
                }))
              }
            />

            <Text style={styles.label}>Current Medications:</Text>
            <TextInput
              style={styles.input}
              placeholder="Medication Name"
              onChangeText={(text) =>
                setClientData((prevState) => ({
                  ...prevState,
                  medications: [...prevState.medications, { name: text }],
                }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Dosage"
              onChangeText={(text) =>
                setClientData((prevState) => ({
                  ...prevState,
                  medications: prevState.medications.map((med, index) =>
                    index === prevState.medications.length - 1
                      ? { ...med, dosage: text }
                      : med
                  ),
                }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Times of Day"
              onChangeText={(text) =>
                setClientData((prevState) => ({
                  ...prevState,
                  medications: prevState.medications.map((med, index) =>
                    index === prevState.medications.length - 1
                      ? { ...med, times: text }
                      : med
                  ),
                }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Prescribing Doctor"
              onChangeText={(text) =>
                setClientData((prevState) => ({
                  ...prevState,
                  medications: prevState.medications.map((med, index) =>
                    index === prevState.medications.length - 1
                      ? { ...med, doctor: text }
                      : med
                  ),
                }))
              }
            />
          </View>

        );
      case "Collaterals":
        return (
          <View>
            <Text style={styles.label}>Collateral Name:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter collateral name"
              value={clientData.caseManager}
              onChangeText={(text) =>
                setClientData((prevState) => ({ ...prevState, caseManager: text }))
              }
            />

            <Text style={styles.label}>Relationship:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter relationship"
              value={clientData.address}
              onChangeText={(text) =>
                setClientData((prevState) => ({ ...prevState, address: text }))
              }
            />

            <Text style={styles.label}>Contact Information:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter contact information"
              value={clientData.contactInfo}
              onChangeText={(text) =>
                setClientData((prevState) => ({ ...prevState, contactInfo: text }))
              }
            />
          </View>

        );
      default:
        return null;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Add New Client</Text>

      <View style={styles.buttonRow}>
        {[
          { section: "Personal Information", icon: "user" },
          { section: "Allergies & Medications", icon: "medkit" },
          { section: "Collaterals", icon: "users" },
        ].map(({ section, icon }) => (
          <Animated.View
            key={section}
            style={{ transform: [{ scale: animations[section] }] }}
          >
            <TouchableOpacity
              style={[
                styles.button,
                activeSection === section ? styles.activeButton : {},
              ]}
              onPress={() => handleButtonPress(section)}
            >
              <Icon name={icon} size={30} color="#FFFFFF" style={styles.icon} />
              <Text style={styles.buttonText}>{section}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>

      <View style={styles.sectionContainer}>{renderSection()}</View>

      <TouchableOpacity style={styles.submitButton} onPress={() => HandleSubmit(userId)}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F9F9F9",
  },
  backButton: {
    alignSelf: "flex-start",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#29747d",
    borderRadius: 5,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    width: 110,
    height: 110,
    backgroundColor: "#29747D",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  activeButton: {
    backgroundColor: "#1A5B63",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },
  icon: {
    marginBottom: 5,
  },
  sectionContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
  },
  submitButton: {
    backgroundColor: "#29747D",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AddClient;
