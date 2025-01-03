import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Signup from './src/screens/Signup';
import FindCarsScreen from './src/screens/FindCarsScreen';
import CarDetailsScreen from './src/screens/CarDetailsScreen';
import LocationScreen from './src/screens/LocationScreen';
import DateSelectionScreen from './src/screens/DateSelectionScreen';
import HomeScreen from './src/screens/HomeScreen';
import LaunchScreen from './src/screens/LaunchScreen';
// import LaunchScreen from './src/screens/LaunchScreen';
import CarFilterScreen from './src/screens/CarFilterScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import Login from './src/screens/Login';
import * as Font from 'expo-font';
import { COLORS } from './src/constants/index';
import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import VerifyScreen from './src/screens/VerifyNow';
import ChooseRoleScreen from './src/screens/ChooseRoleScreen';
import RenterLoginScreen from './src/screens/RenterLoginScreen';
import RenterCreateAccountScreen from './src/screens/RenterCreateAccountScreen';
import CarOwnerLoginScreen from './src/screens/CarOwnerLoginScreen';
import CarOwnerCreateAccountScreen from './src/screens/CarOwnerCreateAccountScreen';
import RenterUserProfileScreen from './src/screens/RenterUserProfileScreen';
import ListedCarsScreen from './src/screens/ListedCarsScreen';
import EditCarScreen from './src/screens/EditCarScreen';
import OrderListScreen from './src/screens/OrderListScreen';
import OwnerHome from './src/screens/OwnerHome';
import AddCarScreen from './src/screens/AddCarScreen';
import OrderDetailsScreen from './src/screens/OrderDetailsScreen';
import OwnerUserProfileScreen from './src/screens/OwnerUserProfileScreen' ;

import RenterUserProfileEditScreen from './src/screens/RenterUserProfileEditScreen';
import OwnerUserProfileEditScreen from './src/screens/OwnerUserProfileEditScreen';

import PreviouslyRentedCarsScreen from './src/screens/PreviouslyRentedCarsScreen';

import CustomerSupportScreen from './src/screens/CustomerSupportScreen';

import PrivacyPolicyTermsScreen from './src/screens/PrivacyPolicyTermsScreen';

import TotalEarningsScreen from './src/screens/TotalEarningsScreen';

import * as SQLite from 'expo-sqlite';

const Stack = createStackNavigator();
const db = SQLite.openDatabase('user_db');


const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.primary,
  },
};



export default function App() {  

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS cars ( id INTEGER PRIMARY KEY, name TEXT, model TEXT, address TEXT, price INTEGER, description TEXT, specifications TEXT, images TEXT, seats INTEGER, carType TEXT, transmission TEXT, deliveryType TEXT, startDate TEXT, endDate TEXT, Addedby_id INTEGER );'
      );
    });
  }, []);

  



function addCarIfNotExists(car) {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM cars WHERE id = ?',
      [car.id],
      (_, result) => {
        if (result.rows.length === 0) {
          // If car does not exist, insert it
          tx.executeSql(
            'INSERT INTO cars (id, name, model, address, price, description, specifications, images, seats, carType, transmission, deliveryType, startDate, endDate, Addedby_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
              car.id,
              car.name,
              car.model,
              car.address,
              car.price,
              car.description,
              JSON.stringify(car.specifications),
              JSON.stringify(car.images),
              car.seats,
              car.carType,
              car.transmission,
              car.deliveryType,
              car.startDate,
              car.endDate,
              car.Addedby_id
            ],

            (_, result) => {
              console.log('Car inserted:', result);
            },
            (_, error) => {
              console.log('Error inserting car:', error);
            }
          );
        } else {
          console.log('Car already exists:', result.rows._array[0]);
        }
      },
      (_, error) => {
        console.log('Error fetching car:', error);
      }
    );
  });
}


