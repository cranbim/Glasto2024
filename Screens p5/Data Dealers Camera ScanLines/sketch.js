let capture;
var source;
var cells;
var size=10;
var numShades=256, shadeStep;
var sorted;
var modA=0;
var modRot=0.01;
var modX=0.5;
var modY=0.5;
var scanPos=0;
var scanHPos=0;
var ar=640/480;
var bgCount=30;

var col0=[40,40,40];
var cols=[
  [241,142,61],
  [235,79,148],
  [129,200,205],
  [230,200,50]
];
var col1=cols[0];
var logoLength=0;

function preload(){
  logo=loadImage("baconPlusHandleMono.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  source=createImage(width, width/ar);
  capture = createCapture(VIDEO);
  // capture.hide();
  strokeJoin(ROUND);
  pixelDensity(1);
  logoLength=logo.width;
}

function draw() {
  if(bgCount>0){
    bgCount--;
    background(bgCount*7,0,0);
  }
  background(col0[0],col0[1],col0[2]);
  if(random(100)<2){
    modX=random(0.5)+0.25;
    col1=random(cols);
    bgCount=30;
  }
  // modX=noise(modA*0.1);//cos(modA)*0.4+0.45;
  modY=sin(modA*3)*0.6+0.7;
  modA+=modRot;
  source.copy(capture,0,0,capture.width, capture.height, 0,0,floor(width), floor(width/ar));
  // blendMode(BLEND);
  // blendMode(DIFFERENCE);
  // var numLines=constrain(map(mouseX,0,width,5,100),0,100);
  // var displacement=constrain(map(mouseY,0,height,0,10),0,10)
  var numLines=floor(constrain(map(modX,0,1,5,200),0,200));
  var relDisp=width*ar*0.015;
  var displacement=relDisp*0.25;constrain(map(modY,0,1,0,relDisp),0,relDisp);
  // var numLines=100;
  processImage(source,numLines,250, displacement,scanPos,scanHPos,col1);
  scanPos=(scanPos+(1*numLines/100))%(numLines);
  scanHPos=(scanHPos+width/50)%width;
  push();
  translate(width*0.7,height*0.9);
  scale((width*0.2)/logoLength);
  tint(255,100);
  image(logo,0,0);
  pop();
}

function processImage(img, lines, steps, displacement,scanPos,scanHPos,col){
  scanPos=floor(scanPos);
  var lStep=floor(img.height/lines);
  var step=floor(img.width/steps);
  var dispStep=floor(width/steps);
  var dispLStep=floor((width/ar)/lines);
  img.loadPixels();
  push();
  translate(0,height/2);
  for(var j=0; j<lines; j++){
    processLine(j,0,displacement,false,col);
    // processLine(j,0,displacement);
    // processLine(j,1,displacement);
    // processLine(j,2,displacement);
  }
  processLine(scanPos,0,displacement*1.5,true,col);
  pop();
  
  function processLine(j,col,displacement,isScan,col1){
    push();
    translate(0,-(lines*dispLStep)*0.5+displacement*0.5);
    beginShape();
    vertex(0, col*dispLStep/3+j*dispLStep);
      for(var i=0; i<steps; i++){
        var offset=(j*lStep*img.width+i*step)*4;
        // var shade=img.pixels[offset+col]/255;
        var shade=(img.pixels[offset+0]+
            img.pixels[offset+1]+
            img.pixels[offset+2])/(3*255);
        vertex(i*dispStep, col*dispLStep/3+(j)*dispLStep +(shade-0.5)*dispLStep*displacement);
      }
      noFill();
      // if(col===0) fill(255,0,0,180);
      // if(col===1) fill(0,255,0,180);
      // if(col===2) fill(0,0,255,180);
      // fill(255,100);
    var sw=noise(j*dispLStep/300+frameCount/50);
      if(isScan){
        // stroke(200,20,20,180);
        stroke(240);
        strokeWeight(min(dispLStep*2,width*0.05));
      } else {
        // stroke(255,180);
        stroke(col1[0],col1[1],col1[2],180);
        strokeWeight(dispLStep*sw*1.3);
      }
      // noStroke();
      // strokeWeight(dispLStep);
      // vertex(width, col*dispLStep/3+j*dispLStep);
      endShape();
      // fill(40,180);
      noStroke();
      // var pos=floor(steps*scanHPos/width);
      // var offset=(j*lStep*img.width+pos*step)*4;
      //   // var shade=img.pixels[offset+col]/255;
      // var shade=(img.pixels[offset+0]+
      //     img.pixels[offset+1]+
      //     img.pixels[offset+2])/(3*255);
      // ellipse(pos*dispStep, col*dispLStep/3+j*dispLStep +shade*dispLStep*displacement,dispLStep*sw)
    pop();
  }
}