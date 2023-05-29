const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const canvasHeight = canvas.height;
const canvasWidth = canvas.width;

let circle_x = 160;
let circle_y = 60;
let radius = 20;
//球速
let xSpeed = 20;
let ySpeed = 20;

//板子
let ground_x = 100;
let ground_y = 500;
let ground_height = 5;
//磚塊
let brickArray = [];
let count = 0;

function getRandomArbitrary(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    brickArray.push(this);
    this.visible = true;
  }

  drawBrick() {
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  touchBalling(ballX, ballY) {
    // if (
    //   ballX >= this.x - radius &&
    //   ballX <= this.x + this.width + radius &&
    //   ballY <= this.y + this.height + radius &&
    //   ballY >= this.x - radius
    // ) {
    //   return true;
    // } else {
    //   return false;
    // }
    return (
      ballX >= this.x - radius &&
      ballX <= this.x + this.width + radius &&
      ballY <= this.y + this.height + radius &&
      ballY >= this.y - radius
    );
  }
}

// //製作所有的brick;
for (let i = 0; i < 10; i++) {
  new Brick(getRandomArbitrary(0, 950), getRandomArbitrary(0, 550));
}
canvas.addEventListener("mousemove", (e) => {
  ground_x = e.clientX;
});

function drawCircle() {
  //確認球是否打到磚塊
  brickArray.forEach((brick) => {
    if (brick.visible && brick.touchBalling(circle_x, circle_y)) {
      count++;

      //撞擊後讓磚塊消失
      brick.visible = false;

      //改變x,y，且將brick從brickArray移除
      // 從下方撞擊 ，從上方撞擊
      if (circle_y >= brick.y + brick.height || circle_y <= brick.y) {
        ySpeed *= -1;
      }
      // 從左方撞擊 ，從右方撞擊
      else if (circle_x <= brick.x || circle_x >= brick.x + brick.width) {
        xSpeed *= -1;
      }

      if (count == 10) {
        alert("Game Over");
        clearInterval(game);
      }
    }
  });
  //確認球是否打到板子
  if (
    circle_x >= ground_x - radius &&
    circle_x <= ground_x + 200 + radius &&
    circle_y >= ground_y - radius &&
    circle_y <= ground_y + radius
  ) {
    if (ySpeed > 0) {
      circle_y -= 50;
    } else {
      circle_y += 50;
    }
    ySpeed *= -1;
  }
  //確認球有沒有到邊界
  //右邊界、左邊界、上邊界、下邊界
  if (circle_x >= canvasWidth - radius || circle_x <= radius) {
    xSpeed *= -1;
  } else if (circle_y <= radius || circle_y >= canvasHeight - radius) {
    ySpeed *= -1;
  }
  circle_x += xSpeed;
  circle_y += ySpeed;

  // 黑色背景
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  //畫板子
  ctx.fillStyle = "red";
  ctx.fillRect(ground_x, ground_y, 200, ground_height);

  //畫brick
  brickArray.forEach((brick) => {
    if (brick.visible) {
      brick.drawBrick();
    }
  });
  //畫球
  ctx.beginPath();
  //arc(x, y, radius, startAngle, endAngle   Math.PI * 2 =360)
  ctx.arc(circle_x, circle_y, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = "yellow";
  ctx.fill();
}

let game = setInterval(drawCircle, 25);
