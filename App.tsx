import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screens/home';
import SettingsScreen from './screens/settings';
import DetailsScreen from './screens/movies/details';
import {Provider} from 'react-redux';
import {store} from './store';

const Tab = createBottomTabNavigator();

const tabBarIcon = ({
  focused,
  color,
  size,
  routeName,
}: {
  focused: boolean;
  color: string;
  size: number;
  routeName: string;
}) => {
  let iconName;

  if (routeName === 'TabHome') {
    iconName = focused ? 'home' : 'home-outline';
  } else if (routeName === 'TabSettings') {
    iconName = focused ? 'settings' : 'settings-outline';
  }

  return <Ionicons name={iconName!} size={size} color={color} />;
};

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createNativeStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="Details" component={DetailsScreen} />
    </SettingsStack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) =>
              tabBarIcon({focused, color, size, routeName: route.name}),
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
          })}>
          <Tab.Screen name="TabHome" component={HomeStackScreen} />
          <Tab.Screen name="TabSettings" component={SettingsStackScreen} />
        </Tab.Navigator>
        {/* <Stack.Navigator>
          <Stack.Screen
            name="Movies"
            component={Tabs}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator> */}
      </NavigationContainer>
    </Provider>
  );
}
