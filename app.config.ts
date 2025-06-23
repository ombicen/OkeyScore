import { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "OkeyScore",
  slug: "OkeyScore",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "okeyscore",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.ibreezer.OkeyScore",
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    edgeToEdgeEnabled: true,
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
    themeColor: "#0071E3",
    backgroundColor: "#F5F5F7",
    meta: {
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
      viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
    },
    manifest: {
      name: "OkeyScore - Score Tracker",
      short_name: "OkeyScore",
      description: "A modern Okey score tracking app",
      display: "standalone",
      start_url: ".",
      scope: "/",
      theme_color: "#0071E3",
      background_color: "#F5F5F7",
      orientation: "portrait",
      icons: [
        {
          src: "./assets/images/icon.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any maskable",
        },
        {
          src: "./assets/images/adaptive-icon.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {},
    eas: {
      projectId: "093d8e3a-90e1-4f10-802e-e8455e2cad7d",
    },
  },
});
