import Arena from "./Arena";
import { Helper } from "./Helper";
import { Mob } from "./Mob";

export class ArenaColor extends Arena{
  colors = ['R','G','B'];
  correct:string[] = [];

  constructor(scene,interactionRadius,killRadius){
    super(scene,interactionRadius,killRadius);
    this.correct.push(this.colors[Helper.randomIntFromInterval(0,this.colors.length-1)]);
    this.instruction.setText('Value: \n'+this.correct.join(','))
  }
  isMobValueCorrect(m:Mob){
    return this.correct.indexOf(m.value) > -1;
  }
  // spawnMob() {
  //   let mob = new Mob(this.scene,this.colors[Helper.randomIntFromInterval(0,this.colors.length-1)]);
  //   let pos = new Phaser.Math.Vector2(0,0);
  //   super.spawnMob(mob,pos);
  // }
  startWave(count,interval){
    this.isWaveComplete = false;
    const circle = new Phaser.Geom.Circle(this.killRadius, this.killRadius*0.9,this.killRadius*0.9);
    this.waveTimer = this.scene.time.addEvent({
      delay: interval,// ms
      callback: (d)=>{
        console.log('wave spawn',this.waveTimer.getOverallProgress());
        let m = new Mob(this.scene,this.colors[Helper.randomIntFromInterval(0,this.colors.length-1)]);
        this.spawnMob(m);
        Phaser.Actions.PlaceOnCircle([m], circle,Phaser.Math.Between(0,360));
        
        if(this.waveTimer.getOverallProgress() === 1){
          this.isWaveComplete = true;
        }
      },
      callbackScope: this,
      repeat: count,
    });
  }
  public destroy(fromScene?: boolean | undefined): void {
      super.destroy(fromScene);
  }

}