
// M5Stack Core2 build for Glastonbury 2024 Fulfilment centre
// Adafruit thermal printer prints a fulfilment message when button is pushed
// indicator LED used for status
// may also be used to control string of Neopixel lights in some sequence
// Core2 must have Expansion board attached
// Port C is used for printer (hardware serial GPIO 13,14)
// Port D used for button (Expansion dipts set for D1=22, D2=21)
// Port E used for LED's (Expansion dips set for E1=27, E2=19)
// SD Card is also used
#include <M5Core2.h>
#include "Adafruit_Thermal.h"

#include <Adafruit_NeoPixel.h>


// Button connected to port D, GND and D2
#define BUTTON1 21
bool button1LiveState=0;
bool button1PrevState=0;

// LED's using port E, E1=27, E2=19
#define STATE_LED 22  // The ESP32 pin GPIO16 connected to NeoPixel
#define NUM_STATE_PIXELS 1     // The number of LEDs (pixels) on NeoPixel LED strip
#define MAX_BRI 255
// note order is GRB, not RGB
Adafruit_NeoPixel printStateLED(NUM_STATE_PIXELS, STATE_LED, NEO_GRB + NEO_KHZ800);


// printer stuff
int currentFulfilment=0;
#include "fulfilments.h"
// int numberFulfilments=2;
int fulfilmentsThisSession=0;
#include "Adafruit_Thermal.h"
#include "fclogo01.h" //this is the bitmap logo file
#define TX_PIN 14 // Arduino transmit  YELLOW WIRE  labeled RX on printer
#define RX_PIN 13//5 // Arduino receive   GREEN WIRE   labeled TX on printer
HardwareSerial mySerial(2);
Adafruit_Thermal printer(&mySerial);     // Pass addr to printer constructor
// #define messageMaxLength 32
int printState=0;

int timeOnAmber=7000;

//Test messages
// char messageA0[][messageMaxLength] = // 10 is the length of the longest string + 1 ( for the '\0' at the end )
// {
// 	"You will be fully fulfilled,",
// 	"like the fully filled in your",
// 	"life. You will wonder what you",
//   "were feeling before when you",
//   "thought you were full. man that",
//   "was nothing. You were empty.",
//   "FULLY FILL your life with a",
//   "fulfilment from the",
//   "Fulmilment Centre"
// };

// char messageA1[][messageMaxLength] = // 10 is the length of the longest string + 1 ( for the '\0' at the end )
// {//00000000001111111111222222222233
// 	"So you come to us with your",
//   "needs. We get you. We",
//   "understand. You want to feel",
//   "fulfilled, you came to the",
//   "right place."
// };

void printFulfilment(int messageIndex){
  M5.Lcd.print("Printing message: ");
  M5.Lcd.println(messageIndex);
  printer.printBitmap(fclogo01_width, fclogo01_height, fclogo01_data);
  printer.justify('C');
  printer.setSize('M');
  printer.println("Welcome to the");
  printer.println(F("Fulfilment Centre"));
  printer.feed(1);
  printer.setSize('S');
  printer.println(F("For your most optimised self"));
  printer.println(F("You are worth it!"));
  printer.feed(2);
  if(messageIndex==0){
    int messageLen=sizeof(messageA0)/messageMaxLength;
    for(int i=0; i<messageLen; i++){
      printer.println(messageA0[i]);
    }
  } else if(messageIndex==1){
    int messageLen=sizeof(messageA1)/messageMaxLength;
    for(int i=0; i<messageLen; i++){
      printer.println(messageA1[i]);
    }
  } else if(messageIndex==2){
    int messageLen=sizeof(messageA2)/messageMaxLength;
    for(int i=0; i<messageLen; i++){
      printer.println(messageA2[i]);
    }
  }
  // printer.printBitmap(FCSmile01_width, FCSmile01_height, FCSmile01_data);
  printer.feed(1);
  printer.justify('C');
  printer.setSize('M');
  printer.println(F("YOU ARE FULFILLED!"));
  printer.feed(2);
  printer.justify('C');
  printer.setSize('M');
  // printer.println(F("Fulfilment Centre at"));
  printer.println(F("Glastonbury Festival 2024"));
  printer.println(F("Shangri-La"));  
  // printer.feed(1);
}

