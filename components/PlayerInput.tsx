import { MaterialIcons } from "@expo/vector-icons";
import { Button, Input, Text } from "@ui-kitten/components";
import React, { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";

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

  return (
    <View style={styles.container}>
      {/* Player Header */}
      <View style={styles.playerHeader}>
        <View style={styles.playerInfo}>
          <Text category="h6" style={styles.playerName}>
            {currentPlayer}
          </Text>
          <Text category="c1" style={styles.playerCounter}>
            {currentPlayerIndex + 1} of {totalPlayers}
          </Text>
        </View>
      </View>

      {/* Score Input */}
      <View style={styles.inputSection}>
        <Text category="s1" style={styles.inputLabel}>
          Enter Score
        </Text>
        <Input
          ref={inputRef}
          style={styles.scoreInput}
          value={points[currentPlayer] || ""}
          onChangeText={onPointsChange}
          keyboardType="number-pad"
          placeholder="0"
          size="large"
          textStyle={styles.inputText}
          placeholderTextColor="#86868B"
          status="basic"
          returnKeyType="done"
          maxLength={3}
          autoFocus
        />
      </View>

      {/* Win Selection - Only show if no winner yet */}
      {!winner && (
        <View style={styles.winSection}>
          <Text category="s1" style={styles.winTitle}>
            Win Type
          </Text>
          <View style={styles.winButtonsRow}>
            <Button
              style={[
                styles.winButton,
                winType === "regular" && styles.selectedWinButton,
              ]}
              status={winType === "regular" ? "primary" : "basic"}
              size="small"
              onPress={() => onWinSelection("regular")}
              accessoryLeft={() => (
                <MaterialIcons
                  name="emoji-events"
                  size={16}
                  color={winType === "regular" ? "#FFFFFF" : "#8F9BB3"}
                  style={styles.winIcon}
                />
              )}
            >
              Regular
            </Button>

            <Button
              style={[
                styles.winButton,
                winType === "okey" && styles.selectedWinButton,
              ]}
              status={winType === "okey" ? "primary" : "basic"}
              size="small"
              onPress={() => onWinSelection("okey")}
              accessoryLeft={() => (
                <MaterialIcons
                  name="star"
                  size={16}
                  color={winType === "okey" ? "#FFFFFF" : "#8F9BB3"}
                  style={styles.winIcon}
                />
              )}
            >
              Okey/Shift
            </Button>
          </View>

          {winType && (
            <View style={styles.winInfo}>
              <MaterialIcons
                name="info-outline"
                size={14}
                color="#6C757D"
                style={styles.infoIcon}
              />
              <Text category="c1" style={styles.winInfoText}>
                {winType === "regular"
                  ? `Winner: -${20 * colorMultipliers[selectedColor]} pts`
                  : `Winner: -${
                      20 * colorMultipliers[selectedColor]
                    } + 2x total`}
              </Text>
            </View>
          )}
        </View>
      )}

      {/* Winner Display */}
      {winner && (
        <View style={styles.winnerDisplay}>
          <MaterialIcons name="emoji-events" size={20} color="#0071E3" />
          <Text category="s1" style={styles.winnerText}>
            {winner} won!
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 8,
  },
  playerHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  playerInfo: {
    alignItems: "center",
  },
  playerName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1D1D1F",
    marginBottom: 2,
  },
  playerCounter: {
    fontSize: 12,
    color: "#6C757D",
    fontWeight: "500",
  },
  inputSection: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#495057",
    marginBottom: 8,
    textAlign: "center",
  },
  scoreInput: {
    borderRadius: 12,
    backgroundColor: "#F8F9FA",
    borderWidth: 2,
    borderColor: "#E9ECEF",
    fontSize: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    textAlign: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  inputText: {
    fontSize: 18,
    color: "#1D1D1F",
    fontWeight: "600",
    textAlign: "center",
  },
  winSection: {
    marginBottom: 16,
  },
  winTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#495057",
    marginBottom: 8,
    textAlign: "center",
  },
  winButtonsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  winButton: {
    borderRadius: 12,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    minWidth: 80,
  },
  selectedWinButton: {
    backgroundColor: "#E3F2FD",
    borderColor: "#0071E3",
    borderWidth: 2,
  },
  winIcon: {
    marginRight: 4,
  },
  winInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    padding: 8,
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  infoIcon: {
    marginRight: 4,
  },
  winInfoText: {
    fontSize: 11,
    color: "#6C757D",
    flex: 1,
    textAlign: "center",
  },
  winnerDisplay: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E9ECEF",
  },
  winnerText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "600",
    color: "#1D1D1F",
  },
});

export default PlayerInput;
