//images should be ??? x???
let sourceImgs=[]
// let mp
let bodyParts=[]
let dw,dh
let bidders=[]
let partLabels=["ideas","health","desires","work","play","passions","travel","fitness"]
let gBuff
let font0,font1

let sourceImageLabels=[
  {root: "head", type: "png"},
  {root: "body", type: "png"},
  {root: "heart", type: "png"},
  {root: "limbs", type: "png"},
  {root: "limbs", type: "png"},
  {root: "groin", type: "png"},
  {root: "limbs", type: "png"},
  {root: "limbs", type: "png"},
  
]

function preload(){
  for(let j=0; j<8; j++){
    sourceImgs[j]=[]
    for(let i=0; i<10; i++){
      sourceImgs[j][i]=loadImage("images/"+sourceImageLabels[j].root+
                                 nf(i,2,0)+"."+
                                 sourceImageLabels[j].type)
    }
  }
  font1=loadFont("data-latin.ttf")
  font0=loadFont("POSTOFFICE.ttf")
}

function setup() {
  console.log(sourceImgs)
  createCanvas(windowWidth, windowWidth*9/16);
  gBuff=createGraphics(width, height);
  dh=height;
  dw=dh/2;
  // mp=new MaskPart(200,400,bodyPartRenderers["renderHead"]);
  // mp.setImage(sourceImgs[0]);
  let bps=Object.keys(bodyPartRenderers)
  console.log(bps)
  bps.forEach(function(bp,j){
    let bodyPart=new MaskPart(j,dw, dh,bodyPartRenderers[bp]);
    // gBuff.stroke(0,255,255)
    // gBuff.strokeWeight(5)
    // gBuff.noFill();
    // bodyPartRenderers[bp](gBuff,width/2-dw/2,0,dw,dh,dh*0.25)
    bodyPart.setImage(sourceImgs[j][0]);
    bodyParts.push(bodyPart);
  })
  let vStep=height/(4+2)
  for(let i=0; i<8; i++){
    bidders.push(new Bidder(width*(i<4?0.05:0.7),height*0.05+(i%4)*vStep,width*0.25,vStep*0.9,partLabels[i],bodyPartRenderers[bps[i]]))
  }
  // bidder=new Bidder(width*0.5,height*0.1,width*0.2,height*0.15,"HEAD")
}

function draw() {
  background(0);
  fill(255)//(130+125*sin(frameCount*0.08));
  noStroke()
  textFont(font0)
  textAlign(CENTER, CENTER)
  textSize(height*0.1)
  text("   Meat        Market",width/2, height*0.8)
  // mp.show(0,0,width/2, height)
  bodyParts.forEach(function(bp){
    bp.show(width/2-dw/2,0,dw,dh)
    bp.run()
  })
  bidders.forEach(function(bidder){
    bidder.show()
    bidder.run()
  })
  image(gBuff.get(),0,0)
}

function mousePressed(){
  // mp.setImage(random(sourceImgs));
  bodyParts.forEach(function(bp,j){
    bp.setImage(random(sourceImgs[j]));
  })
}

function Bidder(x,y,w,h,part,renderer){
  const titles={
    bid:"Bidding open",
    win:"Winning bid",
    non:"No bid"
  }
  const bidders=[
    "Loca Lola",
    "Azonom",
    "Outer urfbiters",
    "Drewbog",
    "Dotiros",
    "Hilliam Will",
    "Bef Tred",
    "Snimrof",
    "Strongwob",
    "666",
    "While tawc",
    "Bras Stuck",
    "legoog",
    "Fexnilt",
    "Lolhister"
  ]
  const range=[100,100000]
  let isChanging=false;
  let titleNow="Waiting for bids"
  let bidderNow="..."
  let valueNow=0
  let state=2
  
  this.run=function(){
    if(isChanging){
      state=0
      if(random(100)<1){
        isChanging=false;
        if(random(10)<2){
        titleNow=titles.non
          state=1
        bidderNow=""
        valueNow=0
      } else {
        state=2
        titleNow=titles.win
      }
      }
    } else {
      if(random(250)<1){
        isChanging=true;
      }
    }
    if(isChanging){
      titleNow=titles.bid
      if(random(10)<1){
        bidderNow=random(bidders)
      }
      if(true){
        valueNow=floor(random(range[1]))+range[0]
      }
    } else {
      
    }
  }
  
  this.show=function(){
    push()
    translate(x,y)
    rectMode(CORNER)
    gBuff.noFill()
    gBuff.strokeWeight(dh*0.005)
    if(state==0){
      fill(255)
      gBuff.stroke(255)
    } else if(state==2){
      fill(150,255,150)
      gBuff.stroke(150,255,150)
    } else if(state==1){
      fill(255,150,150)
      gBuff.stroke(255,150,150)
    }
    renderer(gBuff,width/2-dw/2,0,dw,dh,dh*0.25)
    stroke(0)
    strokeWeight(h*0.05)
    rect(0,0,w,h,h*0.1)
    fill(0)
    noStroke()
    textFont(font1)
    textAlign(LEFT,TOP)
    textSize(h*0.2)
    text(part,w*0.1,h*0.08)
    textSize(h*0.2)
    text(titleNow,w*0.1,h*0.25)
    textSize(h*0.2)
    text(bidderNow,w*0.1,h*0.45)
    textSize(h*0.25)
    text(nf(valueNow/1000,3,3),w*0.1,h*0.65)
    pop()
  }
  
}

