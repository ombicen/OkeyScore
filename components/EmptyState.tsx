import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, View } from "react-native";
import ModernButton from "./ModernButton";

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
    <View
      style={{
        paddingHorizontal: 16,
        width: "100%",
      }}
    >
      <View style={styles.container}>
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
        <ModernButton
          title={buttonText}
          onPress={onButtonPress}
          style={styles.primaryButton}
          variant="primary"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 48,
    paddingHorizontal: 32,
    alignItems: "center",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
    elevation: 2,
    width: "100%",
    marginTop: 64,
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
    borderRadius: 6,
    height: 48,
    paddingHorizontal: 32,
    marginBottom: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default EmptyState;
