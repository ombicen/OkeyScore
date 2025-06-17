import { useGame } from "@/contexts/GameContext";
import { MaterialIcons } from "@expo/vector-icons";
import { Button, Card, Input, Layout, Text } from "@ui-kitten/components";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { StyleSheet } from "react-native";

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
    <Layout style={styles.container}>
      <Card style={styles.card}>
        <Text category="h5" style={styles.title}>
          Add Players
        </Text>
        <Text category="s1" style={styles.subtitle}>
          Enter at least 2 players to start
        </Text>

        {players.map((name, index) => (
          <Input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            placeholder={`Player ${index + 1} Name`}
            value={name}
            onChangeText={(text) => handlePlayerNameChange(index, text)}
            style={styles.input}
            accessoryLeft={() => (
              <MaterialIcons
                name="person"
                size={24}
                color="#8F9BB3"
                style={styles.icon}
              />
            )}
          />
        ))}

        <Button
          appearance="ghost"
          onPress={handleAddPlayer}
          style={styles.addButton}
          accessoryLeft={() => (
            <MaterialIcons
              name="person-add"
              size={24}
              color="#8F9BB3"
              style={styles.icon}
            />
          )}
        >
          Add Player
        </Button>

        <Button
          onPress={handleContinue}
          style={styles.continueButton}
          disabled={players.filter((name) => name.trim() !== "").length < 2}
          accessoryRight={() => (
            <MaterialIcons
              name="arrow-forward"
              size={24}
              color="#8F9BB3"
              style={styles.icon}
            />
          )}
        >
          Continue
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
    marginBottom: 15,
  },
  addButton: {
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
