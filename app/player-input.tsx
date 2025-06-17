import { useGame } from "@/contexts/GameContext";
import { Button, Card, Input, Layout, Text } from "@ui-kitten/components";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";

export default function PlayerInputScreen() {
  const router = useRouter();
  const { color } = useLocalSearchParams<{ color: string }>();
  const { game, addRound } = useGame();
  const [points, setPoints] = useState<{ [key: string]: string }>({});
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const inputRef = useRef<any>(null);

  const isLastPlayer = currentPlayer === game.playerNames.length - 1;
  const playerName = game.playerNames[currentPlayer];

  const handleNext = () => {
    if (!isLastPlayer) {
      setCurrentPlayer((prev) => prev + 1);
    } else {
      // Submit all points
      const pointsData = game.playerNames.map((name, idx) => {
        const pointsNum = parseInt(points[idx.toString()]) || 0;
        const multiplier =
          color === "red"
            ? 2
            : color === "blue"
            ? 3
            : color === "yellow"
            ? 4
            : 5;
        return {
          name,
          remainingPoints: pointsNum,
          penaltyPoints: pointsNum * multiplier,
        };
      });
      addRound({
        color: color as any,
        multiplier:
          color === "red"
            ? 2
            : color === "blue"
            ? 3
            : color === "yellow"
            ? 4
            : 5,
        players: pointsData,
      });
      setPoints({});
      // If last round, go to results, else go to game
      if (game.rounds.length + 1 >= game.totalRounds) {
        router.replace("/results");
      } else {
        router.replace("/game");
      }
    }
  };

  useEffect(() => {
    // Autofocus input on mount and when currentPlayer changes
    inputRef.current?.focus();
  }, [currentPlayer]);

  return (
    <Layout style={styles.container}>
      <Card style={styles.card}>
        <Text category="h5" style={styles.title}>
          {playerName}
        </Text>
        <Input
          ref={inputRef}
          placeholder={`Enter points for ${playerName}`}
          value={points[currentPlayer.toString()] || ""}
          onChangeText={(text) => setPoints({ ...points, [currentPlayer.toString()]: text })}
          keyboardType="numeric"
          style={styles.input}
        />
        <Button
          onPress={handleNext}
          style={styles.submitButton}
          disabled={!points[currentPlayer.toString()] || isNaN(parseInt(points[currentPlayer.toString()]!))}
        >
          {isLastPlayer ? "Submit" : "Next"}
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
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  submitButton: {
    marginTop: 10,
  },
});
