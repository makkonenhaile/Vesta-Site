// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/IKB1hWWedMk

// Edited by SacrificeProductions

// Set a Point, function determines height
// find way for opacity to work that way when you flip screens it adjust, and make screen smaller
var x = window.matchMedia("(max-height: 567px)");
var desktop = window.matchMedia("(max-height: 636px)");


var cols, rows;
var scl = 25;
var w = 2000;
var h = 830;

var flying = 0;

var terrain = [];
let myCanvas = null;



if (!desktop.matches) {
  function setup() {
  
    myCanvas = createCanvas(windowWidth, windowHeight * .55 , WEBGL);
    myCanvas.position(0, windowHeight * .45);
    cols = w / scl;
    rows = h / scl;

    
    for (var x = 0; x < cols; x++) {
      terrain[x] = [];
      for (var y = 0; y < rows; y++) {
        terrain[x][y] = 0; //specify a default value for now
        }
      }
    }
  } else if (!x.matches){
   function setup() {
  
     myCanvas = createCanvas(windowWidth, windowHeight * .45 , WEBGL);
      myCanvas.position(0, windowHeight * .55);
     cols = w / scl;
      rows = h / scl;
  
    
   for (var x = 0; x < cols; x++) {
       terrain[x] = [];
       for (var y = 0; y < rows; y++) {
        terrain[x][y] = 0; //specify a default value for now
      }
     }
    }
  } else {

function setup() {
  
       myCanvas = createCanvas(0, 0 , WEBGL);
       cols = w / scl;
        rows = h / scl;
    
      
     for (var x = 0; x < cols; x++) {
         terrain[x] = [];
         for (var y = 0; y < rows; y++) {
          terrain[x][y] = 0; //specify a default value for now
        }
       }
      }
    } 
  function draw() {
    flying -= 0.01;
    var yoff = flying;
    for (var y = 0; y < rows; y++) {
      var xoff = 0;
      for (var x = 0; x < cols; x++) {
        terrain[x][y] = map(noise(xoff, yoff), 0, 1, -150, 150);
        xoff += 0.2;
      }
      yoff += 0.2;
    }
    
    background(0);
    translate(0, 50);
    rotateX(PI / 3);
  
    fill(255, 129, 119, 150);
    translate(-w / 2, -h / 2);
    for (var y = 0; y < rows - 1; y++) {
      beginShape(TRIANGLE_STRIP);
      for (var x = 0; x < cols; x++) {
        vertex(x * scl, y * scl, terrain[x][y]);
        vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
      }
      endShape();
    } 
  }
  function windowResized() {
    if (!desktop.matches) { // If small screen media query does not matches
      myCanvas.position(0, windowHeight * .45);
     resizeCanvas(windowWidth, windowHeight * .55 );
    } else if (!x.matches){
   myCanvas.position(0, windowHeight * .55);
   resizeCanvas(windowWidth, windowHeight * .45 );
     }
    else {
      resizeCanvas(0,0);
    }
}