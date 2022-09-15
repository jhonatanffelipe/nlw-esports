import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";

import "./styles.css";

export function CreateAdBanner() {
  return (
    <div className="cardAdsGradient">
      <div className="cardAds">
        <div className="cardAdsInfo">
          <strong>Não encontrou seu duo?</strong>
          <span>Publique um anúncio para encontrar novos players!</span>
        </div>
        <Dialog.Trigger className="buttonPublish">
          <MagnifyingGlassPlus color="#fff" size={24} />
          Publicar Anúncio
        </Dialog.Trigger>
      </div>
    </div>
  );
}
