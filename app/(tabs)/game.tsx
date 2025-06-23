import { useGame } from "@/contexts/GameContext";
import { Layout } from "@ui-kitten/components";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

// Import the new components
import ActionButtons from "@/components/ActionButtons";
import ColorSelector from "@/components/ColorSelector";
import EmptyState from "@/components/EmptyState";
import GameHeader from "@/components/GameHeader";
import PlayerInput from "@/components/PlayerInput";

export default function GameScreen() {
  const router = useRouter();
  const {
    playerNames,
    totalRounds,
    rounds,
    colorMultipliers,
    addRound,
    resetGame,
  } = useGame();
  const [selectedColor, setSelectedColor] = useState<
    "red" | "blue" | "yellow" | "black" | null
  >(null);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [points, setPoints] = useState<{ [key: string]: string }>({});
  const [winType, setWinType] = useState<"regular" | "okey" | null>(null);
  const [winner, setWinner] = useState<string | null>(null);

  const handleColorSelect = (color: "red" | "blue" | "yellow" | "black") => {
    setSelectedColor(color);
    setCurrentPlayerIndex(0);
    setPoints({});
    setWinType(null);
    setWinner(null);
  };

  const handlePointsChange = (value: string) => {
    // Only allow numbers
    const numericValue = value.replace(/[^0-9]/g, "");
    setPoints({ ...points, [playerNames[currentPlayerIndex]]: numericValue });
  };

  const handleNextPlayer = () => {
    if (currentPlayerIndex < playerNames.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handleWinSelection = (type: "regular" | "okey") => {
    setWinType(type);
    setWinner(playerNames[currentPlayerIndex]);

    // Immediately continue to next player
    if (currentPlayerIndex < playerNames.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (!selectedColor) return;

    const currentMultiplier = colorMultipliers[selectedColor];
    const currentPlayer = playerNames[currentPlayerIndex];

    const newRound = {
      color: selectedColor,
      multiplier: currentMultiplier,
      players: playerNames.map((name) => {
        const pointsNum = parseInt(points[name]) || 0;
        let finalPoints = pointsNum * currentMultiplier;

        // Apply win logic
        if (winner && winType) {
          if (name === winner) {
            // Winner gets negative points
            finalPoints = -(20 * currentMultiplier);
          } else {
            finalPoints = pointsNum * currentMultiplier;

            // For okey win, double the points again (4x total)
            if (winType === "okey") {
              finalPoints = finalPoints * 2;
            }
          }
        }

        return {
          name,
          remainingPoints: pointsNum,
          penaltyPoints: finalPoints,
        };
      }),
      winType: winType || undefined,
      winner: winner || undefined,
    };

    addRound(newRound);
    setSelectedColor(null);
    setCurrentPlayerIndex(0);
    setPoints({});
    setWinType(null);
    setWinner(null);

    if (rounds.length + 1 >= totalRounds) {
      router.push("/results");
    }
  };

  const handleReset = () => {
    resetGame();
    setSelectedColor(null);
    setCurrentPlayerIndex(0);
    setPoints({});
    setWinType(null);
    setWinner(null);
  };

  // Empty state for no players
  if (playerNames.length === 0) {
    return (
      <Layout style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <EmptyState
              icon="people-outline"
              title="No Players Added"
              subtitle="Please add players before starting a game."
              buttonText="Add Players"
              onButtonPress={() => router.push("/(tabs)/add-players")}
            />
          </View>
        </ScrollView>
      </Layout>
    );
  }

  // Empty state for no rounds
  if (totalRounds === 0) {
    return (
      <Layout style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <EmptyState
              icon="repeat"
              title="No Rounds Set"
              subtitle="Please set the number of rounds before starting a game."
              buttonText="Set Rounds"
              onButtonPress={() => router.push("/select-rounds")}
            />
          </View>
        </ScrollView>
      </Layout>
    );
  }

  // Player input state
  if (selectedColor) {
    const currentPlayer = playerNames[currentPlayerIndex];
    return (
      <Layout style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <GameHeader
              currentRound={rounds.length + 1}
              totalRounds={totalRounds}
              selectedColor={selectedColor}
              colorMultipliers={colorMultipliers}
            />

            <PlayerInput
              currentPlayer={currentPlayer}
              currentPlayerIndex={currentPlayerIndex}
              totalPlayers={playerNames.length}
              points={points}
              winType={winType}
              winner={winner}
              selectedColor={selectedColor}
              colorMultipliers={colorMultipliers}
              onPointsChange={handlePointsChange}
              onWinSelection={handleWinSelection}
            />

            <ActionButtons
              currentPlayerIndex={currentPlayerIndex}
              totalPlayers={playerNames.length}
              hasPoints={!!points[currentPlayer]}
              onNextPlayer={handleNextPlayer}
              onBack={() => setSelectedColor(null)}
            />
          </View>
        </ScrollView>
      </Layout>
    );
  }

  // Color selection state
  return (
    <Layout style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <GameHeader
            currentRound={rounds.length + 1}
            totalRounds={totalRounds}
            colorMultipliers={colorMultipliers}
          />

          <ColorSelector
            selectedColor={selectedColor}
            colorMultipliers={colorMultipliers}
            onColorSelect={handleColorSelect}
          />

          <ActionButtons
            currentPlayerIndex={0}
            totalPlayers={1}
            hasPoints={true}
            onNextPlayer={() => {}}
            onBack={() => {}}
            onReset={handleReset}
            showReset={true}
          />
        </View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F7",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 4,
    minHeight: 400,
  },
});
