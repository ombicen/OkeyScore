import { MaterialIcons } from "@expo/vector-icons";
import { Button } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, View } from "react-native";

interface ActionButtonsProps {
  currentPlayerIndex: number;
  totalPlayers: number;
  hasPoints: boolean;
  onNextPlayer: () => void;
  onBack: () => void;
  onReset?: () => void;
  showReset?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  currentPlayerIndex,
  totalPlayers,
  hasPoints,
  onNextPlayer,
  onBack,
  onReset,
  showReset = false,
}) => {
  return (
    <View style={styles.actionButtons}>
      <Button
        onPress={onNextPlayer}
        style={[styles.actionButton, styles.primaryAction]}
        disabled={!hasPoints}
        size="large"
        accessoryRight={() => (
          <MaterialIcons
            name={
              currentPlayerIndex < totalPlayers - 1 ? "arrow-forward" : "check"
            }
            size={24}
            color="#FFFFFF"
            style={styles.icon}
          />
        )}
      >
        {currentPlayerIndex < totalPlayers - 1 ? "Next Player" : "Finish Round"}
      </Button>
      <Button
        onPress={onBack}
        style={[styles.actionButton, styles.secondaryAction]}
        status="basic"
        size="large"
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
      {showReset && onReset && (
        <Button
          onPress={onReset}
          style={styles.resetButton}
          status="basic"
          size="large"
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  actionButtons: {
    width: "100%",
    gap: 12,
  },
  actionButton: {
    borderRadius: 16,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  primaryAction: {
    backgroundColor: "#0071E3",
  },
  secondaryAction: {
    backgroundColor: "#F8F9FA",
    borderWidth: 2,
    borderColor: "#E9ECEF",
  },
  resetButton: {
    backgroundColor: "#F8F9FA",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderColor: "#E9ECEF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default ActionButtons;
