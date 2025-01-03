import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image, ImagePickerIOS } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const UserProfileEditScreen = ({ navigation }) => {
  const [name, setName] = useState('John Doe');
  const [address, setAddress] = useState('123 Main St, City, Country');
  const [email, setEmail] = useState('johndoe@example.com');
  const [contactNumber, setContactNumber] = useState('123-456-7890');
  const [profilePic, setProfilePic] = useState(require('../../assets/images/yo.png'));
  const [licensePdf, setLicensePdf] = useState(null);

  const handleSaveChanges = () => {
    // Implement your logic to save the changes here
    // This could involve API calls or updating local state
    // For demonstration purposes, we'll just log the changes
    console.log('Name:', name);
    console.log('Address:', address);
    console.log('Email:', email);
    console.log('Contact Number:', contactNumber);
    console.log('Profile Picture:', profilePic);
    console.log('License PDF:', licensePdf);
  };

  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setProfilePic(result.assets[0].uri);
      }
    } catch (error) {
      console.log('ImagePicker Error:', error);
    }
  };

  const handlePickLicense = () => {
    // Implement license picker logic here
    // For demonstration purposes, we'll just set a sample PDF
    // setLicensePdf(require('../../assets/documents/sample-license.pdf'));
    console.log('Upload License');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSaveChanges}>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <TouchableOpacity onPress={handlePickImage}>
          <Image source={profilePic} style={styles.profilePic} />
        </TouchableOpacity>
        
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Contact Number</Text>
        <TextInput
          style={styles.input}
          value={contactNumber}
          onChangeText={setContactNumber}
        />

        <TouchableOpacity style={styles.uploadButton} onPress={handlePickLicense}>
          <Ionicons name="attach" size={24} color="white" />
          <Text style={styles.uploadButtonText}>Upload License</Text>
        </TouchableOpacity>

        {licensePdf && (
          <Text style={styles.uploadedFileText}>License uploaded: {licensePdf}</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101821',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#1E2D3E',
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  saveButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F4AB4D',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 8,
    padding: 10,
    color: 'white',
    marginBottom: 20,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4AB4D',
    borderRadius: 8,
    padding: 10,
  },
  uploadButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  uploadedFileText: {
    fontSize: 16,
    color: 'white',
    marginTop: 10,
  },
});

export default UserProfileEditScreen;
