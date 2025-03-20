// game.ts
interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  draw: () => void;
  update: () => void;
}

class Player implements GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  velocityY: number;
  isJumping: boolean;

  constructor() {
    this.x = 50;
    this.y = 400;
    this.width = 50;
    this.height = 50;
    this.speed = 5;
    this.velocityY = 0;
    this.isJumping = false;
  }

  draw() {
    const ctx = game.canvasContext;
    ctx.fillStyle = 'blue';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    if (this.isJumping) {
      this.velocityY = -10;
      this.isJumping = false;
    }

    this.y += this.velocityY;
    this.velocityY += 1;  // Gravity effect

    if (this.y > 400) {
      this.y = 400;  // Prevent falling below the ground
      this.velocityY = 0;
    }
  }

  jump() {
    if (this.y === 400) {
      this.isJumping = true;
    }
  }
}

class Obstacle implements GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;

  constructor(x: number) {
    this.x = x;
    this.y = 400;
    this.width = 30;
    this.height = 30;
    this.speed = 5;
  }

  draw() {
    const ctx = game.canvasContext;
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.x -= this.speed;
    if (this.x < 0) {
      this.x = game.canvas.width;
    }
  }
}

class Game {
  canvas: HTMLCanvasElement;
  canvasContext: CanvasRenderingContext2D | null;
  player: Player;
  obstacles: Obstacle[];
  score: number;
  gameOver: boolean;

  constructor() {
    this.canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvasContext = this.canvas.getContext('2d')!;
    this.player = new Player();
    this.obstacles = [new Obstacle(800), new Obstacle(1200), new Obstacle(1600)];
    this.score = 0;
    this.gameOver = false;

    this.start();
  }

  start() {
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        this.player.jump();
      }
    });

    this.gameLoop();
  }

  gameLoop() {
    if (this.gameOver) {
      alert('Game Over!');
      return;
    }

    this.update();
    this.render();
    requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    this.player.update();
    this.obstacles.forEach(obstacle => obstacle.update());

    // Check for collision
    this.obstacles.forEach(obstacle => {
      if (
        this.player.x < obstacle.x + obstacle.width &&
        this.player.x + this.player.width > obstacle.x &&
        this.player.y < obstacle.y + obstacle.height &&
        this.player.y + this.player.height > obstacle.y
      ) {
        this.gameOver = true;
      }
    });

    this.score++;
  }

  render() {
    this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.player.draw();
    this.obstacles.forEach(obstacle => obstacle.draw());
    this.canvasContext.font = '20px Arial';
    this.canvasContext.fillStyle = 'black';
    this.canvasContext.fillText(`Score: ${this.score}`, 20, 30);
  }
}

// Initialize game
const game = new Game();
