import { t } from "@/constants/Translations";
import { MaterialIcons } from "@expo/vector-icons";
import { Input, Text } from "@ui-kitten/components";
import React, { useEffect, useRef } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import ModernButton from "./ModernButton";

const { width: screenWidth } = Dimensions.get("window");

interface PlayerInputProps {
  currentPlayer: string;
  currentPlayerIndex: number;
  totalPlayers: number;
  points: { [key: string]: string };
  winType: "regular" | "okey" | null;
  winner: string | null;
  selectedColor: "red" | "blue" | "yellow" | "black";
  colorMultipliers: {
    red: number;
    blue: number;
    yellow: number;
    black: number;
  };
  onPointsChange: (value: string) => void;
  onWinSelection: (type: "regular" | "okey") => void;
}

const PlayerInput: React.FC<PlayerInputProps> = ({
  currentPlayer,
  currentPlayerIndex,
  totalPlayers,
  points,
  winType,
  winner,
  selectedColor,
  colorMultipliers,
  onPointsChange,
  onWinSelection,
}) => {
  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [currentPlayerIndex]);

  const currentScore = parseInt(points[currentPlayer]) || 0;
  const multiplier = colorMultipliers[selectedColor];

  // Calculate final score based on win type
  let finalScore = currentScore * multiplier;
  if (winType === "okey" && winner === currentPlayer) {
    // For Okey win, winner gets negative points
    finalScore = -finalScore;
  } else if (winType === "regular" && winner === currentPlayer) {
    // For regular win, winner gets negative points
    finalScore = -finalScore;
  }

  return (
    <View style={styles.container}>
      {/* Player Card */}
      <View style={styles.playerCard}>
        <View style={styles.playerHeader}>
          <View style={styles.playerAvatar}>
            <Text category="h5" style={styles.playerInitial}>
              {currentPlayer.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.playerInfo}>
            <Text category="h6" style={styles.playerName}>
              {currentPlayer}
            </Text>
            <View style={styles.progressDots}>
              {Array.from({ length: totalPlayers }).map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    index === currentPlayerIndex && styles.activeDot,
                  ]}
                />
              ))}
            </View>
          </View>
        </View>

        {/* Score Display */}
        <View style={styles.scoreSection}>
          <View style={styles.scoreCard}>
            <Text category="c1" style={styles.scoreLabel}>
              {t("currentScore")}
            </Text>
            <Text category="h3" style={styles.scoreValue}>
              {currentScore}
            </Text>
            <View style={styles.multiplierBadge}>
              <Text category="c1" style={styles.multiplierText}>
                ×{multiplier}
              </Text>
            </View>
          </View>

          <View style={styles.finalScoreCard}>
            <Text category="c1" style={styles.finalScoreLabel}>
              {t("finalScore")}
            </Text>
            <Text category="h2" style={styles.finalScoreValue}>
              {finalScore && winner && winType === "okey"
                ? finalScore * 2
                : finalScore}
            </Text>
          </View>
        </View>

        {/* Input Field */}
        <View style={styles.inputContainer}>
          <Input
            ref={inputRef}
            style={styles.scoreInput}
            value={points[currentPlayer] || ""}
            onChangeText={onPointsChange}
            keyboardType="number-pad"
            placeholder="0"
            size="large"
            textStyle={styles.inputText}
            placeholderTextColor="rgba(0,0,0,0.6)"
            status="basic"
            returnKeyType="done"
            maxLength={3}
            autoFocus
          />
        </View>
      </View>

      {/* Win Selection */}
      {!winner && (
        <View style={styles.winSection}>
          <Text category="s1" style={styles.winTitle}>
            🏆 {t("winType")}
          </Text>
          <View style={styles.winButtonsContainer}>
            <ModernButton
              title={t("regularWin")}
              onPress={() => onWinSelection("regular")}
              style={
                winType === "regular"
                  ? styles.selectedWinButton
                  : styles.winButton
              }
              variant={winType === "regular" ? "primary" : "secondary"}
            />

            <ModernButton
              title={t("okeyWin")}
              onPress={() => onWinSelection("okey")}
              style={
                winType === "okey" ? styles.selectedWinButton : styles.winButton
              }
              variant={winType === "okey" ? "primary" : "secondary"}
            />
          </View>

          {winType && (
            <View style={styles.winInfoCard}>
              <MaterialIcons
                name="info"
                size={16}
                color="#0071E3"
                style={styles.infoIcon}
              />
              <Text category="c1" style={styles.winInfoText}>
                {winType === "regular"
                  ? t("regularWinExplanation", { points: 20 * multiplier })
                  : t("okeyWinExplanation", { points: 20 * multiplier })}
              </Text>
            </View>
          )}
        </View>
      )}

      {/* Winner Display */}
      {winner && (
        <View style={styles.winnerSection}>
          <View style={styles.winnerCard}>
            <View style={styles.winnerGradient}>
              <MaterialIcons
                name="emoji-events"
                size={24}
                color="#FFFFFF"
                style={styles.winnerIcon}
              />
              <Text category="s1" style={styles.winnerText}>
                {winner} {t("wonThisRound")}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  playerCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
    elevation: 8,
  },
  playerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  playerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F5F5F7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  playerInitial: {
    color: "#1D1D1F",
    fontWeight: "700",
    fontSize: 20,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    color: "#1D1D1F",
    fontWeight: "700",
    marginBottom: 8,
  },
  progressDots: {
    flexDirection: "row",
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E5E6EA",
  },
  activeDot: {
    backgroundColor: "#0071E3",
    transform: [{ scale: 1.2 }],
  },
  scoreSection: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 20,
  },
  scoreCard: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    position: "relative",
  },
  scoreLabel: {
    color: "#6C757D",
    fontSize: 12,
    marginBottom: 4,
  },
  scoreValue: {
    color: "#1D1D1F",
    fontWeight: "700",
    fontSize: 24,
  },
  multiplierBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#FFD700",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  multiplierText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 10,
  },
  finalScoreCard: {
    flex: 1,
    backgroundColor: "#E3F2FD",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  finalScoreLabel: {
    color: "#6C757D",
    fontSize: 12,
    marginBottom: 4,
  },
  finalScoreValue: {
    color: "#1D1D1F",
    fontWeight: "700",
    fontSize: 28,
  },
  inputContainer: {
    marginBottom: 8,
  },
  scoreInput: {
    borderRadius: 16,
    backgroundColor: "#F8F9FA",
    borderWidth: 2,
    borderColor: "#E9ECEF",
    fontSize: 24,
    paddingHorizontal: 20,
    paddingVertical: 16,
    textAlign: "center",
  },
  inputText: {
    fontSize: 24,
    color: "#1D1D1F",
    fontWeight: "700",
    textAlign: "center",
  },
  winSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    elevation: 4,
  },
  winTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1D1D1F",
    marginBottom: 12,
    textAlign: "center",
  },
  winButtonsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  winButton: {
    flex: 1,
    borderRadius: 6,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  selectedWinButton: {
    // ModernButton handles the selected state styling
  },
  winIcon: {
    marginRight: 6,
  },
  winInfoCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  infoIcon: {
    marginRight: 8,
  },
  winInfoText: {
    fontSize: 12,
    color: "#6C757D",
    flex: 1,
  },
  winnerSection: {
    marginTop: 20,
    alignItems: "center",
  },
  winnerCard: {
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.15)",
    elevation: 8,
    width: "100%",
    marginBottom: 20,
  },
  winnerGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#FFD700",
  },
  winnerIcon: {
    marginRight: 8,
  },
  winnerText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
});

export default PlayerInput;
