import GameScene from "./GameScene";
import { Mob } from "./Mob";
import { SoundQueue } from "./SoundQueue";

enum States {
  PUSHING,
  WALKING,
  STANDING,
}

export default class Sumo extends Phaser.Physics.Arcade.Sprite {
  public scene: GameScene;
  weight = 1;
  size = 64;
  hitSounds:SoundQueue

  constructor(scene: GameScene, x: number, y: number) {
    const texture = "sumo";

    super(scene, x, y, texture);
    this.scene = scene;
    this.hitSounds= new SoundQueue(this.scene.sound);
    this.hitSounds.set(['oomph1','oomph2','oomph3']);

    // Object.entries({
    //   fight: { frames: [0] },
    //   walk: { frameRate: 12, frames: [1, 2, 0], repeat: -1 },
    //   jump: { frames: [2] },
    //   crouch: { frames: [3] },
    // }).forEach(([key, data]) => {
    //   const { frameRate, frames, repeat } = data;

    //   this.scene.anims.create({
    //     key,
    //     frameRate,
    //     repeat,
    //     frames: this.scene.anims.generateFrameNumbers(texture, { frames }),
    //   });
    // });
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);
    this.setMass(this.weight);
    
    this.scene.events.on("mobSpawned", (mob:Mob) => {
      scene.physics.add.collider(this, mob, (c) => {
        this.onMobCollided(mob);
      });
    });
    
    // this.body.setAllowDrag(true).setMaxVelocityX(160);
    // this.body.setAllowDrag(true).setMaxVelocityY(160);
    
    this.setSize(this.size).setDisplaySize(this.size,this.size)
    .setCollideWorldBounds(true)
    .setDragX(Math.pow(16, 2))
    .setDragY(Math.pow(16, 2))
    .setState(States.STANDING);
    this.body.setCircle(this.size);
  }

  public setState(value: States) {
    switch (value) {
      case States.PUSHING:
        // this.setSize(24).setVelocityX(this.body.velocity.x * 0.5);
        // .play("stand");
        break;

      case States.WALKING:
        // this.setSize(24).play("walk");
        break;
    }

    return super.setState(value);
  }

  public preUpdate(time: number, delta: number) {
    const { left, right, down, up } = this.scene.inputs;
    const flipX = left && !right ? true : right ? false : this.flipX;
    const directionX = -Number(left) + Number(right);
    const directionY = -Number(up) + Number(down);
    const accelerationX = directionX * Math.pow(16, 2);
    const accelerationY = directionY * Math.pow(16, 2);
    this.setFlipX(flipX).setAccelerationX(accelerationX);
    this.setAccelerationY(accelerationY);

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
    let pos = new Phaser.Math.Vector2(mob.x - this.x, mob.y - this.y);
    mob.stun(1)
    this.hitSounds.play();
    console.log("collided", mob);
  }
}