function MaskPart(id,w,h,renderer){
  let img;
  let maskerG=createGraphics(w,h)
  maskerG.fill(255,255)
  maskerG.noStroke()
  renderer(maskerG,0,0,w,h,h*0.25)
  // maskerG.ellipse(w/2,h/2,h*0.9)
  let masker=maskerG.get();
  let masked=createImage(w,h);
  let isChanging=true;
  
  this.run=function(){
    if(isChanging){
      if(random(100)<1){
        isChanging=false;
      }
    } else {
      if(random(100)<5){
        isChanging=true;
      }
    }
    if(isChanging){
      if(random(10)<1){
        this.setImage(random(sourceImgs[id]))
      }
    }
  }
  
  this.setImage=function(newImg){
    img=newImg;
    // let masked=createImage(w,h)
    // console.log(img.width, img.height, w,h)
    masked.copy(img,0,0,img.width,img.height,0,0,h,h)
    masked.mask(masker)
    // console.log(masked)
  }
  
  this.show=function(x,y,w,h){
    image(masked,x,y)
  }
}

const bodyPartRenderers={
  renderHead: function (g,x,y,w,h,s){
    // g.stroke(0)
    // g.noFill()
    g.ellipse(x+w/2, y+h*0.1,h*0.15,h*0.18)
  },
  renderTorso: function (g,x,y,w,h,s){
    // g.stroke(0)
    // g.noFill()
    g.rect(x+w/2-s/2+s*0.05, y+h*0.2, s*0.9, h*0.3,s*0.3,s*0.3,s*0.1,s*0.1)
  },
  renderHeart: function (g,x,y,w,h,s){
    // g.stroke(0)
    // g.noFill()
    g.rect(x+w/2-s/2+s*0.15, y+h*0.275, s*0.4, s*0.4,s*0.1,s*0.1,s*0.1,s*0.1)
  },
  renderArmL: function renderArmL(g,x,y,w,h,s){
    // g.stroke(0)
    // g.noFill()
    g.rect(x+w/2-s/2-s*0.2, y+h*0.25, s*0.2, h*0.4,s*0.1)
  },
  renderArmR: function renderArmR(g,x,y,w,h,s){
    // g.stroke(0)
    // g.noFill()
    g.rect(x+w/2+s/2, y+h*0.25, s*0.2, h*0.4,s*0.1)
  }, 
  renderGroin: function (g,x,y,w,h,s){
    // g.stroke(0)
    // g.noFill()
    g.quad(x+w/2-s*0.35,y+h*0.51, x+w/2+s*0.35,y+h*0.51, 
         x+w/2+s*0.1,y+h*0.59, x+w/2-s*0.1,y+h*0.59)
  },
  renderLegL: function (g,x,y,w,h,s){
    // g.stroke(0)
    // g.noFill()
    g.rect(x+w/2-s*0.45, y+h*0.55, s*0.25, h*0.425,s*0.1,s*0.2,s*0.1,s*0.1)
  },
  renderLegR: function (g,x,y,w,h,s){
    // g.stroke(0)
    // g.noFill()
    g.rect(x+w/2+s*0.45-s*0.25, y+h*0.55, s*0.25, h*0.425,s*0.2,s*0.1,s*0.1,s*0.1)
  }
}