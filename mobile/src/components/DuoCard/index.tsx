import { Text, TouchableOpacity, View } from "react-native";
import { GameController } from "phosphor-react-native";

import { THEME } from "../../theme";
import { DuoInfo } from "../DuoInfo";
import { styles } from "./styles";

import { IDuoCardProps } from "../../interfaces/IDuoCardProps";

interface IProps {
  data: IDuoCardProps;
  onConnect: () => void;
}

export function DuoCard({ data, onConnect }: IProps) {
  return (
    <View style={styles.container}>
      <DuoInfo label="Nome" value={data.name} />
      <DuoInfo label="Tempo de jogo" value={`${data.yearsPlaying} ano(s)`} />
      <DuoInfo
        label="Disponibilidade"
        value={`${data.weekDays.length} dias \u2022 ${data.hourStart}h - ${data.hourEnd}h`}
      />
      <DuoInfo
        label="Chamada de áudio?"
        value={data.useVoiceChannel ? "Sim" : "Não"}
        colorValue={
          data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT
        }
      />

      <TouchableOpacity style={styles.button} onPressOut={onConnect}>
        <GameController color={THEME.COLORS.TEXT} size={20} />
        <Text style={styles.buttonTitle}>Conectar</Text>
      </TouchableOpacity>
    </View>
  );
}
