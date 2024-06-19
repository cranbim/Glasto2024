
var phraseList=[
  {
    start:["WE HAVE","YOU DON'T HAVE","YOU GAVE AWAY"],
    ends:["OF YOUR DATA","OF YOU","OF YOUR SOUL", "OF YOUR FUTURE"]
  },
  {
    start:["THE ALGORITHM KNOWS","THE NETWORK CARES"],
    ends:["ABOUT YOU"]
  },
  {
    start:["YOUR NEXT MOVE IS"],
    ends:["PREDICTABLE"]
  },
  {
    start:["YOU HAVE"],
    ends:["OF WHAT YOU NEED"]
  },
  {
    start:["WE"],
    ends:["KNEW YOU WOULD SAY THAT"]
  },
  {
    start:["BUY"],
    ends:["OF EVERYTHING WE TELL YOU"]
  },
  {
    start:["DATA CAN REPLICATE"],
    ends:["OF YOU"]
  },
  {
    start:["YOUR CHOICES"],
    ends:["MATTER"]
  },
  {
    start:["YOUR CHOICES ARE"],
    ends:["MADE BY US"]
  },
  {
    start:["FREE WILL IS"],
    ends:["ALGORITHMIC"]
  },
  {
    start:["YOU ARE"],
    ends:["THE PRODUCT"]
  },
  {
    start:["YOU WAIVED"],
    ends:["OF YOUR RIGHTS"]
  }
];

var isMono=true;
var invert=false;
var prePhrase="YOU ARE";
var prePhrases=["YOU ARE","WE ARE ALL","YOU ARE ALL"];
var currentPhrase;
var endings=["LOST","IMAGINED","REAL","HERE","NEVER HERE","IN LOVE WITH THIS","IN MY HEAD","INSIDE THE NETWORK","ARTIFICIAL","A PLEASANT NIGHTMARE","DREAMED BY OUTSIDERS","HIDDEN FROM VIEW","IN THE CLOUD","AN ARTIFICIAL MEMORY","OUTSIDE YOUR BRAIN","GATHERED IN THE PORTAL","BETTER"];
var currentEnding=endings[0];
var possibleEnding="crap";
var nVal=0;
var center=true;
var numLoops=10;
var settledCount=20;
var settled=0;
var  currentWord=0;
var interval=60*5;
var changeInterval=60*2;
var colIndex=0;
var calculating=0;
var valNow=0;
var phraseChunks;
var currentStart;
var currentEnd;
var fonts=[];
var fontIndex=2;
var fontNow;
var valuePosition=0;
var vMargin=1.12;
var numStreams;
let numStreams0;


var cols=[
  // [241,142,61],
  [37, 154, 186], //partynerds blue
  [252, 13, 208], //partynerds pink
  [235,135,0],
  [0,0,80],
  // [250, 182, 223],//partynerds pale pink
];

function preload(){
  fonts[0]=loadFont("RubikMoonrocks-Regular.ttf");
  fonts[1]=loadFont("TitanOne-Regular.ttf");
  fonts[2]=loadFont("Anton-Regular.ttf");
  font0=loadFont("data-latin.ttf")
}

function setup() {
  fontNow=fonts[fontIndex];
  var ww=windowWidth//min(windowWidth,windowHeight*9/16);
  createCanvas(ww, windowWidth*9/16);
  textFont(fontNow);
  // colorMode(HSB);
  numStreams=new NumStreams(width*0,width*0.0,width,height-width*0,30)
  // numStreams=new NumStreams(width*0.42,width*0.0,width*0.55,height-width*0,60)
  // numStreams0=new NumStreams(width*0,width*0.0,width*0.08,height-width*0,60)
  change();
}

function mousePressed(){
  change();
}

function draw() {
  background(0);
  if(!isMono){
    renderSquares(numLoops);
  } else {
    if(invert){
      background(255);
    } else {
      background(0);
    }
  }
  numStreams.run();

  buildPhrase();
  displayPhrase(currentPhrase,width*0.25,width*0.01,width*0.3,height-width*0.02);
  var words=currentPhrase.split(" ");
  if(frameCount%interval==0){
    change();
  }
  if(frameCount%20==0 && currentWord<words.length){
    currentWord++;
  }
  if(calculating>0){
    calculating--;
  }
  // numStreams.run();
  // numStreams0.run();
}

function change(){
  fontIndex=2;//(fontIndex+1)%fonts.length;
  fontNow=fonts[fontIndex];
  invert=random(10)<5;
  phraseChunks=random(phraseList);
  currentStart=random(phraseChunks.start);
  currentEnd=random(phraseChunks.ends);
  colIndex=(colIndex+1)%2;
  console.log(currentStart, currentEnd);
  currentEnding=random(endings);
  nVal=floor(random(1000))/10;
  calculating=changeInterval;
  prePhrase=random(prePhrases);
  numLoops=floor(random(50));
  currentWord=0;
}

