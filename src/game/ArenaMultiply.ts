import Arena from "./Arena";
import { Helper } from "./Helper";
import { Mob } from "./Mob";

export class ArenaMultiply extends Arena{
  correct:number[] = [];

  constructor(scene,interactionRadius,killRadius){
    super(scene,interactionRadius,killRadius);
    this.correct.push(Helper.randomIntFromInterval(2,10));
    this.instruction.setText('Multiples of: \n'+this.correct.join('x '))
  }
  isMobValueCorrect(m:Mob){
    let correct = false;
    for (const c of this.correct) {
      correct = correct || c %m.value === 0;
    }
    return correct;
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
        console.log('wave spawn %',this.waveTimer.getOverallProgress());
        let m = new Mob(this.scene,Helper.randomIntFromInterval(0,100));
        this.spawnMob(m);
        Phaser.Actions.PlaceOnCircle([m], circle,Phaser.Math.Between(0,360));
        
        if(this.waveTimer.getOverallProgress() === 1){
          this.isWaveComplete = true;
        }
      },
      callbackScope: this,
      repeat: count-1,
    });
  }
  public destroy(fromScene?: boolean | undefined): void {
      super.destroy(fromScene);
  }

}