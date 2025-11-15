import * as React from "react";
import { Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfileScreen from "../../screens/Candidates/ProfileScreen";

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

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={defaultStackOptions}>
      <Stack.Screen
        name="ProfileMain"
        component={ensure("ProfileScreen", ProfileScreen)}
        options={{
          title: "Hồ sơ",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}
