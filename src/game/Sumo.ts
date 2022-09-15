import GameScene from "./GameScene";
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
  texSize=128;
  hitSounds:SoundQueue
  public body:any;

  constructor(scene: GameScene, x: number, y: number) {
    const texture = "sumo-ani";

    super(scene, x, y, texture);
    this.scene = scene;
    
    Object.entries({
      push: { frameRate: 12, frames: [0, 1], repeat: -1 },
      walk: { frameRate: 12, frames: [2, 3], repeat: -1 },
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
    .setMaxVelocityX(180)
    .setMaxVelocityY(180)
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
    this.play(value)

    return super.setState(value);
  }

  public preUpdate(time: number, delta: number) {
    const { left, right, down, up } = this.scene.inputs;
    const flipX = left && !right ? true : right ? false : this.flipX;
    const directionX = -Number(left) + Number(right);
    const directionY = -Number(up) + Number(down);
    const accelerationX = directionX * Math.pow(16, 2);
    const accelerationY = directionY * Math.pow(16, 2);
    this.setFlipX(flipX)
    .setAccelerationX(accelerationX)
    .setAccelerationY(accelerationY);
    if(accelerationX > 0 || accelerationY > 0 ){
      this.setState(States.WALKING)
    }
    console.log(this.state);
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
    this.setState(States.PUSHING)
    mob.stun(1)
    this.hitSounds.play();
  }
}
