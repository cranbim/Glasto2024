// Based on ML5 posenet example

let video;
let poseNet;
let poses = [];
// let lbs=[];
let labelPoses=[];
let maxPoses=6;
let numCurrentPoses=0;
let numPrevPoses=0;
let ar=16/9;
let dw, dh;
let edw, edh;
let edx,edy;
let vw=640;
let vh=360;
let vScale=1;
let choice=0;
let poseDelayMax=10;
let poseDelay=poseDelayMax;
// let changeFrequency=30;
// let changeCounter=changeFrequency;

let phrases=[
  //one person
  [
    ["over-thinker","curious","sparkly","smarter than I look"],
    ["","",""],
    ["","",""],
    ["","",""],
    ["","",""],
    ["","",""]
  ],
  //two people
  [
    ["cheat","dog person","lost","lover"],
    ["rule follower","cat person","loster","fighter"],
    ["","",""],
    ["","",""],
    ["","",""],
    ["","",""]
  ],
  //three to five people
  [
    ["chocolate","hero","introvert","goose"],
    ["vanilla","villain","extravert","duck"],
    ["strawberry","sidekick","extravert","goose"],
    ["banana","love interest","introvert","goose"],
    ["mint choc","false prophet","extravert","goose"],
    ["raspberry ripple","confidante","introvert","duck"]
  ]
];
let numPhraseVariations=4;

function calcGeometry(){
  dw=windowWidth;
  dh=windowHeight;
  let dar=dw/dh;
  if(dar>ar){
    edh=dh;
    edw=dh*ar;
    edy=0;
    edx=(dw-edw)/2;
    
  } else {
    edw=dw;
    edh=dw/ar;
    edy=(dh-edh)/2;
    edx=0;
  }
  vScale=edw/vw;
}

function setup() {
  calcGeometry();
  // createCanvas(640, 480);
  createCanvas(dw,dh);
  video = createCapture(VIDEO);
  video.size(vw,vh);

  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', function(results) {
    if(poseDelay==0){
    // if(changeCounter<=0){
      // poses=results;
      var tempPoses = results;
      tempPoses.sort(function(poseA, poseB){
        return poseA.pose.score<poseB.pose.score;
      });
      poses=[];
      // console.log(tempPoses);
      tempPoses.forEach(function(pose,i){
        // console.log(pose.score)
        if(i<maxPoses ){ //&& pose.pose.score>0.3
          poses.push(pose);
        }
      });
      // poses.sort(function(poseA, poseB){
      //   return poseA.pose.score>poseB.pose.score;
      // });
      // console.log(poses);
      numPrevPoses=numCurrentPoses;
      numCurrentPoses=poses.length;
      // changeCounter=changeFrequency;
      // if(mouseIsPressed){
      //   console.log(poses);
      // }
    // }
      poseDelay=poseDelayMax;
    } else {
      poseDelay--;
    }
    // console.log(numCurrentPoses);
  });
  video.hide();
  textFont("monospace");
  for(let i=0; i<maxPoses; i++){
    labelPoses[i]={
      lbs:[]
    };
    labelPoses[i].lbs.push(new LabelBox(i,340,20,phrases));
    // labelPoses[i].lbs.push(new LabelBox(220,20,["weak resolve","clouded judgement","too trusting","a people pleaser","people don't change","and another thing..."]));
    // labelPoses[i].lbs.push(new LabelBox(30,20,["clumsy","weak","impulsive","deceptive","obvious"]));
  }
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  background(0);
  image(video, edx,edy,edw,edh);
  fill(0);
  stroke(255);
  textSize(50);
  // text(numCurrentPoses,20,30);
  stroke(0,0,255);
  noFill();
  rect(edx,edy,edw,edh);
  // We can call both functions to draw all keypoints and the skeletons
  // drawKeypoints();
  // drawSkeleton();
  translate(edx,edy);
  scale(vScale);
  for(let i=0; i<numCurrentPoses; i++){
    // drawHeart(i, labelPoses[i].lbs[0]);
    drawHead(i, labelPoses[i].lbs[0]);
    // drawHandRight(i, labelPoses[i].lbs[2]);
  }
}

function drawKeypoints()  {
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i].pose;
    // console.log(pose);
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255,180);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, width/20);
      }
    }
  }
}

function drawHeart(poseI,lb){
  if(poses.length>0){
    var p0=poses[poseI].pose.leftShoulder;
    var p1=poses[poseI].pose.rightShoulder;
    var p2=poses[poseI].pose.leftHip;
    var p3=poses[poseI].pose.rightHip;
    var showHeart=p0.confidence>0.2 && p1.confidence>0.2 && p2.confidence>0.2 && p3.confidence>0.2;
    var left=min(p0.x, p1.x, p2.x, p3.x);
    var right=max(p0.x, p1.x, p2.x, p3.x);
    var top=min(p0.y, p1.y, p2.y, p3.y);
    var bottom=max(p0.y, p1.y, p2.y, p3.y);
    var chestWidth=right-left;
    var chestHeight=bottom-top;
    colorMode(HSB);
    lb.update(left+chestWidth*0.45,top+chestHeight*0.1,left+chestWidth*0.45+chestWidth*0.4, top+chestHeight*0.1+chestWidth*0.4);
    lb.show();
    colorMode(RGB);
  }
}