const cars = [
  {
    id: 1,
    Addedby_id: 10,
    name: "BMW",
    model: "Some BMW Model",
    address: "17 Forest Grove, St. Albert, AB, Canada",
    price: 70,
    description: "Low Mileage Car",
    specifications: ["Sunroof", "Bluetooth connectivity", "Advanced safety features"],
    images: [
      require('./assets/images/1.jpg'),
      require('./assets/images/2.jpg'),
      require('./assets/images/3.jpg')
    ],
    seats: 4,
    carType: "Sedan",
    transmission: "Automatic",
    deliveryType: "Pick-up",
    startDate: "2023-08-01",
    endDate: "2023-08-11"
  },
  {
    id: 2,
    Addedby_id: 10,
    name: "AUDI",
    model: "Some Audi Model",
    address: "17 Forest Grove, St. Albert, AB, Canada",
    price: 70,
    description: "Low Mileage Car",
    specifications: ["Sunroof", "Bluetooth connectivity", "Advanced safety features"],
    images: [
      require('./assets/images/1.jpg'),
      require('./assets/images/2.jpg'),
      require('./assets/images/3.jpg')
    ],
    seats: 5,
    carType: "SUV",
    transmission: "Manual",
    deliveryType: "Drop-off",
    startDate: "2023-08-01",
    endDate: "2023-08-11"
  },
  {
    id: 3,
    Addedby_id: 10,
    name: "Mercedes-Benz",
    model: "Some Mercedes-Benz Model",
    address: "17 Forest Grove, St. Albert, AB, Canada",
    price: 70,
    description: "Low Mileage Car",
    specifications: ["Sunroof", "Bluetooth connectivity", "Advanced safety features"],
    images: [
      require('./assets/images/1.jpg'),
      require('./assets/images/2.jpg'),
      require('./assets/images/3.jpg')
    ],
    seats: 2,
    carType: "Convertible",
    transmission: "Automatic",
    deliveryType: "Both",
    startDate: "2023-08-17",
    endDate: "2023-08-27"
  },
  {
    id: 4,
    Addedby_id: 10,
    name: "Toyota",
    model: "Some Toyota Model",
    address: "35 Forest Drive, St. Albert, AB, Canada",
    price: 70,
    description: "Low Mileage Car",
    specifications: ["Sunroof", "Bluetooth connectivity", "Advanced safety features"],
    images: [
      require('./assets/images/1.jpg'),
      require('./assets/images/2.jpg'),
      require('./assets/images/3.jpg')
    ],
    seats: 7,
    carType: "Luxury",
    transmission: "Manual",
    deliveryType: "Pick-up",
    startDate: "2023-08-17",
    endDate: "2023-08-27"
  },
  {
    id: 5,
    Addedby_id: 10,
    name: "Honda",
    model: "Some Honda Model",
    address: "35 Forest Drive, St. Albert, AB, Canada",
    price: 70,
    description: "Low Mileage Car",
    specifications: ["Sunroof", "Bluetooth connectivity", "Advanced safety features"],
    images: [
      require('./assets/images/1.jpg'),
      require('./assets/images/2.jpg'),
      require('./assets/images/3.jpg')
    ],
    seats: 2,
    carType: "SUV",
    transmission: "Automatic",
    deliveryType: "Drop-off",
    startDate: "2023-08-17",
    endDate: "2023-08-27"
  },
  {
    id: 6,
    Addedby_id: 10,
    name: "Ford",
    model: "Some Ford Model",
    address: "17 Forest Grove, St. Albert, AB, Canada",
    price: 65,
    description: "Well-Maintained Car",
    specifications: ["Power windows", "Keyless entry", "Cruise control"],
    images: [
      require('./assets/images/1.jpg'),
      require('./assets/images/2.jpg'),
      require('./assets/images/3.jpg')
    ],
    seats: 5,
    carType: "Convertible",
    transmission: "Automatic",
    deliveryType: "Pick-up",
    startDate: "2023-08-05",
    endDate: "2023-08-15"
  },
  {
    id: 7,
    Addedby_id: 10,
    name: "Chevrolet",
    model: "Some Chevrolet Model",
    address: "17 Forest Grove, St. Albert, AB, Canada",
    price: 75,
    description: "Fuel-Efficient Car",
    specifications: ["Air conditioning", "Remote start", "Touchscreen display"],
    images: [
      require('./assets/images/1.jpg'),
      require('./assets/images/2.jpg'),
      require('./assets/images/3.jpg')
    ],
    seats: 7,
    carType: "Sedan",
    transmission: "Automatic",
    deliveryType: "Drop-off",
    startDate: "2023-08-10",
    endDate: "2023-08-20"
  },
  {
    id: 8,
    Addedby_id: 10,
    name: "Nissan",
    model: "Some Nissan Model",
    address: "17 Forest Grove, St. Albert, AB, Canada",
    price: 60,
    description: "Compact Car",
    specifications: ["Rearview camera", "USB ports", "Keyless ignition"],
    images: [
      require('./assets/images/1.jpg'),
      require('./assets/images/2.jpg'),
      require('./assets/images/3.jpg')
    ],
    seats: 4,
    carType: "SUV",
    transmission: "Automatic",
    deliveryType: "Both",
    startDate: "2023-08-12",
    endDate: "2023-08-22"
  },
  {
    id: 9,
    Addedby_id: 10,
    name: "Volkswagen",
    model: "Some Volkswagen Model",
    address: "35 Forest Drive, St. Albert, AB, Canada",
    price: 80,
    description: "Family Car",
    specifications: ["Power seats", "Apple CarPlay", "Android Auto"],
    images: [
      require('./assets/images/1.jpg'),
      require('./assets/images/2.jpg'),
      require('./assets/images/3.jpg')
    ],
    seats: 5,
    carType: "SUV",
    transmission: "Automatic",
    deliveryType: "Pick-up",
    startDate: "2023-08-15",
    endDate: "2023-08-25"
  },
  {
    id: 10,
    Addedby_id: 10,
    name: "Kia",
    model: "Some Kia Model",
    address: "35 Forest Drive, St. Albert, AB, Canada",
    price: 55,
    description: "Economical Car",
    specifications: ["Steering wheel controls", "LED headlights", "Rear parking sensors"],
    images: [
      require('./assets/images/1.jpg'),
      require('./assets/images/2.jpg'),
      require('./assets/images/3.jpg')
    ],
    seats: 4,
    carType: "Luxury",
    transmission: "Automatic",
    deliveryType: "Drop-off",
    startDate: "2023-08-20",
    endDate: "2023-08-30"
  }
];


