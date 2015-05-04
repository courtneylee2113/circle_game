var Circle = function(elem) {
  this.diameter = 30 + Math.random() * 50;
  this.speed = 500 + Math.random() * 1500;
  this.elem = elem;


  this.elem.css({
    width: this.diameter,
    height: this.diameter,
    top: this.newPosition(),
    left: this.newPosition()
  })
}

Circle.prototype.newPosition = function() {
  return Math.random() * (500 - this.diameter);
}

Circle.prototype.move = function() {
  var that = this;
  this.elem.animate({
    top: this.newPosition(),
    left: this.newPosition()
  }, {
    duration: this.speed,
    complete: function() {
      that.move();
    }
  });
}

Circle.prototype.listen = function() {
  var that = this;

  this.elem.on('click', function() {
    that.kill();
  });
}

Circle.prototype.kill = function() {
  this.elem.css({backgroundColor: 'red'})
    .effect({
      effect: 'explode',
      duration: 100,
      complete: function() {
        window.score.increase();
        $(this).off('click');
      },
      queue: false
    });
}

var Score = function(elem) {
  this.elem = elem;
}

Score.prototype.reset = function() {
  this.elem.text(0);
};

Score.prototype.increase = function() {
   var newScore = this.current() + 100;
   this.elem.text(newScore);
};

Score.prototype.current = function() {
  return parseInt(this.elem.text());
}

$(document).ready(function() {
  var duration = 12000; 
  window.score = new Score($('#score'));
  window.score.reset();

  $.each($('.circle'), function() {
    var circle = new Circle($(this));
    circle.listen();
    circle.move();
  });

  setTimeout(function() {
    alert("GAME OVER!");
    $.each($('.circle'), function() {
      $(this).off('click');
      $(this).hide();
    });

  }, duration);
});