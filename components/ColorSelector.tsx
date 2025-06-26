import { t } from "@/constants/Translations";
import { Button, Text } from "@ui-kitten/components";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import HeartIcon from "./HeartIcon";

const { width: screenWidth } = Dimensions.get("window");

interface ColorSelectorProps {
  selectedColor: "red" | "blue" | "yellow" | "black" | null;
  colorMultipliers: {
    red: number;
    blue: number;
    yellow: number;
    black: number;
  };
  onColorSelect: (color: "red" | "blue" | "yellow" | "black") => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({
  selectedColor,
  colorMultipliers,
  onColorSelect,
}) => {
  const getColorDisplay = (color: string) => {
    return (
      <View style={styles.colorContainer}>
        <HeartIcon color={color} size={48} />
        <Text category="c1" style={styles.multiplierText}>
          {colorMultipliers[color as keyof typeof colorMultipliers]}x
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.colorSection}>
      <Text category="h6" style={styles.sectionTitle}>
        {t("colorMultipliers")}
      </Text>
      <View style={styles.colorGrid}>
        {["red", "blue", "yellow", "black"].map((color) => (
          <Button
            key={color}
            onPress={() => onColorSelect(color as any)}
            style={[
              styles.colorButton,
              selectedColor === color && styles.selectedColorButton,
            ]}
            status={selectedColor === color ? "primary" : "basic"}
            size="large"
            appearance="filled"
            accessibilityLabel={`Select ${color} color`}
          >
            {getColorDisplay(color)}
          </Button>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  colorSection: {
    width: "100%",
    alignItems: "center",
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1D1D1F",
    textAlign: "center",
    marginBottom: 20,
  },
  colorGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
    width: "100%",
  },
  colorButton: {
    width: (screenWidth - 100) / 2,
    height: (screenWidth - 100) / 2,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 0,
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.12)",
    elevation: 8,
    position: "relative",
    overflow: "hidden",
  },
  selectedColorButton: {
    transform: [{ scale: 1.05 }],
    backgroundColor: "#FFFFFF",
    borderColor: "#0071E3",
    borderWidth: 3,
    boxShadow: "0px 12px 24px rgba(0, 113, 227, 0.3)",
    elevation: 12,
  },
  colorContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  multiplierText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1D1D1F",
    letterSpacing: 0.5,
  },
  colorName: {
    fontSize: 14,
    fontWeight: "700",
  },
});

export default ColorSelector;
