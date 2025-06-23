import { GameProvider } from "@/contexts/GameContext";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { BlurView } from "expo-blur";
import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { Platform, StyleSheet, useColorScheme } from "react-native";

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
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Add manifest link to head if not already present
    if (typeof document !== "undefined") {
      const existingManifest = document.querySelector('link[rel="manifest"]');
      if (!existingManifest) {
        const manifestLink = document.createElement("link");
        manifestLink.rel = "manifest";
        manifestLink.href = "/manifest.json";
        document.head.appendChild(manifestLink);
      }
    }
  }, []);

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
            animation: "slide_from_right",
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="select-rounds" />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </GameProvider>
    </ApplicationProvider>
  );
}
