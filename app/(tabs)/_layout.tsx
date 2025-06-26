import { t } from "@/constants/Translations";
import { useLanguageRefresh } from "@/hooks/useLanguageRefresh";
import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

export default function TabLayout() {
  // This hook ensures the component re-renders when language changes
  useLanguageRefresh();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "#E5E6EA",
          borderTopWidth: 1,
          paddingTop: 12,
          paddingBottom: Platform.OS === "ios" ? 28 : 18,
          paddingHorizontal: 24,
          minHeight: 85,
        },
        tabBarActiveTintColor: "#0071E3",
        tabBarInactiveTintColor: "#000000",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          letterSpacing: -0.2,
        },
      }}
    >
      <Tabs.Screen
        name="add-players"
        options={{
          title: t("addPlayers"),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="people" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="game"
        options={{
          title: t("game"),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="play-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="results"
        options={{
          title: t("results"),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="bar-chart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t("settings"),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
