import SplashPage from "@/components/SplashPage";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function DemoPage() {
  const [showSplash, setShowSplash] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Initializing...");

  useEffect(() => {
    // Simulate different loading stages
    const loadingStages = [
      "Initializing...",
      "Loading game data...",
      "Preparing UI...",
      "Almost ready...",
      "Welcome to OkeyScore!",
    ];

    let currentStage = 0;
    const interval = setInterval(() => {
      if (currentStage < loadingStages.length - 1) {
        currentStage++;
        setLoadingMessage(loadingStages[currentStage]);
      } else {
        // After showing all stages, hide splash after 2 seconds
        setTimeout(() => {
          setShowSplash(false);
        }, 2000);
        clearInterval(interval);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  if (showSplash) {
    return <SplashPage message={loadingMessage} />;
  }

  return (
    <View style={styles.container}>
      <SplashPage message="Demo Complete!" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#10395d",
  },
});
