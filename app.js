// ---------- Tạo hiệu ứng hoạt ảnh rơi ----------
var totalItems = 18;
for (var i = 1; i <= totalItems; ++i) {
  var length = Math.random() * (4.5 - 3) + 3;
  var start = Math.random() * 1000; // Thời gian bắt đầu ngẫu nhiên

  dropAnimation("#item" + i, length, start);
}

function dropAnimation(selector, duration, delay) {
  var element = document.querySelector(selector);
  if (element) {
    element.animate(
      [
        { transform: `translateY(-${element.offsetHeight / 3}px)` },
        { transform: "translateY(0px)" }
      ],
      {
        duration: duration * 1000,
        delay: delay,
        easing: "ease-out",
        fill: "forwards",
      }
    );
  }
}

// ---------- Tạo hiệu ứng tuyết rơi ----------
var canvas = document.getElementById("snow"),
  ctx = canvas.getContext("2d"),
  width = (ctx.canvas.width = canvas.offsetWidth),
  height = (ctx.canvas.height = canvas.offsetHeight),
  snowflakes = [];

window.onresize = function () {
  width = ctx.canvas.width = canvas.offsetWidth;
  height = ctx.canvas.height = canvas.offsetHeight;

  for (var i = 0; i < snowflakes.length; i++) {
    snowflakes[i].resized();
  }
};

function updateSnow() {
  for (var i = 0; i < snowflakes.length; i++) {
    snowflakes[i].update();
  }
}

function Snow() {
  this.x = random(0, width);
  this.y = random(-height, 0);
  this.radius = random(0.5, 3.0);
  this.speed = random(0.5, 2.0);
  this.wind = random(-0.1, 1.0);
  this.isResized = false;

  this.updateData = function () {
    this.x = random(0, width);
    this.y = random(-height, 0);
  };

  this.resized = function () {
    this.isResized = true;
  };
}

Snow.prototype.draw = function () {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath();
};

Snow.prototype.update = function () {
  this.y += this.speed;
  this.x += this.wind;

  if (this.y > ctx.canvas.height) {
    if (this.isResized) {
      this.updateData();
      this.isResized = false;
    } else {
      this.y = 0;
      this.x = random(0, width);
    }
  }
};

function createSnow(count) {
  for (var i = 0; i < count; i++) {
    snowflakes[i] = new Snow();
  }
}

function drawSnow() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  for (var i = 0; i < snowflakes.length; i++) {
    snowflakes[i].draw();
  }
}

function loopSnow() {
  drawSnow();
  updateSnow();
  requestAnimationFrame(loopSnow);
}

function random(min, max) {
  return Math.round(min + Math.random() * (max - min));
}

createSnow(200);
loopSnow();

// ---------- Hoạt ảnh chữ ----------
function typeText(selector, text, speed = 100) {
  const element = document.querySelector(selector);
  let index = 0;

  function type() {
    if (index < text.length) {
      element.textContent += text[index];
      index++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Ví dụ
typeText(".cart-page-bottom h4", "Gửi em!");
typeText(".cart-page-bottom p", "Lorem ipsum dolor sit amet consectetur...");
