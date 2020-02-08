import MenuScene from './MenuScene.js';
import LoadScene from './LoadScene.js';

var config = {
    type:Phaser.AUTO,
    width:800,
    height:600,
    scene: [LoadScene, MenuScene, Example1, Example2, Example3] 
};

var game = new Phaser.Game(config);