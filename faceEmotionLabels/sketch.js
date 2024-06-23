let capture
let canvas
let gotMarks=false
let displaySize
let resizedDetections=[]
const emotions=["angry","disgusted","fearful","happy","neutral","sad","surprised"]
const imageIndex=[3,2,1,0,1,2,3]
let scrollers=[]
let numScrollers=10
let images=[]
let shapes


function preload(){
    images[0]=loadImage("heart.png")
    images[1]=loadImage("meh.png")
    images[2]=loadImage("laugh.png")
    images[3]=loadImage("poo.png")

        faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
        faceapi.nets.faceExpressionNet.loadFromUri('./models')

}

function setup(){
    canvas=createCanvas(windowWidth, windowHeight)
    capture=createCapture(VIDEO)
    // capture.hide()
    // console.log(capture)
    displaySize = { width: capture.width, height: capture.height }
    faceapi.matchDimensions(canvas, displaySize)
    // for(let i=0; i<numScrollers; i++){
    //     scrollers.push(new Scroller(width*0.1,width*0.03))
    // }
    shapes=new Shapes()
    setTimeout(getMarks,3000)
}

// function getMarksNow(){
//     console.log("coming")
//     await getMarks()
// }

function getMarks(){
    // console.log("hello")
    // resizedDetections=[]
    const detections = faceapi.detectAllFaces(capture.elt, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
        .then((data)=>{
            // console.log("got data")
            console.log(data)
            if(data.length>0){
                resizedDetections = data//faceapi.resizeResults(data, displaySize)
            }
            gotMarks=true
            getMarks()
        })
    
    // resizedDetections = faceapi.resizeResults(detections, displaySize)
    // console.log(resizedDetections)
    // // canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    // faceapi.draw.drawDetections(canvas, resizedDetections)
    // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    // faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    
}






function draw(){
    if(gotMarks){
        if(true){
            background(128)
            image(capture,0,0)
            // getMarks()
            // console.log(">>>")
            // console.log(resizedDetections.length)
            resizedDetections.forEach((rd,i)=>{
                drawDetection(rd)
                labelEmotion(rd,i)
            })
        }
    }
    shapes.run()
}

function labelEmotion(det,index){
    let x=det.alignedRect._box._x
    let y=det.alignedRect._box._y
    let h=det.alignedRect._box._height
    let w=det.alignedRect._box._width

    let max=""
    let currentEmotion="Hello Dave"
    let emotionIndex=2
    emotions.forEach((e,j)=>{
        if(det.expressions[e]>max){
            max=det.expressions[e]
            currentEmotion=e
            emotionIndex=j
        }
    })
    rectMode(CORNER)
    fill(255,0,0)
    noStroke()
    rect(x,y+h,w,width*0.05)
    fill(255)
    noStroke()
    textSize(width*0.04)
    textAlign(LEFT,CENTER)
    text(currentEmotion,x,y+h+width*0.025)
    console.log(emotionIndex)
    if(random(10)<1.5){
        shapes.add(x+w*0.8, y+h*0.15,images[imageIndex[emotionIndex]])
    }
    // scrollers[index].setText(currentEmotion)
    // // scrollers[index].render()
    // textFont('monospace')
    // scrollers[index].show(x,y+h,1)
    // scrollers[index].run(0.5)

}

function drawDetection(det){
    // console.log("drawRect")
    let x=det.alignedRect._box._x
    let y=det.alignedRect._box._y
    let h=det.alignedRect._box._height
    let w=det.alignedRect._box._width
    stroke(255,0,0)
    strokeWeight(3)
    noFill()
    rectMode(CORNER)
    rect(x,y,w,h)
}

function Shapes(){
    let shapes=[]

    this.run=function(){
        for(let i=shapes.length-1; i>=0; i--){
            if(shapes[i].run()){
                shapes[i].show()
            } else {
                shapes.splice(i,1)
            }
        }
    }

    this.add=function(x,y,img){
        shapes.push(new Shape(x,y,img))
    }
}

function Shape(x,y,img){
    let ttlMax=100
    let ttl=ttlMax
    let driftX=random(-1,1)
    let driftY=random(-0.2,-1.5)
    let accY=1.01
    let scl=1

    this.run=function(){
        x+=driftX
        y+=driftY
        driftY*=accY
        ttl--
        return ttl>0
    }

    this.show=function(){
        push()
        translate(x,y)
        scale(scl*(0.2+(1-ttl/ttlMax)))
        imageMode(CENTER)
        tint(255,255*(ttl/ttlMax))
        image(img,0,0)
        pop()
    }
}

function Scroller(boxWidth, boxHeight) {
    var displayText = "nothing";
    var buffer, scrollImg;
    var ts = boxHeight / 4;
    var tw;
    var offX = 0;
  
    this.setText = function(nt) {
      displayText = nt;
      render();
    };
  
    function render() {
      textSize(ts);
      tw = textWidth(displayText) + boxWidth;
    }
  
    this.get = function() {
      return scrollImg;
    };
  
    this.run = function(speed) {
      offX = (offX - 0.01 * speed) % 1;
    }
  
    this.show = function(x, y, fade, gr) {
      // image(scrollImg,x+offX*tw,y);n
      fill(50,100,70);
      noStroke();
      rectMode(CORNER)
      rect(x,y+ts/2,boxWidth,ts*2);
      fill(0);
      textSize(ts);
      text(displayText, x + boxWidth + offX * tw, y + ts);
    };
  
  
  }