cars.forEach(car => {
  addCarIfNotExists(car);
});


  // Fetching cars
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM cars',
        [],
        (_, result) => {
          console.log('All cars:', JSON.stringify(result.rows._array, null, 2));
        },
        (_, error) => {
          console.log('Error fetching cars:', error);
        }
      );
    });
  }, []);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM cars',
        [],
        (_, result) => {
          console.log('All cars:', JSON.stringify(result.rows._array, null, 2));
        },
        (_, error) => {
          console.log('Error fetching cars:', error);
        }
      );
    });
  }, []);
  
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, number TEXT, password TEXT);',
      );
    });
  }, []);
  
  

  const [fontsLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await Font.loadAsync({
        'Inter': require('./assets/Inter.ttf')
      }).then(() => {
        setFontLoaded(true);
      });
    })();
  }, []);

  if (!fontsLoaded) {
    return null; 
  } else {
    return (
     
      <View style={styles.container}>
        <NavigationContainer theme={navTheme}>

      
          <Stack.Navigator initialRouteName="LaunchScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LaunchScreen" component={LaunchScreen} />

            <Stack.Screen name="ChooseRoleScreen" component={ChooseRoleScreen} />
            <Stack.Screen name="RenterLoginScreen" component={RenterLoginScreen} />
            <Stack.Screen name="RenterCreateAccountScreen" component={RenterCreateAccountScreen} />
            <Stack.Screen name="CarOwnerLoginScreen" component={CarOwnerLoginScreen} />
            <Stack.Screen name="CarOwnerCreateAccountScreen" component={CarOwnerCreateAccountScreen} />
            <Stack.Screen name="OrderListScreen" component={OrderListScreen} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="VerifyScreen" component={VerifyScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="LocationScreen" component={LocationScreen} />
            <Stack.Screen name="DateSelectionScreen" component={DateSelectionScreen} />
            <Stack.Screen name="FindCarsScreen" component={FindCarsScreen} />
            <Stack.Screen name="CarFilterScreen" component={CarFilterScreen} />
            <Stack.Screen name="CarDetailsScreen" component={CarDetailsScreen} />
            <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
            <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
            <Stack.Screen name="RenterUserProfileScreen" component={RenterUserProfileScreen} />
            <Stack.Screen name="ListedCarsScreen" component={ListedCarsScreen} />
            <Stack.Screen name="EditCarScreen" component={EditCarScreen} />

            <Stack.Screen name="OwnerHome" component={OwnerHome} />
            <Stack.Screen name="AddCarScreen" component={AddCarScreen} />
            <Stack.Screen name="OrderDetailsScreen" component={OrderDetailsScreen} />
            <Stack.Screen name="OwnerUserProfileScreen" component={OwnerUserProfileScreen} />
            <Stack.Screen name="RenterUserProfileEditScreen" component={RenterUserProfileEditScreen} />
            <Stack.Screen name="OwnerUserProfileEditScreen" component={OwnerUserProfileEditScreen} />
            <Stack.Screen name="PreviouslyRentedCarsScreen" component={PreviouslyRentedCarsScreen} />
            <Stack.Screen name="CustomerSupportScreen" component={CustomerSupportScreen} />
            <Stack.Screen name="PrivacyPolicyTermsScreen" component={PrivacyPolicyTermsScreen} />
            <Stack.Screen name="TotalEarningsScreen" component={TotalEarningsScreen} />

          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
});