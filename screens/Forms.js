import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Header';

const Forms = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    address: '',
    notes: '',
  });

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    // Here you can add logic to handle the form submission
    console.log('Form Data Submitted:', formData);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header title="Client Information Form" />

      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={formData.name}
        onChangeText={(text) => handleInputChange('name', text)}
        placeholder="Enter client's name"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Age:</Text>
      <TextInput
        style={styles.input}
        value={formData.age}
        onChangeText={(text) => handleInputChange('age', text)}
        placeholder="Enter client's age"
        keyboardType="numeric"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Address:</Text>
      <TextInput
        style={styles.input}
        value={formData.address}
        onChangeText={(text) => handleInputChange('address', text)}
        placeholder="Enter client's address"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Notes:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={formData.notes}
        onChangeText={(text) => handleInputChange('notes', text)}
        placeholder="Enter additional notes"
        multiline
        numberOfLines={4}
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f0f4f8', // Lighter background for a calming effect
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#333', // Dark gray for better contrast
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    fontSize: 16,
    color: '#333', // Improved readability with dark text
  },
  textArea: {
    height: 120, // Slightly increased height for the text area for better usability
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 50, // More rounded corners for a modern look
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // Elevation for Android to match shadow effect
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600', // Slightly lighter bold for a more modern feel
  },
});

export default Forms;
