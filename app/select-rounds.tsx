import ModernButton from "@/components/ModernButton";
import { t } from "@/constants/Translations";
import { useGame } from "@/contexts/GameContext";
import { MaterialIcons } from "@expo/vector-icons";
import { Input, Layout, Text } from "@ui-kitten/components";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function SelectRoundsScreen() {
  const router = useRouter();
  const { defaultRounds, setTotalRounds } = useGame();
  const [rounds, setRoundsState] = useState(defaultRounds.toString());

  // Initialize with default rounds from context
  useEffect(() => {
    setRoundsState(defaultRounds.toString());
  }, [defaultRounds]);

  const handleContinue = () => {
    const numRounds = parseInt(rounds);
    if (numRounds > 0) {
      setTotalRounds(numRounds);
      router.push("/(tabs)/game");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, backgroundColor: "#F5F5F7" }}
    >
      <Layout style={styles.container}>
        <Text style={styles.title}>{t("selectRoundsTitle")}</Text>
        <Text style={styles.subtitle}>{t("selectRoundsSubtitle")}</Text>

        <View style={styles.inputCard}>
          <Input
            label={t("numberOfRounds")}
            value={rounds}
            onChangeText={setRoundsState}
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
        <View
          style={{
            paddingHorizontal: 16,
            width: "100%",
          }}
        >
          <ModernButton
            title={t("continue")}
            onPress={handleContinue}
            disabled={!rounds || parseInt(rounds) <= 0}
            style={styles.continueButton}
            variant="primary"
          />
        </View>
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
  title: {
    fontSize: 25,
    fontWeight: "700",
    color: "#1D1D1F",
    textAlign: "center",
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 16,
    opacity: 0.7,
    fontSize: 11,
  },
  inputCard: {
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
  input: {
    marginBottom: 20,
    fontSize: 14,
  },
  continueButton: {
    width: "100%",
    borderRadius: 6,
    height: 48,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
