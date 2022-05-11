
const SIZE = 500;
var r = 1;
var x = -101;
var y = -101;
var z = -101;

var projectileX = 20
var projectileY = 250
var projectileZ = -101
var initialX = 20
var initialY = 250
var vx, vy
var angle = -30
var initialSpeed = 20
var time = 0
const gravity = 0.25
const g = 0.25
const radio = 25
const h = 0.5

function degreeToRad(degreeAngle) {
  return degreeAngle * Math.PI / 180
}

function move() {
  radianAngle = degreeToRad(angle)
  vx = initialSpeed * Math.cos(radianAngle)
  vy = initialSpeed * Math.sin(radianAngle)
  projectileX = vx * time
  projectileY = initialY + (vy * time) - (gravity * time * time)/2
  time++

  vy = vy + g*h;
  initialY = initialY + h*vy;
  if (initialY>=SIZE-radio/2) {
    initialY = SIZE-radio/2;
    vy = -vy;
  } else if (initialY<=radio/2) {
    initialY = radio/2;
    vy = -vy;
  }
  // vx es constante (salvo el cambio de sentido al chocar con la pared)
  initialX = initialX + h*vx;
  if (initialX>=SIZE-radio/2) {
    initialX = SIZE-radio/2;
    vx = -vx;
  } else if (initialX<=radio/2) {
    initialX = radio/2;
    vx = -vx;
  }
  console.log(initialX, projectileX, initialY, projectileY)
}

function sketch(processing) {

    processing.setup = function() {
      processing.frameRate(2); // fps
		  processing.size(SIZE, SIZE);
    }

    processing.drawGame = function(world) {
      processing.background(255,255,200);

      processing.strokeWeight(4);  // Default

      processing.stroke(0); // color negro para las lineas

      processing.point(250, 250); // origen

      processing.fill(0,255,0);
      /* cuadricula*/

      /* switch (Number(r)) {
        case 1:
          // linea horizontal
          processing.line(0, 250, 500, 250);
          if (x > -101 && x < 101) {
            processing.point((x*500)/100, 200 ); // origen
          }
          break;
        case 2:
          // linea horizontal
          processing.line(0, 250, 500, 250);
          // linea vertical
          processing.line(250, 0, 250, 500);
          if (x > -101 && x < 101 && y > -101 && y < 101) {
            // vector que ingresan
            processing.line(250, 250, 250+( (x*250)/100 ), 250-( (y*250)/100 ));
            //processing.point(250+x, 250-y ); // origen
          }
          break;
        case 3:
          // linea horizontal
          processing.line(250, 250, 500, 250);
          // linea vertical
          processing.line(250, 0, 250, 250);
          // linea diagonal
          processing.line(250, 250, 0, 500);

          // Transformacion lineal de R3 a R2
          if (x > -101 && x < 101 && y > -101 && y < 101 && z > -101 && z < 101) {

            var x1 = (3*x)+y-z;
            var y1 = (4*x)-(2*y)+(3*z);

            x1 = (x1*250)/100;
            y1 = (y1*250)/100;
            processing.line(250, 250,250+ x1,250-y1);
          }
          break;
        default:
          break;
      } */

      processing.ellipse(initialX, initialY, radio, radio);
      move()
    }

    processing.onTic = function(world) {
    }

    processing.onMouseEvent = function (world, event) {
        return world;
    }

  // ******************** De aquí hacia abajo no debe cambiar nada. ********************

  // Esta es la función que pinta todo. Se ejecuta 60 veces por segundo. 
  // No cambie esta función. Su código debe ir en drawGame
  processing.draw = function () {
    processing.drawGame(processing.state);
    processing.state = processing.onTic(processing.state);
  };
  // Esta función se ejecuta cada vez que presionamos una tecla. 
  // No cambie esta función. Su código debe ir en onKeyEvent
  processing.keyPressed = function () {
    processing.state = processing.onKeyEvent(processing.state, processing.keyCode);
  }
  // Esta función se ejecuta cada vez movemos el mouse. 
  // No cambie esta función. Su código debe ir en onKeyEvent
  processing.mouseMoved = function () {
    processing.state = processing.onMouseEvent(processing.state,
      { action: "move", mouseX: processing.mouseX, mouseY: processing.mouseY });
  }

  // Estas funciones controlan los eventos del mouse. 
  // No cambie estas funciones. Su código debe ir en OnMouseEvent
  processing.mouseClicked = function () {
    processing.state = processing.onMouseEvent(processing.state,
      { action: "click", mouseX: processing.mouseX, mouseY: processing.mouseY, mouseButton: processing.mouseButton });
  }

  processing.mouseDragged = function () {
    processing.state = processing.onMouseEvent(processing.state,
      { action: "drag", mouseX: processing.mouseX, mouseY: processing.mouseY, mouseButton: processing.mouseButton });
  }

  processing.mousePressed = function () {
    processing.state = processing.onMouseEvent(processing.state,
      { action: "press", mouseX: processing.mouseX, mouseY: processing.mouseY, mouseButton: processing.mouseButton });
  }

  processing.mouseReleased = function () {
    processing.state = processing.onMouseEvent(processing.state,
      { action: "release", mouseX: processing.mouseX, mouseY: processing.mouseY, mouseButton: processing.mouseButton });
  }
  // Fin de los eventos del mouse


}

const canvas = document.getElementById("canvas");
const instance = new Processing(canvas, sketch);
window.onload = function() {
  document.getElementById('dimension').addEventListener('change', function() {
    r = document.getElementById('dimension').value;
    switch (Number(r)) {
      case 1:
        document.getElementById('r2').style.display = 'none';
        document.getElementById('r3').style.display = 'none';
        break;
      case 2:
        document.getElementById('r2').style.display = '';
        document.getElementById('r3').style.display = 'none';
        break;
      case 3:
        document.getElementById('r2').style.display = '';
        document.getElementById('r3').style.display = '';
      break;
      default:
        break;
    }
    const canvas = document.getElementById("canvas");
    const instance = new Processing(canvas, sketch);

  });

  document.getElementById('btn-draw').addEventListener('click', function() {
    x = Number(document.getElementById('r1').value);
    y = Number(document.getElementById('r2').value);
    z = Number(document.getElementById('r3').value);
   
    const canvas = document.getElementById("canvas");
    const instance = new Processing(canvas, sketch);
  }); 
};