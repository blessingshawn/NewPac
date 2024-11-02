import { BodyFactory } from 'matter';
import Phaser from 'phaser';
import { Boot } from "./scenes/Boot";
// import Cracktro from "./states/Cracktro.js";
import { Decruncher} from "./scenes/Decruncher";
import { GameOver } from "./scenes/GameOver";
import { GameTitle } from "./scenes/GameTitle";
import { Main } from "./scenes/Main";
import { Preload } from "./scenes/Preload";

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Sample',
 
  type: Phaser.AUTO,
 
  scale: {
    width: 1280,
    height: 720,
  },

  scene: [Boot,
    // Cracktro, 
    Decruncher, 
    GameOver,
    GameTitle, 
    Main, 
    Preload
    ],

  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
 
  parent: 'game',
  backgroundColor: '#000000',
};
 
export const game = new Phaser.Game(gameConfig);