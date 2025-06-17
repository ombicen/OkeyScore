import { useGame } from "@/contexts/GameContext";
import { MaterialIcons } from "@expo/vector-icons";
import { Button, Card, Input, Layout, Text } from "@ui-kitten/components";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

export default function SelectRoundsScreen() {
  const router = useRouter();
  const { setTotalRounds } = useGame();
  const [rounds, setRounds] = useState("");

  const handleContinue = () => {
    const roundsNum = parseInt(rounds);
    if (roundsNum > 0) {
      setTotalRounds(roundsNum);
      router.push("/game");
    }
  };

  return (
    <Layout style={styles.container}>
      <Card style={styles.card}>
        <Text category="h5" style={styles.title}>
          Select Number of Rounds
        </Text>
        <Text category="s1" style={styles.subtitle}>
          Enter the total number of rounds to play
        </Text>

        <Input
          placeholder="Number of Rounds"
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

        <Button
          onPress={handleContinue}
          style={styles.continueButton}
          disabled={!rounds || parseInt(rounds) <= 0}
          accessoryRight={() => (
            <MaterialIcons
              name="arrow-forward"
              size={24}
              color="#8F9BB3"
              style={styles.icon}
            />
          )}
        >
          Start Game
        </Button>
      </Card>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  card: {
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 20,
    opacity: 0.7,
  },
  input: {
    marginBottom: 20,
  },
  continueButton: {
    marginTop: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
