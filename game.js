// // game.ts
// interface GameObject {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
//   speed: number;
//   draw: () => void;
//   update: () => void;
// }
// class Player implements GameObject {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
//   speed: number;
//   velocityY: number;
//   isJumping: boolean;
//   private gravity: number = 0.5;
//   constructor(private ctx: CanvasRenderingContext2D) {
//     this.x = 50;
//     this.y = 400;
//     this.width = 50;
//     this.height = 50;
//     this.speed = 5;
//     this.velocityY = 0;
//     this.isJumping = false;
//   }
//   draw() {
//     this.ctx.fillStyle = 'blue';
//     this.ctx.fillRect(this.x, this.y, this.width, this.height);
//   }
//   update() {
//     if (this.isJumping) {
//       this.velocityY = -10;
//       this.isJumping = false;
//     }
//     this.y += this.velocityY;
//     this.velocityY += this.gravity;
//     if (this.y > 400) {
//       this.y = 400;
//       this.velocityY = 0;
//     }
//   }
//   jump() {
//     if (this.y === 400) {
//       this.isJumping = true;
//     }
//   }
// }
// class Obstacle implements GameObject {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
//   speed: number;
//   constructor(private ctx: CanvasRenderingContext2D, x: number) {
//     this.x = x;
//     this.y = 400;
//     this.width = 30;
//     this.height = 30;
//     this.speed = 5;
//   }
//   draw() {
//     this.ctx.fillStyle = 'red';
//     this.ctx.fillRect(this.x, this.y, this.width, this.height);
//   }
//   update() {
//     this.x -= this.speed;
//     if (this.x + this.width < 0) {
//       this.x = window.innerWidth + Math.random() * 500;
//     }
//   }
// }
// class Game {
//   private canvas: HTMLCanvasElement;
//   private ctx: CanvasRenderingContext2D;
//   private player: Player;
//   private obstacles: Obstacle[];
//   private score: number;
//   private gameOver: boolean;
//   private animationFrameId: number | null = null;
//   constructor() {
//     this.canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
//     this.ctx = this.canvas.getContext('2d')!;
//     this.resizeCanvas();
//     this.player = new Player(this.ctx);
//     this.obstacles = [new Obstacle(this.ctx, 800), new Obstacle(this.ctx, 1200), new Obstacle(this.ctx, 1600)];
//     this.score = 0;
//     this.gameOver = false;
//     window.addEventListener('keydown', (e) => {
//       if (e.code === 'Space') {
//         this.player.jump();
//       }
//     });
//     window.addEventListener('resize', () => this.resizeCanvas());
//     this.start();
//   }
//   private resizeCanvas() {
//     this.canvas.width = window.innerWidth;
//     this.canvas.height = window.innerHeight;
//   }
//   private start() {
//     this.gameLoop();
//   }
//   private gameLoop() {
//     if (this.gameOver) {
//       alert('Game Over!');
//       if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
//       return;
//     }
//     this.update();
//     this.render();
//     this.animationFrameId = requestAnimationFrame(() => this.gameLoop());
//   }
//   private update() {
//     this.player.update();
//     this.obstacles.forEach(obstacle => obstacle.update());
//     // Check for collision
//     this.obstacles.forEach(obstacle => {
//       if (
//         this.player.x < obstacle.x + obstacle.width &&
//         this.player.x + this.player.width > obstacle.x &&
//         this.player.y < obstacle.y + obstacle.height &&
//         this.player.y + this.player.height > obstacle.y
//       ) {
//         this.gameOver = true;
//       }
//     });
//     this.score++;
//   }
//   private render() {
//     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
//     this.player.draw();
//     this.obstacles.forEach(obstacle => obstacle.draw());
//     this.ctx.font = '20px Arial';
//     this.ctx.fillStyle = 'black';
//     this.ctx.fillText(`Score: ${this.score}`, 20, 30);
//   }
// }
// // Initialize game
// new Game();
var Player = /** @class */ (function () {
    function Player(game) {
        this.game = game;
        this.width = 50;
        this.height = 50;
        this.velocityY = 0;
        this.gravity = 1;
        this.isJumping = false;
        this.x = 50;
        this.y = this.game.canvas.height - this.height - 10;
    }
    Player.prototype.draw = function () {
        this.game.ctx.fillStyle = 'blue';
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    Player.prototype.update = function () {
        if (this.isJumping) {
            this.velocityY = -15;
            this.isJumping = false;
        }
        this.y += this.velocityY;
        this.velocityY += this.gravity;
        if (this.y > this.game.canvas.height - this.height - 10) {
            this.y = this.game.canvas.height - this.height - 10;
            this.velocityY = 0;
        }
    };
    Player.prototype.jump = function () {
        if (this.y === this.game.canvas.height - this.height - 10) {
            this.isJumping = true;
        }
    };
    return Player;
}());
var Obstacle = /** @class */ (function () {
    function Obstacle(game) {
        this.game = game;
        this.width = 50;
        this.height = 50;
        this.speed = 5;
        this.x = this.game.canvas.width;
        this.y = this.game.canvas.height - this.height - 10;
    }
    Obstacle.prototype.draw = function () {
        this.game.ctx.fillStyle = 'red';
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    Obstacle.prototype.update = function () {
        this.x -= this.speed;
        if (this.x + this.width < 0) {
            this.x = this.game.canvas.width + Math.random() * 300;
        }
    };
    return Obstacle;
}());
var Game = /** @class */ (function () {
    function Game() {
        var _this = this;
        this.obstacles = [];
        this.isGameOver = false;
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        this.player = new Player(this);
        this.obstacles = [new Obstacle(this), new Obstacle(this)];
        window.addEventListener('resize', this.resizeCanvas.bind(this));
        window.addEventListener('keydown', function (e) {
            if (e.code === 'Space') {
                _this.player.jump();
            }
        });
        this.createRetryButton();
        this.gameLoop();
    }
    Game.prototype.createRetryButton = function () {
        var _this = this;
        this.retryButton = document.createElement('button');
        this.retryButton.textContent = 'Retry';
        this.retryButton.style.position = 'absolute';
        this.retryButton.style.top = '50%';
        this.retryButton.style.left = '50%';
        this.retryButton.style.transform = 'translate(-50%, -50%)';
        this.retryButton.style.padding = '10px 20px';
        this.retryButton.style.fontSize = '20px';
        this.retryButton.style.display = 'none';
        document.body.appendChild(this.retryButton);
        this.retryButton.addEventListener('click', function () { return _this.resetGame(); });
    };
    Game.prototype.resizeCanvas = function () {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        if (!this.isGameOver) {
            this.update();
            this.render();
            this.animationFrameId = requestAnimationFrame(function () { return _this.gameLoop(); });
        }
        // gameLoop는 재귀?
    };
    Game.prototype.update = function () {
        // 게임 상태 업데이트
        this.player.update();
        this.obstacles.forEach(function (obstacle) { return obstacle.update(); });
        // if(this.isGameOver){
        //   this.obstacles.forEach(obstacle => {
        //       this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //       obstacle.x = 0;
        //       obstacle.update();
        //     }
        //   );
        // } else {
        //   this.obstacles.forEach(obstacle => obstacle.update());
        // }
        this.checkCollision();
    };
    Game.prototype.render = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.player.draw();
        this.obstacles.forEach(function (obstacle) { return obstacle.draw(); });
    };
    Game.prototype.checkCollision = function () {
        var _this = this;
        this.obstacles.forEach(function (obstacle) {
            if (_this.player.x < obstacle.x + obstacle.width &&
                _this.player.x + _this.player.width > obstacle.x &&
                _this.player.y < obstacle.y + obstacle.height &&
                _this.player.y + _this.player.height > obstacle.y) {
                // cancelAnimationFrame(this.animationFrameId!);
                // alert("game over!");
                _this.gameOver();
            }
        });
    };
    Game.prototype.gameOver = function () {
        this.isGameOver = true;
        cancelAnimationFrame(this.animationFrameId);
        this.retryButton.style.display = 'block';
    };
    Game.prototype.resetGame = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.isGameOver = false;
        this.player = new Player(this);
        this.obstacles = [new Obstacle(this), new Obstacle(this)];
        this.retryButton.style.display = 'none';
        this.gameLoop();
    };
    return Game;
}());
new Game();
