let images=[]
let numImages=40
let font0, font1

function preload(){
  for(let i=0; i<numImages; i++){
    images[i]=loadImage("images/pic"+nf(i,2,0)+".jpeg")
  }
  font0=loadFont("Super Funky.ttf")
  font1=loadFont("rainyhearts.ttf")
}
let currentImage=0;
let breathe=1
let breatheA=0
let breatheRot=0.01
let watchCount=0
let startedCounting=0
let currentCount=0
let counting=false
let displayCounting=false
let displayCountingTime=300//frames
let displayCount=0
let countBackground=0
let flickMode=true
let eyeTracker
let w,h
let notEyeCount=0;
let gotEyeCount=0;
let countThreshold=5;

function setup() {
  createCanvas(windowWidth, windowWidth*9/16);
  w = width;
  h = height;
  eyeTracker=new EyeTracker(w,h)
  
}

function draw() {
  // console.log(flickMode,displayCounting,displayCount)
  if(eyeTracker.gotEyes){
    gotEyeCount++;
    notEyeCount=0
  } else {
    notEyeCount++;
    gotEyeCount=0;
  }
  if(displayCounting){
    if(displayCount>0){
      displayCount--
      countBackground+=(1-countBackground)/100
      
    } else {
      displayCounting=false
      flickMode=true
    }
  }
  if(gotEyeCount>countThreshold){
    if(flickMode){
      flickMode=false
    }
  } else if(notEyeCount>countThreshold){
    if(!flickMode){
      if(!displayCounting){
        displayCounting=true
        displayCount=displayCountingTime
        countBackground=0
      } else {
        // if(displayCount>0){
        //   displayCount--
        //   countBackground+=(1-countBackground)/100
        //   // fill(0)
        //   // stroke(255)
        //   // textAlign(CENTER, CENTER)
        //   // textSize(height*0.1)
        //   // text(nf(currentCount/1000,3,2),width*0.5,height*0.75)
        // } else {
        //   displayCounting=false
        //   flickMode=true
        // }
      }
    } else {
      // currentImage=floor(frameCount/10)%numImages
      if(frameCount%10==0){
        currentImage=floor(random(numImages))
      }
      counting=false
      
    }
  }
  background(220);
  imageMode(CENTER)
  push()
  translate(width/2, height/2)
  scale(breathe)
  image(images[currentImage],0,0, width, height)
  
  pop()
  if(!flickMode){
    breathe=sin(breatheA)*0.2+1.2
    antiBreathe=sin(breatheA)*-0.2+1.2
    breatheA+=breatheRot
    if(!counting){
      counting=true
      startedCounting=millis()
    } else {
      if(!displayCounting){
        currentCount=millis()-startedCounting
      }
    }
    if(displayCounting){
      background(0,255*(countBackground))
      fill(255)
      stroke(0)
      textAlign(CENTER, CENTER)
      textSize(height*0.1)
      textFont(font1)
      text("Thank you for your attention",width*0.5,height*0.75)
      text("You watched this for",width*0.5,height*0.5)
      text(nf(currentCount/1000,3,2)+" seconds",width*0.5,height*0.625)
    } else {
      push()
      translate(width/2, height*0.75)
      scale(antiBreathe)
      textSize(height*0.1)
      textAlign(CENTER, CENTER)
      fill(255,180)
      stroke(0,100)
      strokeWeight(height*0.01)
      textFont(font0)
      text("keep watching",0,0)
      pop()
    }
  } else {
    // currentImage=floor(frameCount/10)%numImages
    // counting=false
  }
  eyeTracker.run()
  eyeTracker.show()
}

function EyeTracker(w,h){
  let capture = null;
  let tracker = null;
  let positions = null;
  
  capture = createCapture(VIDEO);
  createCanvas(w, h);
  capture.size(w, h);
  capture.hide();
  
  tracker = new clm.tracker();
  tracker.init();
  tracker.start(capture.elt);
  this.gotEyes=false
  let eye1, eye2
  let started=false
  
  this.run=function(){
    if(!started || frameCount%5==0){
      started=true
      positions = tracker.getCurrentPosition();
      this.gotEyes=positions.length > 0
      if (this.gotEyes) {
        eye1 = {
          outline: [23, 63, 24, 64, 25, 65, 26, 66].map(getPoint),
          center: getPoint(27),
          top: getPoint(24),
          bottom: getPoint(26)
        };
        eye2 = {
          outline: [28, 67, 29, 68, 30, 69, 31, 70].map(getPoint),
          center: getPoint(32),
          top: getPoint(29),
          bottom: getPoint(31)
        }
      }
    }
  }
  
  this.show=function(){
    if(started && this.gotEyes){
      push()
      const irisColor = color(random(360), 80, 80, 0.4);

      translate(w, 0);
      scale(-1.0, 1.0);
      drawEye(eye1, irisColor);
      drawEye(eye2, irisColor);
      pop()
    }
    
    // fill(128)
    // text(this.gotEyes,width/2, height/2)
  }
  
  function getPoint(index) {
    return createVector(positions[index][0], positions[index][1]);
  }

  
  function drawEye(eye, irisColor) {
    fill(255);
    // stroke(255);
    // strokeWeight(height*0.01)
    // drawEyeOutline(eye);
    stroke(0);
    strokeWeight(height*0.005)
    drawEyeOutline(eye);

    const irisRadius = min(eye.center.dist(eye.top), eye.center.dist(eye.bottom));
    const irisSize = irisRadius * 2;
    noStroke();
    fill(0);
    ellipse(eye.center.x, eye.center.y, irisSize*1.1, irisSize*1.1);
    fill(107,46,5);
    ellipse(eye.center.x, eye.center.y, irisSize*1, irisSize*1);

    const pupilSize = irisSize / 3;
    fill(0);
    ellipse(eye.center.x, eye.center.y, pupilSize, pupilSize);
  }

  function drawEyeOutline(eye) {
      beginShape();
    const firstPoint = eye.outline[0];
    eye.outline.forEach((p, i) => {
      curveVertex(p.x, p.y);
      if (i === 0) {
        // Duplicate the initial point (see curveVertex documentation)
        curveVertex(firstPoint.x, firstPoint.y);
      }
      if (i === eye.outline.length - 1) {
        // Close the curve and duplicate the closing point
        curveVertex(firstPoint.x, firstPoint.y);
        curveVertex(firstPoint.x, firstPoint.y);
      }
    });
    endShape();
  }
}

