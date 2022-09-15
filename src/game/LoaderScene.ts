import { Helper } from "./Helper";

export default class LoaderScene extends Phaser.Scene {
  public preload() {
    // this.load.tilemapTiledJSON("tilemap", "./assets/tilemaps/tilemap.json");
    // get full width arena
    let min = Math.min(Helper.screenDimensions.x, Helper.screenDimensions.y);
    this.load.svg({
      url: "./assets/images/arena.svg",
      key: "arena",
      svgConfig: {
        width: 2048,
        height: 2048,
      },
    });
    this.load.svg({
      url: "./assets/images/btn-start.svg",
      key: "button-start",
      svgConfig: {
        width: 256,
        height: 92,
      },
    });
    this.load.svg({
      url: "./assets/images/btn-circle.svg",
      key: "btn-circle",
      svgConfig: {
        width: 128,
        height: 128,
      },
    });
    this.load.svg('sumo-ani','./assets/images/sumo-ani.svg');
    this.load.svg({
      url: "./assets/images/sumo.svg",
      key: "sumo",
      svgConfig: {
        width: 128,
        height: 128,
      },
    });
    this.load.svg({
      url: "./assets/images/sumo-ani.svg",
      key: "sumo-ani",
      svgConfig: {
        width: 512,
        height: 128,
      },
    })
    // this.textures.on(Phaser.Textures.Events.ADD,(key,tex)=>{
    //   console.log('added tex')
    //   if(key==='sumo-ani'){
    //     Parser.SpriteSheet(texture, 0, 0, 0, width, height, config);
    //   }
    // })
    this.load.image("paper", "./assets/images/paper.jpg");
    this.load.audio("oomph1", "./assets/audio/sumo-oomph-1.mp3");
    this.load.audio("oomph2", "./assets/audio/sumo-oomph-2.mp3");
    this.load.audio("oomph3", "./assets/audio/sumo-oomph-3.mp3");
    this.load.audio("music", ["./assets/audio/keys-of-moon-yugen.mp3"]);
    // this.load.spritesheet("sumo-ani", "./assets/images/sumi-ani.svg", {
    //   frameWidth: 128,
    //   frameHeight: 128,
    //   endFrame:3
    // });
    // this.textures.addSpriteSheet('sumo-ani-sheet',null,{
    //     frameWidth: 128,
    //     frameHeight: 128,
    //     endFrame:3
    //   })
  }

  public create() {
    this.scene.start("game");
    this.sound.play('music',{volume:0.2,loop:true})
  }
}
