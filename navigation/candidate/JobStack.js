import * as React from "react";
import { Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import JobListScreen from "../../screens/Candidates/JobListScreen";
import JobDetailScreen from "../../screens/Candidates/JobdetailScreen";

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

export default function JobStack() {
  console.log("check job screens", {
    JobListScreen: !!JobListScreen,
    JobDetailScreen: !!JobDetailScreen,
  });

  return (
    <Stack.Navigator screenOptions={defaultStackOptions}>
      <Stack.Screen
        name="JobList"
        component={ensure("JobListScreen", JobListScreen)}
        options={{ title: "Công việc" }}
      />
      <Stack.Screen
        name="JobDetail"
        component={ensure("JobDetailScreen", JobDetailScreen)}
        options={{ title: "Chi tiết công việc" }}
      />
    </Stack.Navigator>
  );
}
