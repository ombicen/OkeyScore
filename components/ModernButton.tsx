import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface ModernButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: "primary" | "secondary" | "danger";
}

const ModernButton: React.FC<ModernButtonProps> = ({
  title,
  onPress,
  disabled = false,
  style,
  textStyle,
  variant = "primary",
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const getGradientColors = (): [string, string] => {
    switch (variant) {
      case "primary":
        return ["#4A90E2", "#5B9BE6"]; // Subtle blue gradient
      case "secondary":
        return ["#8E8E93", "#9A9A9F"]; // Subtle gray gradient
      case "danger":
        return ["#FF6B6B", "#FF7A7A"]; // Subtle red gradient
      default:
        return ["#4A90E2", "#5B9BE6"];
    }
  };

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isPressed && styles.buttonPressed,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      activeOpacity={1}
    >
      <LinearGradient
        colors={getGradientColors()}
        style={[styles.gradient, isPressed && styles.gradientPressed]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }} // Top-right direction
      >
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 6,
    height: 48,
    justifyContent: "center",
    overflow: "hidden",
    paddingHorizontal: 16,
    position: "relative",
    minWidth: 120,

    elevation: 10,
    // Remove white background to let gradient show through
    backgroundColor: "transparent",
    transform: [{ translateY: 0 }],
  },
  buttonPressed: {
    // Pressed state - button moves down
    shadowColor: "#2D2342",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
    transform: [{ translateY: 2 }],
  },
  gradient: {
    alignItems: "center",
    elevation: 10,
    borderRadius: 6,
    height: "100%",
    justifyContent: "center",
    width: "100%",
    // Ensure gradient fills the entire button
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // Inner shadow for inset effect
    shadowColor: "#3A416F", // rgba(58, 65, 111, .5)
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.5,
    shadowRadius: 0,
    elevation: 6,
  },
  gradientPressed: {
    // Subtle change on press
    opacity: 0.95,
    // Reduced inner shadow on press
    shadowColor: "#3A416F",
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.3,
    shadowRadius: 0,
    elevation: 3,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    fontFamily: "System",
    letterSpacing: 0.3,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    // Ensure text is above the gradient
    zIndex: 1,
  },
  disabled: {
    opacity: 0.6,
  },
});

export default ModernButton;
