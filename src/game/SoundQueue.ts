import { Helper } from "./Helper";

export class SoundQueue{
  keys:string[] = [];
  treshold=1000;
  last=0;
  audio;
  constructor(audio:Phaser.Sound.HTML5AudioSoundManager | Phaser.Sound.NoAudioSoundManager | Phaser.Sound.WebAudioSoundManager){
    this.audio = audio;
  }
  set(keys:string[]){
    this.keys=this.keys.concat(keys);
  }
  play(){
    if(Date.now()-this.last > this.treshold){
      this.audio.play(this.keys[Helper.randomIntFromInterval(0,this.keys.length-1)],{ volume: 0.2 })
      this.last = Date.now();
    }
  }
}