// navigation/MainTabs.js
import * as React from "react";
import { Text, StyleSheet, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { AuthContext } from "../../context/AuthContext";

import JobStack from "./JobStack";
import CompanyStack from "./CompanyStack";
import ProfileStack from "./ProfileStack";

import EmployerScreen from "../../screens/Candidates/EmployerScreen";
import LoginScreen from "../../screens/Candidates/LoginScreen";
import RegisterScreen from "../../screens/Candidates/RegisterScreen";

const Tab = createBottomTabNavigator();
const HEADER_COLOR = "#4868B3";

function ensure(name, Comp) {
  if (!Comp) {
    console.error(`[MainTabs] ${name} is undefined`);
    return () => (
      <Text style={{ padding: 20, color: "red" }}>{name} is undefined</Text>
    );
  }
  return Comp;
}

/* ----------------------------- Common tab options ----------------------------- */
function useTabScreenOptions() {
  const insets = useSafeAreaInsets();
  const safeBottom = insets.bottom ?? 0;

  return React.useMemo(
    () => ({
      headerTitleAlign: "center",
      // ❌ Bỏ dòng này đi để header tab đồng bộ với header trong các Stack
      // headerStatusBarHeight: Platform.OS === "android" ? 0 : undefined,

      headerStyle: {
        backgroundColor: HEADER_COLOR,
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
      headerTitleStyle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#fff",
      },
      headerTintColor: "#fff",

      tabBarActiveTintColor: "#2563EB",
      tabBarInactiveTintColor: "#8e8e93",
      tabBarAllowFontScaling: false,

      tabBarLabelStyle: {
        fontSize: 11,
        marginBottom: Platform.OS === "android" ? 2 : 4,
        includeFontPadding: false,
      },

      tabBarItemStyle: {
        paddingVertical: 0,
        maxWidth: 92,
      },

      tabBarStyle: {
        position: "absolute",
        left: 12,
        right: 12,
        bottom: 0,
        borderRadius: 20,
        backgroundColor: "#ffffff",
        borderTopWidth: 0,
        paddingTop: 2,
        paddingBottom: safeBottom > 0 ? safeBottom : 4,
        elevation: 8,
        shadowColor: "#000000",
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 12,
      },

      tabBarHideOnKeyboard: true,
    }),
    [safeBottom]
  );
}

/* ----------------------------- Guest Tabs ----------------------------- */
function GuestTabs() {
  const screenOptions = useTabScreenOptions();

  return (
    <Tab.Navigator initialRouteName="Jobs" screenOptions={screenOptions}>
      <Tab.Screen
        name="Jobs"
        component={ensure("JobStack", JobStack)}
        options={{
          title: "Công việc",
          tabBarLabel: "Công Việc",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="briefcase-variant"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Company"
        component={ensure("CompanyStack", CompanyStack)}
        options={{
          title: "Công ty",
          tabBarLabel: "Công Ty",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="office-building"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* Nhà tuyển dụng: dùng header của Tab, nên sẽ được chỉnh lại high giống Job */}
      <Tab.Screen
        name="Employer"
        component={ensure("EmployerScreen", EmployerScreen)}
        options={{
          title: "Nhà tuyển dụng",
          tabBarLabel: "Nhà Tuyển Dụng",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-tie"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Login"
        component={ensure("LoginScreen", LoginScreen)}
        options={{
          title: "Đăng nhập",
          tabBarLabel: "Đăng Nhập",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="login" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Register"
        component={ensure("RegisterScreen", RegisterScreen)}
        options={{
          title: "Đăng ký",
          tabBarLabel: "Đăng Ký",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-plus"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

/* ------------------------------ App Tabs (đã đăng nhập) ------------------------------ */
function AppTabs() {
  const screenOptions = useTabScreenOptions();

  return (
    <Tab.Navigator initialRouteName="Profile" screenOptions={screenOptions}>
      <Tab.Screen
        name="Jobs"
        component={ensure("JobStack", JobStack)}
        options={{
          title: "Công việc",
          tabBarLabel: "Công Việc",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="briefcase-variant"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Company"
        component={ensure("CompanyStack", CompanyStack)}
        options={{
          title: "Công ty",
          tabBarLabel: "Công Ty",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="office-building"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Employer"
        component={ensure("EmployerScreen", EmployerScreen)}
        options={{
          title: "Nhà tuyển dụng",
          tabBarLabel: "Nhà Tuyển Dụng",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-tie"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ensure("ProfileStack", ProfileStack)}
        options={{
          title: "Hồ sơ",
          tabBarLabel: "Hồ sơ",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

/* -------------------------- Switch theo login ------------------------- */
export default function MainTabs() {
  const { isLoggedIn } = React.useContext(AuthContext);
  return isLoggedIn ? <AppTabs /> : <GuestTabs />;
}

const styles = StyleSheet.create({});
