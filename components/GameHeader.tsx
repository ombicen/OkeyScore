import { t } from "@/constants/Translations";
import { Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, View } from "react-native";
import HeartIcon from "./HeartIcon";

interface GameHeaderProps {
  currentRound: number;
  totalRounds: number;
  selectedColor?: "red" | "blue" | "yellow" | "black" | null;
  colorMultipliers: {
    red: number;
    blue: number;
    yellow: number;
    black: number;
  };
}

const GameHeader: React.FC<GameHeaderProps> = ({
  currentRound,
  totalRounds,
  selectedColor,
  colorMultipliers,
}) => {
  const getColorName = (color: string) => {
    switch (color) {
      case "red":
        return t("red");
      case "blue":
        return t("blue");
      case "yellow":
        return t("yellow");
      case "black":
        return t("black");
      default:
        return color;
    }
  };

  return (
    <View style={styles.gameHeader}>
      <View style={styles.roundIndicator}>
        <Text category="h6" style={styles.roundText}>
          {t("round")} {currentRound} {t("of")} {totalRounds}
        </Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${(currentRound / totalRounds) * 100}%` },
            ]}
          />
        </View>
      </View>

      {selectedColor && (
        <View style={styles.selectedColorDisplay}>
          <HeartIcon color={selectedColor} size={24} />
          <Text category="s1" style={styles.colorName}>
            {getColorName(selectedColor)} • {colorMultipliers[selectedColor]}x
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  gameHeader: {
    width: "100%",
    alignItems: "center",
    marginBottom: 32,
  },
  roundIndicator: {
    width: "100%",
    alignItems: "center",
    marginBottom: 24,
  },
  roundText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1D1D1F",
    marginBottom: 12,
  },
  progressBar: {
    width: "100%",
    height: 6,
    backgroundColor: "#E5E6EA",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#0071E3",
    borderRadius: 3,
  },
  selectedColorDisplay: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#F8F9FA",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#E9ECEF",
    width: "100%",
    marginBottom: 16,
  },
  colorName: {
    marginLeft: 12,
    fontWeight: "600",
    color: "#495057",
    fontSize: 16,
  },
});

export default GameHeader;
