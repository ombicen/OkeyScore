import { MaterialIcons } from "@expo/vector-icons";
import { Button, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, View } from "react-native";

interface EmptyStateProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  subtitle: string;
  buttonText: string;
  onButtonPress: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  subtitle,
  buttonText,
  onButtonPress,
}) => {
  return (
    <View style={styles.emptyStateContainer}>
      <MaterialIcons
        name={icon}
        size={64}
        color="#8F9BB3"
        style={styles.emptyIcon}
      />
      <Text category="h4" style={styles.title}>
        {title}
      </Text>
      <Text category="p1" style={styles.subtitle}>
        {subtitle}
      </Text>
      <Button
        onPress={onButtonPress}
        style={styles.primaryButton}
        size="large"
        accessoryRight={() => (
          <MaterialIcons
            name="arrow-forward"
            size={24}
            color="#FFFFFF"
            style={styles.icon}
          />
        )}
      >
        {buttonText}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyStateContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyIcon: {
    marginBottom: 24,
    opacity: 0.6,
  },
  title: {
    textAlign: "center",
    marginBottom: 16,
    fontSize: 20,
    fontWeight: "700",
    color: "#1D1D1F",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 32,
    fontSize: 15,
    color: "#6C757D",
    lineHeight: 22,
  },
  primaryButton: {
    backgroundColor: "#0071E3",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default EmptyState;
