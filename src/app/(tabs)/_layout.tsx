import { useAuth } from "@clerk/expo";
import { Redirect, Tabs } from "expo-router";
import { useColorScheme } from "nativewind";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { useGroceryStore } from "@/src/app/store/grocery-store";
import { useEffect } from "react";

export default function TabsLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const {loadItems,items}=useGroceryStore()
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  useEffect(() => {
    loadItems();
  },[])
  console.log("ITEMS:",items)
  const tabTintColor = isDark ? "hsl(142 70% 54%)" : "hsl(147 75% 33%)";
  const inactiveColor = isDark ? "hsl(215 15% 55%)" : "hsl(215 15% 45%)";
  const barBackground = isDark ? "hsl(222 20% 12%)" : "hsl(0 0% 100%)";
  const borderColor = isDark ? "hsl(222 15% 20%)" : "hsl(220 15% 92%)";

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: tabTintColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginTop: -2,
        },
        tabBarStyle: {
          position: "absolute",
          left: 16,
          right: 16,
          bottom: Platform.OS === "ios" ? 28 : 16,
          height: 64,
          borderRadius: 24,
          backgroundColor: barBackground,
          borderTopWidth: 0,
          borderWidth: 1,
          borderColor: borderColor,
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: isDark ? 0.4 : 0.1,
          shadowRadius: 16,
          paddingTop: 10,
          paddingBottom: 10,
        },
        tabBarItemStyle: {
          borderRadius: 18,
          marginHorizontal: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "List",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "list" : "list-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="planner"
        options={{
          title: "Planner",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "add-circle" : "add-circle-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="insights"
        options={{
          title: "Insights",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "bar-chart" : "bar-chart-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}