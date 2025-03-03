import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

const MessagingScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState([]);

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: message,
      isUser: true,
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  const handleAttachDocument = () => {
    const newAttachment = {
      id: Date.now(),
      name: "Document.pdf",
    };

    setAttachments([...attachments, newAttachment]);
  };

  const renderMessage = ({ item }) => {
    const messageStyle = item.isUser
      ? styles.userMessage
      : styles.recipientMessage;

    return (
      <View style={[styles.messageBubble, messageStyle]}>
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={["#1E3C72", "#2A5298"]}
        style={styles.headerContainer}
      >
        <View style={styles.headerContent}>
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={32} color="#FFF" />
          </TouchableOpacity>

          {/* Title */}
          <Text style={styles.headerText}>Messaging</Text>
        </View>
      </LinearGradient>

      {/* Messages */}
      <View style={styles.messagesContainer}>
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id.toString()}
          inverted
        />
      </View>

      {/* Attachments */}
      {attachments.length > 0 && (
        <View style={styles.attachmentsContainer}>
          <Text style={styles.attachmentsHeader}>Attachments:</Text>
          {attachments.map((attachment) => (
            <Text key={attachment.id} style={styles.attachmentName}>
              {attachment.name}
            </Text>
          ))}
        </View>
      )}

      {/* Input */}
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={handleAttachDocument}>
          <MaterialIcons name="attach-file" size={28} color="#0288D1" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={message}
          onChangeText={setMessage}
          placeholderTextColor="#A6AEBF"
        />
        <TouchableOpacity onPress={handleSend}>
          <MaterialIcons name="send" size={28} color="#0288D1" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MessagingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  headerContainer: {
    padding: 20, // Increased padding to adjust for the drop
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginBottom: 10,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 5, // Spacing between button and title
    paddingVertical: 5, // Vertical padding for larger button area
  },
  headerText: {
    color: "#FFF",
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    textAlign: "left",
    marginLeft: 5, // Move the title slightly to the right
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  messageBubble: {
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
    maxWidth: "70%",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#0288D1",
  },
  recipientMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#E0E0E0",
  },
  messageText: {
    fontSize: 16,
    color: "#FFF",
  },
  attachmentsContainer: {
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  attachmentsHeader: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: "#0288D1",
  },
  attachmentName: {
    fontSize: 14,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#FFF",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#CCC",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    fontSize: 16,
    backgroundColor: "#F5F5F5",
  },
});
