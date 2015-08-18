// Enemies our player must avoid
var Enemy = function() {
    // this.sprite sets our sprites image.
    this.sprite = 'images/enemy-bug.png';
    // The x and y coordinates for our enemies starting positions.
    // this.x is the Enemy starting x coordinate and is fixed just outside the canvas to the left.
    // this.y calls the function from the newY prototype to generate a random y coordinate for each instance of Enemy.
    // this.move gets a random speed for our enemy from the newMove prototype.
    this.x = -100;
    this.y = this.newY();
    if(score > 10) {
        this.move = this.hardMove();
    } else {
        this.move = this.newMove();
    }
};

// This function returns a random number from the ypoints array to give our enenmies random y positions. 
// Reference: http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
Enemy.prototype.newY = function() {
    var min = 0;
    var max = 3;
    var rand = Math.floor(Math.random() * (max - min)) + min;
    var yPoints = [60, 140 , 225];
    return yPoints[rand]; 
};

// This function returns a random number from the newSpeed array to give the enemies random speeds.
// Reference: http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
Enemy.prototype.newMove = function() {
    var min = 0;
    var max = 4;
    var rand = Math.floor(Math.random() * (max - min)) + min;
    var newSpeed = [200, 280, 360, 520];
    return newSpeed[rand];
};

// This function returns a random number from the newSpeed array to give our enemies a faster random speed when the score is above 20.
// Reference: http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
Enemy.prototype.hardMove = function() {
    var min = 0;
    var max = 3;
    var rand = Math.floor(Math.random() * (max - min)) + min;
    var newSpeed = [520, 600, 680];
    return newSpeed[rand];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // liveMove multiplies our enemy speed with the time delta (dt) for smooth animation.
    // The first if statement tells our enemy to keep moving as long as it has not gone outside the bounds of the canvas.
    // if the enemy has gone outside the bounds the first else tells the enemy to restart at its original x and a random y position.
    // the second if statement checks our score and if our score is above 20 it calls hardMove(); which speeds up our enemies.
    // the last else gives our enemy a random normal speed if the enemy is past the canvas bounds but the score is below 20.
    var liveMove = this.move * dt;
    if(this.x < 505) {
        this.x += liveMove;
    } else {
        this.x = -100;
        this.y = this.newY();
        if(score > 20) {this.move = this.hardMove();
        } else {
        this.move = this.newMove();
        }
    }
    // rect1 and rect2 create a bounding box for the enemies and the player respectively.
    // the if statement checks for a collision between these boxes and restarts our player if any collision occurs.
    var rect1 = {x: this.x, y: this.y, width: 50, height: 30};
    var rect2 = {x: player.x, y: player.y, width: 60, height: 30};
    if (rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.height + rect1.y > rect2.y) {
    this.reset();
    score -= 2;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Creates our player class, sets the image for our player, and gives our player starting x and y coordinates.
var Player = function() {
    this.sprite = 'images/char-horn-girl.png';
    this.x = 202;
    this.y = 380;    
};

// Gives our player instructions for staying within the bounds of the canvas and tells the player
// which direction to move according to which key is pressed.
Player.prototype.handleInput = function(key) {
    if (key === 'left' && (this.x - this.xmove) > -50) {
        this.x -= this.xmove;
    } else if (key === 'right' && (this.x + this.xmove) < 500) {
        this.x += this.xmove;
    } else if (key === 'up' && (this.y - this.ymove) > -50) {
        this.y -= this.ymove;
    } else if (key === 'down' && (this.y + this.ymove) < 400) {
        this.y += this.ymove; }

    // Resets our player back at the start upon reaching the river, also updates our score.
    if (key === 'up' && (this.y - this.ymove) < -38) {
    this.reset();
    score += 2;
    }
};

// Moves our player to the start position if called.
Player.prototype.reset = function () {
    this.x = 202;
    this.y = 380;
};

// Tells our player how far to move per keystroke.
Player.prototype.update = function() {
    this.xmove = 101;
    this.ymove = 80;  
};

// Draws our player on the canvas.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Creates the Gems object.
// Gives our Gems a fixed starting position outside the canvas to the left.
// Gives our Gems a random y position.
// Gives our Gems a random speed.
var Gems = function() {
    this.sprite = 'images/Gem-Green.png';
    this.x = -100;
    this.y = this.newY();
    this.move = this.newMove();
};

// This function returns a random number from the ypoints array to give our Gems random y positions. 
// Reference: http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
Gems.prototype.newY = function() {
    var min = 0;
    var max = 3;
    var rand = Math.floor(Math.random() * (max - min)) + min;
    var yPoints = [60, 140 , 225];
    return yPoints[rand];
};

// This function returns a random number from the newSpeed array to give the Gems random speeds.
// Reference: http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
Gems.prototype.newMove = function() {
    var min = 0;
    var max = 3;
    var rand = Math.floor(Math.random() * (max - min)) + min;
    var newSpeed = [205, 285, 365];
    return newSpeed[rand];
};

// live Move multiplies our Gems speed with the time delta (dt) for smooth animation.
// The if statement tells our enemy to keep moving as long as it has not crossed outside the bounds of the canvas.
// else restarts our gem if it reaches the right bounds of the screen.
Gems.prototype.update = function(dt) {
    var rect1 = {x: this.x, y: this.y, width: 50, height: 50};
    var rect2 = {x: player.x, y: player.y, width: 60, height: 50};
    var liveMove = this.move * dt;
    if(this.x < 505) {
        this.x += liveMove;
    }  else {
        this.x = -100;
        this.y = this.newY();
        this.move = this.newMove();
    } 
    // this if statement checks for collisions between the player and the gems
    // if a collision does occur it then updates our score and starts our gem back at
    // its starting position.
    if (rect1.x < rect2.x + rect2.width &&
     rect1.x + rect1.width > rect2.x &&
     rect1.y < rect2.y + rect2.height &&
     rect1.height + rect1.y > rect2.y) {
     score++;
     this.x = -100;
     this.y = this.newY();
     this.move = this.newMove();
    }
};
// Draws our gems on the screen.
Gems.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Creates a Score object.
var score = 0;

// Draws our score on the screen.
function drawScore() {
    ctx.font = "22px Comic Sans MS";
    ctx.fillStyle = "white";
    ctx.fillText("Score: "+score, 208, 561);
    ctx.fillStyle = "black";
    ctx.fillText("Score: "+score, 208, 562);
}

// Now instantiate your objects
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Creates a new Score.
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var allEnemies = [enemy1, enemy2, enemy3];
var player = new Player();
var gem1 = new Gems();
var gem2 = new Gems();
var allgems = [gem1, gem2];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);

});