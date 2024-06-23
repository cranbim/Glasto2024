let capture
let canvas
let gotMarks=false
let displaySize
let resizedDetections
const emotions=["angry","disgusted","fearful","happy","neutral","sad","surprised"]


function preload(){
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
            resizedDetections.forEach(rd=>{
                drawDetection(rd)
                labelEmotion(rd)
            })
        }
    }
}

function labelEmotion(det){
    let x=det.alignedRect._box._x
    let y=det.alignedRect._box._y
    let h=det.alignedRect._box._height
    let max=""
    let currentEmotion="Hello Dave"
    emotions.forEach(e=>{
        if(det.expressions[e]>max){
            max=det.expressions[e]
            currentEmotion=e
        }
    })
    fill(255,0,150)
    noStroke()
    textSize(20)
    textAlign(LEFT,TOP)
    text(currentEmotion,x,y+h)
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