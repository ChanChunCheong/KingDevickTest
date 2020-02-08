class Example3 extends Phaser.Scene{
    constructor(){
        super({key:"Example3"});
    }

    preload() {
        this.load.audio('test', '/assets/GFS.mp3');
    }

    create() {
        this.soundFX = this.sound.add('test', {loop: "true"});
        this.soundFX.play();

        this.input.keyboard.on("keydown_L", function(e){
            this.soundFX.loop = !this.soundFX.loop;
            if(this.soundFX.loop) 
                this.soundFX.play();
        }, this);
    }
}