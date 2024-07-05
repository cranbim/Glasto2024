let capture
let canvas
let gotMarks=false
let displaySize
let resizedDetections=[]
const emotions=["angry","disgusted","fearful","happy","neutral","sad","surprised"]
const labels=["spend now","buy more","use credit","fulfilled","go shopping","be better","get product"]
const imageIndex=[2,2,1,0,1,2,1]
let scrollers=[]
let numScrollers=10
let images=[]
let shapes
let dispScale=1
let faceBuffer
let faceBufferLen=180
let faceBufferCurrentOffset=0


function preload(){
    images[0]=loadImage("heart.png")
    images[1]=loadImage("meh.png")
    images[2]=loadImage("laugh.png")
    images[3]=loadImage("poo.png")

        faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
        faceapi.nets.faceExpressionNet.loadFromUri('./models')
        // capture=createCapture(VIDEO)
}

function setup(){
    canvas=createCanvas(windowWidth, windowHeight)
    capture=createCapture(VIDEO)
    // capture.size(640,360)
    // capture.hide()
    // console.log(capture)
    displaySize = { width: capture.width, height: capture.height }
    faceapi.matchDimensions(canvas, displaySize)
    // for(let i=0; i<numScrollers; i++){
    //     scrollers.push(new Scroller(width*0.1,width*0.03))
    // }
    shapes=new Shapes()
    faceBuffer=new FaceBuffer(faceBufferLen)
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
            // console.log(data)
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
    background(128)
    if(gotMarks){
        dispScale=windowWidth/capture.width

        if(true){

            
            push()
            translate(0,-(capture.height*dispScale-height)/2)
            scale(dispScale)
            image(capture,0,0)
            // getMarks()
            // console.log(">>>")
            // console.log(resizedDetections.length)
            resizedDetections.forEach((rd,i)=>{
                // drawDetection(rd)
                faceBuffer.addSnap(capture,rd)
                // labelEmotion(rd,i)
            })
            let gotOldFace=faceBuffer.getRandomSnap()
            if(gotOldFace && resizedDetections.length>0){
                showFace(gotOldFace,resizedDetections[0])
                // image(gotOldFace.img,0,0)
            }
            shapes.run()
            pop()
        }
    } else {
        resizedDetections=[]
    }
}


function showFace(oldFace,currentFacePlace){
    let x=floor(currentFacePlace.alignedRect._box._x)
    let y=floor(currentFacePlace.alignedRect._box._y)
    let h=floor(currentFacePlace.alignedRect._box._height)
    let w=floor(currentFacePlace.alignedRect._box._width)
    image(oldFace.img,x,y,w,h)
}

function labelEmotion(det,index){
    let x=floor(det.alignedRect._box._x)
    let y=floor(det.alignedRect._box._y)
    let h=floor(det.alignedRect._box._height)
    let w=floor(det.alignedRect._box._width)

    let max=""
    let currentEmotion="Hello Dave"
    let emotionIndex=2
    emotions.forEach((e,j)=>{
        if(det.expressions[e]>max){
            max=det.expressions[e]
            // currentEmotion=e
            currentEmotion=labels[j]
            emotionIndex=j
        }
    })
    let isFulfilled=(emotionIndex==3)
    rectMode(CORNER)
    fill(255,0,0,150)
    if(isFulfilled){
        fill(255)
    }
    noStroke()
    textSize(height*0.04)
    textFont('monospace')
    let tw=textWidth(currentEmotion)*1.25
    push()
    rect(x+w/2,y+h*1.05,tw,height*0.05,0,height*0.025,height*0.025,height*0.025)
    pop()
    fill(255,200)
    if(isFulfilled){
        fill(200,0,0)
    }
    noStroke()
    textAlign(LEFT,CENTER)
    text(currentEmotion,x+w*0.55,y+h*1.05+height*0.025)
    console.log(emotionIndex)
    if(random(15)<1){
        shapes.add(x+w*0.8, y+h*0.15,images[imageIndex[emotionIndex]])
    }
    // scrollers[index].setText(currentEmotion)
    // // scrollers[index].render()
    // textFont('monospace')
    // scrollers[index].show(x,y+h,1)
    // scrollers[index].run(0.5)

}

function FaceBuffer(n){
    let hist=[]
    let histMaxLen=n

    this.addSnap=function(source,det){
        let x=floor(det.alignedRect._box._x)
        let y=floor(det.alignedRect._box._y)
        let h=floor(det.alignedRect._box._height)
        let w=floor(det.alignedRect._box._width)
        img=createImage(w,h)
        img.copy(source, x, y, w, h, 0, 0, w, h)
        hist.push({img:img,w:w,h:h})
        if(hist.length>histMaxLen){
            hist.shift()
        }
    }

    this.getRandomSnap=function(){
        if(random(100)<5){
            faceBufferCurrentOffset=floor(random(faceBufferLen))
        }
        let index=floor(hist.length-1-faceBufferCurrentOffset)
        if(hist.length>0){
            return hist[index]
        } else {
            return null
        }
    }
}

function drawDetection(det){
    // console.log("drawRect")
    let x=det.alignedRect._box._x
    let y=det.alignedRect._box._y
    let h=det.alignedRect._box._height
    let w=det.alignedRect._box._width
    stroke(255,0,0)
    strokeWeight(1)
    noFill()
    rectMode(CENTER)
    let rel=(frameCount%30)/30
    let rel2=((frameCount+15)%30)/30
    rect(x+w/2,y+h/2,w,h)
    // noFill()
    // strokeWeight(10*(rel))
    // stroke(255,0,0,255*(1-rel))
    // rect(x+w/2,y+h/2,w*(1+rel),h*(1+rel),w*0.5*(1+rel), h*0.5*(1+rel))
    // strokeWeight(10*(rel2))
    // stroke(255,0,0,255*(1-rel2))
    // rect(x+w/2,y+h/2,w*(1+rel2),h*(1+rel2),w*0.5*(1+rel2), h*0.5*(1+rel2))
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
    let driftX=random(-0.1,2)
    let driftY=random(-0.2,-1.5)
    let accY=1.015
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