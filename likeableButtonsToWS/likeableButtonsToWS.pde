import processing.serial.*;

Serial myPort;
String val;


ArrayList<Button> buttons;
int numButtons=3;
String NOBUTTON="0";
String[] LIKEBUTTONS = {"1", "2", "3"};


//change this to match the serial port from the list in the console
int serialIndex=3;//3



void setup(){
  //fullScreen();
  size(600,600);
  println(Serial.list());
  String portName = Serial.list()[serialIndex];//[3]; //change the 0 to a 1 or 2 etc. to match your port
  myPort = new Serial(this, portName, 115200);
  buttons = new ArrayList<Button>();
  for(int i=0; i<numButtons; i++){
    buttons.add(new Button((i+0.5)*width/3, height/2, width/6));
  }
}

void draw(){
  background(20);
  if ( myPort.available() > 0) 
  {
    String inBuffer = myPort.readString();  
    String modString="";
    if(inBuffer!=null && inBuffer.length()>=1){
      modString=inBuffer.substring(0,1);
    }
    //println(modString);
    if (!modString.equals("")) {
      for(int i=0; i<numButtons; i++){
        if(modString.equals(LIKEBUTTONS[0])){
          println(LIKEBUTTONS[0])
        } else if(modString.equals(LIKEBUTTONS[1])){
          println(LIKEBUTTONS[1])
        } else if(modString.equals(LIKEBUTTONS[2])){
          println(LIKEBUTTONS[2])
        }
      }
    }
    fill(255);
    text(modString,20,20);
  }
}





class Button{
 float x, y, s;
 float active=0;
 boolean hover=false;
 
 Button(float x_, float y_, float s_){
   x=x_;
   y=y_;
   s=s_;
 }
 
 void press(){
   active=1;
 }
 
 void run(){
   hover=dist(mouseX, mouseY, x, y)<s/2;
   if(active>0){
     active-=0.01;
   }
 }
 
 void show(){
   stroke(255);
   strokeWeight(1);
   fill(100+155*active,0,0);
   if(hover){
     strokeWeight(5);
   }
   
   ellipse(x,y,s,s);
 }
  
}
