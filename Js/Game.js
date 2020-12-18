class Game{
    constructor(){}
        
    getState(){
        var gameStateRef = database.ref("GameState");
         gameStateRef.on("value", function(data){
            gameState = data.val();
         })
    }

    update(state){
        database.ref('/').update({
            GameState:state
        })
    }

    async start(){
        if (gameState === 0){
            player = new Player();
            var playerCountRef = await database.ref("PlayerCount").once("value");
            if (playerCountRef.exists()){
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form();
            form.display();
            
        }
        car1 = createSprite(100, 200);
        car1.addImage(car1Img);

        car2 = createSprite(300, 200);
        car2.addImage(car2Img);

        car3 = createSprite(500, 200);
        car3.addImage(car3Img);

        car4 = createSprite(700, 200);
        car4.addImage(car4Img);

        cars=[car1, car2, car3, car4];
     }  

    play(){
        form.hidden();
        Player.getPlayerInfo();
        player.getCarsAtEnd();
        if (allPlayers !== undefined){
            background(rgb(51, 6, 6));
            image(trackImg, 0, -displayHeight*4, displayWidth, displayHeight*5);
            //var displayPos = 130;

            //index of cars array
            var index = 0;
            //x and y positions of the individual car
            var x = 175;
            var y;
            for (var plr in allPlayers){
                //incrementing the index for evry loop
                index+=1;
                //positioning the cars in the x-axis
                x+=200;
                cars[index-1].x = x;
                //positioning the cars in the y-axis
                y = displayHeight-allPlayers[plr].Distance;
                cars[index-1].y = y;

                if(index===player.index){
                    fill("yellow");
                    ellipse(x, y, 80, 80);
                    cars[index-1].shapeColor = "red";
                    camera.position.x = displayWidth/2;
                    camera.position.y = cars[index-1].y;
                }

                /*if (plr === "player" + player.index){
                    fill("red");
                }
                else 
                    fill("black");
                displayPos+=20;
                textSize(15);
                text(allPlayers[plr].Name + ":" + allPlayers[plr].Distance, 350, displayPos);*/
            }
        }
        if(keyDown(UP_ARROW) && player.index!==null){
            player.distance+=50;
            player.update();
        }

        if(player.distance > 3550){
            gameState = 2;
            player.rank=player.rank+1;
            //Player.updateCarsAtEnd(player.rank);
        }
        drawSprites();
    }

    end(){
        console.log("Game Over");
        console.log("Player's rank:" + player.rank);
        Player.updateCarsAtEnd(player.rank);
        game.update(2);
    }
}