function drawBrain(poseI,lb){
  if(poses.length>0){
    var p0=poses[poseI].pose.leftEar;
    var p1=poses[poseI].pose.rightEar;
    var p2=poses[poseI].pose.leftEye;
    var p3=poses[poseI].pose.rightEye;
    var showBrain=p0.confidence>0.2 && p1.confidence>0.2 && p2.confidence>0.2 && p3.confidence>0.2;
    var right=p0.x;//(p0.x+p2.x)/2;
    var left=p1.x;//(p1.x+p3.x)/2;
    var bottom=max(p2.y, p3.y)+(p3.x-p2.x)*0.5;
    var top=(bottom-(right-left)*0.6);
    colorMode(HSB);    
    lb.update(left,top,right,bottom);
    lb.show();
    colorMode(RGB);
  }
}

function drawHead(poseI,lb){
  if(poses.length>0){
    var p0=poses[poseI].pose.leftEar;
    var p1=poses[poseI].pose.rightEar;
    var p2=poses[poseI].pose.leftEye;
    var p3=poses[poseI].pose.rightEye;
    var showBrain=p0.confidence>0.2 && p1.confidence>0.2 && p2.confidence>0.2 && p3.confidence>0.2;
    var right=p0.x;//(p0.x+p2.x)/2;
    var left=p1.x;//(p1.x+p3.x)/2;
    var eyeLevel=max(p2.y, p3.y);
    var bottom=eyeLevel+(right-left)*0.6;
    var top=(bottom-(right-left));
    colorMode(HSB);
    if(random(300)<3){
      choice=floor(random(numPhraseVariations));
    }
    lb.update(constrain(numCurrentPoses,1,3), poseI,choice,left,top,right,bottom);
    lb.show();
    colorMode(RGB);
  }
}

function drawHandRight(poseI,lb){
  if(poses.length>0){
    var p0=poses[poseI].pose.rightWrist;
    var p1=poses[poseI].pose.rightElbow;
    // var p2=poses[0].pose.leftEye;
    // var p3=poses[0].pose.rightEye;
    var showHand=p0.confidence>0.2 && p1.confidence>0.2;
    var diffX=p0.x-p1.x;
    var diffY=p0.y-p1.y;
    var handX=p0.x+diffX/2;
    var handY=p0.y+diffY/2;
    var d=dist(p0.x,p0.y, p1.x,p1.y);
    var left=handX-d*0.35;
    var right=handX+d*0.35;
    var bottom=handY+d*0.35;
    var top=handY-d*0.25;
    colorMode(HSB);  
    lb.update(left,top,right,bottom);
    lb.show();
    colorMode(RGB);
  }
}

function drawSkeleton() {
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255,180);
      strokeWeight(width/100);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}

function LabelBox(ind, col,sz,labels){
  var label="waiting";
  var tl=createVector(0,0);
  var br=createVector(0,0);
  var cHue=50+ind*50;// col;
  var cSat=50;
  var cBri=50;
  var th=sz*0.25;
  var confidence=50;
  var changedSmoother=0;
  var smoothe=8;
  var nOff=random(100);
  var nStep=random(0.03,0.15);
  var lim=10;
  
  
  this.update=function(nPoses,poseI,choice,x0,y0,x1,y1){
    if(changedSmoother>0){
      changedSmoother--;
    }
    // var nx=0;(noise(x0/20,y0/20+frameCount/20)-0.5)*30;
    // var ny=0;(noise(x0/17,y0/17+frameCount/19)-0.5)*30;
    tl.x+=constrain((x0-tl.x)/smoothe,-lim,lim);
    tl.y+=constrain((y0-tl.y)/smoothe,-lim,lim);
    br.x+=constrain((x1-br.x)/smoothe,-lim,lim);
    br.y+=constrain((y1-br.y)/smoothe,-lim,lim);
    cSat=85;
      // (noise(x0/50,y0/50+frameCount/5)-0.5)*50+85;
    cBri=85;
      // (noise(x1/50,y1/50+frameCount/2.5)-0.5)*50+85;
    // if(random(300)<1 || posesChanged){
    //   let choice=floor(random(numPhraseVariations));
    //   confidence=floor(random(100,1000))/10;
    // }
    if(changedSmoother==0){
      label=labels[nPoses-1][poseI][choice];
      changedSmoother=30;
    }
    fill(255);
    stroke(0);
    textSize(30);
    // text(nPoses+" "+poseI+" "+choice,100,30);
    if(random(100)<10){
      // confidence=floor(random(100,1000))/10;
      confidence=floor((noise(nOff,frameCount*nStep)*0.7+0.3)*1000)/10;
    }
  }
  
  this.show=function(){
    push();
    rectMode(CORNERS);
    noFill();
    stroke(cHue,cSat,cBri,0.6);
    fill(cHue,cSat,cBri,0.25);
    strokeWeight(th);
    let boxSize=min(br.x-tl.x,br.y-tl.y);
    rect(tl.x, tl.y, br.x, br.y);
    fill(cHue,cSat,cBri,0.8);
    noStroke();
    textSize(sz);
    var tw=textWidth(label);
    var len=tw+sz;
    var confText=nf(confidence,1,1)+"%";
    tw=textWidth(confText);
    var len2=tw+sz;
    rectMode(CORNER);
    rect(tl.x,br.y,len,sz);
    rect(tl.x,br.y+sz,len2,sz);
    translate(tl.x+sz*0.2,br.y+sz*0.5);
    textAlign(LEFT,CENTER);
    fill(0,0,100,1);
    text(label,0,0);
    translate(0,sz);
    text(confText,0,0);
    pop();
  }
}
