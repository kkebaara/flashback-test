import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from "react-native";
import { GameEngine } from "react-native-game-engine";
import Svg, { Rect } from "react-native-svg";

const { width, height } = Dimensions.get("window");

const Player = ({ position }) => {
  return (
    <Svg height="100%" width="100%">
      <Rect
        x={position.x}
        y={position.y}
        width="40"
        height="40"
        fill="blue"
      />
    </Svg>
  );
};

export default function App() {
  const [playerPos, setPlayerPos] = useState({ x: 100, y: height - 120 });

  const movePlayer = (dir) => {
    setPlayerPos((pos) => {
      let newX = pos.x + (dir === "left" ? -20 : dir === "right" ? 20 : 0);
      let newY = pos.y + (dir === "up" ? -60 : dir === "down" ? 60 : 0); // simulate jump
      return {
        x: Math.max(0, Math.min(newX, width - 40)),
        y: Math.max(0, Math.min(newY, height - 40)),
      };
    });
  };

  return (
    <View style={styles.container}>
      <GameEngine
        style={styles.game}
        systems={[]}
        entities={{ player: { position: playerPos, renderer: <Player position={playerPos} /> } }}
      />
      <View style={styles.controls}>
        <TouchableOpacity onPress={() => movePlayer("left")} style={styles.button}>
          <Text style={styles.text}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => movePlayer("up")} style={styles.button}>
          <Text style={styles.text}>↑</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => movePlayer("right")} style={styles.button}>
          <Text style={styles.text}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  game: {
    flex: 1,
    backgroundColor: "#222",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    backgroundColor: "#111",
  },
  button: {
    padding: 20,
    backgroundColor: "#333",
    borderRadius: 8,
  },
  text: {
    color: "#fff",
    fontSize: 24,
  },
});
