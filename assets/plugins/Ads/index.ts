import MediaPlayer from "../../MediaPlayer";
import Ads, { Ad } from "./Ads";

class AdsPlugin {
  private player: MediaPlayer;
  private media: HTMLMediaElement;
  private ads: Ads;
  private currentAd: Ad;
  private adsContainer: HTMLElement;

  constructor() {
    this.ads = Ads.getInstance();
    this.adsContainer = document.createElement("div");
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
  }

  run(player: MediaPlayer) {
    this.player = player;
    this.media = this.player.media;
    this.player.container.appendChild(this.adsContainer);
    this.media.addEventListener("timeupdate", this.handleTimeUpdate);
  }

  private handleTimeUpdate() {
    const currentTime = Math.floor(this.media.currentTime);

    if (currentTime % 30 === 0) {
      this.renderAd();
    }
  }

  private renderAd() {
    if (this.currentAd) {
      return;
    }
    const ad = this.ads.getAd();
    this.currentAd = ad;

    this.adsContainer.innerHTML = `
      <div
       style="padding: 10px; display: flex; align-items: center; font-size: 12px; position: absolute; background: white; width: 80%; left: 50%; transform: translateX(-50%); bottom: 20px; margin: 0 auto;" 
       onclick="window.location.href = '${this.currentAd.url}'">
        <img src="${this.currentAd.imageUrl}" style="height: 60px; margin-right: 10px;">
        <div>
          <h3 style="margin-bottom: 5px;">${this.currentAd.title}</h3>
          <p style="margin-top: 0;">${this.currentAd.body}</p>
        </div>
      </div>
    `;

    setTimeout(() => {
      this.currentAd = null;
      this.adsContainer.innerHTML = "";
    }, 10000);
  }
}

export default AdsPlugin;
