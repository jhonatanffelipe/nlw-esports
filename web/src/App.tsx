import { MagnifyingGlassPlus } from "phosphor-react";
import "./App.css";
import logoImage from "./assets/logo-nlw-esports.svg";
import game1 from "./assets/game1.png";
import game2 from "./assets/game2.png";
import game3 from "./assets/game3.png";
import game4 from "./assets/game4.png";
import game5 from "./assets/game5.png";
import game6 from "./assets/game6.png";

function App() {
  return (
    <div className="container">
      <img className="logoImage" src={logoImage} alt="" />

      <h1 className="title">
        Seu <span className="titleGradient">duo</span> está aqui.
      </h1>

      <div className="boxGames">
        <a href="#1" className="cardGame">
          <img src={game1} alt="" className="imageGame" />
          <div className="infoGame">
            <strong className="gameTitle">Leage of Legends</strong>
            <span className="gamdeAds">4 anúncios</span>
          </div>
        </a>

        <a href="#2" className="cardGame">
          <img src={game2} alt="" className="imageGame" />
          <div className="infoGame">
            <strong className="gameTitle">Apex</strong>
            <span className="gamdeAds">2 anúncios</span>
          </div>
        </a>

        <a href="#3" className="cardGame">
          <img src={game3} alt="" className="imageGame" />
          <div className="infoGame">
            <strong className="gameTitle">Counter Strike</strong>
            <span className="gamdeAds">10 anúncios</span>
          </div>
        </a>

        <a href="#4" className="cardGame">
          <img src={game4} alt="" className="imageGame" />
          <div className="infoGame">
            <strong className="gameTitle">Word of Warcraft</strong>
            <span className="gamdeAds">10 anúncios</span>
          </div>
        </a>

        <a href="#5" className="cardGame">
          <img src={game5} alt="" className="imageGame" />
          <div className="infoGame">
            <strong className="gameTitle">Dota 2</strong>
            <span className="gamdeAds">4 anúncios</span>
          </div>
        </a>

        <a href="#6" className="cardGame">
          <img src={game6} alt="" className="imageGame" />
          <div className="infoGame">
            <strong className="gameTitle">Fortnite</strong>
            <span className="gamdeAds">4 anúncios</span>
          </div>
        </a>
      </div>

      <div className="cardAdsGradient">
        <div className="cardAds">
          <div className="cardAdsInfo">
            <strong>Não encontrou seu duo?</strong>
            <span>Publique um anúncio para encontrar novos players!</span>
          </div>
          <button className="buttonPublish">
            <MagnifyingGlassPlus color="#fff" size={24} />
            Publicar Anúncio
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
