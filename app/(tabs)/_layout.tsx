import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
         animation: 'fade', // or 'shift'
    transitionSpec: {
      animation: 'timing',
      config: {
        duration: 250,
      },
    },
        tabBarActiveTintColor: "#0a7ea4",
        tabBarInactiveTintColor: "#687076",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0.5,
          borderTopColor: "#eee",
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="add-players"
        options={{
          title: "Add Players",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person-add" color={color} size={size ?? 24} />
          ),
          headerTitle: "Add Players",
        }}
      />
   
      <Tabs.Screen
        name="game"
        options={{
          title: "Current Game",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="sports-esports" color={color} size={size ?? 24} />
          ),
          headerTitle: "Current Game",
        }}
      />
      <Tabs.Screen
        name="results"
        options={{
          title: "Results",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="list" color={color} size={size ?? 24} />
          ),
          headerTitle: "Results",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" color={color} size={size ?? 24} />
          ),
          headerTitle: "Settings",
        }}
      />
    </Tabs>
  );
}
