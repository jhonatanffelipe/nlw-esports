import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import "./App.css";

import logoImage from "./assets/logo-nlw-esports.svg";
import { CreateAddModal } from "./components/CreateAddModal";

import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { IGame } from "./interfaces/IGame";


function App() {
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
        <CreateAddModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
