import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import AddMarker from '../screens/AddMarker.page';
import Icon from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MarkerList from '../screens/MarkerList.page';
import {useTheme} from 'styled-components';
import {Theme} from '../styled/theme';
import Config from '../screens/Config.page';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {createStackNavigator} from '@react-navigation/stack';
import CreateTrip from '../screens/CreateTrip.page';
import SelectDestination from '../screens/SelectDestination.page';
import TripsList from '../screens/TripsList.page';

const HomeStack = createStackNavigator();
const NewTripStack = createStackNavigator();
const MyTripsStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  const theme = useTheme() as Theme;
  const darkMode = useSelector((state: RootState) => state.config.darkMode);

  const tabScreenOptions = {
    headerStyle: {
      backgroundColor: darkMode
        ? theme.color.tabs.dark
        : theme.color.tabs.light,
    },
    headerTitleStyle: {
      color: darkMode ? theme.color.dark : theme.color.light,
    },
  };

  function HomeStackScreen() {
    return (
      <HomeStack.Navigator screenOptions={tabScreenOptions}>
        <HomeStack.Screen
          options={{headerShown: false}}
          name="HomePage"
          component={Home}
        />
        <HomeStack.Screen name="Add New Marker" component={AddMarker} />
      </HomeStack.Navigator>
    );
  }

  function NewTripStackScreen() {
    return (
      <NewTripStack.Navigator screenOptions={tabScreenOptions}>
        <NewTripStack.Screen name="NewTrip" component={CreateTrip} />
        <NewTripStack.Screen
          name="SelectDestination"
          component={SelectDestination}
        />
      </NewTripStack.Navigator>
    );
  }

  function MyTripsScreen() {
    return (
      <MyTripsStack.Navigator screenOptions={tabScreenOptions}>
        <MyTripsStack.Screen name="MyTrips" component={TripsList} />
        <MyTripsStack.Screen name="MyMarkers" component={MarkerList} />
      </MyTripsStack.Navigator>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.color.primary,
        tabBarStyle: {
          backgroundColor: darkMode
            ? theme.color.tabs.dark
            : theme.color.tabs.light,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color}) => (
            <Icon
              name="world-o"
              size={24}
              color={focused ? theme.color.primary : color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="New Trip"
        component={NewTripStackScreen}
        options={{
          ...tabScreenOptions,
          headerShown: false,
          tabBarIcon: ({focused, color}) => (
            <MaterialIcons
              name="add-location"
              size={24}
              color={focused ? theme.color.primary : color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="My Trips"
        component={MyTripsScreen}
        options={{
          ...tabScreenOptions,
          headerShown: false,
          tabBarIcon: ({focused, color}) => (
            <Ionicons
              name="list"
              size={30}
              color={focused ? theme.color.primary : color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Config}
        options={{
          ...tabScreenOptions,
          tabBarIcon: ({focused, color}) => (
            <FontAwesome
              name="gear"
              size={30}
              color={focused ? theme.color.primary : color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
