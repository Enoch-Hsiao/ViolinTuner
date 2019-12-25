# ViolinTuner
Violin Scales Tuner Web Application  
https://musicmaster-code.github.io/ViolinTuner/

## Functionality

* Provides violin tuning.
* Changes background color of gauge from red to green to indicate that the pitch is in tune (with a tolerance of 10 cents).
* Displays deviations between -40 and 40 cents.
* Translates frequency played to music staff notation
* Test/Activity that tests accuracy of various one octave scales with optional playblack and downloadable recording
* Works on all devices except IOS (p5.js audioIn() does not work for IOS devices yet)

## Libraries

* The p5.js library is used for the UI/graphics (https://p5js.org/).
* The ml5.js library is used for pitch detection (https://ml5js.org/reference/api-PitchDetection/).

## Screenshot

<img src="https://i.ibb.co/T81rrDX/WebApp.png" width="100%" border="0">
