class Example1 extends Phaser.Scene {
    constructor() {
        super({key:"Example1"});
    }

    preload(){
        this.load.image('GFS', '/assets/GFS.jpg'); 
    }

    create(){
        this.image = this.add.image(400,300, 'GFS');

        this.input.keyboard.on('keyup_D', function(event){
            this.image.x += 10;
        },this)

        this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

        this.input.on('pointerdown', function(event){
            this.image.x = event.x;
            this.image.y = event.y;
        },this);

        this.input.keyboard.on('keyup_p',function(event){
            var physicsImage = this.physics.add.image(this.image.x, this.image.y, "GFS");
            physicsImage.setVelocity(Phaser.Math.RND.interInRange(-100,100),  -300);
        },this);

        this.input.keyboard.on('keyup', function(e){
            if(e.key == "2"){
                this.scene.start("Example2"); 
            }
        },this);

        this.input.keyboard.on('keyup', function(e){
            if(e.key == "3"){
                this.scene.start("Example3"); 
            }
        },this);
    }

    update(delta){
        if(this.key_A.isDown)
            this.image.x--;
    }
}

