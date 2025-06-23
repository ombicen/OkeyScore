import { useGame } from "@/contexts/GameContext";
import { MaterialIcons } from "@expo/vector-icons";
import { Button, Input, Layout, Text } from "@ui-kitten/components";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function SelectRoundsScreen() {
  const router = useRouter();
  const { setTotalRounds } = useGame();
  const [rounds, setRounds] = useState("");

  const handleContinue = () => {
    const roundsNum = parseInt(rounds);
    if (roundsNum > 0) {
      setTotalRounds(roundsNum);
      router.push("/game");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, backgroundColor: "#F5F5F7" }}
    >
      <Layout style={styles.container}>
        <Text style={styles.sectionTitle}>Select Rounds</Text>
        <View style={styles.card}>
          <Text category="h5" style={styles.title}>
            Select Number of Rounds
          </Text>
          <Text category="s1" style={styles.subtitle}>
            Enter the total number of rounds to play
          </Text>

          <Input
            placeholder="Number of Rounds"
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
        <Button
          style={styles.nextButton}
          status="basic"
          appearance="filled"
          onPress={handleContinue}
        >
          Next
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
  title: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 14,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 16,
    opacity: 0.7,
    fontSize: 11,
  },
  input: {
    marginBottom: 20,
    fontSize: 14,
  },
  nextButton: {
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
  icon: {
    width: 24,
    height: 24,
  },
});
