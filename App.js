import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
} from "react-native";
import { GameEngine } from "react-native-game-engine";

const { width, height } = Dimensions.get("window");
const PLAYER_WIDTH = 50;
const PLAYER_HEIGHT = 50;

const Player = ({ position }) => {
  return (
    <Image
      source={require("./assets/character.png")}
      style={{
        width: PLAYER_WIDTH,
        height: PLAYER_HEIGHT,
        position: "absolute",
        left: position.x,
        top: position.y,
      }}
      resizeMode="contain"
    />
  );
};

export default function App() {
  const [playerPos, setPlayerPos] = useState({ x: 100, y: height / 2 });

  const movePlayer = (dir) => {
    setPlayerPos((pos) => {
      let newX = pos.x + (dir === "left" ? -20 : dir === "right" ? 20 : 0);
      let newY = pos.y + (dir === "up" ? -60 : 0); // simulate jump
      return {
        x: Math.max(0, Math.min(newX, width - PLAYER_WIDTH)),
        y: Math.max(0, newY),
      };
    });
  };

  return (
    <View style={styles.container}>
      <GameEngine
        style={styles.game}
        systems={[]}
