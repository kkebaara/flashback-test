import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
} from "react-native";

const { width, height } = Dimensions.get("window");

const PLAYER_WIDTH = 50;
const PLAYER_HEIGHT = 50;
const BG_WIDTH = 2000; // width of the background image
const BG_HEIGHT = 500; // height of the background image

export default function App() {
  const [playerX, setPlayerX] = useState(0); // player's horizontal position

  const movePlayer = (dir) => {
    setPlayerX((prevX) => {
      const delta = dir === "left" ? -20 : 20;
      const newX = prevX + delta;
      return Math.max(0, Math.min(newX, BG_WIDTH - width));
    });
  };

  const backgroundX = -playerX;

  return (
    <View style={styles.container}>
      {/* Background image */}
      <Image
        source={require("./assets/background.png")}
        style={[
          styles.background,
          {
            left: backgroundX,
          },
        ]}
        resizeMode="cover"
      />

      {/* Player sprite (centered horizontally) */}
      <Image
        source={require("./assets/character.png")}
        style={[
          styles.player,
          {
            left: width / 2 - PLAYER_WIDTH / 2,
          },
        ]}
        resizeMode="contain"
      />

      {/* Control buttons */}
      <View style={styles.controls}>
        <TouchableOpacity onPress={() => movePlayer("left")} style={styles.button}>
          <Text style={styles.text}>←</Text>
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
    overflow: "hidden",
  },
  background: {
    position: "absolute",
    top: 0,
    width: BG_WIDTH,
    height: BG_HEIGHT,
  },
  player: {
    position: "absolute",
    bottom: 80,
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
  },
  controls: {
    position: "absolute",
    bottom: 0,
    width: "100%",
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
