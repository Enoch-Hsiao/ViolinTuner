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
let imgFKey;
let imgEKey;
let activityStarted = 0;
let goingUp = true;
let count = 0;
let smallScreen = 0;
let cMajorScale = [261.63, 292.66, 329.63, 349.32, 392.00, 440.00, 493.88, 523.25, 493.88, 440.00, 392.00, 349.23, 329.63, 293.66, 261.63]
let fMajorScale = [349.23, 392.00, 440.00, 466.16, 523.25, 587.33, 659.26, 698.46, 659.26, 587.33, 523.25, 466.16, 440.00, 392.00, 349.23]
let eMajorScale = [329.63, 369.99, 415.30, 440.00, 493.88, 554.37, 622.25, 659.26, 622.25, 554.37, 493.88, 440.00, 415.30, 369.99, 329.63]
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
    sharp: false,
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
  if (windowWidth < 435) {
    createCanvas(windowWidth - 17, windowHeight);
  } else {
    createCanvas(400, 950);
  }
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(listening);
  imgClef = loadImage('Treble Clef.png');
  imgCheckMark = loadImage('Checkmark.png');
  imgSharp = loadImage('Sharp.png');
  img8va = loadImage('8va.PNG');
  imgFKey = loadImage('fmajkey.png');
  imgEKey = loadImage('emajkey.png');
  imgArrow = loadImage('Arrow.png');
  recorder = new p5.SoundRecorder();
  recorder.setInput(mic);
  soundFile = new p5.SoundFile();
  let myDiv = createDiv(''); //handle audio error
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
    if (document.getElementById("playback").checked || document.getElementById("download").checked) {
      recorder.record(soundFile); //start recording
    }
    elem.value = "End Activity";
  } else {
    elem.value = "Start Activity";
    activityStarted = 0;
    count = 0;
    if (document.getElementById("playback").checked) {
      recorder.stop();
    }
    if (document.getElementById("download").checked) {
      saveSound(soundFile, 'recording.wav');
    }
    if (document.getElementById("playback").checked) {
      soundFile.play();
    }
  }
}

function stop() {
  clearTimeout(startStopChanger);
  startStop = null;
}

function checkmark() { //checkmark fade out animation
  if (success > 0 && success < 20) {
    tint(255, 255 - (15 * success));
    image(imgCheckMark, 10, height / 4, imgCheckMark.width / 2, imgCheckMark.height / 2);
    success++;
    if (success == 20) {
      success = 0;
    }
  }
}

function findClosest(target) {
  if (target == undefined) {
    return 0;
  }
  if (target <= violinPitches[0].frequency) {
    return 0;
  }
  if (target >= violinPitches[violinPitches.length - 1].frequency) {
    return violinPitches.length - 1;
  }

  let i = 0,
    j = violinPitches.length,
    mid = 0;
  while (i < j) {
    mid = Math.floor((i + j) / 2);
    if (violinPitches[mid].frequency === target) {
      return mid;
    }
    if (target < violinPitches[mid].frequency) {
      if (mid > 0 && target > violinPitches[mid - 1].frequency)
        return getClosest(mid - 1, mid, target);
      j = mid;
    } else {
      if (mid < violinPitches.length - 1 && target < violinPitches[mid + 1].frequency)
        return getClosest(mid, mid + 1, target);
      i = mid + 1;
    }
  }
  return mid;
}

function getClosest(val1, val2, target) {
  if (Math.abs(target - violinPitches[val1].frequency) >= Math.abs(target - violinPitches[val2].frequency)) {
    return val2;
  } else {
    return val1;
  }
}

