import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

// Types
export type OkeyColor = "red" | "blue" | "yellow" | "black";
export interface Player {
  name: string;
  remainingPoints: number;
  penaltyPoints: number;
}
export interface Round {
  color: OkeyColor;
  multiplier: number;
  players: Player[];
}
export interface ColorMultipliers {
  red: number;
  blue: number;
  yellow: number;
  black: number;
}
export interface GameSettings {
  colorMultipliers: ColorMultipliers;
  defaultRounds: number;
}
export interface Game {
  playerNames: string[];
  totalRounds: number;
  currentRound: number;
  rounds: Round[];
  colorMultipliers: ColorMultipliers;
  defaultRounds: number;
}

// Default multipliers
const defaultMultipliers: ColorMultipliers = {
  red: 2,
  blue: 3,
  yellow: 4,
  black: 5,
};

// Context type
interface GameContextType {
  game: Game;
  currentRound: Round | null;
  multipliers: Record<OkeyColor, number>;
  playerNames: string[];
  totalRounds: number;
  rounds: Round[];
  colorMultipliers: ColorMultipliers;
  defaultRounds: number;
  setMultipliers: (multipliers: Record<OkeyColor, number>) => void;
  setPlayerNames: (names: string[]) => void;
  startNewRound: (color: OkeyColor) => void;
  addPlayerPoints: (points: number) => void;
  endRound: () => void;
  resetGame: () => void;
  addRound: (round: Round) => void;
  setTotalRounds: (rounds: number) => void;
  addPlayer: (name: string) => void;
  removePlayer: (index: number) => void;
  updateSettings: (settings: GameSettings) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [game, setGame] = useState<Game>({
    playerNames: [],
    totalRounds: 0,
    currentRound: 0,
    rounds: [],
    colorMultipliers: defaultMultipliers,
    defaultRounds: 10,
  });
  const [currentRound, setCurrentRound] = useState<Round | null>(null);
  const [multipliers, setMultipliers] =
    useState<Record<OkeyColor, number>>(defaultMultipliers);

  // Load game data from AsyncStorage on mount
  useEffect(() => {
    const loadGame = async () => {
      try {
        const savedGame = await AsyncStorage.getItem("game");
        if (savedGame) setGame(JSON.parse(savedGame));
        const savedMultipliers = await AsyncStorage.getItem("multipliers");
        if (savedMultipliers) setMultipliers(JSON.parse(savedMultipliers));
      } catch (error) {
        console.error("Error loading game data:", error);
      }
    };
    loadGame();
  }, []);

  // Save game data to AsyncStorage whenever game, multipliers, or playerNames change
  useEffect(() => {
    const saveGame = async () => {
      try {
        await AsyncStorage.setItem("game", JSON.stringify(game));
        await AsyncStorage.setItem("multipliers", JSON.stringify(multipliers));
      } catch (error) {
        console.error("Error saving game data:", error);
      }
    };
    saveGame();
  }, [game, multipliers]);

  const startNewRound = (color: OkeyColor) => {
    const newRound: Round = {
      color,
      multiplier: multipliers[color],
      players: game.playerNames.map((name) => ({
        name,
        remainingPoints: 0,
        penaltyPoints: 0,
      })),
    };
    setCurrentRound(newRound);
  };

  const addPlayerPoints = (points: number) => {
    if (!currentRound) return;
    const updatedPlayers = [...currentRound.players];
    const currentPlayerIndex = updatedPlayers.findIndex(
      (p) => p.remainingPoints === 0
    );
    if (currentPlayerIndex !== -1) {
      updatedPlayers[currentPlayerIndex].remainingPoints = points;
      updatedPlayers[currentPlayerIndex].penaltyPoints =
        points * multipliers[currentRound.color];
    }
    setCurrentRound({ ...currentRound, players: updatedPlayers });
  };

  const endRound = () => {
    if (!currentRound) return;
    setGame((prev) => ({
      ...prev,
      rounds: [...prev.rounds, currentRound],
      currentRound: prev.currentRound + 1,
    }));
    setCurrentRound(null);
  };

  const resetGame = () => {
    setGame({
      playerNames: [], // Also clear player names
      totalRounds: 0,
      currentRound: 0,
      rounds: [],
      colorMultipliers: defaultMultipliers,
      defaultRounds: 10,
    });
    setCurrentRound(null);
  };

  const setPlayerNames = (names: string[]) => {
    setGame((prev) => ({ ...prev, playerNames: names }));
  };

  const setTotalRounds = (rounds: number) => {
    setGame((prev) => ({ ...prev, totalRounds: rounds }));
  };

  const addRound = (round: Round) => {
    setGame((prev) => ({
      ...prev,
      rounds: [...prev.rounds, round],
      currentRound: prev.currentRound + 1,
    }));
  };

  const addPlayer = (name: string) => {
    setGame((prev) => ({ ...prev, playerNames: [...prev.playerNames, name] }));
  };

  const removePlayer = (index: number) => {
    setGame((prev) => ({
      ...prev,
      playerNames: prev.playerNames.filter((_, i) => i !== index),
    }));
  };

  const updateSettings = (settings: GameSettings) => {
    setGame((prev) => ({
      ...prev,
      colorMultipliers: settings.colorMultipliers,
      defaultRounds: settings.defaultRounds,
    }));
  };

  return (
    <GameContext.Provider
      value={{
        game,
        currentRound,
        multipliers,
        playerNames: game.playerNames,
        totalRounds: game.totalRounds,
        rounds: game.rounds,
        colorMultipliers: game.colorMultipliers,
        defaultRounds: game.defaultRounds,
        setMultipliers,
        setPlayerNames,
        startNewRound,
        addPlayerPoints,
        endRound,
        resetGame,
        addRound,
        setTotalRounds,
        addPlayer,
        removePlayer,
        updateSettings,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
