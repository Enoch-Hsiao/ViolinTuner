# ViolinTuner
Violin Scales Tuner Web Application  
https://enoch-hsiao.github.io/ViolinTuner/

## Functionality

* Provides violin tuning.
* Changes background color of gauge from red to green to indicate that the pitch is in tune (with a tolerance of 15 cents).
* Displays deviations between -30 and 30 cents.
* Translates frequency played to music treble staff notation
* Test/Activity that tests accuracy of various two octave major scales with optional playblack and downloadable recording
* Works on all devices except IOS (p5.js audioIn() does not work for IOS devices yet)

## Libraries Used

* The p5.js library is used for the UI/graphics (https://p5js.org/).
* The ml5.js library is used for pitch detection (https://ml5js.org/reference/api-PitchDetection/).

## Screenshot

<img src="https://i.imgur.com/O5yNrsD.png" width="100%" border="0">
