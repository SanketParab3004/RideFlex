import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const OrderDetailsScreen = ({ route }) => {
  const { renter } = route.params;

  const handleCallRenter = () => {
    Linking.openURL(`tel:${renter.phoneNumber}`);
  };

  const handleMessageRenter = () => {
    Linking.openURL(`sms:${renter.phoneNumber}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="white" />
        <Text style={styles.title}>Renter Details</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {/* Renter profile pic and name */}
        <View style={styles.profileSection}>
          <Image source={require('../../assets/images/yo.png')} style={styles.profilePic} />
          <Text style={styles.renterName}>{renter.name}</Text>
        </View>

        {/* Total Trip Days section */}
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <View style={styles.timelineContainer}>
              <View style={styles.timelineItem}>
                <View style={styles.timelineBulletContainer}>
                  <View style={styles.timelineBulletStart} />
                  <View style={styles.timelineLine} />
                </View>
                <View style={styles.timelineContent}>
                  <Text style={styles.timeline_StartDate_Label}>Start Date</Text>
                  <Text style={styles.timelineValue}>July 12, 2023, 9:45 A.M.</Text>
                </View>
              </View>
              <View style={styles.timelineItem}>
                <View style={styles.timelineBulletContainer}>
                  <View style={styles.timelineBulletEnd} />
                </View>
                <View style={styles.timelineContent}>
                  <Text style={styles.timeline_EndtDate_Label}>End Date</Text>
                  <Text style={styles.timelineValue}>July 14, 2023, 11:45 P.M.</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Driving experience */}
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <View style={styles.additionalInfoItem}>
              <Text style={styles.additionalInfoLabel}>Driving Experience</Text>
              <Text style={styles.additionalInfoValue}>{renter.drivingExperience} years</Text>
            </View>
          </View>
        </View>

        {/* Total Trips */}
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <View style={styles.additionalInfoItem}>
              <Text style={styles.additionalInfoLabel}>Total Trips</Text>
              <Text style={styles.additionalInfoValue}>{renter.totalTrips}</Text>
            </View>
          </View>
        </View>

        {/* About Renter */}
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.aboutRenterLabel}>About Renter</Text>
            <View style={styles.aboutRenterBox}>
              <Text style={styles.aboutRenterText}>{renter.about}</Text>
            </View>
          </View>
        </View>

        {/* Call and Message Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={handleCallRenter}>
            <Ionicons name="call" size={24} color="white" />
            <Text style={styles.buttonText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleMessageRenter}>
            <Ionicons name="chatbubbles" size={24} color="white" />
            <Text style={styles.buttonText}>Message</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101821',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F4AB4D',
    textAlign: 'center',
    flex: 1,
    paddingVertical: 1,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  profileSection: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 24,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  renterName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  cardContainer: {
    marginTop: 24,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 10,
    padding: 16,
  },
  timelineContainer: {
    marginVertical: 10,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  timelineBulletContainer: {
    marginRight: 12,
  },
  timelineBulletStart: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#6AD730',
    backgroundColor: '#F4AB4D',
  },
  timelineBulletEnd: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#F44237',
    backgroundColor: '#F4AB4D',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#F4AB4D',
    marginLeft: 5,
  },
  timelineContent: {
    flex: 1,
  },
  timeline_StartDate_Label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6AD730',
  },
  timeline_EndtDate_Label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F44237',
  },
  timelineValue: {
    fontSize: 16,
    color: '#EFEEEF',
  },
  additionalInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  additionalInfoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
    color: 'white',
  },
  additionalInfoValue: {
    fontSize: 16,
    color: '#EFEEEF',
  },
  aboutRenterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
  },
  aboutRenterBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 10,
    padding: 10,
  },
  aboutRenterText: {
    fontSize: 16,
    color: '#EFEEEF',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6AD730',
    borderRadius: 8,
    padding: 10,
    flex: 1,
    marginRight: 8,
    justifyContent: 'center',
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  space: {
    height: 80,
  },
});

export default OrderDetailsScreen;
