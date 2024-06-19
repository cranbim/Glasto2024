// let message="I have no idea how long this message is, but we will need to split it to fit the intended length./nLet's see how it does"
let message="This product was created with your wellness in mind by ten year olds in bonded labour factories. Apply liberally to attain eternal youth./nTomorrow you will meet a tall dark handsome stranger. They will turn out to be a serial killer. Do not approach under any circumstances./nHave a good day! Your custom is important to us, please call again."
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