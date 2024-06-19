let elements=[]
let numElements=7
let dx,dy,dw,dh
let texts=[
  [
    "Your partial attention",
    "Your likes",
    "location tracking",
    "browser activity",
    "friends' posts",
    "your fitness data",
    "emotion tracking"
  ],[
    "Private browsing",
    "An authentic experience",
    "True friendship",
    "What you actually need",
    "A moment of calm",
    "A break from marketing",
    "Data detox",
  ]
]

let font0

function preload(){
  font0=loadFont("Instruction.otf")
}

function setup() {
  createCanvas(windowWidth, windowWidth*8.5/16);
  textFont(font0)
  dx=0
  dy=height*0.1
  dw=width
  dh=height-dy
  // vStep=dh/numElements
  // for(let i=0; i<numElements; i++){
  //   elements.push(new Element(dx,dy+i*vStep,dw,(1)*vStep, texts[i],[50,150]))
  // }
  eb0=new ExchangeBoard(dx,dy,dw/2,dh,texts[0],"We Take",
                        0,1000)
  eb1=new ExchangeBoard(dx+dw/2,dy,dw/2,dh,texts[1],"We Sell", 
                        1000,10000)
}

function draw() {
  background(255);
  textSize(dh*0.13)
  textAlign(CENTER,CENTER)
  // ellipse(x+w*0.4,y+h*0.5,20)
  fill(0)
  noStroke()
  text("Today's Rates",dx+dw*0.5,height*0.05)
  elements.forEach(function(el){
    el.show()
  })
  eb0.run()
  eb1.run()
}

function ExchangeBoard(dx,dy,dw,dh,labels,title,baseVal,rangeVal){
  let elements=[]
  let numElements=7
  vStep=dh/(numElements+1)
  for(let i=0; i<numElements; i++){
    elements.push(new Element(dx,dy+(i+1)*vStep,dw,(1)*vStep, labels[i],random(0.5,1)*baseVal,random(0.5,1)*rangeVal))
  }
  
  this.run=function(){
    textSize(dw*0.07)
    textAlign(LEFT,CENTER)
    // ellipse(x+w*0.4,y+h*0.5,20)
    fill(0)
    noStroke()
    text(title,dx+dw*0.65,dy+vStep/2)
    elements.forEach(function(el){
      el.show()
    })
  }
}

function Element(x,y,w,h,label,baseVal,rangeVal){
  
  let ssg=new SevenSegGroup(x+w*0.65,y+h*0.5,w*0.3,3,2,baseVal,rangeVal)
  
  this.show=function(){
    stroke(100)
    fill(255)
    rectMode(CORNER)
    rect(x,y,w,h)
    
    textSize(w*0.04)
    textAlign(RIGHT,CENTER)
    // ellipse(x+w*0.4,y+h*0.5,20)
    fill(0)
    noStroke()
    text(label,x+w*0.6,y+h*0.5)
    ssg.show()
    ssg.run()
  }
}

function SevenSegGroup(x,y,w,d0,d1,rangeBase,range){
  let segNums=[]
  let step=w/(d0+d1+0.5)
  let wrapNum=pow(10,(d0+d1))
  let numText="00123".split('')
  let num=0
  let nSeed=random(99)
  let nRel=random(0.0001,0.0002)
  for(let i=0; i<d0; i++){
    segNums.push(new SevenSeg(x+i*step,y-step/2,step/0.75))
  }
  for(let i=0; i<d1; i++){
    segNums.push(new SevenSeg(x+(d0+0.5+i)*step,y-step/2,step/0.7))
  }
  
  this.run=function(){
    num=floor(noise(nSeed+nRel*frameCount)*range)+rangeBase
    // console.log(num)
    numText=nf(num%wrapNum,d0+d1).split('')
    // console.log(numText2)
  }
  
  this.show=function(){
    fill(40)
    stroke(0)
    strokeWeight(step*0.02)
    rect(x,y-step/2,w,step/0.75)
    segNums.forEach(function(segNum,i){
      segNum.show(numText[i])
    })
    fill(255,50,50)
    noStroke()
    ellipse(x+(d0+0.2)*step,y+step*0.5,step*0.25)
  }
}

function SevenSeg(x,y,step){
  let segmentPos=[
    [0.5,0.1],
    [0.9,0.3],
    [0.9,0.7],
    [0.5,0.9],
    [0.1,0.7],
    [0.1,0.3],
    [0.5,0.5]
  ]
  let offRel=0.05;
  let cols=[[1,0,0],[0,1,0],[0,0,1]];
  let numPatterns=[
    [1,1,1,1,1,1,0],
    [0,1,1,0,0,0,0],
    [1,1,0,1,1,0,1],
    [1,1,1,1,0,0,1],
    [0,1,1,0,0,1,1],
    [1,0,1,1,0,1,1],
    [1,0,1,1,1,1,1],
    [1,1,1,0,0,0,0],
    [1,1,1,1,1,1,1],
    [1,1,1,1,0,1,1]
  ]
  
  
  let offsets=[
    [cos(0)*step*offRel, sin(0)*step*offRel],
    [cos(TWO_PI/3)*step*offRel, sin(TWO_PI/3)*step*offRel],
    [cos(2*TWO_PI/3)*step*offRel, sin(2*TWO_PI/3)*step*offRel]
  ];
  
  
  this.show=function(num){
    push()
    translate(x,y)
    for(let k=0; k<7; k++){
      let x=floor(segmentPos[k][0]*step);
      let y=floor(segmentPos[k][1]*step);
      // const pixelIndex = ((i+x) + (j+y) * osb.width) * 4;
      const r = 255//img.pixels[pixelIndex + 0];
      const g = 50//img.pixels[pixelIndex + 1];
      const b = 50//img.pixels[pixelIndex + 2];
      // const avg = (r + g + b) / 3;
      // const shade=floor(avg/16)*16;
      // stroke(shade);
      // noFill();
      // rect(0,y,step, step/4);
      // console.log(num)
      if(numPatterns[num][k]==1){
        shape(k,step,[r,g,b]);
      } else {
        shape(k,step,[50,50,50]);
      }
    }
    pop()
  }


  function shape(type,step,shades){
    stepH=step*0.6
    var rel=0.12
    var relH=0.12/stepH*step;

    // for(var i=0; i<3; i++){
      push();
      // translate(offsets[i][0],offsets[i][1]);
      stroke(shades[0],shades[1],shades[2])
      strokeWeight(step*0.1);
      if(type%3==0){
        line((segmentPos[type][0]-relH)*stepH, segmentPos[type][1]*step, (segmentPos[type][0]+relH)*stepH, segmentPos[type][1]*step);
      }else {
        line((segmentPos[type][0])*stepH, (segmentPos[type][1]-rel)*step, (segmentPos[type][0])*stepH, (segmentPos[type][1]+rel)*step);
      }
      pop();
    // }
  }
}