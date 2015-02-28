// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);

var score = 0;
var label_score;
var player;
var pipes;



/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("playerImg","assets/pug2.gif");
    game.load.image("player2Img","assets/flappy_batman.png");
    game.load.audio("score","assets/point.ogg");
    game.load.image("pipe", "assets/pipe_brown.png");

}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    game.stage.setBackgroundColor("#f0e7d4");
    game.add.text(235, 120, "FLAPPY",
        {font: "60px Helvetica", fill:"#000000"});
    game.add.text(230, 180, "PUG",
        {font: "140px Helvetica", fill:"#584138"});
    game.add.sprite(468, 118, "playerImg");

    // set the background colour of the scene
    //game.input.onDown.add(clickHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(player_jump);
    score = 0
    label_score = game.add.text(20, 20, "0",
        {font: "30px Helvetica", fill:"#584138"});
    player = game.add.sprite(10,230, "playerImg");
    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown);
    pipes = game.add.group();

   //generate_pipe();

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(player);
   // player.body.velocity.x= 200;
    player.body.velocity.y= 0;
    player.body.gravity.y = 500;


    var pipe_interval = 1.75;
    game.time.events.loop(pipe_interval * Phaser.Timer.SECOND, generate_pipe);


}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
    game.physics.arcade.overlap(player, pipes, game_over);
    
}

function clickHandler(event){
    game.add.sprite(event.x-5, event.y-5, "playerImg");
    changeScore()
}

function spaceHandler(){
    game.sound.play("score");

}

function changeScore() {
    score = score + 1;
    label_score.setText(score.toString());
}

function add_pipe_block(x,y){
    var pipe = pipes.create(x,y,"pipe");
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x =-200;
}

function generate_pipe() {
    var gap = game.rnd.integerInRange(1,5);
    for (var count = 0; count < 8; count++) {
        if(count != gap  && count != gap+1) {
            add_pipe_block(720, count * 50);
        }
    }
    changeScore();
}

function moveRight() {
    player.x = player.x + 10
}
function moveLeft() {
    player.x = player.x - 10
}
function moveUp() {
    player.y = player.y - 10
}
function moveDown() {
    player.y = player.y + 10
}

function player_jump() {
    player.body.velocity.y = -200;
    console.log("called");
}

function game_over() {
    game.state.restart();
}



