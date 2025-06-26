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
  winType?: "regular" | "okey";
  winner?: string;
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
  red: 6,
  blue: 4,
  yellow: 5,
  black: 3,
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
  resetRoundsOnly: () => void;
  resetSettings: () => void;
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

  // Load game data and settings from AsyncStorage on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load game data
        const savedGame = await AsyncStorage.getItem("game");
        if (savedGame) {
          const parsedGame = JSON.parse(savedGame);
          setGame(parsedGame);
        }

        // Load multipliers
        const savedMultipliers = await AsyncStorage.getItem("multipliers");
        if (savedMultipliers) {
          setMultipliers(JSON.parse(savedMultipliers));
        }

        // Load settings separately
        const savedSettings = await AsyncStorage.getItem("settings");
        if (savedSettings) {
          const settings = JSON.parse(savedSettings);
          setGame((prev) => ({
            ...prev,
            colorMultipliers: settings.colorMultipliers || defaultMultipliers,
            defaultRounds: settings.defaultRounds || 10,
          }));
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    loadData();
  }, []);

  // Save game data to AsyncStorage whenever game or multipliers change
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

  // Save settings separately whenever they change
  useEffect(() => {
    const saveSettings = async () => {
      try {
        const settings = {
          colorMultipliers: game.colorMultipliers,
          defaultRounds: game.defaultRounds,
        };
        await AsyncStorage.setItem("settings", JSON.stringify(settings));
      } catch (error) {
        console.error("Error saving settings:", error);
      }
    };
    saveSettings();
  }, [game.colorMultipliers, game.defaultRounds]);

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
    setGame((prev) => ({
      ...prev,
      playerNames: [],
      totalRounds: 0,
      currentRound: 0,
      rounds: [],
    }));
    setCurrentRound(null);
  };

  const resetRoundsOnly = () => {
    setGame((prev) => ({
      ...prev,
      rounds: [],
      currentRound: 0,
    }));
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

  const resetSettings = async () => {
    setGame((prev) => ({
      ...prev,
      colorMultipliers: defaultMultipliers,
      defaultRounds: 10,
    }));

    // Clear settings from AsyncStorage
    try {
      await AsyncStorage.removeItem("settings");
    } catch (error) {
      console.error("Error clearing settings:", error);
    }
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
        resetRoundsOnly,
        resetSettings,
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
