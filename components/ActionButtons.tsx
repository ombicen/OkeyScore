import { t } from "@/constants/Translations";
import { MaterialIcons } from "@expo/vector-icons";
import { Button } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, View } from "react-native";
import ModernButton from "./ModernButton";

interface ActionButtonsProps {
  currentPlayerIndex: number;
  totalPlayers: number;
  hasPoints: boolean;
  onNextPlayer: () => void;
  onBack: () => void;
  onReset?: () => void;
  onResetRoundsOnly?: () => void;
  showReset?: boolean;
  showResetRoundsOnly?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  currentPlayerIndex,
  totalPlayers,
  hasPoints,
  onNextPlayer,
  onBack,
  onReset,
  onResetRoundsOnly,
  showReset = false,
  showResetRoundsOnly = false,
}) => {
  return (
    <View style={styles.actionButtons}>
      <ModernButton
        title={
          currentPlayerIndex < totalPlayers - 1
            ? t("nextPlayer")
            : t("finishRound")
        }
        onPress={onNextPlayer}
        disabled={!hasPoints}
        style={styles.actionButton}
        variant="primary"
      />
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
        {t("back")}
      </Button>
      {showResetRoundsOnly && onResetRoundsOnly && (
        <Button
          onPress={onResetRoundsOnly}
          style={styles.resetButton}
          status="basic"
          size="large"
          accessoryRight={() => (
            <MaterialIcons
              name="replay"
              size={24}
              color="#8F9BB3"
              style={styles.icon}
            />
          )}
        >
          {t("resetRoundsOnly")}
        </Button>
      )}
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
          {t("reset")}
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  actionButtons: {
    width: "100%",
    gap: 12,
    marginBottom: 16,
  },
  actionButton: {
    borderRadius: 6,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  secondaryAction: {
    backgroundColor: "#F8F9FA",
    borderWidth: 2,
    borderColor: "#E9ECEF",
  },
  resetButton: {
    backgroundColor: "#F8F9FA",
    borderRadius: 6,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderColor: "#E9ECEF",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.06)",
    elevation: 2,
    marginBottom: 8,
  },
  resetRoundsButton: {
    backgroundColor: "#F8F9FA",
    borderRadius: 6,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderColor: "#E9ECEF",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.06)",
    elevation: 2,
    marginBottom: 8,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default ActionButtons;
