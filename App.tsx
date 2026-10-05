import SettingsPro from './screens/SettingsPro';
import Support from './screens/Support';
import Analytics from './screens/Analytics';
import Trading from './screens/Trading';
import Security from './screens/Security';
import History from './screens/History';
import Wallet from './screens/Wallet';
import Transfer from './screens/Transfer';
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/Tabs";
import { Provider } from "react-redux";
import { globalStore } from "./stores";

const Stack = createStackNavigator();
export default function App() {
  return (
    <Provider store={globalStore}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={"MainLayout"}
        >
          <Stack.Screen name="MainLayout" component={Tabs} />
          <Stack.Screen name="Transfer" component={Transfer} />
  <Stack.Screen name="Wallet" component={Wallet} />
  <Stack.Screen name="History" component={History} />
  <Stack.Screen name="Security" component={Security} />
  <Stack.Screen name="Trading" component={Trading} />
  <Stack.Screen name="Analytics" component={Analytics} />
  <Stack.Screen name="Support" component={Support} />
  <Stack.Screen name="SettingsPro" component={SettingsPro} />
</Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
