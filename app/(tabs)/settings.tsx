import { useGame } from "@/contexts/GameContext";
import { MaterialIcons } from "@expo/vector-icons";
import { Button, Card, Input, Layout, Text } from "@ui-kitten/components";
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
  const [showConfirmation, setShowConfirmation] = useState(false);

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
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      router.back();
    }, 1500);
  };

  const handleReset = () => {
    setRedMultiplier("2");
    setBlueMultiplier("3");
    setYellowMultiplier("4");
    setBlackMultiplier("5");
    setRounds("10");
  };

  return (
    <ScrollView>
      <Layout style={styles.container}>
        <Card style={styles.card}>
          <Text category="h5" style={styles.title}>
            Settings
          </Text>

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
                  color="#8F9BB3"
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
                  color="#8F9BB3"
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
                  color="#8F9BB3"
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
                  color="#8F9BB3"
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

          <View style={styles.buttons}>
            <Button
              onPress={handleSave}
              style={[styles.button, styles.saveButton]}
              disabled={showConfirmation}
              accessoryRight={() => (
                <MaterialIcons
                  name="check"
                  size={24}
                  color="#8F9BB3"
                  style={styles.icon}
                />
              )}
            >
              {showConfirmation ? "Settings Saved!" : "Save Changes"}
            </Button>
            <Button
              onPress={handleReset}
              style={[styles.button, styles.resetButton]}
              status="basic"
              disabled={showConfirmation}
              accessoryRight={() => (
                <MaterialIcons
                  name="refresh"
                  size={24}
                  color="#8F9BB3"
                  style={styles.icon}
                />
              )}
            >
              Reset to Defaults
            </Button>
          </View>
        </Card>
      </Layout>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    marginBottom: 10,
  },
  input: {
    marginBottom: 15,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
  },
  resetButton: {
    backgroundColor: "#9E9E9E",
  },
  icon: {
    width: 24,
    height: 24,
  },
});
