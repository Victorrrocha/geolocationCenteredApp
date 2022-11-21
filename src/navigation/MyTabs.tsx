import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import AddMarker from '../screens/AddMarker.page';
import Icon from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MarkerList from '../screens/MarkerList.page';
import {useTheme} from 'styled-components';
import {Theme} from '../styled/theme';

const Tab = createBottomTabNavigator();

function MyTabs() {
  const theme = useTheme() as Theme;

  return (
    <Tab.Navigator screenOptions={{tabBarActiveTintColor: theme.color.primary}}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
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
        name="Add New Marker"
        component={AddMarker}
        listeners={{
          tabPress: e => e.preventDefault(),
        }}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Ionicons
              name="add-circle-outline"
              size={30}
              color={focused ? theme.color.primary : color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="My Markers"
        component={MarkerList}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Ionicons
              name="list"
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
