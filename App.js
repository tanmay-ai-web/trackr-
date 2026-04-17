import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import ScanScreen from './screens/ScanScreen';
import AddSubscriptionScreen from './screens/AddSubscriptionScreen';
import InsightsScreen from './screens/InsightsScreen';
import SettingsScreen from './screens/SettingsScreen';
import { ThemeProvider, useTheme } from './theme/ThemeContext';
import { SubscriptionProvider } from './utils/SubscriptionContext';

const Tab = createBottomTabNavigator();

function RootNavigator() {
  const { colors, scheme } = useTheme();

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
      primary: colors.accent,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.card,
            borderTopColor: colors.border,
            height: 64,
            paddingBottom: 8,
          },
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.secondaryText,
          tabBarIcon: ({ color, size }) => {
            const icons = {
              Home: 'view-dashboard-outline',
              Scan: 'line-scan',
              Add: 'plus-circle-outline',
              Insights: 'chart-line',
              Settings: 'cog-outline',
            };
            return <MaterialCommunityIcons name={icons[route.name]} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Scan" component={ScanScreen} />
        <Tab.Screen name="Add" component={AddSubscriptionScreen} />
        <Tab.Screen name="Insights" component={InsightsScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <SubscriptionProvider>
        <RootNavigator />
      </SubscriptionProvider>
    </ThemeProvider>
  );
}
