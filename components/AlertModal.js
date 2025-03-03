import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

let showAlert; // Reference to call AlertModal externally
let showEditModal; // Reference to call EditModal externally

export default function AlertModal() {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const [editVisible, setEditVisible] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editValue, setEditValue] = useState("");
  const [onSave, setOnSave] = useState(() => () => { });

  // Expose a method to show the AlertModal
  showAlert = (modalTitle, modalMessage) => {
    setTitle(modalTitle);
    setMessage(modalMessage);
    setVisible(true);
  };

  // Expose a method to show the EditModal
  showEditModal = (initialTitle, initialValue, saveCallback) => {
    setEditTitle(initialTitle);
    setEditValue(initialValue);
    setOnSave(() => saveCallback);
    setEditVisible(true);
  };

  return (
    <>
      {/* Alert Modal */}
      <Modal
        transparent
        animationType="fade"
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalTitleContainer}>
              <Text style={styles.modalTitle}>{title}</Text>

            </View>
            <View style={styles.modalMessageContainer}>
              <Text style={styles.modalMessage}>{message}</Text>

            </View>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Edit Modal */}
      <Modal
        transparent
        animationType="fade"
        visible={editVisible}
        onRequestClose={() => setEditVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{editTitle}</Text>
            <TextInput
              style={styles.input}
              value={editValue}
              onChangeText={setEditValue}
              placeholder="Edit here..."
            />
            <View style={styles.editButtonsContainer}>
              <TouchableOpacity
                style={[styles.confirmButton, { marginRight: 10 }]}
                onPress={() => {
                  onSave(editValue);
                  setEditVisible(false);
                }}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setEditVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

// Expose APIs for both modals
export const ModalAPI = {
  showAlert: (title, message) => showAlert(title, message),
  showEditModal: (title, initialValue, saveCallback) =>
    showEditModal(title, initialValue, saveCallback),
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: Dimensions.get("window").width * 0.8,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15, // Ensures text has proper spacing from the edges
    alignItems: "flex-start", // Align content to the left, except for the title
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center", // Keeps the title centered
    alignSelf: "center", // Ensures proper alignment within the container
    color: "#758694",
    fontFamily: "Poppins-ExtraBold"
  },
  modalMessage: {
    fontSize: 16,
    color: "#758694",
    marginBottom: 20,
    lineHeight: 24, // Adds consistent line spacing for multi-line text
    fontFamily: "Poppins-Bold"

  },
  confirmButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#22BABB",
    alignItems: "center",
    width: "50%",
    alignSelf: "center"
  },
  modalTitleContainer: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#EFF8FF",
    paddingVertical: 5,
    width: "80%",
    borderRadius: 15,
    marginBottom: 5,
    shadowColor: "#758694",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.75,
    shadowRadius: 4,
    elevation: 5,
  },
  modalMessageContainer: {
    alignSelf: "center",
    backgroundColor: "#EFF8FF",
    paddingVertical: 5,
    width: "90%",
    borderRadius: 15,
    shadowColor: "#758694",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 10
  },
  cancelButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#FF5A5F",
    alignItems: "center",
    width: "50%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  editButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
