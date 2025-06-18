import React, { useState, useEffect, useRef } from "react";
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
const GROUND_Y = height - PLAYER_HEIGHT - 80;
const GRAVITY = 4;
const JUMP_FORCE = 60;
const BG_WIDTH = 2000;
const BG_HEIGHT = 500;

export default function App() {
  const [playerX, setPlayerX] = useState(0);
  const [playerY, setPlayerY] = useState(GROUND_Y);
  const [velocityY, setVelocityY] = useState(0);
  const jumpingRef = useRef(false);

  // Gravity system
  useEffect(() => {
    const interval = setInterval(() => {
      setPlayerY((prevY) => {
        let newY = prevY - velocityY;
        let newVelocityY = velocityY - GRAVITY;

        if (newY >= GROUND_Y) {
          newY = GROUND_Y;
          newVelocityY = 0;
          jumpingRef.current = false;
        }

        setVelocityY(newVelocityY);
        return newY;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [velocityY]);

  const movePlayer = (dir) => {
    setPlayerX((prevX) => {
      const delta = dir === "left" ? -20 : 20;
      const newX = prevX + delta;
      return Math.max(0, Math.min(newX, BG_WIDTH - width));
    });
  };

  const handleTouch = (event) => {
    const touchX = event.nativeEvent.locationX;
    const touchY = event.nativeEvent.locationY;

    if (touchY < height / 2 && !jumpingRef.current) {
      setVelocityY(JUMP_FORCE);
      jumpingRef.current = true;
    } else {
      if (touchX < width / 2) {
        movePlayer("left");
      } else {
        movePlayer("right");
      }
    }
  };

  const backgroundX = -playerX;

  return (
    <TouchableWithoutFeedback onPress={handleTouch}>
      <View style={styles.container}>
        {/* Background */}
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

        {/* Player */}
        <Image
          source={require("./assets/character.png")}
          style={[
            styles.player,
            {
              left: width / 2 - PLAYER_WIDTH / 2,
              top: playerY,
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
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
  },
});
