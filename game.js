var Player = /** @class */ (function () {
    function Player() {
        this.x = 50;
        this.y = 400;
        this.width = 50;
        this.height = 50;
        this.speed = 5;
        this.velocityY = 0;
        this.isJumping = false;
    }
    Player.prototype.draw = function () {
        var ctx = game.canvasContext;
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    Player.prototype.update = function () {
        if (this.isJumping) {
            this.velocityY = -10;
            this.isJumping = false;
        }
        this.y += this.velocityY;
        this.velocityY += 1; // Gravity effect
        if (this.y > 400) {
            this.y = 400; // Prevent falling below the ground
            this.velocityY = 0;
        }
    };
    Player.prototype.jump = function () {
        if (this.y === 400) {
            this.isJumping = true;
        }
    };
    return Player;
}());
var Obstacle = /** @class */ (function () {
    function Obstacle(x) {
        this.x = x;
        this.y = 400;
        this.width = 30;
        this.height = 30;
        this.speed = 5;
    }
    Obstacle.prototype.draw = function () {
        var ctx = game.canvasContext;
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    Obstacle.prototype.update = function () {
        this.x -= this.speed;
        if (this.x < 0) {
            this.x = game.canvas.width;
        }
    };
    return Obstacle;
}());
var Game = /** @class */ (function () {
    function Game() {
        this.canvas = document.getElementById('gameCanvas');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvasContext = this.canvas.getContext('2d');
        this.player = new Player();
        this.obstacles = [new Obstacle(800), new Obstacle(1200), new Obstacle(1600)];
        this.score = 0;
        this.gameOver = false;
        this.start();
    }
    Game.prototype.start = function () {
        var _this = this;
        window.addEventListener('keydown', function (e) {
            if (e.code === 'Space') {
                _this.player.jump();
            }
        });
        this.gameLoop();
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        if (this.gameOver) {
            alert('Game Over!');
            return;
        }
        this.update();
        this.render();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.update = function () {
        var _this = this;
        this.player.update();
        this.obstacles.forEach(function (obstacle) { return obstacle.update(); });
        // Check for collision
        this.obstacles.forEach(function (obstacle) {
            if (_this.player.x < obstacle.x + obstacle.width &&
                _this.player.x + _this.player.width > obstacle.x &&
                _this.player.y < obstacle.y + obstacle.height &&
                _this.player.y + _this.player.height > obstacle.y) {
                _this.gameOver = true;
            }
        });
        this.score++;
    };
    Game.prototype.render = function () {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.player.draw();
        this.obstacles.forEach(function (obstacle) { return obstacle.draw(); });
        this.canvasContext.font = '20px Arial';
        this.canvasContext.fillStyle = 'black';
        this.canvasContext.fillText("Score: ".concat(this.score), 20, 30);
    };
    return Game;
}());
// Initialize game
var game = new Game();
