import { GameProvider } from "@/contexts/GameContext";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { BlurView } from "expo-blur";
import { Stack } from "expo-router";
import React from "react";
import { Platform, StyleSheet } from "react-native";

function ModernHeaderBackground() {
  return (
    <BlurView
      tint={Platform.OS === "ios" ? "systemChromeMaterialLight" : "light"}
      intensity={80}
      style={StyleSheet.absoluteFill}
    />
  );
}

export default function RootLayout() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <GameProvider>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerTintColor: "#181C24",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 22,
            },
            headerBackground: () => <ModernHeaderBackground />,
            headerShadowVisible: false,
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="player-input" options={{ title: "Player Input" }} />
          <Stack.Screen name="add-players" options={{ title: "New Game" }} />

        </Stack>
      </GameProvider>
    </ApplicationProvider>
  );
}
