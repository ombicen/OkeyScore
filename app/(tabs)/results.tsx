import { useGame } from "@/contexts/GameContext";
import { Button, Layout, Text } from "@ui-kitten/components";
import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

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

  const getWinTypeText = (round: any) => {
    if (round.winType === "regular") return "Regular Win";
    if (round.winType === "okey") return "Okey Win";
    return "";
  };

  const handleNewGame = () => {
    resetGame();
    router.push("/(tabs)/add-players");
  };

  // Sort players by total points (lower is better)
  const sortedPlayers = [...playerNames].sort(
    (a, b) => calculateTotalPoints(a) - calculateTotalPoints(b)
  );

  if (rounds.length === 0) {
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, backgroundColor: "#F5F5F7" }}
      >
        <Layout style={styles.container}>
          <View style={styles.emptyCard}>
            <Text style={styles.sectionTitle}>No Game Data</Text>
            <Text style={styles.sectionSubtitle}>
              Start a new game to see results.
            </Text>
            <Button
              style={styles.resetButton}
              status="basic"
              appearance="filled"
              onPress={handleNewGame}
            >
              Start New Game
            </Button>
          </View>
        </Layout>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, backgroundColor: "#F5F5F7" }}
    >
      <Layout style={styles.container}>
        {/* --- Final Rankings --- */}
        <Text style={styles.sectionTitle}>Final Rankings</Text>
        <View style={styles.rankingsContainer}>
          {sortedPlayers.map((name, index) => (
            <View
              key={name}
              style={[styles.rankingCard, index === 0 && styles.winnerCard]}
            >
              <View style={styles.rankingInfo}>
                <Text style={styles.rankingPosition}>#{index + 1}</Text>
                {index === 0 && <Text style={styles.winnerBadge}>🏆</Text>}
              </View>
              <View style={styles.playerInfo}>
                <Text style={styles.playerName}>{name}</Text>
                <Text style={styles.totalPoints}>
                  {calculateTotalPoints(name)} pts
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* --- Round Details --- */}
        <Text style={styles.sectionSubtitle}>Round Details</Text>
        <View style={styles.roundsContainer}>
          {rounds.map((round, index) => (
            <View key={index} style={styles.roundCard}>
              <View style={styles.roundHeader}>
                <View style={styles.roundInfo}>
                  <Text style={styles.roundNr}>Round {index + 1}</Text>
                  <Text style={styles.roundColor}>
                    {getColorEmoji(round.color)}
                  </Text>
                  <Text style={styles.roundMultiplier}>
                    x{round.multiplier}
                  </Text>
                </View>
                {round.winType && (
                  <View style={styles.winInfo}>
                    <Text style={styles.winType}>{getWinTypeText(round)}</Text>
                    {round.winner && (
                      <Text style={styles.winnerName}>
                        Winner: {round.winner}
                      </Text>
                    )}
                  </View>
                )}
              </View>

              <View style={styles.playersGrid}>
                {playerNames.map((name) => {
                  const playerRound = round.players.find(
                    (p) => p.name === name
                  );
                  const isWinner = round.winner === name;
                  return (
                    <View
                      key={name}
                      style={[
                        styles.playerScoreCard,
                        isWinner && styles.winnerScoreCard,
                      ]}
                    >
                      <Text style={styles.playerScoreName}>{name}</Text>
                      <Text
                        style={[
                          styles.playerScore,
                          isWinner && styles.winnerScore,
                        ]}
                      >
                        {playerRound?.penaltyPoints ?? "-"}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          ))}
        </View>

        <Button
          style={styles.resetButton}
          status="basic"
          appearance="filled"
          onPress={() => {
            resetGame();
            router.replace("/(tabs)/add-players");
          }}
        >
          Reset Game
        </Button>
      </Layout>
    </ScrollView>
  );
}

// --- Apple-inspired, iPhone product page style, screenshot-matched colors ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
    backgroundColor: "#F5F5F7",
  },
  emptyCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 48,
    paddingHorizontal: 32,
    alignItems: "center",
    marginTop: 64,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
    width: "100%",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1D1D1F",
    textAlign: "center",
    marginBottom: 24,
    letterSpacing: -0.5,
  },
  sectionSubtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1D1D1F",
    textAlign: "center",
    marginTop: 32,
    marginBottom: 20,
    letterSpacing: -0.2,
  },
  rankingsContainer: {
    width: "100%",
    gap: 12,
  },
  rankingCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  winnerCard: {
    backgroundColor: "#F0F8FF",
    borderWidth: 2,
    borderColor: "#0071E3",
  },
  rankingInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  rankingPosition: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1D1D1F",
    marginRight: 8,
  },
  winnerBadge: {
    fontSize: 20,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1D1D1F",
    marginBottom: 4,
  },
  totalPoints: {
    fontSize: 14,
    fontWeight: "500",
    color: "#0071E3",
  },
  roundsContainer: {
    width: "100%",
    gap: 16,
  },
  roundCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  roundHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E6EA",
  },
  roundInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  roundNr: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1D1D1F",
    marginRight: 8,
  },
  roundColor: {
    fontSize: 20,
    marginRight: 6,
  },
  roundMultiplier: {
    fontSize: 14,
    color: "#86868B",
    fontWeight: "500",
  },
  winInfo: {
    alignItems: "flex-end",
  },
  winType: {
    fontSize: 12,
    fontWeight: "600",
    color: "#0071E3",
    marginBottom: 2,
  },
  winnerName: {
    fontSize: 11,
    color: "#86868B",
  },
  playersGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  playerScoreCard: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    minWidth: (screenWidth - 80) / 3,
    flex: 1,
  },
  winnerScoreCard: {
    backgroundColor: "#E3F2FD",
    borderWidth: 1,
    borderColor: "#0071E3",
  },
  playerScoreName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1D1D1F",
    marginBottom: 4,
    textAlign: "center",
  },
  playerScore: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1D1D1F",
  },
  winnerScore: {
    color: "#0071E3",
  },
  resetButton: {
    marginTop: 32,
    borderRadius: 16,
    backgroundColor: "#0071E3",
    paddingVertical: 16,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
});
