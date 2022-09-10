import { SceneEvents } from "./Events";
import GameScene from "./GameScene";
import { Helper } from "./Helper";
import { Mob } from "./Mob";

export enum ArenaType {
  Color = "c",
  Multiply = "m",
  Memory = "me",
}

export default class Arena extends Phaser.Physics.Arcade.Sprite {
  public scene: GameScene;
  public body: Phaser.Physics.Arcade.Body;
  instruction: Phaser.GameObjects.Text;
  interactionRadius = 256;
  killRadius = Math.min(Helper.screenDimensions.x, Helper.screenDimensions.y);
  mobs: Phaser.GameObjects.Group;
  position: Phaser.Math.Vector2;
  arenaBg: Phaser.GameObjects.Image;
  label:string;
  currentScore:number =0;
  isWaveComplete=false;
 
  pool: Mob[] = [];

  constructor(scene: GameScene, interactionRadius:number, killRadius:number) {
    const texture = "arena";
    super(scene, killRadius, killRadius, texture);
    this.scene= scene;
    this.mobs = new Phaser.GameObjects.Group(scene);
    this.setOrigin(0.5);
    this.arenaBg = this.scene.add
      .image(killRadius, killRadius, "arena")
      .setOrigin(0.5)
      //   .setSize(diameter, diameter)
      .setDisplaySize(killRadius * 2, killRadius * 2);
    this.interactionRadius = interactionRadius;
    this.killRadius = killRadius;
    // this.setMode(ArenaType.Color);
    this.position = new Phaser.Math.Vector2(this.x, this.y);
    this.scene.events.on("update", () => {
      this.checkMobs();
    });

    
    this.scene.add
    .existing(this)
    .setDisplaySize(this.interactionRadius * 2, this.interactionRadius * 2);
    this.instruction = this.scene.add.text(this.x, this.y, this.label, {
      fontFamily: "GoodBrush",
      fontSize: "30px",
      color: "#000",
      align: "center",
    });
    this.instruction.setOrigin(0.5);

    this.scene.physics.world.enable(this, Phaser.Physics.Arcade.STATIC_BODY);
    // this.setBodySize(this.interactionRadius, this.interactionRadius);
    this.body.setCircle(
      this.interactionRadius,
      -this.interactionRadius / 2,
      this.interactionRadius / 2
    );
    this.refreshBody();
    console.log(this.body);
    // this.setSize(this.interactionRadius * 2);

    // this.body.setMaxVelocityX(0);
    // this.body.setMaxVelocityY(0);
    // this.setBodySize(this.interactionRadius, this.interactionRadius);

    // let min = Math.min(Helper.screenDimensions.x, Helper.screenDimensions.y);

    // this.setDisplaySize(this.interactionRadius, this.interactionRadius);
    // this.enableClickSpawn();
    this.scene.physics.add.collider(this.mobs, this, (m) => {
      let mob:Mob = m as Mob;
      console.log('reached center', mob,mob.value,this.isMobValueCorrect(mob))
      if(this.isMobValueCorrect(mob)){
        this.score(mob);
      }else{
        this.leak(mob);
      }
      this.killMob(mob);
    });

    console.log("created Arena, with ", interactionRadius, killRadius);
  }

  public checkMobs() {
    const pos = new Phaser.Math.Vector2({ x: this.x, y: this.y });
    this.mobs.children.each((mob) => {
      let m = mob as Mob;
      const posM = new Phaser.Math.Vector2(m.x, m.y);
      const delta = pos.distance(posM);
      // console.log("delta", delta, this.mobs);
      if (delta > this.killRadius) {
        if(this.isMobValueCorrect(m)){
          this.leak(m);
        }else{
          this.score(m);
        }
        this.killMob(m);
      }
    });
  }
  killMob(mob: Mob) {
    this.mobs.remove(mob, true, false);
    mob.kill();
    if(this.mobs.getChildren().length === 0 && this.isWaveComplete ){
      this.scene.events.emit(SceneEvents.WaveFinished);
    }
  }
  isMobValueCorrect(m:Mob):boolean{return false}
  startWave(count:number,interval:number):void{}
  score(mob:Mob){
    this.scene.events.emit(SceneEvents.Score);
    //@TODO make dynamic from mob value/weight
    this.currentScore++; 
  }
  leak(mob:Mob){
    this.currentScore--;
    this.scene.events.emit(SceneEvents.Leak);
  }

  public setSize(size: number) {
    super.setSize(size, size);
    this.interactionRadius = size;
    // this.body.setOffset(0, this.height - size);
    return this;
  }
  spawnMob(mob) {
    if(mob){
      mob.active = true;
      this.mobs.add(mob);
      // this.scene.physics.add.collider(mob, this, (m) => {
      //   this.isMobValueCorrect(m as Mob);
      // });
      this.scene.events.emit(SceneEvents.MobSpawned, mob);
      return mob;
    }
    // const mob = new Mob(this.scene, pos.x, pos.y);
  }

  public playAudio(key: string) {
    this.scene.sound.play(key, { volume: 0.5 });

    return this;
  }

  enableClickSpawn() {
    this.arenaBg.setInteractive();
    this.arenaBg.on("pointerdown", (pointer) => {
      // this.fillPool(100);
      this.startWave(50,5000); 
      // let mob = new Mob(this.scene,'!');
      // mob.x = pointer.x; 
      // mob.y = pointer.y; 
      // this.spawnMob(mob);
      // console.log("spawned", mob);
    });
  }
  public destroy(fromScene?: boolean | undefined): void {
      super.destroy(false);
      this.arenaBg.destroy();
      this.instruction.destroy();
      this.scene.events.off("update", () => {
        this.checkMobs();
      });
  }
}
