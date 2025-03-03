import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const ClientPage = ({ route }) => {
  const client = route.params?.client || {}; // Get client data or default to empty object

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{client.name || "New Client"}</Text>
      <Image
        source={
          client.photo
            ? { uri: client.photo } // Display client photo if available
            : require("../assets/img/ui_icons/default_avatar.png") // Default avatar
        }
        style={styles.clientPhoto}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.details}>Age: {client.age || "N/A"}</Text>
        <Text style={styles.details}>Birthday: {client.dob || "N/A"}</Text>
        <Text style={styles.details}>Placement: {client.placement || "N/A"}</Text>
        <Text style={styles.details}>Caregiver: {client.caregiverName || "N/A"}</Text>
        <Text style={styles.details}>
          Medical Info: {client.medicalInfo || "N/A"}
        </Text>
        <Text style={styles.details}>
          Educational Info: {client.educationInfo || "N/A"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#29747d",
    textAlign: "center",
  },
  clientPhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#29747d",
  },
  detailsContainer: {
    marginTop: 20,
  },
  details: {
    fontSize: 16,
    color: "#333333",
    marginBottom: 10,
    lineHeight: 22,
  },
});

export default ClientPage;
