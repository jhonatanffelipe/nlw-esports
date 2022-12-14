import { useNavigation, useRoute } from "@react-navigation/native";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";

import { styles } from "./styles";
import { THEME } from "../../theme";

import logoImg from "../../assets/logo-nlw-esports.png";

import { Background } from "../../components/Background";
import { IGameCardProps } from "../../components/GameCard";
import { Heading } from "../../components/Heading";
import { DuoCard } from "../../components/DuoCard";
import { useEffect, useState } from "react";
import { IDuoCardProps } from "../../interfaces/IDuoCardProps";
import { DuoMach } from "../../components/DuoMach";

export function Game() {
  const route = useRoute();
  const navigation = useNavigation();

  const game = route.params as IGameCardProps;

  const [duos, setDuos] = useState<IDuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState<string>("");

  function handleGoBack() {
    navigation.goBack();
  }

  function listAdsByGames() {
    fetch(`http://192.168.0.114:3333/games/${game.id}/ads`)
      .then((response) => response.json())
      .then((data) => {
        setDuos(data);
      });
  }

  async function getDiscordUset(adsId: string) {
    fetch(`http://192.168.0.114:3333/games/ads/${adsId}/discord`)
      .then((response) => response.json())
      .then((data) => {
        setDiscordDuoSelected(data.discord);
      });
  }

  useEffect(() => listAdsByGames(), []);
  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPressOut={() => handleGoBack()}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />

          <View style={styles.right}></View>
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode={"cover"}
        />

        <Heading title={game.title} subtitle={"Conecte-se e comece a jogar!"} />

        <FlatList
          data={duos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard onConnect={() => getDiscordUset(item.id)} data={item} />
          )}
          horizontal
          contentContainerStyle={[
            duos.length > 0 ? styles.contentList : styles.emptyListContent,
          ]}
          showsHorizontalScrollIndicator={false}
          style={styles.containerList}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              N??o h?? an??ncios publicados ainda.
            </Text>
          )}
        />

        <DuoMach
          visible={discordDuoSelected.length > 0}
          discord={discordDuoSelected}
          onClose={() => setDiscordDuoSelected("")}
        />
      </SafeAreaView>
    </Background>
  );
}
