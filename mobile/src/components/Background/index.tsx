import React from "react";

import { ImageBackground } from "react-native";

import { styles } from "./styles";
import backgroundImage from "../../assets/background-galaxy.png";

interface IBackgroundProps {
  children: React.ReactNode;
}

export function Background({ children }: IBackgroundProps) {
  return (
    <ImageBackground
      source={backgroundImage}
      defaultSource={backgroundImage}
      style={styles.container}
    >
      {children}
    </ImageBackground>
  );
}
