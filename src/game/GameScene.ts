import Arena, { ArenaType } from "./Arena";
import { ArenaColor } from "./ArenaColor";
import { ArenaMultiply } from "./ArenaMultiply";
import { GameEvents, SceneEvents } from "./Events";
import { Helper } from "./Helper";
import Inputs from "./Inputs";
import Sumo from "./Sumo";

export default class GameScene extends Phaser.Scene {
  private _inputs: Inputs;
  arena: Arena;
  sumo;
  score=0;
  mobCount=0

  constructor() {
    super({
      key: "game",
      active: true,
      visible: true,
    });
  }
  public create() {
    this.game.events.emit(GameEvents.sceneReady,this);

    this._inputs = new Inputs(this);

    let dim = Helper.screenDimensions;
    
    this.sumo = new Sumo(this, 0, 0);

    this.physics.world.setBounds(
      0,0,
      dim.x,
      dim.y,
    );

    this.events.on(SceneEvents.Score,this.onScored,this)
    this.events.on(SceneEvents.Leak,this.onLeaked,this)
    this.events.on(SceneEvents.WaveFinished,this.onWaveFinished,this)
    this.events.once('shutdown',this.onShutDown,this)
    
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

  onScored(){
    console.log('scene scored')
    this.score++;
    this.mobCount--
  }
  onLeaked(){
    console.log('scene leaked')
    this.score--;
    this.mobCount--
  }
  
  startMode(mode, count=1){
    console.log('start wave',mode,count)
    this.score = 0;
    this.mobCount = count;
    let dim = Helper.screenDimensions;
    const size = Math.min(dim.x, dim.y);

    switch(mode){
      case ArenaType.Color:
        this.arena = new ArenaColor(this, size / 10, size / 2);
        break;
      case ArenaType.Multiply:
        this.arena = new ArenaMultiply(this, size / 10, size / 2);
        break;
      }
      this.sumo.setDepth(100);
      this.arena.startWave(count,5000);
      this.events.emit(SceneEvents.WaveStarted,{count,mode});
  }

  clear(){
    this.events.emit('clearScore');
    this.arena.destroy(true);
  }
  onShutDown(){
    console.log('shutdown')
    this.events.off(SceneEvents.Score,this.onScored);
    this.events.off(SceneEvents.Leak,this.onLeaked);
    this.events.off(SceneEvents.WaveFinished,this.onWaveFinished);
  }
  
  onWaveFinished(){
  }
  public get inputs() {
    return this._inputs;
  }
}