//fileLogging functions
void appendFile(fs::FS &fs, const char * path, const char * message, int fNumber){
    Serial.printf("Appending to file: %s\n", path);

    File file = fs.open(path, FILE_APPEND);
    if(!file){
        Serial.println("Failed to open file for appending");
        return;
    }
    // if(file.print(message)){
    //     Serial.println("Message appended");
    // } else {
    //     Serial.println("Append failed");
    // }
    unsigned long currentMillis = millis();
    unsigned long seconds = currentMillis / 1000;
    unsigned long minutes = seconds / 60;
    unsigned long hours = minutes / 60;
    unsigned long days = hours / 24;
    currentMillis %= 1000;
    seconds %= 60;
    minutes %= 60;
    hours %= 24;
    file.print(days);
    file.print(":");
    file.print(hours);
    file.print(":");
    file.print(minutes);
    file.print(":");
    file.print(seconds);
    file.print(" ");
    file.print(message);
    file.print(" ");
    file.print(fNumber);
    file.print("\n");
    file.close();
}

void logFulmilment(int fNumber){
  appendFile(SD, "/fulfilments.txt", "fulfilled", fNumber);
}

// print functions
void triggerFulfilment(){
  printState=1;
  printer.wake();
  printer.feed(1);
  printFulfilment(currentFulfilment);
  printer.feed(3);
  delay(1000);  
  currentFulfilment=(currentFulfilment + 1) % numberFulfilments;
  fulfilmentsThisSession++;
  printState=0;
  updateDisplay();
  logFulmilment(currentFulfilment);
  printer.sleep();
}


void updateDisplay(){
  m5.Lcd.clear();
  M5.Lcd.setTextSize(2);
  M5.Lcd.setCursor(2,2);
  M5.Lcd.println("Fulfilment printer");
  M5.Lcd.println("@Glasto 2024");
  M5.Lcd.print("fulfilments this session: ");
  M5.Lcd.println(fulfilmentsThisSession);
}

void setup() {
  M5.begin();
  // Serial.begin();
  updateDisplay();
  // M5.Lcd.setTextSize(2);
  // M5.Lcd.setCursor(2,2);
  // M5.Lcd.println("Fulfilment printer");
  //button setup
  pinMode(BUTTON1, INPUT);
  //LED setup
  pinMode(STATE_LED, OUTPUT);
  printStateLED.begin();  // initialize NeoPixel strip object (REQUIRED)
  printStateLED.setBrightness(MAX_BRI);
  printStateLED.clear();
  printStateLED.show();  
  showStatusLED(100,255,0,0);
 

  //initialise printer
  mySerial.begin(9600, SERIAL_8N1, 13, 14);
  printer.begin();        // Init printer (same regardless of serial type)
  printer.setDefault();
  printer.feed(2);
  printer.sleep();      // Tell printer to sleep
  delay(3000L);         // Sleep for 3 seconds
  printer.wake();       // MUST wake() before printing again, even if reset
  printer.setDefault(); // Restore printer to defaults
  button1PrevState=0;
  showStatusLED(255,0,0,0);
}

void loop() {
  M5.update();
  button1LiveState = digitalRead(BUTTON1);
  // M5.Lcd.println(button1LiveState);
  if(button1LiveState != button1PrevState){ //Button released after press
    printState=button1LiveState;
    if(button1LiveState == 1){
      showStatusLED(0,255,0,0);
      
      triggerFulfilment();
      // updateDisplay();
      showStatusLED(50,255,0,0);
      delay(timeOnAmber);
      showStatusLED(255,0,0,0);
    }
  }
  // if(printState==0){
  //   printStateLED.setPixelColor(0, printStateLED.Color(255,0,0));//green
  // } else if(printState==1){
  //   printStateLED.setPixelColor(0, printStateLED.Color(50,255,0));//red
  // }
  // printStateLED.show();  // set all pixel colors to 'off'. It only takes effect if pixels.show() is called

  button1PrevState=button1LiveState;
  
}

void showStatusLED(int r, int g, int b, int w){
  printStateLED.setPixelColor(0, printStateLED.Color(r,g,b));
  printStateLED.show(); 
}
