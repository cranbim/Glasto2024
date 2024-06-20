/*
  Reading distance from the laser based VL53L1X
  By: kaloha
  Waveshare Electronics
  VL53L1X Distance Sensor from Waveshare: https://www.waveshare.com/vl53l1x-distance-sensor.htm
  This example demonstrates how to read the distance in long mode(up to 4m).
*/

#include <Wire.h>
// #include "VL53L1X.h"
#include <Adafruit_NeoPixel.h>

#define LED_SEED_PIN 5//string of leds
#define LED_STEM_PIN 6//UV

// #define PIN_INTAKE 9
// #define PIN_OUTLET 10

// How many NeoPixels are attached to the Arduino?
#define LED_STEM_COUNT 50
#define LED_SEED_COUNT 32
#define MAX_BRI 250

// Declare our NeoPixel strip object:
// Adafruit_NeoPixel strip1(LED_SEED_COUNT,5, NEO_GRBW + NEO_KHZ800);
// Adafruit_NeoPixel strip0(LED_STEM_COUNT,6, NEO_GRBW + NEO_KHZ800);
Adafruit_NeoPixel strip0(LED_STEM_COUNT,6, NEO_GRB + NEO_KHZ800);
Adafruit_NeoPixel strip1(LED_STEM_COUNT,5, NEO_GRB + NEO_KHZ800);
Adafruit_NeoPixel strip2(LED_STEM_COUNT,4, NEO_GRB + NEO_KHZ800);
Adafruit_NeoPixel strip3(LED_STEM_COUNT,7, NEO_GRB + NEO_KHZ800);
Adafruit_NeoPixel strip4(LED_STEM_COUNT,8, NEO_GRB + NEO_KHZ800);

int currentChase=0;
int numChase=50;
int numLit=20;




int numRows=4;
int ledsPerRow=floor(144/6.5);



void chase0(){
  strip0.clear();   
  strip0.setPixelColor(currentChase,255);
  strip0.setPixelColor(currentChase+1,255);
  strip0.setPixelColor(currentChase+2,255);
  currentChase=(currentChase+1)%numChase;
  strip0.show();
  // delay(100);
}

void chase1(){
  strip1.clear();  
  for(int i=0; i<numLit; i++){
    strip1.setPixelColor(currentChase+i,255,255,255);
  }
  // strip1.setPixelColor(currentChase,255,255,255);
  // strip1.setPixelColor(currentChase+1,255,255,255);
  // strip1.setPixelColor(currentChase+2,255,255,255);
  // strip1.setPixelColor(currentChase+1,255);
  // strip1.setPixelColor(currentChase+2,255);
  // currentChase=(currentChase+1)%numChase;
  strip1.show();
  // delay(100);
}

void chase2(){
  strip2.clear();   
  for(int i=0; i<numLit; i++){
    strip2.setPixelColor(currentChase+i,255,255,255);
  }
  // strip2.setPixelColor(currentChase,255,255,0);
  // strip2.setPixelColor(currentChase+1,255,255,0);
  // strip2.setPixelColor(currentChase+2,255,255,0);
  // strip1.setPixelColor(currentChase+1,255);
  // strip1.setPixelColor(currentChase+2,255);
  // currentChase=(currentChase+1)%numChase;
  strip2.show();
  // delay(100);
}


void chase3(){
  strip3.clear();  
  for(int i=0; i<numLit; i++){
    strip3.setPixelColor(currentChase+i,255,255,255);
  } 
  // strip3.setPixelColor(currentChase,0,255,255);
  // strip3.setPixelColor(currentChase+1,0,255,255);
  // strip3.setPixelColor(currentChase+2,0,255,255);
  // strip1.setPixelColor(currentChase+1,255);
  // strip1.setPixelColor(currentChase+2,255);
  // currentChase=(currentChase+1)%numChase;
  strip3.show();
  // delay(100);
}

void chase4(){
  strip4.clear();   
  for(int i=0; i<numLit; i++){
    strip4.setPixelColor(currentChase+i,255,255,255);
  } 
  // strip4.setPixelColor(currentChase,255,0,255);
  // strip4.setPixelColor(currentChase+1,255,0,255);
  // strip4.setPixelColor(currentChase+2,255,0,255);
  // strip1.setPixelColor(currentChase+1,255);
  // strip1.setPixelColor(currentChase+2,255);
  // currentChase=(currentChase+1)%numChase;
  strip4.show();
  // delay(100);
}


/* heartSparkle */

float pulseA=0;
float pulseRot2=PI/240;
float pulseLevel1=0;
int numSparkles=12;

void heartSparkle(int strip){
  int np=strip0.numPixels();
  strip0.clear();
  pulseLevel1=(sin(pulseA)*0.5+0.5)*(float)numRows;
  pulseA+=pulseRot2;
  float rel=0;
  for(int j=0; j<numRows; j++){
    if(pulseLevel1>=j+1){
      rel=1;
    } else if(pulseLevel1>j){
      rel=fmod(pulseLevel1,1);
    } else {
      rel=0;
    }
    for(int i=0;i<ledsPerRow; i++){
      strip0.setPixelColor(j*ledsPerRow+i,0,0,0,floor(rel*150));
    }
  }
  for(int i=0; i<numSparkles; i++){
    int sp=floor(random(np));
    strip0.setPixelColor(sp,255,0,0,0);
  }
  strip0.show();
  delay(10);
}


// bool toggleIn=false;

void setup()
{
  Serial.begin(115200);
  strip0.begin();           // INITIALIZE NeoPixel strip object (REQUIRED)
  strip0.show();            // Turn OFF all pixels ASAP
  strip0.setBrightness(MAX_BRI); // Set BRIGHTNESS to about 1/5 (max = 255)
  strip1.begin();           // INITIALIZE NeoPixel strip object (REQUIRED)
  strip1.show();            // Turn OFF all pixels ASAP
  strip1.setBrightness(MAX_BRI); /// strip1.begin();           // INITIALIZE NeoPixel strip object (REQUIRED)
  strip2.begin();   
  strip2.show();        
  strip2.setBrightness(MAX_BRI);
  strip3.begin();   
  strip3.show();        
  strip3.setBrightness(MAX_BRI);
  strip4.begin();   
  strip4.show();        
  strip4.setBrightness(MAX_BRI);
  // strip1.setBrightness(MAX_BRI); //
}


//
void loop(){
  // greenBreath0();
  // greenBreath1();
  // heartSparkle(0);
  // chase0();
  chase1();
  chase2();
  chase3();
  chase4();
  currentChase=(currentChase+1)%numChase;
  
  delay(10);  
}
