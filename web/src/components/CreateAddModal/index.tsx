import { useEffect, useState } from "react";
import { Check, GameController, CaretDown } from "phosphor-react";

import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Select from "@radix-ui/react-select";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

import "./styles.css";

import { IGame } from "../../interfaces/IGame";

export function CreateAddModal() {
  const [games, setGames] = useState<IGame[]>([]);

  function listGames() {
    fetch("http://localhost:3333/games")
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
      });
  }

  useEffect(() => listGames(), []);
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="modalOverlay" />
      <Dialog.Content className="modalContent">
        <Dialog.Title className="modalTitle">Publique um anúncio</Dialog.Title>

        <form>
          <div className="formInput">
            <label htmlFor="game">Qual o game?</label>
            <Select.Root>
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
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>

          <div className="formInput">
            <label htmlFor="game">Seu nome (ou nickname)</label>
            <input type="text" placeholder="Como te chamam dentro do game?" />
          </div>

          <div className="formInputGroup">
            <div className="formInput formInputGroupElement">
              <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
              <input
                id="yearsPlaying"
                type="number"
                placeholder="Tudo bem ser ZERO"
              />
            </div>

            <div className="formInput formInputGroupElement">
              <label htmlFor="discord">Qual seu Discord?</label>
              <input id="discord" type="text" placeholder="Usuario#0000" />
            </div>
          </div>

          <div className="formInputGroup">
            <div className="formInput formInputGroupElement">
              <label htmlFor="weekDays">Quando costuma jogar?</label>

              <ToggleGroup.Root
                type="multiple"
                className="weekDaysButtons"
                onValueChange={console.log}
              >
                <ToggleGroup.Item
                  value="0"
                  className="weekDaysButtonsItem"
                  title="Domingo"
                >
                  D
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  value="1"
                  className="weekDaysButtonsItem"
                  title="Segunda"
                >
                  S
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  value="2"
                  className="weekDaysButtonsItem"
                  title="Terça"
                >
                  T
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  value="3"
                  className="weekDaysButtonsItem"
                  title="Quarta"
                >
                  Q
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  value="4"
                  className="weekDaysButtonsItem"
                  title="Quinta"
                >
                  Q
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  value="5"
                  className="weekDaysButtonsItem"
                  title="Sexta"
                >
                  S
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  value="6"
                  className="weekDaysButtonsItem"
                  title="Sábado"
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>

            <div className="formInput formInputGroupElement hoursOfDay">
              <label htmlFor="hoursStart">Qual horário do dia?</label>

              <div className="formInputGroup">
                <input id="hoursStart" type="time" placeholder="De" />
                <input id="hoursEnd" type="time" placeholder="Até" />
              </div>
            </div>
          </div>

          <div className="useVoiceChannelContent">
            <Checkbox.Root className="useVoiceChannelChackboxElement">
              <Checkbox.Indicator>
                <Check className="useVoiceChannelChackboxCheck" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <label htmlFor="useVoiceChannel">
              Costumo me conectar ao chat de voz
            </label>
          </div>

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
