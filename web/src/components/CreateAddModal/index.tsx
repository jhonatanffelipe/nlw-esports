import { useEffect, useState, FormEvent } from "react";
import { Check, GameController, CaretDown, CaretUp } from "phosphor-react";
import axios from "axios";

import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Select from "@radix-ui/react-select";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

import "./styles.css";

import { IGame } from "../../interfaces/IGame";

export function CreateAddModal() {
  const [games, setGames] = useState<IGame[]>([]);
  const [gameId, setGameId] = useState<any>();
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);

  function listGames() {
    axios.get("http://localhost:3333/games").then((response) => {
      setGames(response.data);
    });
  }

  function handleCreateAd(event: FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    const messsage = handleValidationData(data);

    if (messsage !== "error") {
      axios({
        method: "post",
        url: `http://localhost:3333/games/${gameId}/ads`,
        data: {
          name: data.name,
          yearsPlaying: Number(data.yearsPlaying),
          discord: data.discord,
          weekDays: weekDays.toString(),
          hourStart: data.hourStart,
          hourEnd: data.hourEnd,
          useVoiceChannel,
        },
      })
        .then((response) => {
          alert("Anúncio criado com sucesso!");
        })
        .catch((error) => {
          alert("Erro ao criar anúncio: " + error);
        });
    }
  }

  function handleValidationData(data: any) {
    if (!gameId) {
      alert("Por favor, selecione o game!");
      return "error";
    }

    if (!data.name) {
      alert("Por favor, informe o nome!");
      return "error";
    }

    if (!data.discord) {
      alert("Por favor, informe o discord!");
      return "error";
    }

    if (weekDays.length <= 0) {
      alert("Por favor, informe os dias da semana que você costuma jogar!");
      return "error";
    }

    if (!data.hourStart || !data.hourEnd) {
      alert("Por favor, informe a hora inicial e final");
      return "error";
    }
  }
  useEffect(() => listGames(), []);
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="modalOverlay" />
      <Dialog.Content className="modalContent">
        <Dialog.Title className="modalTitle">Publique um anúncio</Dialog.Title>

        <form onSubmit={handleCreateAd}>
          <div className="formInput">
            <label htmlFor="game">Qual o game?</label>
            <Select.Root onValueChange={(id) => setGameId(id)}>
              <Select.Trigger className="styledSelectTrigger">
                <Select.Value
                  className="styledSelectValue"
                  placeholder="Selecione o game que deseja jogar"
                />
                <Select.Icon>
                  <CaretDown size={16} />
                </Select.Icon>
              </Select.Trigger>

              <Select.Portal className="styledSelectPotal">
                <Select.Content className="styledSelectContent">
                  <Select.SelectScrollUpButton className="styledScrollButton">
                    <CaretUp />
                  </Select.SelectScrollUpButton>
                  <Select.Viewport className="styledSelectViewport">
                    <Select.Group className="styledSelectGroup">
                      {games.map((game) => {
                        return (
                          <Select.Item
                            className="styledSelectItem"
                            value={game.id}
                            key={game.id}
                          >
                            <Select.ItemText className="styledSelectItemText">
                              {game.title}
                            </Select.ItemText>
                            <Select.ItemIndicator className="styledSelectItemIndicator">
                              <Check size={20} />
                            </Select.ItemIndicator>
                          </Select.Item>
                        );
                      })}
                    </Select.Group>
                  </Select.Viewport>

                  <Select.SelectScrollDownButton className="styledScrollButton">
                    <CaretDown />
                  </Select.SelectScrollDownButton>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>

          <div className="formInput">
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <input
              name="name"
              id="nickname"
              type="text"
              placeholder="Como te chamam dentro do game?"
            />
          </div>

          <div className="formInputGroup">
            <div className="formInput formInputGroupElement">
              <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
              <input
                name="yearsPlaying"
                id="yearsPlaying"
                type="number"
                placeholder="Tudo bem ser ZERO"
              />
            </div>

            <div className="formInput formInputGroupElement">
              <label htmlFor="discord">Qual seu Discord?</label>
              <input
                name="discord"
                id="discord"
                type="text"
                placeholder="Usuario#0000"
              />
            </div>
          </div>

          <div className="formInputGroup">
            <div className="formInput formInputGroupElement">
              <label htmlFor="weekDays">Quando costuma jogar?</label>

              <ToggleGroup.Root
                type="multiple"
                className="weekDaysButtons"
                onValueChange={setWeekDays}
              >
                <ToggleGroup.Item
                  value="0"
                  className={`weekDaysButtonsItem ${
                    weekDays.includes("0") ? "daySelected" : "dayNonSelected"
                  }`}
                  title="Domingo"
                >
                  D
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  value="1"
                  className={`weekDaysButtonsItem ${
                    weekDays.includes("1") ? "daySelected" : "dayNonSelected"
                  }`}
                  title="Segunda"
                >
                  S
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  value="2"
                  className={`weekDaysButtonsItem ${
                    weekDays.includes("2") ? "daySelected" : "dayNonSelected"
                  }`}
                  title="Terça"
                >
                  T
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  value="3"
                  className={`weekDaysButtonsItem ${
                    weekDays.includes("3") ? "daySelected" : "dayNonSelected"
                  }`}
                  title="Quarta"
                >
                  Q
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  value="4"
                  className={`weekDaysButtonsItem ${
                    weekDays.includes("4") ? "daySelected" : "dayNonSelected"
                  }`}
                  title="Quinta"
                >
                  Q
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  value="5"
                  className={`weekDaysButtonsItem ${
                    weekDays.includes("5") ? "daySelected" : "dayNonSelected"
                  }`}
                  title="Sexta"
                >
                  S
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  value="6"
                  className={`weekDaysButtonsItem ${
                    weekDays.includes("6") ? "daySelected" : "dayNonSelected"
                  }`}
                  title="Sábado"
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>

            <div className="formInput formInputGroupElement hourOfDay">
              <label htmlFor="hourStart">Qual horário do dia?</label>

              <div className="formInputGroup">
                <input
                  name="hourStart"
                  id="hourStart"
                  type="time"
                  placeholder="De"
                />
                <input
                  name="hourEnd"
                  id="hourEnd"
                  type="time"
                  placeholder="Até"
                />
              </div>
            </div>
          </div>

          <label className="useVoiceChannelContent">
            <Checkbox.Root
              className="useVoiceChannelChackboxElement"
              onCheckedChange={(checked) => {
                checked ? setUseVoiceChannel(true) : setUseVoiceChannel(false);
              }}
            >
              <Checkbox.Indicator>
                <Check className="useVoiceChannelChackboxCheck" />
              </Checkbox.Indicator>
            </Checkbox.Root>

            <span>Costumo me conectar ao chat de voz</span>
          </label>

          <div className="buttonsContent">
            <Dialog.Close type="button" className="buttonCancel">
              Cancelar
            </Dialog.Close>
            <button className="buttonSuccess">
              <GameController className="gameControllerIcon" />
              Encontrar duo
            </button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
