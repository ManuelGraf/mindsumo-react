import "phaser";
import "./styles.scss";

const startGame = () => {
  let g = new Phaser.Game(config);
  (window as any).game = g;
};

window.addEventListener("load", () => {
  startGame();
});