import ModernButton from "@/components/ModernButton";
import { t } from "@/constants/Translations";
import { useGame } from "@/contexts/GameContext";
import { Button, Input, Layout, Text } from "@ui-kitten/components";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function AddPlayersScreen() {
  const router = useRouter();
  const { setPlayerNames, resetGame, playerNames } = useGame();
  const [players, setPlayers] = useState<string[]>([""]);
  const inputRefs = useRef<any[]>([]);

  // Initialize players state with existing players if they exist
  React.useEffect(() => {
    if (playerNames.length > 0) {
      setPlayers(playerNames);
    }
  }, [playerNames]);

  const handleAddPlayer = () => {
    setPlayers((prev) => {
      const updated = [...prev, ""];
      return updated;
    });
  };

  // Handle focus when a new player is added
  useEffect(() => {
    if (players.length > 0) {
      const lastIndex = players.length - 1;
      const timer = setTimeout(() => {
        if (inputRefs.current[lastIndex]) {
          inputRefs.current[lastIndex].focus();
        }
      }, 300); // Increased timeout for mobile

      return () => clearTimeout(timer);
    }
  }, [players.length]);

  const handlePlayerNameChange = (index: number, name: string) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = name;
    setPlayers(updatedPlayers);
  };

  const handleContinue = () => {
    const validPlayers = players.filter((name) => name.trim() !== "");
    if (validPlayers.length >= 2) {
      setPlayerNames(validPlayers);
      router.push("/select-rounds");
    }
  };

  const handleResetGame = () => {
    resetGame();
    setPlayers([""]);
  };

  // Show existing players interface if players already exist
  if (playerNames.length > 0) {
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, backgroundColor: "#F5F5F7" }}
      >
        <Layout style={styles.container}>
          <Text style={styles.sectionTitle}>{t("currentPlayers")}</Text>
          <Text style={styles.sectionSubtitle}>
            {t("currentPlayersSubtitle", {
              count: playerNames.length,
              plural: playerNames.length !== 1 ? "s" : "",
            })}
          </Text>

          <View style={styles.playersCard}>
            {playerNames.map((name, index) => (
              <View key={index} style={styles.playerItem}>
                <Text style={styles.playerName}>{name}</Text>
              </View>
            ))}
          </View>

          <View style={styles.buttonContainer}>
            <ModernButton
              title={t("continueWithCurrentPlayers")}
              onPress={() => router.push("/select-rounds")}
              style={styles.continueButton}
              variant="primary"
            />

            <ModernButton
              title={t("resetGame")}
              onPress={handleResetGame}
              style={styles.resetButton}
              variant="secondary"
            />
          </View>
        </Layout>
      </ScrollView>
    );
  }

  // Show add players interface if no players exist
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, backgroundColor: "#F5F5F7" }}
      keyboardShouldPersistTaps="handled"
    >
      <Layout style={styles.container}>
        <Text style={styles.sectionTitle}>{t("addPlayersTitle")}</Text>
        <Text style={styles.sectionSubtitle}>{t("addPlayersSubtitle")}</Text>
        <View style={styles.inputCard}>
          {players.map((name, index) => (
            <Input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              style={styles.input}
              value={name}
              placeholder={`${t("player")} ${index + 1}`}
              onChangeText={(text) => handlePlayerNameChange(index, text)}
              textStyle={styles.inputText}
              placeholderTextColor="#86868B"
              size="large"
              status="basic"
              autoCapitalize="words"
              autoCorrect={false}
              autoComplete="off"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          ))}
          <Button
            style={styles.addButton}
            appearance="ghost"
            status="primary"
            onPress={handleAddPlayer}
            disabled={players.length >= 6}
          >
            {t("addPlayer")}
          </Button>
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
            disabled={players.some((n) => !n.trim()) || players.length < 2}
            style={styles.nextButton}
            variant="primary"
          />
        </View>
      </Layout>
    </ScrollView>
  );
}

// --- Apple-inspired, iPhone product page style, screenshot-matched colors ---
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
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#6E6E73",
    textAlign: "center",
    marginBottom: 32,
    letterSpacing: -0.2,
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
    backgroundColor: "#F5F5F7",
    borderRadius: 14,
    marginBottom: 18,
    fontSize: 20,
    borderWidth: 0,
    paddingHorizontal: 18,
    paddingVertical: 16,
    width: "100%",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.02)",
    elevation: 1,
  },
  inputText: {
    fontSize: 16,
    color: "#1D1D1F",
    fontWeight: "500",
  },
  addButton: {
    marginTop: 8,
    borderRadius: 14,
    backgroundColor: "#E5E5EA",
    width: "100%",
    paddingVertical: 16,
    alignSelf: "center",
  },
  nextButton: {
    width: "100%",
    borderRadius: 6,
    height: 48,
    marginTop: 32,
    marginBottom: 16,
  },
  resetButton: {
    width: "100%",
    borderRadius: 6,
    height: 48,
    marginBottom: 16,
  },
  playersCard: {
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
  playerItem: {
    backgroundColor: "#F5F5F7",
    borderRadius: 14,
    marginBottom: 18,
    padding: 16,
    width: "100%",
  },
  playerName: {
    fontSize: 16,
    color: "#1D1D1F",
    fontWeight: "500",
  },
  buttonContainer: {
    flexDirection: "column",
    width: "92%",
    alignSelf: "center",
    gap: 16,
    marginHorizontal: 16,
  },
  continueButton: {
    width: "100%",
    borderRadius: 6,
    height: 48,
    marginBottom: 12,
  },
});
