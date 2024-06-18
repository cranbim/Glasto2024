import websockets.*;

WebsocketClient wsc;

int now;
boolean newEllipse;
ArrayList<Button> buttons;
int numButtons=3;

void setup(){
  size(600,200);
  
  buttons = new ArrayList<Button>();
  for(int i=0; i<numButtons; i++){
    buttons.add(new Button((i+0.5)*width/3, height/2, width/6));
  }
  
  
  //Here I initiate the websocket connection by connecting to "ws://localhost:8025/john", which is the uri of the server.
  //this refers to the Processing sketch it self (you should always write "this").
  wsc= new WebsocketClient(this, "ws://localhost:8011");
  now=millis();
}

void draw(){
    //Here I draw a new ellipse if newEllipse is true
  for(Button b:buttons){
    b.run();
    b.show();
  }
    
    //Every 5 seconds I send a message to the server through the sendMessage method
  //if(millis()>now+5000){
  //  //wsc.sendMessage("Client message");
  //  now=millis();
  //}
}

void mousePressed(){
  int i=0;
  for(Button b:buttons){
    if(b.press()){
      wsc.sendMessage(str(i+1));
    }
    i++;
  }
}

//This is an event like onMouseClicked. If you chose to use it, it will be executed whenever the server sends a message 
void webSocketEvent(String msg){
 println(msg);
 newEllipse=true;
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
 
 boolean press(){
   if(hover){
     active=1;
   }
   return hover;
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
