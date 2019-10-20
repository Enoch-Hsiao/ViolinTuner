let model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';
let pitch;
let audioContext;
let mic;
let freq = 0;
let imgClef;
let imgCheckMark;
let success = 0;
let img8va;
let startStop;
let activityStarted = 0;
let goingUp = true;
let count = 0;
let cMajorScale = [261.63, 292.66, 329.63, 349.32, 392.00, 440.00, 493.88, 523.25, 493.88, 440.00, 392.00, 349.23, 329.63, 293.66, 261.63]
let violinPitches = [note = {
    noteName: "G",
    octave: 3,
    sharp: false,
    frequency: 196.00
  },
  note = {
    noteName: "G",
    octave: 3,
    sharp: true,
    frequency: 207.65
  },
  note = {
    noteName: "A",
    octave: 3,
    sharp: false,
    frequency: 220.00
  },
  note = {
    noteName: "A",
    octave: 3,
    sharp: true,
    frequency: 233.08
  },
  note = {
    noteName: "B",
    octave: 3,
    sharp: false,
    frequency: 246.94
  },
  note = {
    noteName: "C",
    octave: 4,
    sharp: false,
    frequency: 261.63
  },
  note = {
    noteName: "C",
    octave: 4,
    sharp: true,
    frequency: 277.18
  },
  note = { //7
    noteName: "D",
    octave: 4,
    sharp: false,
    frequency: 293.66
  },
  note = {
    noteName: "D",
    octave: 4,
    sharp: true,
    frequency: 311.13
  },
  note = {
    noteName: "E",
    octave: 4,
    sharp: false,
    frequency: 329.63
  },
  note = {
    noteName: "F",
    octave: 4,
    sharp: false,
    frequency: 349.23
  },
  note = {
    noteName: "F",
    octave: 4,
    sharp: true,
    frequency: 369.99
  },
  note = {
    noteName: "G",
    octave: 4,
    sharp: false,
    frequency: 392.00
  },
  note = {
    noteName: "G",
    octave: 4,
    sharp: true,
    frequency: 415.30
  },
  note = {
    noteName: "A",
    octave: 4,
    sharp: false,
    frequency: 440.00
  },
  note = {
    noteName: "A",
    octave: 4,
    sharp: true,
    frequency: 466.16
  },
  note = {
    noteName: "B",
    octave: 4,
    sharp: false,
    frequency: 493.88
  },
  note = {
    noteName: "C",
    octave: 5,
    sharp: false,
    frequency: 523.25
  },
  note = {
    noteName: "C",
    octave: 5,
    sharp: true,
    frequency: 554.37
  },
  note = {
    noteName: "D",
    octave: 5,
    sharp: false,
    frequency: 587.33
  },
  note = {
    noteName: "D",
    octave: 5,
    sharp: true,
    frequency: 622.25
  },
  note = {
    noteName: "E",
    octave: 5,
    sharp: false,
    frequency: 659.26
  },
  note = {
    noteName: "F",
    octave: 5,
    sharp: false,
    frequency: 698.46
  },
  note = {
    noteName: "F",
    octave: 5,
    sharp: true,
    frequency: 739.99
  },
  note = {
    noteName: "G",
    octave: 5,
    sharp: false,
    frequency: 783.99
  },
  note = {
    noteName: "G",
    octave: 5,
    sharp: true,
    frequency: 830.61
  },
  note = {
    noteName: "A",
    octave: 5,
    sharp: false,
    frequency: 880.00
  },
  note = {
    noteName: "A",
    octave: 5,
    sharp: true,
    frequency: 932.33
  },
  note = {
    noteName: "B",
    octave: 5,
    sharp: false,
    frequency: 987.77
  },
  note = {
    noteName: "C",
    octave: 6,
    sharp: false,
    frequency: 1046.5
  },
  note = {
    noteName: "C",
    octave: 6,
    sharp: true,
    frequency: 1108.7
  },
  note = {
    noteName: "D",
    octave: 6,
    sharp: true,
    frequency: 1174.7
  },
  note = {
    noteName: "D",
    octave: 6,
    sharp: true,
    frequency: 1244.5
  },
  note = {
    noteName: "E",
    octave: 6,
    sharp: false,
    frequency: 1318.5
  },
  note = {
    noteName: "F",
    octave: 6,
    sharp: false,
    frequency: 1396.9
  },
  note = {
    noteName: "F",
    octave: 6,
    sharp: true,
    frequency: 1480.0
  },
  note = {
    noteName: "G",
    octave: 6,
    sharp: false,
    frequency: 1568.0
  },
  note = {
    noteName: "G",
    octave: 6,
    sharp: true,
    frequency: 1661.2
  },
  note = {
    noteName: "A",
    octave: 6,
    sharp: false,
    frequency: 1760.0
  },
  note = {
    noteName: "A",
    octave: 6,
    sharp: true,
    frequency: 1864.7
  },
  note = {
    noteName: "B",
    octave: 6,
    sharp: false,
    frequency: 1975.5
  },
  note = {
    noteName: "C",
    octave: 7,
    sharp: false,
    frequency: 2093.0
  }
];
let x, i, j, selElmnt, a, b, c; //dropdown menu
x = document.getElementsByClassName("custom-select");
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < selElmnt.length; j++) {
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
      let y, i, k, s, h;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      h = this.parentNode.previousSibling;
      for (i = 0; i < s.length; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName("same-as-selected");
          for (k = 0; k < y.length; k++) {
            y[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  let x, y, i, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

document.addEventListener("click", closeAllSelect);

function setup() {
  createCanvas(400, 950);
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(listening);
  imgClef = loadImage('Treble Clef.png');
  imgCheckMark = loadImage('Checkmark.png');
  imgSharp = loadImage('Sharp.png');
  img8va = loadImage('8va.PNG');
  recorder = new p5.SoundRecorder();
  recorder.setInput(mic);
  soundFile = new p5.SoundFile();
  let myDiv = createDiv('');
  myDiv.position(50, 50);
  userStartAudio().then(function() {
    myDiv.remove();
  });
}

function listening() {
  pitch = ml5.pitchDetection(model_url, audioContext, mic.stream, modelLoaded);
}

function gotPitch(error, frequency) {
  if (error) {
    console.error(error);
  } else {
    if (frequency) {
      freq = frequency;
    }
  }
  pitch.getPitch(gotPitch);
}

function modelLoaded() {
  pitch.getPitch(gotPitch);
}

function startStopChanger() {
  if (startStop != null) {
    stop();
  } else {
    activityStarted = 1;
  }
  change();
}

function change() {
  let elem = document.getElementById("startButton");
  if (elem.value == "Start Activity") {
    count = 0;
    elem.value = "End Activity";
  } else {
    elem.value = "Start Activity";
    recorder.stop();
    if(document.getElementById("download").checked) {
      saveSound(soundFile, 'recording.wav');
    }
    activityStarted = 0;
    count = 0;
    if(document.getElementById("playback").checked) {
    soundFile.play();
  }
  }
}

function stop() {
  clearTimeout(startStopChanger);
  startStop = null;
}

function draw() {
  background(255);
  textAlign(CENTER, CENTER);
  let i = 0;
  for (i; i < violinPitches.length - 1; i++) { //find closest note
    if (Math.abs(violinPitches[i].frequency - freq) < Math.abs(violinPitches[i + 1].frequency - freq)) {
      break;
    }
  }
  if (Math.abs(1200 * Math.log(violinPitches[i].frequency / freq) / Math.log(2)) < 15) {
    fill(51, 255, 51);
  } else {
    fill(255, 153, 153);
  }
  arc(200, 850, 394, 400, PI, 0, OPEN);
  line(3, 850, 397, 850); //tick marks
  line(20, 770, 50, 782.75);
  line(90, 685, 110, 714);
  line(290, 714, 310, 685);
  line(350, 782.75, 380, 770);
  strokeWeight(4);
  fill(0);
  textSize(25);
  if (violinPitches[i].sharp == true) {
    text(violinPitches[i].noteName + "#" + violinPitches[i].octave, width / 2, height * 0.725);
  } else {
    text(violinPitches[i].noteName + violinPitches[i].octave, width / 2, height * 0.725);
  }
  if (violinPitches[i + 1].sharp == true) {
    text(violinPitches[i + 1].noteName + "#" + violinPitches[i + 1].octave, width / 1.15, height * 0.85);
  } else {
    text(violinPitches[i + 1].noteName + violinPitches[i + 1].octave, width / 1.15, height * 0.85);
  }
  if (i > 0 && violinPitches[i - 1].sharp == true) {
    text(violinPitches[i - 1].noteName + "#" + violinPitches[i - 1].octave, width / 8, height * 0.85);
  } else if (i > 0) {
    text(violinPitches[i - 1].noteName + violinPitches[i - 1].octave, width / 8, height * 0.85);
  }
  let difference = Math.abs(1200 * Math.log(violinPitches[i].frequency / freq) / Math.log(2)); //cents
  if (violinPitches[i].frequency - freq > 0) { //left side of speedometer
    if (difference > 30) {
      line(25, 815, 200, 850);
    } else if (difference > 25) {
      line(20, 770, 200, 850);
    } else if (difference > 20) {
      line(55, 735, 200, 850);
    } else if (difference > 15) {
      line(90, 685, 200, 850);
    } else if (difference > 7.5) {
      line(140, 685, 200, 850);
    } else {
      line(200, 685, 200, 850);
    }
  } else { //right side of speedometer
    if (difference > 30) {
      line(200, 850, 375, 815);
    } else if (difference > 25) {
      line(200, 850, 380, 770);
    } else if (difference > 20) {
      line(200, 850, 325, 735);
    } else if (difference > 15) {
      line(200, 850, 310, 685);
    } else if (difference > 7.5) {
      line(200, 850, 260, 685);
    } else {
      line(200, 850, 200, 685);
    }
  }
  fill(0);
  textSize(40);
  text(freq.toFixed(0) + " Hz", width / 2, height * 0.85);
  fill(0);
  rect(0, 275, 400, 5); 
  rect(0, 325, 400, 5);
  rect(0, 375, 400, 5);
  rect(0, 425, 400, 5);
  rect(0, 475, 400, 5);
  noTint();
  image(imgClef, -40, height / 6, imgClef.width / 1.63, imgClef.height / 1.63);

  if (activityStarted == 1) { //started test
    if(document.getElementById("playback").checked){
    recorder.record(soundFile); //start recording
    }
    let e = document.getElementById("scales");
    let value = Number(e.options[e.selectedIndex].value);
    if (value == 5) {
      if (count != 0 && count % 7 == 0) {
        goingUp = false;
      }
      if (count == cMajorScale.length) {
        stop();
        change();
        goingUp = true;
        count = 0;
      }
      if (goingUp) {
        if (cMajorScale[count] < 290.00) {
          ellipse(285, 525, 75, 50);
          rect(225, 525, 125, 5);
        } else {
          ellipse(285, 525 - (count * 25), 75, 50);
        }
        let diff = Math.abs(1200 * Math.log(cMajorScale[count] / freq) / Math.log(2));
        if (diff < 5) {
          success = 1;
          count++;
        }
      } else {
        if (cMajorScale[count] < 290.00) {
          ellipse(285, 525, 75, 50);
          rect(225, 525, 125, 5);
        } else {
          ellipse(285, 350 + ((count % 7) * 25), 75, 50);
        }
      }
      let diff = Math.abs(1200 * Math.log(cMajorScale[count] / freq) / Math.log(2));
      if (diff < 5) {
        success = 1;
        count++;
      }
    }
    if (success > 0 && success < 16) { //checkmark fade out animation
      tint(255, 255 - (17 * success));
      image(imgCheckMark, -20, height / 4, imgCheckMark.width / 2, imgCheckMark.height / 2);
      success++;
      if (success == 15) {
        success = 0;
      }
    }
  } else { //general tuning
    for (let i = 0; i < violinPitches.length; i++) {
      let diff = freq - violinPitches[i].frequency;
      let count = i;
      if (diff < 10 && diff > -10) {
        if (freq < 290.00) { //lower ledger lines G3 to C#3
          if (i > 4 && i < 9) {
            count++;
          }
          rect(312.5, 375, 10, 225 - (Math.floor(count / 2) * 25));
          if (freq < 240.0) { //second ledger line
            rect(225, 575, 125, 5);
          }
          rect(225, 525, 125, 5);
          if (freq > 260.0) {
            rect(312.5, 325, 10, 200);
          }
          if (violinPitches[i].sharp == true) {
            image(imgSharp, 160, 550 - (Math.floor(count / 2) * 25), 75, 100);
            ellipse(285, 600 - (Math.floor(count / 2) * 25), 75, 50);
          } else {
            ellipse(285, 600 - (Math.floor(count / 2) * 25), 75, 50);
          }
        } else if (freq > 290.00 && freq < 870) { //middle notes
          count += Math.floor(i / 12) * 2;
          if (i % 12 > 4) {
            count++;
          }
          if (i % 12 > 9) {
            count++;
          }
          if (freq < 510) {
            rect(312.5, 375 - (Math.floor(count / 2) * 25), 10, 225);
          } else {
            rect(247.5, 600 - (Math.floor(count / 2) * 25), 10, 225);
          }
          if (violinPitches[i].sharp == true) {
            image(imgSharp, 160, 550 - (Math.floor(count / 2) * 25), 75, 105);
            ellipse(285, 600 - (Math.floor(count / 2) * 25), 75, 50);
          } else {
            ellipse(285, 600 - (Math.floor(count / 2) * 25), 75, 50);
          }
        } else if (freq > 870 && freq < 1380) { //Upper note ledger lines
          count += Math.floor(i / 12) * 2;
          if (i % 12 > 4) {
            count++;
          }
          if (i % 12 > 9) {
            count++;
          }
          rect(225, 225, 125, 5); //first upper ledger line
          if (freq > 1040.0) { //second upper ledger line
            rect(225, 175, 125, 5);
          }
          if (freq > 1300.0) { //third upper ledger line
            rect(225, 125, 125, 5);
            rect(247.5, 600 - (Math.floor(count / 2) * 25), 10, 250); //High E
          }
          rect(247.5, 600 - (Math.floor(count / 2) * 25), 10, 225);
          if (violinPitches[i].sharp == true) {
            image(imgSharp, 160, 550 - (Math.floor(count / 2) * 25), 75, 105);
            ellipse(285, 600 - (Math.floor(count / 2) * 25), 75, 50);
          } else {
            ellipse(285, 600 - (Math.floor(count / 2) * 25), 75, 50);
          }
        } else if (freq > 1350 && freq < 2700) {
          count -= 12;
          count += Math.floor((i - 12) / 12) * 2;
          if ((i - 12) % 12 > 4) {
            count++;
          }
          if ((i - 12) % 12 > 9) {
            count++;
          }
          rect(247.5, 600 - (Math.floor(count / 2) * 25), 10, 225);
          if (freq > 1750) {
            rect(225, 225, 125, 5); //first upper ledger line 
          }
          if (violinPitches[(i - 12)].sharp == true) {
            image(imgSharp, 160, 550 - (Math.floor(count / 2) * 25), 75, 105);
          }
          ellipse(285, 600 - (Math.floor(count / 2) * 25), 75, 50);
          image(img8va, 200, 525 - (Math.floor(count / 2) * 25), 150, 50);
        }
      }
    }
  }
}
