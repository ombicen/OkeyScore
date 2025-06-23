import { useGame } from "@/contexts/GameContext";
import { Button, Input, Layout, Text } from "@ui-kitten/components";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function AddPlayersScreen() {
  const router = useRouter();
  const { setPlayerNames } = useGame();
  const [players, setPlayers] = useState<string[]>([""]);
  const inputRefs = useRef<any[]>([]);

  const handleAddPlayer = () => {
    setPlayers((prev) => {
      const updated = [...prev, ""];
      setTimeout(() => {
        inputRefs.current[updated.length - 1]?.focus();
      }, 100);
      return updated;
    });
  };

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

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: "#F5F5F7" }} keyboardShouldPersistTaps="handled">
      <Layout style={styles.container}>
        <Text style={styles.sectionTitle}>Add Players</Text>
        <Text style={styles.sectionSubtitle}>Enter player names to get started</Text>
        <View style={styles.inputCard}>
          {players.map((name, index) => (
            <Input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              style={styles.input}
              value={name}
              placeholder={`Player ${index + 1}`}
              onChangeText={(text) => handlePlayerNameChange(index, text)}
              textStyle={styles.inputText}
              placeholderTextColor="#86868B"
              size="large"
              status="basic"
              autoCapitalize="words"
            />
          ))}
          <Button
            style={styles.addButton}
            appearance="ghost"
            status="primary"
            onPress={handleAddPlayer}
            disabled={players.length >= 6}
          >
            + Add Player
          </Button>
        </View>
        <Button
          style={styles.nextButton}
          status="basic"
          appearance="filled"
          onPress={handleContinue}
          disabled={players.some((n) => !n.trim()) || players.length < 2}
        >
          Next
        </Button>
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
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
    marginTop: 40,
    borderRadius: 16,
    backgroundColor: "#0071E3",
    paddingVertical: 20,
    width: "92%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
});
