class Level4 extends Phaser.Scene {
    constructor() {
        super({key:"Level4"});
    }

    init (data) {
        console.log('init', data);
        this.totalTime = data.totalTime;
        this.timeA= data.timeA;
        this.timeB= data.timeB;
        this.timeC= data.timeC;
        console.log("TotalTime:" + this.totalTime);
    }

    preload(){
        this.load.image('test4', '/assets/image/test4.png'); 
    }


    create(){
        var questions = ["5", "4", "1", "8", "0", "4", "6", "3",
                        "5", "9", "7", "5", "4", "2", "7", "3",
                        "2", "6", "9", "4", "1", "4", "5", "1", "3",
                        "9", "3", "4", "8", "5", "5", "1", "6", "3",
                        "1", "4", "3", "5", "2", "7"]; 
        var Qlen = questions.length;
        var answers = [];
        

        this.startTime = new Date();
        // this.totalTime = 120;
        this.timeElapsed = 0;
        this.createTimer();
        this.gameTimer = this.time.addEvent({delay:100, callback: this.updateTimer, callbackScope: this, loop:true });

        this.image = this.add.image(400,375, 'test4').setDepth(0);
        this.text = this.add.text(0, 0, "Your answers will be displayed here!", {
            font: "20x Arial",
            fill: "#ffffff",
            align: "center"
        },this);

        this.input.keyboard.on('keyup', function(e){
            answers.push(e.key);
            var Alen = answers.length;
            if (answers[Alen - 1] != questions[Alen - 1]) {
                console.log("wrong");
                answers = []; //restart
                alert("Wrong! You have to restart!");
                Alen = 0; // reset lenth
            }
            else {
                if (Alen == Qlen) {
                    console.log ("Correct");
                    this.scene.start("EndScene", {totalTime: this.totalTime + this.timeElapsed, timeA: this.timeA, timeB: this.timeB, timeC: this.timeC, timeD: this.timeElapsed});
                }
            }
            this.text.setText('Answers: ' + answers.toString());
            console.log(answers);
        },this);
    }

    createTimer(){
        this.timeLabel = this.add.text(0, 25, "00:00", {font: "20px Arial", fill: "#ff0000"}).setDepth(1); 
        this.timeLabel.align = 'center';
    }

    updateTimer(){
        var currentTime = new Date();
        var timeDifference = this.startTime.getTime() - currentTime.getTime();
        //Time elapsed in seconds
        this.timeElapsed = Math.abs(timeDifference / 1000);
        //Time remaining in seconds
        // var timeRemaining = this.totalTime - this.timeElapsed; 
        //Convert seconds into minutes and seconds
        var minutes = Math.floor( this.timeElapsed / 60);
        var seconds = Math.floor( this.timeElapsed) - (60 * minutes);
        //Display minutes, add a 0 to the start if less than 10
        var result = (minutes < 10) ? "0" + minutes : minutes; 
        //Display seconds, add a 0 to the start if less than 10
        result += (seconds < 10) ? ":0" + seconds : ":" + seconds; 
        this.timeLabel.text = result;
    }
    update(delta){

    }
}