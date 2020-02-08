import EndScene from './EndScene.js';
import MenuScene from './MenuScene.js';
import LoadScene from './LoadScene.js';

var config = {
    type:Phaser.AUTO,
    width:800,
    height:700,
    scene: [EndScene, LoadScene, MenuScene, Level1, Level2, Level3, Level4] 
};

var game = new Phaser.Game(config);