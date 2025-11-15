import * as React from "react";
import { Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CompanyScreen from "../../screens/Candidates/CompanyScreen";
import CompanyDetailScreen from "../../screens/Candidates/CompanyDetailScreen";

const Stack = createNativeStackNavigator();
const HEADER_COLOR = "#4868B3";

const ensure = (name, Comp) =>
  Comp ||
  (() => (
    <Text style={{ padding: 20, color: "red" }}>{name} is undefined</Text>
  ));

const defaultStackOptions = {
  headerStyle: {
    backgroundColor: HEADER_COLOR,
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  headerShadowVisible: false,
};

export default function CompanyStack() {
  console.log("check company screens", {
    CompanyScreen: !!CompanyScreen,
    CompanyDetailScreen: !!CompanyDetailScreen,
  });

  return (
    <Stack.Navigator screenOptions={defaultStackOptions}>
      <Stack.Screen
        name="CompanyList"
        component={ensure("CompanyScreen", CompanyScreen)}
        options={{ title: "Công ty" }}
      />
      <Stack.Screen
        name="CompanyDetail"
        component={ensure("CompanyDetailScreen", CompanyDetailScreen)}
        options={{ title: "Chi tiết công ty" }}
      />
    </Stack.Navigator>
  );
}
