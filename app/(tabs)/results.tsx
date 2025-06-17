import { useGame } from "@/contexts/GameContext";
import { MaterialIcons } from "@expo/vector-icons";
import { Button, Card, Layout, Text } from "@ui-kitten/components";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function ResultsScreen() {
  const router = useRouter();
  const { rounds, playerNames, resetGame } = useGame();

  const calculateTotalPoints = (playerName: string) => {
    return rounds.reduce((total, round) => {
      const playerRound = round.players.find((p) => p.name === playerName);
      return total + (playerRound?.penaltyPoints || 0);
    }, 0);
  };

  const getColorEmoji = (color: string) => {
    switch (color) {
      case "red":
        return "❤️";
      case "blue":
        return "💙";
      case "yellow":
        return "💛";
      case "black":
        return "🖤";
      default:
        return "";
    }
  };

  const handleNewGame = () => {
    resetGame();
    router.push("/add-players");
  };

  if (rounds.length === 0) {
    return (
      <Layout style={styles.container}>
        <Card style={styles.card}>
          <Text category="h5" style={styles.title}>
            No Game Data
          </Text>
          <Text category="p1" style={styles.subtitle}>
            Start a new game to see results.
          </Text>
          <Button
            onPress={handleNewGame}
            style={styles.button}
            accessoryRight={() => (
              <MaterialIcons
                name="play-arrow"
                size={24}
                color="#8F9BB3"
                style={styles.icon}
              />
            )}
          >
            Start New Game
          </Button>
        </Card>
      </Layout>
    );
  }

  return (
    <Layout style={styles.container}>
      <Card style={styles.card}>
        <Text category="h5" style={styles.title}>
          Game Results
        </Text>

        <ScrollView style={styles.scrollView}>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text category="s1" style={[styles.cell, styles.headerCell]}>
                Round
              </Text>
              <Text category="s1" style={[styles.cell, styles.headerCell]}>
                Color
              </Text>
              {playerNames.map((name) => (
                <Text
                  key={name}
                  category="s1"
                  style={[styles.cell, styles.headerCell]}
                >
                  {name}
                </Text>
              ))}
            </View>

            {rounds.map((round, index) => (
              <View key={index} style={styles.tableRow}>
                <Text category="p1" style={styles.cell}>
                  {index + 1}
                </Text>
                <Text category="p1" style={styles.cell}>
                  {getColorEmoji(round.color)} {round.multiplier}x
                </Text>
                {playerNames.map((name) => {
                  const playerRound = round.players.find(
                    (p) => p.name === name
                  );
                  return (
                    <Text key={name} category="p1" style={styles.cell}>
                      {playerRound?.penaltyPoints || 0}
                    </Text>
                  );
                })}
              </View>
            ))}

            <View style={[styles.tableRow, styles.totalRow]}>
              <Text category="s1" style={[styles.cell, styles.totalCell]}>
                Total
              </Text>
              <Text category="s1" style={[styles.cell, styles.totalCell]}>
                -
              </Text>
              {playerNames.map((name) => (
                <Text
                  key={name}
                  category="s1"
                  style={[styles.cell, styles.totalCell]}
                >
                  {calculateTotalPoints(name)}
                </Text>
              ))}
            </View>
          </View>
        </ScrollView>

        <Button
          onPress={handleNewGame}
          style={styles.button}
          accessoryRight={() => (
            <MaterialIcons
              name="play-arrow"
              size={24}
              color="#8F9BB3"
              style={styles.icon}
            />
          )}
        >
          Start New Game
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
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 20,
    color: "#8F9BB3",
  },
  scrollView: {
    maxHeight: 400,
  },
  table: {
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#E4E9F2",
    paddingBottom: 10,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E4E9F2",
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
  headerCell: {
    fontWeight: "bold",
    color: "#8F9BB3",
  },
  totalRow: {
    borderTopWidth: 2,
    borderTopColor: "#E4E9F2",
    marginTop: 10,
  },
  totalCell: {
    fontWeight: "bold",
  },
  button: {
    marginTop: 20,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
