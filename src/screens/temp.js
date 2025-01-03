import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';

const DateSelectionScreen = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateSelect = (date) => {
    if (!startDate) {
      // Selecting start date
      setStartDate(date.dateString);
    } else if (!endDate) {
      // Selecting end date
      setEndDate(date.dateString);
    } else {
      // Both start and end dates are selected, reset selection
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

  const markedDates = {
    [startDate]: { selected: true, startingDay: true, color: 'orange', borderRadius: 20 },
    [endDate]: { selected: true, endingDay: true, color: 'orange', borderRadius: 20 },
  };

  if (startDate && endDate) {
    const currentDate = new Date(startDate);
    while (currentDate <= new Date(endDate)) {
      const dateString = currentDate.toISOString().split('T')[0];
      if (dateString !== startDate && dateString !== endDate) {
        markedDates[dateString] = { color: 'orange', textColor: 'white', selected: true };
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  if (startDate === endDate && startDate) {
    markedDates[startDate] = { color: 'orange', textColor: 'white', selected: true };
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log('Back button pressed')}>
          <Ionicons name="arrow-back" size={24} color="black" />
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
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  doneText: {
    fontSize: 16,
    color: 'blue',
  },
  calendarContainer: {
    flex: 1,
    padding: 16,
  },
});

export default DateSelectionScreen;
