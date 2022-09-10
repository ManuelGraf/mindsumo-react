import Arena, { ArenaType } from "./Arena";
import { ArenaColor } from "./ArenaColor";
import { Helper } from "./Helper";
import Inputs from "./Inputs";
import Sumo from "./Sumo";

export default class GameScene extends Phaser.Scene {
  private _inputs: Inputs;
  arena: Arena;
  sumo;

  constructor() {
    super({
      key: "game",
      active: true,
      visible: true,
    });
  }
  public create() {
    // this.load.audio("music", "./assets/audio/keys-of-moon-yugen.mp3");
    // this.sound.add('music');
    // const tilemap = this.make.tilemap({
    //   key: "tilemap",
    // });
    // const tileset = tilemap.addTilesetImage("tiles");
    // const layer = tilemap.createLayer(0, tileset, 0, 0);

    this._inputs = new Inputs(this);

    let dim = Helper.screenDimensions;
    
    this.sumo = new Sumo(this, 0, 0);
    // this.physics.add.collider(this.sumo, this.arena);
    // const { widthInPixels, heightInPixels } = tilemap;

    // layer.forEachTile(function (tile: Phaser.Tilemaps.Tile) {
    //   switch (tile.index) {
    //     case 2:
    //     case 6:
    //       tile.setCollision(true);
    //       break;

    //     case 9:
    //     case 10:
    //       tile.setCollision(false, false, true, false, false);
    //       break;
    //   }
    // }, this);

    this.physics.world.setBounds(
      0,0,
      dim.x,
      dim.y,
    );
    
    // this.sound.play('music',{volume:0.2});
    // this.physics.world.TILE_BIAS = 8;
    // this.spawnMob(MobType.color);

    // this.cameras.main.setBounds(0, 0, widthInPixels, heightInPixels);
    // this.cameras.main.startFollow(mario, true);
  }
  public preload() {
    // this.load.plugin(
    //   "rexpolarcoordinateplugin",
    //   "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexpolarcoordinateplugin.min.js",
    //   true
    // );
    // this.objects = {};
  }
  
  startMode(mode){
    let dim = Helper.screenDimensions;
    const size = Math.min(dim.x, dim.y);

    switch(mode){
      case ArenaType.Color:
        this.arena = new ArenaColor(this, size / 10, size / 2);
        break;
      }
      this.sumo.setDepth(100);
      this.arena.startWave(1,5000);
  }

  clear(){
    this.events.emit('clearScore');
    this.arena.destroy(true);
  }
  public get inputs() {
    return this._inputs;
  }
}
