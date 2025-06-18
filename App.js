import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from "react-native";

const { width, height } = Dimensions.get("window");

const PLAYER_WIDTH = 50;
const PLAYER_HEIGHT = 50;
const BG_WIDTH = 2000;
const BG_HEIGHT = 500;

export default function App() {
  const [playerX, setPlayerX] = useState(0);

  const movePlayer = (dir) => {
    setPlayerX((prevX) => {
      const delta = dir === "left" ? -20 : 20;
      const newX = prevX + delta;
      return Math.max(0, Math.min(newX, BG_WIDTH - width));
    });
  };

  const handleTouch = (event) => {
    const touchX = event.nativeEvent.locationX;
    if (touchX < width / 2) {
      movePlayer("left");
    } else {
      movePlayer("right");
    }
  };

  const backgroundX = -playerX;

  return (
    <TouchableWithoutFeedback onPress={handleTouch}>
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

        {/* Player sprite */}
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
      </View>
    </TouchableWithoutFeedback>
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
});
