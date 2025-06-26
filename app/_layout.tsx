import SplashPage from "@/components/SplashPage";
import { GameProvider } from "@/contexts/GameContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { BlurView } from "expo-blur";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { Animated, Platform, StyleSheet, useColorScheme } from "react-native";

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
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Initializing...");
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    // Simulate app initialization process
    const initializeApp = async () => {
      const loadingSteps = [
        { message: "Initializing...", delay: 800 },
        { message: "Loading game data...", delay: 1000 },
        { message: "Preparing interface...", delay: 800 },
        { message: "Almost ready...", delay: 600 },
      ];

      for (const step of loadingSteps) {
        setLoadingMessage(step.message);
        await new Promise((resolve) => setTimeout(resolve, step.delay));
      }

      // Final delay before showing the app
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsLoading(false);

      // Fade in the main app
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    };

    initializeApp();
  }, [fadeAnim]);

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

      // Add favicon links
      const faviconSizes = [
        16, 32, 48, 72, 96, 128, 144, 152, 192, 256, 384, 512,
      ];

      faviconSizes.forEach((size) => {
        const existingFavicon = document.querySelector(
          `link[href="/assets/images/icons/icon-${size}x${size}.png"]`
        );
        if (!existingFavicon) {
          const faviconLink = document.createElement("link");
          faviconLink.rel = "icon";
          faviconLink.type = "image/png";
          faviconLink.setAttribute("sizes", `${size}x${size}`);
          faviconLink.href = `/assets/images/icons/icon-${size}x${size}.png`;
          document.head.appendChild(faviconLink);
        }
      });

      // Add Apple touch icon
      const existingAppleIcon = document.querySelector(
        'link[rel="apple-touch-icon"]'
      );
      if (!existingAppleIcon) {
        const appleIconLink = document.createElement("link");
        appleIconLink.rel = "apple-touch-icon";
        appleIconLink.href = "/assets/images/icons/icon-192x192.png";
        document.head.appendChild(appleIconLink);
      }

      // Add global CSS link to head if not already present
      const existingCSS = document.querySelector('link[href="/global.css"]');
      if (!existingCSS) {
        const cssLink = document.createElement("link");
        cssLink.rel = "stylesheet";
        cssLink.href = "/global.css";
        document.head.appendChild(cssLink);
      }

      // Add add-to-homescreen CSS if not already present
      const existingAddToHomeCSS = document.querySelector(
        'link[href="https://cdn.jsdelivr.net/gh/philfung/add-to-homescreen@3.3/dist/add-to-homescreen.min.css"]'
      );
      if (!existingAddToHomeCSS) {
        const addToHomeCSS = document.createElement("link");
        addToHomeCSS.rel = "stylesheet";
        addToHomeCSS.href =
          "https://cdn.jsdelivr.net/gh/philfung/add-to-homescreen@3.3/dist/add-to-homescreen.min.css";
        document.head.appendChild(addToHomeCSS);
      }

      // Add add-to-homescreen JavaScript if not already present
      const existingAddToHomeJS = document.querySelector(
        'script[src="https://cdn.jsdelivr.net/gh/philfung/add-to-homescreen@3.3/dist/add-to-homescreen.min.js"]'
      );
      if (!existingAddToHomeJS) {
        const addToHomeJS = document.createElement("script");
        addToHomeJS.src =
          "https://cdn.jsdelivr.net/gh/philfung/add-to-homescreen@3.3/dist/add-to-homescreen.min.js";
        addToHomeJS.async = true;
        document.head.appendChild(addToHomeJS);
      }

      // Add viewport meta tag to disable zoom
      const existingViewport = document.querySelector('meta[name="viewport"]');
      if (!existingViewport) {
        const viewportMeta = document.createElement("meta");
        viewportMeta.name = "viewport";
        viewportMeta.content =
          "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no";
        document.head.appendChild(viewportMeta);
      } else {
        // Update existing viewport meta tag
        existingViewport.setAttribute(
          "content",
          "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no"
        );
      }

      // JavaScript-based zoom prevention
      let lastTouchEnd = 0;

      // Prevent pinch zoom only
      const preventPinchZoom = (e: TouchEvent) => {
        if (e.touches.length > 1) {
          e.preventDefault();
        }
      };

      // Prevent double-tap zoom only
      const preventDoubleTapZoom = (e: TouchEvent) => {
        const now = new Date().getTime();
        const timeDiff = now - lastTouchEnd;

        if (timeDiff < 300 && e.touches.length === 1) {
          e.preventDefault();
        }
        lastTouchEnd = now;
      };

      // Add event listeners with more specific targeting
      document.addEventListener("touchstart", preventPinchZoom, {
        passive: false,
      });
      document.addEventListener("touchmove", preventPinchZoom, {
        passive: false,
      });
      document.addEventListener("touchend", preventDoubleTapZoom, {
        passive: false,
      });

      // Prevent zoom on wheel events (desktop only)
      const preventWheelZoom = (e: WheelEvent) => {
        if (e.ctrlKey) {
          e.preventDefault();
        }
      };
      document.addEventListener("wheel", preventWheelZoom, { passive: false });

      // Prevent zoom on keyboard shortcuts
      const preventKeyboardZoom = (e: KeyboardEvent) => {
        if (
          (e.ctrlKey || e.metaKey) &&
          (e.key === "+" || e.key === "-" || e.key === "=")
        ) {
          e.preventDefault();
        }
      };
      document.addEventListener("keydown", preventKeyboardZoom, {
        passive: false,
      });

      // Cleanup function
      return () => {
        document.removeEventListener("touchstart", preventPinchZoom);
        document.removeEventListener("touchmove", preventPinchZoom);
        document.removeEventListener("touchend", preventDoubleTapZoom);
        document.removeEventListener("wheel", preventWheelZoom);
        document.removeEventListener("keydown", preventKeyboardZoom);
      };
    }
  }, []);

  // Show splash screen while loading
  if (isLoading) {
    return <SplashPage message={loadingMessage} />;
  }

  // Only render the main app after loading is complete
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <LanguageProvider>
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
        </LanguageProvider>
      </Animated.View>
    </ApplicationProvider>
  );
}
