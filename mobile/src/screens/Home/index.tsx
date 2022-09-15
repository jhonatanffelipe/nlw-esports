import { Image, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styles";

import logoImg from "../../assets/logo-nlw-esports.png";
import { Heading } from "../../components/Heading";
import { GameCard, IGameCardProps } from "../../components/GameCard";

import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Background } from "../../components/Background";

export function Home() {
  const [games, setGames] = useState<IGameCardProps[]>([]);

  function listGames() {
    fetch("http://192.168.1.35:3333/games")
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
      });
  }

  const navigation = useNavigation();

  function handleOpenGame({ id, title, bannerUrl }: IGameCardProps) {
    navigation.navigate("game", { id, title, bannerUrl });
  }

  useEffect(() => listGames(), []);
  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />
        <Heading
          title="Encontre seu duo."
          subtitle="Selecione o game que deseja jogar.."
        />

        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GameCard data={item} onPress={() => handleOpenGame(item)} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
}
