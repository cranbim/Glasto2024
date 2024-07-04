/*
Add SD card stuff
logging
set time and date for log?

meta loop for LED animations

Make a js utility to split and create strings arrays (with variable numbers?)

How to add texts
edit fulfillments.txt

1. add a new variable with the name messageAn where n is the next in the sequence
char messageA0[][messageMaxLength] = // 10 is the length of the longest string + 1 ( for the '\0' at the end )
{//00000000001111111111222222222233
	"Thank you for your purchase.", 
 //...
  "Enjoy the rest of your day and", 
  "please call again."
};

2. edit the number of fulfillments
int numberFulfilments=3;

in the main ino file, add another branch to the if statement, in void printFulfilment(){}
editing the index number, and the messageAn reference
 } else if(messageIndex==2){
    int messageLen=sizeof(messageA2)/messageMaxLength;
    for(int i=0; i<messageLen; i++){
      printer.println(messageA2[i]);
    }
  }


*/