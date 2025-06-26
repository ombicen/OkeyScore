import ModernButton from "@/components/ModernButton";
import { t } from "@/constants/Translations";
import { useGame } from "@/contexts/GameContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLanguageRefresh } from "@/hooks/useLanguageRefresh";
import { MaterialIcons } from "@expo/vector-icons";
import { Button, Input, Layout, Text } from "@ui-kitten/components";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function SettingsScreen() {
  const router = useRouter();
  const { colorMultipliers, defaultRounds, updateSettings, resetSettings } =
    useGame();
  const { currentLanguage, changeLanguage } = useLanguage();

  // This hook ensures the component re-renders when language changes
  useLanguageRefresh();

  const [redMultiplier, setRedMultiplier] = useState(
    colorMultipliers.red.toString()
  );
  const [blueMultiplier, setBlueMultiplier] = useState(
    colorMultipliers.blue.toString()
  );
  const [yellowMultiplier, setYellowMultiplier] = useState(
    colorMultipliers.yellow.toString()
  );
  const [blackMultiplier, setBlackMultiplier] = useState(
    colorMultipliers.black.toString()
  );
  const [rounds, setRounds] = useState(defaultRounds.toString());

  const handleSave = () => {
    updateSettings({
      colorMultipliers: {
        red: parseInt(redMultiplier) || 2,
        blue: parseInt(blueMultiplier) || 3,
        yellow: parseInt(yellowMultiplier) || 4,
        black: parseInt(blackMultiplier) || 5,
      },
      defaultRounds: parseInt(rounds) || 10,
    });
    setTimeout(() => {
      router.back();
    }, 1500);
  };

  const handleRestoreDefaults = async () => {
    await resetSettings();
    // Update local state to reflect the reset
    setRedMultiplier("6");
    setBlueMultiplier("4");
    setYellowMultiplier("5");
    setBlackMultiplier("3");
    setRounds("10");
  };

  const handleLanguageChange = async (language: "ku" | "en") => {
    await changeLanguage(language);
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, backgroundColor: "#F5F5F7" }}
    >
      <Layout style={styles.container}>
        <Text style={styles.sectionTitle}>{t("settingsTitle")}</Text>
        <View style={styles.card}>
          <View style={styles.section}>
            <Text category="h6" style={styles.sectionTitle}>
              {t("language")}
            </Text>
            <View style={styles.languageButtons}>
              <Button
                style={[
                  styles.languageButton,
                  currentLanguage === "ku" && styles.selectedLanguageButton,
                ]}
                status={currentLanguage === "ku" ? "primary" : "basic"}
                appearance="filled"
                onPress={() => handleLanguageChange("ku")}
                accessoryLeft={() => (
                  <MaterialIcons
                    name="language"
                    size={20}
                    color={currentLanguage === "ku" ? "#FFFFFF" : "#8F9BB3"}
                    style={styles.languageIcon}
                  />
                )}
              >
                {t("kurdish")}
              </Button>
              <Button
                style={[
                  styles.languageButton,
                  currentLanguage === "en" && styles.selectedLanguageButton,
                ]}
                status={currentLanguage === "en" ? "primary" : "basic"}
                appearance="filled"
                onPress={() => handleLanguageChange("en")}
                accessoryLeft={() => (
                  <MaterialIcons
                    name="language"
                    size={20}
                    color={currentLanguage === "en" ? "#FFFFFF" : "#8F9BB3"}
                    style={styles.languageIcon}
                  />
                )}
              >
                {t("english")}
              </Button>
            </View>
          </View>
          <View style={styles.section}>
            <Text category="h6" style={styles.sectionTitle}>
              {t("colorMultipliersTitle")}
            </Text>
            <Input
              label={t("redMultiplier")}
              value={redMultiplier}
              onChangeText={setRedMultiplier}
              keyboardType="numeric"
              style={styles.input}
              accessoryLeft={() => (
                <MaterialIcons
                  name="palette"
                  size={24}
                  color="#FF6B6B"
                  style={styles.icon}
                />
              )}
            />
            <Input
              label={t("blueMultiplier")}
              value={blueMultiplier}
              onChangeText={setBlueMultiplier}
              keyboardType="numeric"
              style={styles.input}
              accessoryLeft={() => (
                <MaterialIcons
                  name="palette"
                  size={24}
                  color="#4A90E2"
                  style={styles.icon}
                />
              )}
            />
            <Input
              label={t("yellowMultiplier")}
              value={yellowMultiplier}
              onChangeText={setYellowMultiplier}
              keyboardType="numeric"
              style={styles.input}
              accessoryLeft={() => (
                <MaterialIcons
                  name="palette"
                  size={24}
                  color="#FFD93D"
                  style={styles.icon}
                />
              )}
            />
            <Input
              label={t("blackMultiplier")}
              value={blackMultiplier}
              onChangeText={setBlackMultiplier}
              keyboardType="numeric"
              style={styles.input}
              accessoryLeft={() => (
                <MaterialIcons
                  name="palette"
                  size={24}
                  color="#4A4A4A"
                  style={styles.icon}
                />
              )}
            />
          </View>
          <View style={styles.section}>
            <Text category="h6" style={styles.sectionTitle}>
              {t("defaultRoundsTitle")}
            </Text>
            <Input
              label={t("numberOfRoundsLabel")}
              value={rounds}
              onChangeText={setRounds}
              keyboardType="numeric"
              style={styles.input}
              accessoryLeft={() => (
                <MaterialIcons
                  name="repeat"
                  size={24}
                  color="#8F9BB3"
                  style={styles.icon}
                />
              )}
            />
          </View>
        </View>
        <ModernButton
          title={t("saveChanges")}
          onPress={handleSave}
          style={styles.saveButton}
          variant="primary"
        />
        <ModernButton
          title={t("restoreDefaults")}
          onPress={handleRestoreDefaults}
          style={styles.restoreButton}
          variant="secondary"
        />
      </Layout>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    paddingTop: 32,
    paddingBottom: 48,
    backgroundColor: "#F5F5F7",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: "700",
    color: "#1D1D1F",
    textAlign: "center",
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 36,
    paddingHorizontal: 32,
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 32,
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.04)",
    elevation: 2,
    width: "92%",
  },
  saveButton: {
    marginTop: 40,
    width: "92%",
    alignSelf: "center",
    marginBottom: 8,
  },
  restoreButton: {
    marginTop: 8,
    width: "92%",
    alignSelf: "center",
    marginBottom: 16,
  },
  input: {
    marginBottom: 15,
    borderRadius: 14,
    backgroundColor: "#F7F8FA",
    borderWidth: 1,
    borderColor: "#E5E6EA",
    fontSize: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  section: {
    marginBottom: 20,
    width: "100%",
  },
  icon: {
    width: 24,
    height: 24,
  },
  languageButtons: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  languageButton: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 16,
    backgroundColor: "#F7F8FA",
    borderWidth: 1,
    borderColor: "#E5E6EA",
  },
  selectedLanguageButton: {
    backgroundColor: "#0071E3",
    borderColor: "#0071E3",
  },
  languageIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
});
