import GameScene from "./GameScene";
import { Helper } from "./Helper";

export enum MobType {
  "color",
  "number",
}
export class Mob extends Phaser.Physics.Arcade.Sprite {
  weight;
  speed;
  size;
  stunned = false;
  stunUntil = 0;
  public value:any;
  public label;
  
  public scene: GameScene;
  public body: Phaser.Physics.Arcade.Body;
  public container:Phaser.GameObjects.Container;
  
  constructor(scene: GameScene, value:any) {
    const texture = "btn-circle";
    const baseSize = 64;
    const baseSpeed = 20;
    const baseWeight = 0.5;
    // const maxSize = 128;
    // const minSpeed = 20;
    // const maxWeight = 1;
    
    // const size = Phaser.Math.Between(baseSize,maxSize);
    // const speed = Phaser.Math.Interpolation.Linear([minSpeed,baseSpeed],size/maxSize);
    // const weight = Phaser.Math.Interpolation.Linear([baseWeight,maxWeight],size/maxSize)

    const size = baseSize;
    const speed = baseSpeed;
    const weight = baseWeight
    
    super(scene,size/2,size/2, texture);
    this.scene = scene;
    this.value = value;
    this.speed = speed;
    this.weight = weight;
    this.size = size;
    //@TOO follow
    this.label = this.scene.add.text(this.x -this.size/2, this.y-this.size/2, this.value, {
      fontFamily: "GoodBrush",
      fontSize: this.size+"px",
      color: "#000",
      align: "left",
    });
    this.label.setOrigin(0.5)

    
    this.scene.physics.world.enable(this);
    // .setOrigin(0.5)
    this.body
      .setCircle(size)
      .setMass(this.weight)
      .setBounce(1,1)
      .setAllowDrag(true)
      .setMaxVelocityX(160)
      .setMaxVelocityY(160);
      this.refreshBody();
      
      this.body.moves = true;
      
      this.scene.add.existing(this)
      // .setSize(this.size).setCircle(this.size)
      .setDisplaySize(this.size, this.size)

    // this.setSize(this.size).setCircle(this.size);
    // .setCollideWorldBounds(true)
    // .setDragX(Math.pow(16, 2))
    // .setDragY(Math.pow(16, 2));
    this.setDrag(Math.pow(16, 2));
    this.headTowardsArena();
  }
  headTowardsArena() {
    let delta = Helper.vectorBetween(this.scene.arena, this).scale(this.speed);
    this.setVelocity(delta.x, delta.y);
  }
  preUpdate() {
    if (!this.stunned) {
      this.headTowardsArena();
      // this.scene.physics.moveToObject(
      //   this,
      //   this.scene.arena.position,
      //   this.speed
      // );
    }
    if (this.scene.time.now > this.stunUntil) {
      this.stunned = false;
      this.headTowardsArena();
    }
    this.label.x = this.x;
    this.label.y = this.y;
  }
  public setSize(size: number) {
    super.setSize(size, size);

    return this;
  }
  kill() {
    this.destroy();
    this.label.destroy();
  }
  public playAudio(key: string) {
    this.scene.sound.play(key, { volume: 0.5 });

    return this;
  }
  stun(duration) {
    this.stunned = true;
    this.stunUntil = this.scene.time.now + duration * 1000;
    return this;
  }
  
}
