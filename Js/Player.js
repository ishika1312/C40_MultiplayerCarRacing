class Player{
    constructor(){
        this.index = null;
        this.distance = 0;
        this.name = null;
        this.rank = null;
    }

    getCount(){
        var playerCountRef = database.ref("PlayerCount");
        playerCountRef.on("value", (data)=>{
            playerCount = data.val();
        })
    }

    updateCount(count){
        database.ref('/').update({
            PlayerCount:count
        })
    }

    update(){
        var playerIndex = "Players/player" + this.index;
        database.ref(playerIndex).set({
            Name:this.name,
            Distance:this.distance
        })
    }

    static getPlayerInfo(){
        var PlayerInfoRef = database.ref("Players");
        PlayerInfoRef.on("value", (data)=>{
            allPlayers = data.val();
        })
    }

    getCarsAtEnd(){
        database.ref("CarsAtEnd").on("value", (data)=>{
            this.rank = data.val();
        })
    }

    static updateCarsAtEnd(rank){
        database.ref('/').update({
            CarsAtEnd:rank
        })
    }
}