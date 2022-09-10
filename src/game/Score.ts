import { SceneEvents } from "./Events";
import { Mob } from "./Mob";

export class Score extends Phaser.GameObjects.Text{
  score=0;
constructor(scene:Phaser.Scene){
  super(scene,50,50,'Score: 0',{
    fontFamily: "GoodBrush",
    fontSize: "32px",
    color: "#ccc",
    align: "left",
  });
  this.scene = scene;
  this.scene.events.on(SceneEvents.Score,this.scoreHandler.bind(this))
  this.scene.events.on(SceneEvents.Leak,this.leakHandler.bind(this))
}
destroy(){
  this.scene.events.off(SceneEvents.Score, this.scoreHandler)
  this.scene.events.off(SceneEvents.Leak, this.leakHandler)
}
scoreHandler(m:Mob){
  console.log('increase score',m);
  this.score++;
  this.setText('Score: '+this.score);
}
leakHandler(m:Mob){
  console.log('increase score',m);
  this.score++;
  this.setText('Score: '+this.score);
}
}