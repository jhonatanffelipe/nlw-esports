import "./styles.css";

interface IGameBannerProps {
  bannerUrl: string;
  title: string;
  adsCount: number;
}

export function GameBanner(props: IGameBannerProps) {
  return (
    <a href="#1" className="cardGame">
      <img src={props.bannerUrl} alt="" className="imageGame" />
      <div className="infoGame">
        <strong className="gameTitle">{props.title}</strong>
        <span className="gameAds">{props.adsCount} anúncio(s)</span>
      </div>
    </a>
  );
}
