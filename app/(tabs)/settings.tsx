import { useGame } from "@/contexts/GameContext";
import { MaterialIcons } from "@expo/vector-icons";
import { Button, Input, Layout, Text } from "@ui-kitten/components";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function SettingsScreen() {
  const router = useRouter();
  const { colorMultipliers, defaultRounds, updateSettings } = useGame();
  const [redMultiplier, setRedMultiplier] = useState(
    colorMultipliers.red.toString()
  );
  const [blueMultiplier, setBlueMultiplier] = useState(
    colorMultipliers.blue.toString()
  );
  const [yellowMultiplier, setYellowMultiplier] = useState(
    colorMultipliers.yellow.toString()
  );
  const [blackMultiplier, setBlackMultiplier] = useState(
    colorMultipliers.black.toString()
  );
  const [rounds, setRounds] = useState(defaultRounds.toString());

  const handleSave = () => {
    updateSettings({
      colorMultipliers: {
        red: parseInt(redMultiplier) || 2,
        blue: parseInt(blueMultiplier) || 3,
        yellow: parseInt(yellowMultiplier) || 4,
        black: parseInt(blackMultiplier) || 5,
      },
      defaultRounds: parseInt(rounds) || 10,
    });
    setTimeout(() => {
      router.back();
    }, 1500);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: "#F5F5F7" }}>
      <Layout style={styles.container}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={styles.card}>
          <View style={styles.section}>
            <Text category="h6" style={styles.sectionTitle}>
              Color Multipliers
            </Text>
            <Input
              label="Red Multiplier"
              value={redMultiplier}
              onChangeText={setRedMultiplier}
              keyboardType="numeric"
              style={styles.input}
              accessoryLeft={() => (
                <MaterialIcons
                  name="palette"
                  size={24}
                  color="#FF6B6B"
                  style={styles.icon}
                />
              )}
            />
            <Input
              label="Blue Multiplier"
              value={blueMultiplier}
              onChangeText={setBlueMultiplier}
              keyboardType="numeric"
              style={styles.input}
              accessoryLeft={() => (
                <MaterialIcons
                  name="palette"
                  size={24}
                  color="#4A90E2"
                  style={styles.icon}
                />
              )}
            />
            <Input
              label="Yellow Multiplier"
              value={yellowMultiplier}
              onChangeText={setYellowMultiplier}
              keyboardType="numeric"
              style={styles.input}
              accessoryLeft={() => (
                <MaterialIcons
                  name="palette"
                  size={24}
                  color="#FFD93D"
                  style={styles.icon}
                />
              )}
            />
            <Input
              label="Black Multiplier"
              value={blackMultiplier}
              onChangeText={setBlackMultiplier}
              keyboardType="numeric"
              style={styles.input}
              accessoryLeft={() => (
                <MaterialIcons
                  name="palette"
                  size={24}
                  color="#4A4A4A"
                  style={styles.icon}
                />
              )}
            />
          </View>
          <View style={styles.section}>
            <Text category="h6" style={styles.sectionTitle}>
              Default Rounds
            </Text>
            <Input
              label="Number of Rounds"
              value={rounds}
              onChangeText={setRounds}
              keyboardType="numeric"
              style={styles.input}
              accessoryLeft={() => (
                <MaterialIcons
                  name="repeat"
                  size={24}
                  color="#8F9BB3"
                  style={styles.icon}
                />
              )}
            />
          </View>
        </View>
        <Button
          style={styles.saveButton}
          status="basic"
          appearance="filled"
          onPress={handleSave}
        >
          Save Changes
        </Button>
      </Layout>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    paddingTop: 32,
    paddingBottom: 48,
    backgroundColor: "#F5F5F7",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: "700",
    color: "#1D1D1F",
    textAlign: "center",
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 36,
    paddingHorizontal: 32,
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
    width: "92%",
  },
  saveButton: {
    marginTop: 40,
    borderRadius: 16,
    backgroundColor: "#0071E3",
    paddingVertical: 20,
    width: "92%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  input: {
    marginBottom: 15,
    borderRadius: 14,
    backgroundColor: "#F7F8FA",
    borderWidth: 1,
    borderColor: "#E5E6EA",
    fontSize: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  section: {
    marginBottom: 20,
    width: "100%",
  },
  icon: {
    width: 24,
    height: 24,
  },
});
