import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import "./App.css";

import logoImage from "./assets/logo-nlw-esports.svg";

import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { GameController } from "phosphor-react";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}
function App() {
  const [games, setGames] = useState<Game[]>([]);

  function listGames() {
    fetch("http://localhost:3333/games")
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
      });
  }

  useEffect(() => listGames(), []);

  return (
    <div className="container">
      <img className="logoImage" src={logoImage} alt="" />

      <h1 className="title">
        Seu <span className="titleGradient">duo</span> está aqui.
      </h1>

      <div className="boxGames">
        {games.map((game) => {
          return (
            <GameBanner
              bannerUrl={game.bannerUrl}
              adsCount={game._count.ads}
              title={game.title}
              key={game.id}
            />
          );
        })}
      </div>

      <Dialog.Root>
        <CreateAdBanner />

        <Dialog.Portal>
          <Dialog.Overlay className="modalOverlay" />
          <Dialog.Content className="modalContent">
            <Dialog.Title className="modalTitle">
              Publique um anúncio
            </Dialog.Title>

            <form>
              <div className="formInput">
                <label htmlFor="game">Qual o game?</label>
                <input
                  type="text"
                  placeholder="Selecione o game que deseja jogar"
                />
              </div>

              <div className="formInput">
                <label htmlFor="game">Seu nome (ou nickname)</label>
                <input
                  type="text"
                  placeholder="Como te chamam dentro do game?"
                />
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
                  <div className="weekDaysButtons">
                    <button title="Domingo">D</button>
                    <button title="Segunda">S</button>
                    <button title="Terça">T</button>
                    <button title="Quarta">Q</button>
                    <button title="Quinta">Q</button>
                    <button title="Sexta">S</button>
                    <button title="Sábado">S</button>
                  </div>
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
                <input id="useVoiceChannel" type="checkbox" />
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
      </Dialog.Root>
    </div>
  );
}

export default App;
