import { useGame } from "@/contexts/GameContext";
import { MaterialIcons } from "@expo/vector-icons";
import { Button, Card, Input, Layout, Text } from "@ui-kitten/components";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Path } from "react-native-svg";

const HeartIcon = ({ color, size = 24 }: { color: string; size?: number }) => {
  const colors = {
    red: "#FF6B6B",
    blue: "#4A90E2",
    yellow: "#FFD93D",
    black: "#4A4A4A",
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill={colors[color as keyof typeof colors]}
      />
    </Svg>
  );
};

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
  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (selectedColor && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [selectedColor, currentPlayerIndex]);

  const handleColorSelect = (color: "red" | "blue" | "yellow" | "black") => {
    setSelectedColor(color);
    setCurrentPlayerIndex(0);
    setPoints({});
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

  const handleSubmit = () => {
    if (!selectedColor) return;

    const newRound = {
      color: selectedColor,
      multiplier: colorMultipliers[selectedColor],
      players: playerNames.map((name) => ({
        name,
        remainingPoints: parseInt(points[name]) || 0,
        penaltyPoints:
          (parseInt(points[name]) || 0) * colorMultipliers[selectedColor],
      })),
    };

    addRound(newRound);
    setSelectedColor(null);
    setCurrentPlayerIndex(0);
    setPoints({});

    if (rounds.length + 1 >= totalRounds) {
      router.push("/results");
    }
  };

  const handleReset = () => {
    resetGame();
    setSelectedColor(null);
    setCurrentPlayerIndex(0);
    setPoints({});
  };

  const getColorDisplay = (color: string) => {
    return (
      <View style={styles.colorContainer}>
        <HeartIcon color={color} size={32} />
        <Text category="c1" style={styles.multiplierText}>
          {colorMultipliers[color as keyof typeof colorMultipliers]}x
        </Text>
      </View>
    );
  };

  if (playerNames.length === 0) {
    return (
      <Layout style={styles.container}>
        <Card style={styles.card}>
          <Text category="h5" style={styles.title}>
            No Players Added
          </Text>
          <Text category="p1" style={styles.subtitle}>
            Please add players before starting a game.
          </Text>
          <Button
            onPress={() => router.push("/add-players")}
            style={styles.button}
            accessoryRight={() => (
              <MaterialIcons
                name="person-add"
                size={24}
                color="#8F9BB3"
                style={styles.icon}
              />
            )}
          >
            Add Players
          </Button>
        </Card>
      </Layout>
    );
  }

  if (totalRounds === 0) {
    return (
      <Layout style={styles.container}>
        <Card style={styles.card}>
          <Text category="h5" style={styles.title}>
            No Rounds Set
          </Text>
          <Text category="p1" style={styles.subtitle}>
            Please set the number of rounds before starting a game.
          </Text>
          <Button
            onPress={() => router.push("/select-rounds")}
            style={styles.button}
            accessoryRight={() => (
              <MaterialIcons
                name="repeat"
                size={24}
                color="#8F9BB3"
                style={styles.icon}
              />
            )}
          >
            Set Rounds
          </Button>
        </Card>
      </Layout>
    );
  }

  if (selectedColor) {
    const currentPlayer = playerNames[currentPlayerIndex];
    return (
      <Layout style={styles.container}>
        <Card style={styles.card}>
          <View style={styles.header}>
            <Text category="h5" style={styles.title}>
              Round {rounds.length + 1} of {totalRounds}
            </Text>
            <View style={styles.colorSection}>
              {getColorDisplay(selectedColor)}
            </View>
          </View>

          <View style={styles.playerSection}>
            <Text category="h6" style={styles.playerName}>
              {currentPlayer}
            </Text>
            <Input
              ref={inputRef}
              label="Enter Points"
              value={points[currentPlayer] || ""}
              onChangeText={handlePointsChange}
              keyboardType="numeric"
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
          </View>

          <View style={styles.buttons}>
            <Button
              onPress={handleNextPlayer}
              style={[styles.button, styles.nextButton]}
              disabled={!points[currentPlayer]}
              accessoryRight={() => (
                <MaterialIcons
                  name={
                    currentPlayerIndex < playerNames.length - 1
                      ? "arrow-forward"
                      : "check"
                  }
                  size={24}
                  color="#8F9BB3"
                  style={styles.icon}
                />
              )}
            >
              {currentPlayerIndex < playerNames.length - 1
                ? "Next Player"
                : "Finish Round"}
            </Button>
            <Button
              onPress={() => setSelectedColor(null)}
              style={[styles.button, styles.backButton]}
              status="basic"
              accessoryLeft={() => (
                <MaterialIcons
                  name="arrow-back"
                  size={24}
                  color="#8F9BB3"
                  style={styles.icon}
                />
              )}
            >
              Back
            </Button>
          </View>
        </Card>
      </Layout>
    );
  }

  return (
    <Layout style={styles.container}>
      <Card style={styles.card}>
        <Text category="h5" style={styles.title}>
          Round {rounds.length + 1} of {totalRounds}
        </Text>

        <View style={styles.colorSection}>
          <Text category="h6" style={styles.sectionTitle}>
            Select Color
          </Text>
          <View style={styles.colorButtons}>
            {["red", "blue", "yellow", "black"].map((color) => (
              <Button
                key={color}
                onPress={() => handleColorSelect(color as any)}
                style={[
                  styles.colorButton,
                  selectedColor === color && styles.selectedColorButton,
                ]}
                status={selectedColor === color ? "primary" : "basic"}
              >
                {getColorDisplay(color)}
              </Button>
            ))}
          </View>
        </View>

        <Button
          onPress={handleReset}
          style={[styles.button, styles.resetButton]}
          status="basic"
          accessoryRight={() => (
            <MaterialIcons
              name="refresh"
              size={24}
              color="#8F9BB3"
              style={styles.icon}
            />
          )}
        >
          Reset Game
        </Button>
      </Card>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 20,
    color: "#8F9BB3",
  },
  colorSection: {
    marginBottom: 20,
    alignItems: "center",
  },
  sectionTitle: {
    marginBottom: 10,
  },
  colorButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  colorButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  selectedColorButton: {
    transform: [{ scale: 1.1 }],
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  playerSection: {
    marginBottom: 20,
    alignItems: "center",
  },
  playerName: {
    marginBottom: 10,
  },
  input: {
    width: "100%",
    marginBottom: 15,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  nextButton: {
    backgroundColor: "#4CAF50",
  },
  backButton: {
    backgroundColor: "#9E9E9E",
  },
  resetButton: {
    backgroundColor: "#9E9E9E",
  },
  icon: {
    width: 24,
    height: 24,
  },
  colorContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  multiplierText: {
    fontSize: 12,
    opacity: 0.8,
    fontWeight: "500",
  },
});
