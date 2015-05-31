;(function() {
  "use strict";
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.keys = {37: false, 38: false, 39: false, 40: false}
    this.gameState = "off";
    this.$el = $(".main-window");
  };

  GameView.prototype.start = function() {
    this.bindKeyHandlers();
    this.updateScore();
    this.updateLives();
    window.setInterval((function() {
      this.game.step();
      this.checkPressed();
      this.game.draw(this.ctx);
      this.updateGame();
    }).bind(this), 20);
  };

  GameView.prototype.bindKeyHandlers = function() {
    var canFire = true
    var keys = {37: false, 38: false, 39: false, 40: false}
    var that = this;
  $(document).keydown(function (e) {
    var key = e.keyCode
    if (key in that.keys) {
      that.keys[key] = true;
    }
    if (that.keys[38]) {
      game.ship.power("forward")
      game.ship.isThrusting = true;
      game.ship.toggleFlameNum = 2;
    }
    if (that.keys[40]) {
      game.ship.power("back")
    }
    if (that.keys[37]) {
      game.ship.power("left")
    }
    if (that.keys[39]) {
      game.ship.power("right")
    }
    if (key == 32 && canFire ) {
      game.ship.fireBullet();
      canFire = false;
    }

    if (key == 80) {
      if (that.gameState = "playing") {
        that.gameState = "paused"
      } else {
        that.gameState = "playing"
      }

    }



  });
  $(document).keyup(function (e) {
    var key = e.keyCode
    if (key in that.keys) {
      that.keys[key] = false;
    }
    if (key == 32) {
       canFire = true;
    }
  });


  GameView.prototype.checkPressed = function () {
    if (that.keys[38]) {
      game.ship.power("forward")
    } else {
      game.ship.isThrusting = false;
    }
    if (that.keys[40]) {
      game.ship.power("back")
    }
    if (that.keys[37]) {
      game.ship.power("left")
    }
    if (that.keys[39]) {
      game.ship.power("right")
    }

  }

  GameView.prototype.updateScore = function () {
    this.$el.find(".score").html("Score: " + this.game.score + " | High Score " + this.game.highScore);

  }

  GameView.prototype.updateLives = function () {
    this.$el.find(".lives").html("Lives Remaining: " + this.game.lives);

  }


  GameView.prototype.updateGame = function () {
    if (this.game.lives < 1) {
      this.gameState = "off";
      this.showMenu();
    }
    if (this.gameState = "playing") {
      this.updateScore();
      this.updateLives();
    }

  }


  GameView.prototype.showMenu = function () {

  }



}


})();