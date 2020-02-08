import { CST } from "./CST.js";
export default class EndScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.END
        })
    }
    init(data) {
        console.log('init', data);
        this.totalTime = data.totalTime;
        this.timeA= data.timeA;
        this.timeB= data.timeB;
        this.timeC= data.timeC;
        this.timeD= data.timeD;
        console.log("TotalTime:" + this.totalTime);
    }

    preload(){
        this.load.image('backButton', '/assets/image/back_button.png'); 
    }
    create() { //creating the menu screen
        //create images (z order)
        // this.add.image(0, 500, CST.IMAGE.TITLE).setOrigin(0).setDepth(0);

        this.text = this.add.text((this.game.renderer.width / 2) - 100, this.game.renderer.height / 2 - 300, "Time Taken for Test 1: " + this.timeA, {
            font: "50x Arial",
            fill: "#ffffff",
            align: "center"
        },this);

        this.text2 = this.add.text((this.game.renderer.width / 2) - 100, this.game.renderer.height / 2 - 200, "Time Taken for Test 2: " + this.timeB, {
            font: "50x Arial",
            fill: "#ffffff",
            align: "center"
        },this);

        this.text3 = this.add.text((this.game.renderer.width / 2) - 100, this.game.renderer.height / 2 - 100, "Time Taken for Test 3: " + this.timeC, {
            font: "50x Arial",
            fill: "#ffffff",
            align: "center"
        },this);

        this.text4 = this.add.text((this.game.renderer.width / 2) - 100, this.game.renderer.height / 2, " Time Taken for Test 4: " + this.timeD, {
            font: "50x Arial",
            fill: "#ffffff",
            align: "center"
        },this);

        this.text5 = this.add.text((this.game.renderer.width / 2) - 100, this.game.renderer.height / 2 + 100, " Total Time Taken: " + this.totalTime, {
            font: "50x Arial",
            fill: "#ffffff",
            align: "center"
        },this);

        let backButton = this.add.image(this.game.renderer.width / 2 - 50, this.game.renderer.height / 2 + 200, 'backButton').setDepth(1);

        // //create sprites (if using pixel art, remove sharpen)

        // let hoverSprite = this.add.sprite(100, 100, CST.SPRITE.CAT);
        // hoverSprite.setScale(2);
        // hoverSprite.setVisible(false);


        //create animation

        // this.anims.create({
        //     key: "walk",
        //     frameRate: 4,
        //     repeats: -1, //repeat forever,
        //     frames: this.anims.generateFrameNumbers(CST.SPRITE.CAT, {
        //         frames: [0, 1, 2, 3]
        //     })
        // });
        //make image buttons interactive

        /* 
            PointerEvents:
                pointerover - hovering
                pointerout - not hovering
                pointerup - click and release
                pointerdown - just click
        */

        backButton.setInteractive();

        backButton.on("pointerover", () => {
            hoverSprite.setVisible(true);
            hoverSprite.play("walk");
            hoverSprite.x = optionsButton.x - optionsButton.width;
            hoverSprite.y = optionsButton.y;

        })

        backButton.on("pointerout", () => {
            hoverSprite.setVisible(false);
        })

        backButton.on("pointerup", () => {
            this.scene.start("LoadScene");
        })

    }
}