import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

const DateSelectionScreen = () => {
  const navigation = useNavigation();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [pickupTime, setPickupTime] = useState('12:00 PM');
  const [dropOffTime, setDropOffTime] = useState('12:00 AM');
  const [showPickupTimePicker, setShowPickupTimePicker] = useState(false);
  const [showDropOffTimePicker, setShowDropOffTimePicker] = useState(false);

  const handleDateSelect = (date) => {
    if (!startDate) {
      // Selecting start date
      setStartDate(date.dateString);
    } else if (!endDate) {
      // Selecting end date
      setEndDate(date.dateString);
    } else {
       setStartDate(null);
      setEndDate(null);
    }

  
  };

  const isDateSelected = (date) => {
   
    return date.dateString === startDate || date.dateString === endDate;

  };

  
  const isDateInRange = (date) => {
    if (startDate && endDate) {
      return date.dateString >= startDate && date.dateString <= endDate;
    }
    return false;
  };

  const logdata = ()=>{
  const duration = {
    "startDate":startDate,
    "endDate":endDate,
    "pickupTime":pickupTime,
    "dropOffTime":dropOffTime
  };

  //console.log(duration);
 
  navigation.navigate('HomeScreen', {
    startDate,
    endDate,
    pickupTime,
    dropOffTime
  });
  }

  const markedDates = {
    [startDate]: { selected: true, startingDay: true, color: '#F4AB4D', borderRadius: 20 },
    [endDate]: { selected: true, endingDay: true, color: '#F4AB4D', borderRadius: 20 },
  };

  if (startDate && endDate) {
    const currentDate = new Date(startDate);
    while (currentDate <= new Date(endDate)) {
      const dateString = currentDate.toISOString().split('T')[0];
      if (dateString !== startDate && dateString !== endDate) {
        markedDates[dateString] = { color: '#F4AB4D', textColor: 'white', selected: true };
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  if (startDate === endDate && startDate) {
    markedDates[startDate] = { color: '#F4AB4D', textColor: 'white', selected: true };
  }

  const handlePickupTimeChange = (event, selectedTime) => {
    setShowPickupTimePicker(false);
    if (selectedTime) {
      const timeString = selectedTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
      });
      setPickupTime(timeString);
    }
  };

  const handleDropOffTimeChange = (event, selectedTime) => {
    setShowDropOffTimePicker(false);
    if (selectedTime) {
      const timeString = selectedTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
      });
      setDropOffTime(timeString);
    }
  };

  const showPickupTimePickerModal = () => {
    setShowPickupTimePicker(true);
  };

  const showDropOffTimePickerModal = () => {
    setShowDropOffTimePicker(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log('Back button pressed')}>
          <Ionicons name="arrow-back" size={24} color="#F4AB4D" />
        </TouchableOpacity>
        <Text style={styles.title}>Select Dates</Text>
        <TouchableOpacity onPress={() => console.log('Done button pressed')}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={handleDateSelect}
          markedDates={markedDates}
          markingType={'period'}
          theme={{
            calendarBackground: '#101821',
            selectedDayBackgroundColor: '#F4AB4D',
            selectedDayTextColor: 'white',
            todayTextColor: 'white',
            arrowColor: '#F4AB4D',
            monthTextColor: '#F4AB4D',
            dayTextColor: '#F4AB4D',
            'stylesheet.calendar.main': {
              week: {
                marginTop: 7,
                marginBottom: 7,
                flexDirection: 'row',
                justifyContent: 'space-around',
              },
              dayText: {
                color: 'white', // Set color for all dates of the selected month
              },
              notSelectedDayText: {
                color: 'gray', // Set color for all dates of other months
              },
              todayText: {
                color: '#F4AB4D',
              },
              selected: {
                backgroundColor: '#F4AB4D',
                borderRadius: 16,
                borderColor: 'transparent',
              },
            },
          }}
        />
      </View>

      <View style={styles.timeContainer}>
        <View style={styles.timeSection}>
          <Ionicons name="time" size={24} color="#F4AB4D" />
          <Text style={styles.timeTitle}>Pick-Up:</Text>
        </View>
        <TouchableOpacity onPress={showPickupTimePickerModal}>
          <Text style={styles.timeText}>{pickupTime}</Text>
        </TouchableOpacity>
        {showPickupTimePicker && (
          <DateTimePicker
            value={new Date()}
            mode="time"
            display="default"
            onChange={handlePickupTimeChange}
          />
        )}
      </View>

      <View style={styles.timeContainer}>
        <View style={styles.timeSection}>
          <Ionicons name="time" size={24} color="#F4AB4D" />
          <Text style={styles.timeTitle}>Drop-Off:</Text>
        </View>
        <TouchableOpacity onPress={showDropOffTimePickerModal}>
          <Text style={styles.timeText}>{dropOffTime}</Text>
        </TouchableOpacity>
        {showDropOffTimePicker && (
          <DateTimePicker
            value={new Date()}
            mode="time"
            display="default"
            onChange={handleDropOffTimeChange}
          />
        )}
      </View>

      <TouchableOpacity
      onPress={()=>logdata()}
      style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101821',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F4AB4D',
    textAlign: 'center',
    marginBottom: 16,
  },
  doneText: {
    fontSize: 16,
    color: '#F4AB4D',
  },
  calendarContainer: {
    flex: 1,
    padding: 16,
    marginBottom: 16,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
  },
  timeSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#F4AB4D',
  },
  timeText: {
    fontSize: 16,
    marginLeft: 8,
    color: 'white',
  },
  buttonContainer: {
    backgroundColor: '#F4AB4D',
    marginHorizontal: 32,
    borderRadius: 10,
    paddingVertical: 12,
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default DateSelectionScreen;