function draw() { //where everything happens
  if (windowWidth < 435) {
    resizeCanvas(windowWidth - 17, windowHeight);
  } else {
    resizeCanvas(400, 950);
  }
  background(255);
  textAlign(CENTER, CENTER);
  let i = findClosest(freq);

  if (windowWidth > 435) { //larger screen
    image(imgClef, -40, height / 6, imgClef.width / 1.63, imgClef.height / 1.63);
    fill(0);
    rect(0, 275, 400, 5);
    rect(0, 325, 400, 5);
    rect(0, 375, 400, 5);
    rect(0, 425, 400, 5);
    rect(0, 475, 400, 5);
    if (Math.abs(1200 * Math.log(violinPitches[i].frequency / freq) / Math.log(2)) < 15) { //cents calculation
      fill(51, 255, 51); //within 10 cents
    } else {
      fill(255, 153, 153); //not within 10 cents;
    }
    arc(200, 850, 350, 400, PI, 0, OPEN); //gauge
    line(25, 850, 375, 850); //tick marks
    line(40, 770, 70, 780);
    line(110, 680, 125, 705);
    line(275, 705, 290, 680);
    line(330, 780, 360, 770);
    fill(0);
    textSize(20);
    text("-15", width / 3, height * 0.76);
    text("+15", width / 1.55, height * 0.76);
    text("-30", width / 4.5, height * 0.81);
    text("+30", width / 1.3, height * 0.81);
    strokeWeight(4);
    fill(0);
    textSize(25);
    if (violinPitches[i].sharp == true) { //closest note
      text(violinPitches[i].noteName + "#" + violinPitches[i].octave, width / 2, height * 0.725);
    } else {
      text(violinPitches[i].noteName + violinPitches[i].octave, width / 2, height * 0.725);
    }
    if (violinPitches[i + 1].sharp == true) { //closest note to the right
      text(violinPitches[i + 1].noteName + "#" + violinPitches[i + 1].octave, width / 1.2, height * 0.85);
    } else {
      text(violinPitches[i + 1].noteName + violinPitches[i + 1].octave, width / 1.2, height * 0.85);
    }
    if (i > 0 && violinPitches[i - 1].sharp == true) { //closest note to the left
      text(violinPitches[i - 1].noteName + "#" + violinPitches[i - 1].octave, width / 6, height * 0.85);
    } else if (i > 0) {
      text(violinPitches[i - 1].noteName + violinPitches[i - 1].octave, width / 6, height * 0.85);
    }
    let difference = Math.abs(1200 * Math.log(violinPitches[i].frequency / freq) / Math.log(2)); //cents
    if (violinPitches[i].frequency - freq > 0) { //left side of speedometer
      if (difference > 30) {
        line(50, 810, 200, 850);
      } else if (difference > 22.5) {
        line(70, 750, 200, 850);
      } else if (difference > 15) {
        line(100, 720, 200, 850);
      } else if (difference > 7.5) {
        line(150, 685, 200, 850);
      } else {
        line(200, 685, 200, 850);
      }
    } else { //right side of speedometer
      if (difference > 30) {
        line(200, 850, 350, 810);
      } else if (difference > 22.5) {
        line(200, 850, 330, 750);
      } else if (difference > 15) {
        line(200, 850, 300, 720);
      } else if (difference > 7.5) {
        line(200, 850, 250, 685);
      } else {
        line(200, 850, 200, 685);
      }
    }
    fill(0);
    textSize(40);
    text(freq.toFixed(0) + " Hz", width / 2, height * 0.85); //frequency value
    textSize(15);
    text("© 2019 Enoch Hsiao", width/2, height * 0.95);
    
    if (activityStarted == 1) { //started test
      let e = document.getElementById("scales");
      let value = Number(e.options[e.selectedIndex].value);
      if (value == 5) { //C Major Scale
        if (goingUp) {
          if (cMajorScale[count] < 290.00) {
            ellipse(285, 525, 75, 50);
            rect(225, 525, 125, 5);
          } else {
            ellipse(285, 525 - (count * 25), 75, 50);
          }
          let diff = Math.abs(1200 * Math.log(cMajorScale[count] / freq) / Math.log(2));
          if (diff < 10) {
            success = 1;
            count++;
          }
          checkmark();
        } else {
          if (cMajorScale[count] < 290.00) {
            ellipse(285, 525, 75, 50);
            rect(225, 525, 125, 5);
          } else {
            ellipse(285, 350 + ((count % 7) * 25), 75, 50);
          }
        }
        let diff = Math.abs(1200 * Math.log(cMajorScale[count] / freq) / Math.log(2));
        if (diff < 10) {
          success = 1;
          count++;
        }
        checkmark();
        if (count != 0 && count % 7 == 0) {
          goingUp = false;
        }
        if (count == cMajorScale.length) {
          stop();
          change();
          goingUp = true;
          count = 0;
          success = 0;
        }
      } else if (value == "10") { //F Major Scale
        imgFKey.resize(200, 200);
        image(imgFKey, 0.5, imgFKey.width / 5, imgFKey.length / 5);
        let diff = Math.abs(1200 * Math.log(fMajorScale[count] / freq) / Math.log(2));
        if (diff < 10) {
          success = 1;
          count++;
        }
        checkmark();
        if (goingUp) {
          ellipse(285, 450 - (count * 25), 75, 50);
        } else if (count == 14) {
          ellipse(285, 450, 75, 50);
        } else {
          ellipse(285, 275 + ((count % 7) * 25), 75, 50);
        }
        if (count != 0 && count % 7 == 0) {
          goingUp = false;
        }
        if (count == fMajorScale.length) {
          stop();
          change();
          goingUp = true;
          count = 0;
          success = 0;
        }
      } else if (value == "9") { //E Major Scale
        imgEKey.resize(200, 200);
        image(imgEKey, 0.5, imgEKey.width / 5, imgEKey.length / 5);
        let diff = Math.abs(1200 * Math.log(eMajorScale[count] / freq) / Math.log(2));
        if (diff < 10) {
          success = 1;
          count++;
        }
        if (count != 15) {
          if (success > 0 && success < 20) { //checkmark fade out animation
            tint(255, 255 - (15 * success));
            image(imgCheckMark, 10, height / 4, imgCheckMark.width / 2, imgCheckMark.height / 2);
            success++;
            if (success == 20) {
              success = 0;
            }
          }
        }
        if (goingUp) {
          ellipse(285, 475 - (count * 25), 75, 50);
        } else if (count == 14) {
          ellipse(285, 475, 75, 50);
        } else {
          ellipse(285, 300 + ((count % 7) * 25), 75, 50);
        }
        if (count != 0 && count % 7 == 0) {
          goingUp = false;
        }
        if (count == eMajorScale.length) {
          stop();
          change();
          goingUp = true;
          count = 0;
          success = 0;
        }
      }
    } else { //General tuning
      let diff = freq - violinPitches[i].frequency;
      let count = i;
      if (diff < 15 && diff > -15) {
        if (i < 7) { //lower ledger lines G3 to C#3
          if (i > 4 && i < 9) {
            count++;
          }
          rect(312.5, 375, 10, 225 - (Math.floor(count / 2) * 25));
          if (i < 4) { //second ledger line
            rect(225, 575, 125, 5);
          }
          rect(225, 525, 125, 5);
          if (i > 4) {
            rect(312.5, 325, 10, 200);
          }
          if (violinPitches[i].sharp == true) {
            image(imgSharp, 160, 550 - (Math.floor(count / 2) * 25), 75, 100);
            ellipse(285, 600 - (Math.floor(count / 2) * 25), 75, 50);
          } else {
            ellipse(285, 600 - (Math.floor(count / 2) * 25), 75, 50);
          }
        } else if (i > 6 && i < 26) { //middle notes
          count += Math.floor(i / 12) * 2;
          if (i % 12 > 4) {
            count++;
          }
          if (i % 12 > 9) {
            count++;
          }
          if (i < 17) {
            rect(312.5, 375 - (Math.floor(count / 2) * 25), 10, 225);
          } else {
            rect(247.5, 600 - (Math.floor(count / 2) * 25), 10, 225);
          }
          if (violinPitches[i].sharp == true) {
            image(imgSharp, 160, 550 - (Math.floor(count / 2) * 25), 75, 105);
          }
          ellipse(285, 600 - (Math.floor(count / 2) * 25), 75, 50);
        } else if (i > 25 && i < 34) { //Upper note ledger lines
          count += Math.floor(i / 12) * 2;
          if (i % 12 > 4) {
            count++;
          }
          if (i % 12 > 9) {
            count++;
          }
          rect(225, 225, 125, 5); //first upper ledger line
          if (i > 28) { //second upper ledger line
            rect(225, 175, 125, 5);
          }
          if (i > 32) { //third upper ledger line
            rect(225, 125, 125, 5);
            rect(247.5, 600 - (Math.floor(count / 2) * 25), 10, 250); //High E
          }
          rect(247.5, 600 - (Math.floor(count / 2) * 25), 10, 225);
          if (violinPitches[i].sharp == true) {
            image(imgSharp, 160, 550 - (Math.floor(count / 2) * 25), 75, 105);
          }
          ellipse(285, 600 - (Math.floor(count / 2) * 25), 75, 50);
        } else if (i > 33 && i < 46) {
          count -= 12;
          count += Math.floor((i - 12) / 12) * 2;
          if ((i - 12) % 12 > 4) {
            count++;
          }
          if ((i - 12) % 12 > 9) {
            count++;
          }
          rect(247.5, 600 - (Math.floor(count / 2) * 25), 10, 225);
          if (i > 37) {
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
  } else {
    image(imgClef, -40, 160, imgClef.width / 2, imgClef.height / 2.4);
    fill(0);
    rect(0, 235, windowWidth, 4);
    rect(0, 270, windowWidth, 4);
    rect(0, 305, windowWidth, 4);
    rect(0, 340, windowWidth, 4);
    rect(0, 375, windowWidth, 4);
    strokeWeight(7);
    line(5, 5, 5, windowHeight / 8); //tick marks
    line((windowWidth - 17) / 5, 5, (windowWidth - 17) / 5, windowHeight / 8);
    line((windowWidth - 17) / 2.5, 5, (windowWidth - 17) / 2.5, windowHeight / 8);
    line((windowWidth - 17) / (5 / 3), 5, (windowWidth - 17) / (5 / 3), windowHeight / 8);
    line((windowWidth - 17) / (5 / 4), 5, (windowWidth - 17) / (5 / 4), windowHeight / 8);
    line(windowWidth - 21.5, 5, windowWidth - 21.5, windowHeight / 8);
    fill(0);
    textSize(20);
    text("-30", (windowWidth - 17) / 5, height * 0.175);
    text("-15", (windowWidth - 18.5) / 2.5, height * 0.175);
    text("+15", (windowWidth - 17.5) / (5 / 3), height * 0.175);
    text("+30", (windowWidth - 17) / (5 / 4), height * 0.175);
    strokeWeight(4);
    fill(0);
    textSize(25);
    if (violinPitches[i].sharp == true) { //closest note
      text(violinPitches[i].noteName + "#" + violinPitches[i].octave, (windowWidth - 17) / 2, height * 0.1);
    } else {
      text(violinPitches[i].noteName + violinPitches[i].octave, (windowWidth - 17) / 2, height * 0.1);
    }
    if (violinPitches[i + 1].sharp == true) { //closest note to the right
      text(violinPitches[i + 1].noteName + "#" + violinPitches[i + 1].octave, (windowWidth - 17) / 10 * 9, height * 0.1);
    } else {
      text(violinPitches[i + 1].noteName + violinPitches[i + 1].octave, (windowWidth - 17) / 10 * 9, height * 0.1);
    }
    if (i > 0 && violinPitches[i - 1].sharp == true) { //closest note to the left
      text(violinPitches[i - 1].noteName + "#" + violinPitches[i - 1].octave, (windowWidth - 17) / 10, height * 0.1);
    } else if (i > 0) {
      text(violinPitches[i - 1].noteName + violinPitches[i - 1].octave, (windowWidth - 17) / 10, height * 0.1);
    }
    let difference = Math.abs(1200 * Math.log(violinPitches[i].frequency / freq) / Math.log(2));
    textSize(17);
    if (freq - violinPitches[i].frequency > 0) { //right side of speedometer
      if (difference > 30) {
        image(imgArrow, (windowWidth - 50) / 10 * 9.5, height * 0.125, width / 10, height / 10);
      } else if (difference > 15) {
        image(imgArrow, (windowWidth - 50) / 10 * 7.25, height * 0.125, width / 10, height / 10);
      } else {
        image(imgArrow, (windowWidth - 50) / 2, height * 0.125, width / 10, height / 10);
      }
    } else { //left side of speedometer
      if (difference > 30) {
        image(imgArrow, (windowWidth - 50) / 17, height * 0.125, width / 10, height / 10);
      } else if (difference > 15) {
        image(imgArrow, (windowWidth - 50) / 10 * 2.75, height * 0.125, width / 10, height / 10);
      } else {
        image(imgArrow, (windowWidth - 50) / 2, height * 0.125, width / 10, height / 10);
      }
    }
    textSize(30);
    text(freq.toFixed(0) + " Hz", width / 2, height * 0.90);
    textSize(15);
    text("© 2019 Enoch Hsiao", width/2, height * 0.95); 

    if (activityStarted == 1) { //started test
      let e = document.getElementById("scales");
      let value = Number(e.options[e.selectedIndex].value);
      if (value == 5) { //C Major Scale
        if (goingUp) {
          if (cMajorScale[count] < 290.00) {
            ellipse(285, 525, 75, 50);
            rect(225, 525, 125, 5);
          } else {
            ellipse(285, 525 - (count * 25), 75, 50);
          }
          let diff = Math.abs(1200 * Math.log(cMajorScale[count] / freq) / Math.log(2));
          if (diff < 10) {
            success = 1;
            count++;
          }
          checkmark();
        } else {
          if (cMajorScale[count] < 290.00) {
            ellipse(285, 525, 75, 50);
            rect(225, 525, 125, 5);
          } else {
            ellipse(285, 350 + ((count % 7) * 25), 75, 50);
          }
        }
        let diff = Math.abs(1200 * Math.log(cMajorScale[count] / freq) / Math.log(2));
        if (diff < 10) {
          success = 1;
          count++;
        }
        checkmark();
        if (count != 0 && count % 7 == 0) {
          goingUp = false;
        }
        if (count == cMajorScale.length) {
          stop();
          change();
          goingUp = true;
          count = 0;
          success = 0;
        }
      } else if (value == "10") { //F Major Scale
        imgFKey.resize(200, 200);
        image(imgFKey, 0.5, imgFKey.width / 5, imgFKey.length / 5);
        let diff = Math.abs(1200 * Math.log(fMajorScale[count] / freq) / Math.log(2));
        if (diff < 10) {
          success = 1;
          count++;
        }
        checkmark();
        if (goingUp) {
          ellipse(285, 450 - (count * 25), 75, 50);
        } else if (count == 14) {
          ellipse(285, 450, 75, 50);
        } else {
          ellipse(285, 275 + ((count % 7) * 25), 75, 50);
        }
        if (count != 0 && count % 7 == 0) {
          goingUp = false;
        }
        if (count == fMajorScale.length) {
          stop();
          change();
          goingUp = true;
          count = 0;
          success = 0;
        }
      } else if (value == "9") { //E Major Scale
        imgEKey.resize(200, 200);
        image(imgEKey, 0.5, imgEKey.width / 5, imgEKey.length / 5);
        let diff = Math.abs(1200 * Math.log(eMajorScale[count] / freq) / Math.log(2));
        if (diff < 10) {
          success = 1;
          count++;
        }
        if (count != 15) {
          if (success > 0 && success < 20) { //checkmark fade out animation
            tint(255, 255 - (15 * success));
            image(imgCheckMark, 10, height / 4, imgCheckMark.width / 2, imgCheckMark.height / 2);
            success++;
            if (success == 20) {
              success = 0;
            }
          }
        }
        if (goingUp) {
          ellipse(285, 475 - (count * 25), 75, 50);
        } else if (count == 14) {
          ellipse(285, 475, 75, 50);
        } else {
          ellipse(285, 300 + ((count % 7) * 25), 75, 50);
        }
        if (count != 0 && count % 7 == 0) {
          goingUp = false;
        }
        if (count == eMajorScale.length) {
          stop();
          change();
          goingUp = true;
          count = 0;
          success = 0;
        }
      }
    } else { //General tuning
      let diff = freq - violinPitches[i].frequency;
      let count = i;
      if (diff < 15 && diff > -15) {
        if (i < 7) { //lower ledger lines G3 to C#3
          if (i > 4 && i < 9) {
            count++;
          }
          rect(windowWidth * (2 / 3), 305, 4, 160 - (Math.floor(count / 2) * 17.5));
          if (i < 4) { //second ledger line
            rect(windowWidth * (2 / 3) - 70, 445, 105, 4);
          }
          rect(windowWidth * (2 / 3) - 70, 410, 105, 4);
          if (i > 4) {
            rect(windowWidth * (2 / 3), 270, 4, 35);
          }
          if (violinPitches[i].sharp == true) {
            image(imgSharp, windowWidth * (2 / 3) - 100, 430 - (Math.floor(count / 2) * 17.5), 40, 70);
          }
          ellipse(windowWidth * (2 / 3) - 20.5, 462.5 - (Math.floor(count / 2) * 17.5), 50, 35);
        } else if (i > 6 && i < 26) { //middle notes
          count += Math.floor(i / 12) * 2;
          if (i % 12 > 4) {
            count++;
          }
          if (i % 12 > 9) {
            count++;
          }
          if (i < 17) {
            rect(windowWidth * (2 / 3), 335 - (Math.floor(count / 2) * 17.5), 4, 120);
          } else {
            rect(windowWidth * (2 / 3) - 45.5, 462.5 - (Math.floor(count / 2) * 17.5), 4, 120);
          }
          if (violinPitches[i].sharp == true) {
            image(imgSharp, windowWidth * (2 / 3) - 100, 430 - (Math.floor(count / 2) * 17.5), 40, 70);
          }
          ellipse(windowWidth * (2 / 3) - 20.5, 462.5 - (Math.floor(count / 2) * 17.5), 50, 35);
        } else if (i > 25 && i < 34) { //Upper note ledger lines
          count += Math.floor(i / 12) * 2;
          if (i % 12 > 4) {
            count++;
          }
          if (i % 12 > 9) {
            count++;
          }
          rect(windowWidth * (2 / 3) - 70, 200, 105, 4); //first upper ledger line
          if (i > 28) { //second upper ledger line
            rect(windowWidth * (2 / 3) - 70, 165, 105, 4);
            rect(windowWidth * (2 / 3) - 45.5, 462.5 - (Math.floor(count / 2) * 17.5), 4, 162.5)
          }
          if (i > 32) { //third upper ledger line
            rect(windowWidth * (2 / 3) - 70, 130, 105, 4);
            rect(windowWidth * (2 / 3) - 45.5, 462.5 - (Math.floor(count / 2) * 17.5), 4, 180); //High E
          }
          rect(windowWidth * (2 / 3) - 45.5, 462.5 - (Math.floor(count / 2) * 17.5), 4, 145);
          if (violinPitches[i].sharp == true) {
            image(imgSharp, windowWidth * (2 / 3) - 100, 430 - (Math.floor(count / 2) * 17.5), 40, 70);
          }
          ellipse(windowWidth * (2 / 3) - 20.5, 462.5 - (Math.floor(count / 2) * 17.5), 50, 35);
        } else if (i > 33 && i < 46) {
          count -= 12;
          count += Math.floor((i - 12) / 12) * 2;
          if ((i - 12) % 12 > 4) {
            count++;
          }
          if ((i - 12) % 12 > 9) {
            count++;
          }
          if (i < 17) {
            rect(windowWidth * (2 / 3), 335 - (Math.floor(count / 2) * 17.5), 4, 120);
          } else {
            rect(windowWidth * (2 / 3) - 45.5, 462.5 - (Math.floor(count / 2) * 17.5), 4, 120);
          }
          if (violinPitches[i].sharp == true) {
            image(imgSharp, windowWidth * (2 / 3) - 100, 430 - (Math.floor(count / 2) * 17.5), 40, 70);
          }
          ellipse(windowWidth * (2 / 3) - 20.5, 462.5 - (Math.floor(count / 2) * 17.5), 50, 35);
          if (i > 37) {
            rect(windowWidth * (2 / 3) - 70, 200, 105, 4); //first upper ledger line 
          }
          image(img8va, windowWidth * (2 / 3) - 100, 410 - (Math.floor(count / 2) * 17.5), 150, 50);
        }
      }
    }
  }
}