function buildPhrase(){
  if(calculating>0){
    if(frameCount%2==0){
      valNow=floor(random(1000))/10;
    }
    if(frameCount%10==0){
      currentStart=random(phraseChunks.start);
    }
  } else {
    valNow=nVal;
    possibleEnding=currentEnd;
  }
  possibleEnding=currentEnd;
  if(currentStart){
    valuePosition=currentStart.split(" ").length;
  }
  currentPhrase=currentStart+" "+valNow+"% "+possibleEnding;
}

function displayPhrase(phrase,x,y,w,h){
  var yHere=0;
  var yStep=0;
  push();
  translate(x,y);
  var words=phrase.split(" ");
  var sizes=[];
  var yPos=[];
  var tsNom=20;
  textFont(fontNow);
  textAlign((center?CENTER:LEFT),CENTER);
  if(isMono){
    strokeWeight(w*0.03);
    if(invert){
      fill(0);
      stroke(255)
    } else {
      fill(255);
      stroke(0);
    }
  } else {
    fill(255);
    strokeWeight(w*0.02);
    stroke(cols[colIndex*2][0],
      cols[colIndex*2][1],
      cols[colIndex*2][2]);
  }

  strokeJoin(ROUND);
  var bbox;
  for(var i=0; i< currentWord;i++){
    var wordNow=words[i];
    if(!wordNow || wordNow==""){wordNow=".";}
    textSize(tsNom);
    var tw=textWidth(wordNow);
    if(i==valuePosition){
      tw=textWidth(nVal+"%");
    }
    bbox = fontNow.textBounds(wordNow, 0,0,tsNom);
    if(i==valuePosition){
      bbox = fontNow.textBounds(nVal+"%", 0,0,tsNom);
    }
    var ts=min(tsNom*w/bbox.w,height*0.7);
    bbox = fontNow.textBounds(wordNow, 0,0,ts);
    yStep +=bbox.h/2*vMargin;
    yHere+=yStep;
    yPos.push(yHere);
    yStep=bbox.h/2*vMargin;
    sizes.push(ts);
  }
  yHere+=yStep;
  var scaleY=min(h/yHere,3);
  scale(1,scaleY);
  for(var i=0; i< currentWord;i++){
    textSize(sizes[i]);
    text(words[i],center?w/2:0,yPos[i]-sizes[i]*0.15);
  }
  pop();
}


function renderSquares(numSquares){
  rectMode(CENTER);
  noStroke(0);
  fill(40);
  for(let i=0; i<numSquares; i++){
    push();
    for(var k=0; k<2; k++){
      if(i%2==k){
        fill(cols[k+colIndex*2][0],cols[k+colIndex*2][1],cols[k+colIndex*2][2])
      }
    }
    translate(width/2, height/2);
    rotate((frameCount+i*5)*0.01);
    let side=height*1.3-i*height*1.3/numSquares;
    let phase=cos(frameCount*0.03+i*0.25)*0.5+0.5;
    rect(i*phase*1,0,side, side, side*0.5*phase);
    pop();
  }
}

function NumStreams(x,y,w,h,n){
  let streams=[]
  for(let i=0; i<n; i++){
    if(random(10)<5){
      streams.push(new BinaryStream(x, y+i*h/n, w, h/n, 0,random(10)<5))
    } else {
      streams.push(new HexStream(x, y+i*h/n, w, h/n, 0,random(10)<5))
    }
  }
  
  this.run=function(){
    streams.forEach(function(stream,i){
      stream.show()
      stream.run()
      if(random(1000)<5){
        if(random(10)<5){
      streams[i]=(new BinaryStream(x, y+i*h/n, w, h/n, 0,random(10)<5))
    } else {
      streams[i]=(new HexStream(x, y+i*h/n, w, h/n, 0,random(10)<5))
    }
      }
    })
  }
}

function BinaryStream(x,y,w,s,n,invert){
  let bits=[]
  let interval=floor(random(1,5))
  n=w/(s*0.49)
  let bg=invert?60:200
  let fg=invert?200:60
  for(let i=0; i<n; i++){
    bits[i]=random([0,1])
  }
  
  this.show=function(){
    fill(bg)
    noStroke()
    rectMode(CORNER)
    rect(x,y,w,s)
    textFont(font0)
    textSize(s)
    textAlign(LEFT,TOP)
    fill(fg)
    noStroke()
    text(bits.join(''),x,y)
  }
  
  this.run=function(){
    if(frameCount%interval==0){
      // for(let i=0; i<2; i++){
        bits.unshift(bits.pop())
      // }
    }
  }
}

function HexStream(x,y,w,s,n,invert){
  let bits=[]
  let interval=floor(random(1,5))
  let bg=invert?60:200
  let fg=invert?200:60
  n=w/(s*0.49)
  for(let i=0; i<n; i++){
    bits[i]=random([0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'])
  }
  
  this.show=function(){
    fill(bg)
    noStroke()
    rectMode(CORNER)
    rect(x,y,w,s)
    textFont(font0)
    textSize(s)
    textAlign(LEFT,TOP)
    fill(fg)
    noStroke()
    text(bits.join(''),x,y)
  }
  
  this.run=function(){
    if(frameCount%interval==0){
      
      // for(let i=0; i<2; i++){
        bits.push(bits.shift())
      // }
    }
  }
}
