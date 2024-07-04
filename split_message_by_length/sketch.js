// let message="I have no idea how long this message is, but we will need to split it to fit the intended length./nLet's see how it does"
let message="Listen to yourself about your body. Don’t be “influenced” by people who don’t know your body, don’t know your medical history, don’t know who you are and what you need. Do listen to doctors, obviously. They know what riboflavin is!"
let messages=message.split("/n")
console.log(messages)
messages.forEach(function(m,i){
  splitByLength(m, 32, i<messages.length-1)
})
// 

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}

function splitByLength(message,len,isNotLast){
  let words=message.split(" ")
  // console.log(words)
  let lines=[]
  let line=""
  while(words.length>0){
    if((line.length+1+words[0].length)<len){
      line=line+(line.length==0?"":" ")+words.shift()
      // console.log(line)
    } else {
      lines.push(`${line}`)
      console.log(`"${line}",`)
      
      line=""
    }
  }
  lines.push(`${line}`)
  console.log(`"${line}",`)
  if(isNotLast){
    console.log(`"-*-",`)
  }
  return lines
}