import Arena from "./Arena";
import { Helper } from "./Helper";
import { Mob, MobType } from "./Mob";

export enum MobColors{
  RED='#cc0000',
  GREEN='#00cc00',
  BLUE='#0000cc',
}
export class ArenaColor extends Arena{
  colors = [MobColors.RED,MobColors.GREEN,MobColors.BLUE];
  correct:MobColors;

  constructor(scene,interactionRadius,killRadius){
    super(scene,interactionRadius,killRadius);
    this.correct= this.colors[Helper.randomIntFromInterval(0,this.colors.length-1)];
    this.instruction.setText('⬤');
    this.instruction.setColor(this.correct);
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
    const circle = new Phaser.Geom.Circle(this.center.x, this.center.y,this.killRadius*0.9);
    const maxSize = this.interactionRadius*2;
    const minSize = this.interactionRadius;
    this.waveTimer = this.scene.time.addEvent({
      delay: interval,// ms
      callback: (d)=>{
        console.log('wave spawn %',this.waveTimer.getOverallProgress());
        let m = new Mob(this.scene,this.colors[Helper.randomIntFromInterval(0,this.colors.length-1)],maxSize,minSize,MobType.COLOR);
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