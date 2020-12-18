class Form{
    constructor(){  
        this.title = createElement("h2");
        this.input = createInput("Name");
        this.button = createButton("Play");
        this.resetButton = createButton("Reset");
        this.greeting = createElement("h3");
    }

    hidden(){
        this.title.hide();
        this.greeting.hide();
        this.input.hide();
        this.button.hide();
        //this.resetButton.hide();
    }

    display(){
        this.title.html("Multiplayer Car Racing");
        this.title.position(displayWidth/2-10, 20);
        this.input.position(displayWidth/2-20, displayHeight/2-30);
        this.button.position(displayWidth/2+50, displayHeight/2);
        this.resetButton.position(340, 120);

        this.button.mousePressed(()=>{
            this.input.hide();
            this.button.hide();
            player.name = this.input.value();
            playerCount+=1;
            player.index = playerCount;
            player.update();
            player.updateCount(playerCount);
            this.greeting.html("Hello " + player.name);
            this.greeting.position(displayWidth/2-70, displayHeight/4);
        })

        this.resetButton.mousePressed(()=>{
            game.update(0);
            player.updateCount(0);
            Player.updateCarsAtEnd(0);
        })
    }
}