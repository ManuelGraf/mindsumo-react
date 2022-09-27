import GameScene from "./GameScene";
import { Helper } from "./Helper";
import { Mob } from "./Mob";
import { SoundQueue } from "./SoundQueue";

enum States {
  PUSHING='push',
  WALKING='walk',
  STANDING='stand',
}
export default class Sumo extends Phaser.Physics.Arcade.Sprite {
  public scene: GameScene;
  weight = 2;
  size = 128;
  maxSpeed = 180;
  texSize=128;
  pushDuration=500; //ms
  hitSounds:SoundQueue
  public body:any;
  pushUntil=0;

  constructor(scene: GameScene,size, x: number, y: number) {
    const texture = "sumo-ani";

    super(scene, x, y, texture);
    this.scene = scene;
    this.size = size;
    
    Object.entries({
      push: { frameRate: 6, frames: [0, 1], repeat: -1 },
      walk: { frameRate: 6, frames: [2, 3], repeat: -1 },
      stand: { frames: [0] },
    }).forEach(([key, data]) => {
      const { frameRate, frames, repeat } = data;
      this.scene.anims.create({
        key,
        frameRate,
        repeat,
        frames: this.scene.anims.generateFrameNumbers(texture, { frames }),
      });
    });
    
    
    this.scene.physics.world.enable(this);
    this.body
    .setCircle(this.texSize/2)
    .setMass(this.weight)
    .setAllowDrag(true)
    .setMaxVelocityX(this.maxSpeed)
    .setMaxVelocityY(this.maxSpeed)
      .setDragX(Math.pow(20, 2))
      .setDragY(Math.pow(20, 2));
      
      this.scene.add.existing(this)
      .setDisplaySize(this.size,this.size)
      .setOrigin(0.5)
      .setCollideWorldBounds(true)
      .setState(States.STANDING);
      
    this.scene.events.on("mobSpawned", (mob:Mob) => {
      scene.physics.add.collider(this, mob, (c) => {
        this.onMobCollided(mob);
      });
    });
    this.hitSounds= new SoundQueue(this.scene.sound);
    this.hitSounds.set(['oomph1','oomph2','oomph3']);    
  }

  public setState(value: States) {
    if(this.state !== value){
      this.play(value)
    }

    return super.setState(value);
  }

  public preUpdate(time: number, delta: number) {
    const { left, right, down, up, pointed,pointedAt } = this.scene.inputs;
    const flipX = left && !right ? true : right ? false : this.flipX;
    const directionX = -Number(left) + Number(right);
    const directionY = -Number(up) + Number(down);
    const accelerationX = directionX * Math.pow(16, 2);
    const accelerationY = directionY * Math.pow(16, 2);
    this.setFlipX(flipX)
    .setAccelerationX(accelerationX)
    .setAccelerationY(accelerationY);
    if(pointed){
      // console.log('pointed ',pointed,pointedAt)
      let delta = Helper.vectorBetween(pointedAt, this).scale(this.maxSpeed/2);
      // this.setAccelerationX(delta.x);
      // this.setAccelerationY(delta.y);
      this.setVelocity(delta.x, delta.y);
    }
    if(this.pushUntil > time){
      this.setState(States.PUSHING)
    }else if( this.body.newVelocity.x !== 0 || this.body.newVelocity.y !== 0  ){
      this.setState(States.WALKING)
    }else{
      this.setState(States.STANDING)
    }


    super.preUpdate(time, delta);
  }

  public setSize(size: number) {
    super.setCircle(size);
    this.size = size;

    // this.body.setOffset(size / 2, size / 2);
    super.refreshBody();

    return this;
  }

  public playAudio(key: string) {
    this.scene.sound.play(key, { volume: 0.5 });

    return this;
  }
  onMobCollided(mob: Mob) {
    this.pushUntil = this.scene.time.now+this.pushDuration;
    mob.stun(1)
    this.hitSounds.play();
  }
}
