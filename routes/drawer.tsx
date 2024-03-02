import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

// stacks
import HomeStack from '../screens/home';
import AboutStack from '../screens/about';

const Drawer = createDrawerNavigator();

export default function RootDrawerNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeStack} />
        <Drawer.Screen name="Notifications" component={AboutStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
