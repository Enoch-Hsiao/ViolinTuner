let model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';
let pitch;
let audioContext;
let mic;
let freq = 0;
let imgClef;
let success = 0;
let img8va;
let startStop;
let imgFKey;
let imgEKey;
let activityStarted = 0;
let goingUp = true;
let count = 0;
let countInTest = 0;
let halfStep = 0;
let smallScreen = 0;
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
    countInTest = 0;
    halfStep = 0;
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
  let width = windowWidth;
  let height = windowHeight;
  if (width < 435) {
    resizeCanvas(width - 17, height);
  } else {
    width = 400;
    height = 600;
    resizeCanvas(width, height);
  }
  background(255);
  textAlign(CENTER, CENTER);
  let i = findClosest(freq);
  let middle = height / 2;
  let scaling = height / 13;
  let halfScaling = height / 26;
  image(imgClef, -40, middle - scaling * 3, width / 1.75, height / 1.55);
  if (Math.abs(1200 * Math.log(violinPitches[i].frequency / freq) / Math.log(2)) < 15) { //cents calculation
    fill(51, 255, 51); //within 10 cents
  } else {
    fill(255, 153, 153); //not within 10 cents;
  }
  strokeWeight(0);
  rect(0, 0, width, height / 9);
  fill(0);
  strokeWeight(4);
  rect(0, middle - scaling, width, 4);
  rect(0, middle, width, 4);
  rect(0, middle + scaling, width, 4);
  rect(0, middle + scaling * 2, width, 4);
  rect(0, middle + scaling * 3, width, 4);
  strokeWeight(7);
  //guage
  line(5, 5, 5, height / 10); //tick marks
  line((width - 17) / 5, 5, (width - 17) / 5, height / 10);
  line((width - 17) / 2.5, 5, (width - 17) / 2.5, height / 10);
  line((width - 17) / (5 / 3), 5, (width - 17) / (5 / 3), height / 10);
  line((width - 17) / (5 / 4), 5, (width - 17) / (5 / 4), height / 10);
  line(width - 21.5, 5, width - 21.5, height / 10);
  fill(0);
  textSize(20);
  text("-30", (width - 17) / 5, height / 7.5);
  text("-15", (width - 18.5) / 2.5, height / 7.5);
  text("+15", (width - 17.5) / (5 / 3), height / 7.5);
  text("+30", (width - 17) / (5 / 4), height / 7.5);
  strokeWeight(4);
  fill(0);
  textSize(25);
  if (violinPitches[i].sharp == true) { //closest note
    text(violinPitches[i].noteName + "#" + violinPitches[i].octave, (width - 17) / 2, height * 0.08);
  } else {
    text(violinPitches[i].noteName + violinPitches[i].octave, (width - 17) / 2, height * 0.08);
  }
  if (violinPitches[i + 1].sharp == true) { //closest note to the right
    text(violinPitches[i + 1].noteName + "#" + violinPitches[i + 1].octave, (width - 17) / 10 * 9, height * 0.08);
  } else {
    text(violinPitches[i + 1].noteName + violinPitches[i + 1].octave, (width - 17) / 10 * 9, height * 0.08);
  }
  if (i > 0 && violinPitches[i - 1].sharp == true) { //closest note to the left
    text(violinPitches[i - 1].noteName + "#" + violinPitches[i - 1].octave, (width - 17) / 10, height * 0.08);
  } else if (i > 0) {
    text(violinPitches[i - 1].noteName + violinPitches[i - 1].octave, (width - 17) / 10, height * 0.08);
  }
  let difference = Math.abs(1200 * Math.log(violinPitches[i].frequency / freq) / Math.log(2));
  textSize(17);
  if (freq - violinPitches[i].frequency > 0) { //right side of guage
    if (difference > 30) {
      image(imgArrow, (width - 50) / 10 * 9.5, height / 10, width / 15, height / 15);
    } else if (difference > 15) {
      image(imgArrow, (width - 50) / 10 * 7.25, height / 10, width / 15, height / 15);
    } else {
      image(imgArrow, (width - 50) / 2, height / 10, width / 15, height / 15);
    }
  } else { //left side of guage
    if (difference > 30) {
      image(imgArrow, (width - 50) / 17, height / 10, width / 15, height / 15);
    } else if (difference > 15) {
      image(imgArrow, (width - 50) / 10 * 2.75, height / 10, width / 15, height / 15);
    } else {
      image(imgArrow, (width - 50) / 2, height / 10, width / 15, height / 15);
    }
  }
  textSize(15);
  text(freq.toFixed(0) + " Hz", width / 2, height * 0.025);
  textSize(15);
  if (activityStarted == 1) { //started test
    let e = document.getElementById("scales");
    let scale = Number(e.options[e.selectedIndex].value);
    i = scale + countInTest;
    count = i;
    let difference = Math.abs(1200 * Math.log(violinPitches[i].frequency / freq) / Math.log(2));
    if (difference < 15) {
      if (halfStep === 14 && !goingUp) {
        stop();
        change();
        goingUp = true;
        count = 0;
        success = 0;
        halfStep = 0;
        countInTest = 0;
      }
      if (halfStep === 14) {
        goingUp = false;
        halfStep = 0;
      }
      if (goingUp) {
        countInTest++;
        if (halfStep % 7 == 2 || halfStep % 7 == 6) {
          countInTest--;
        }
        countInTest++;
        halfStep++;
      } else {
        countInTest--;
        if (halfStep % 7 == 0 || halfStep % 7 == 4) {
          countInTest++;
        }
        countInTest--;
        halfStep++;
      }
    }
  } else { //gneral tuning
    count = i;
  }
  //draw notes on music staff
  if (i < 7) { //lower ledger lines G3 to C#3
    if (i > 4 && i < 9) {
      count++;
    }
    rect(width * (2 / 3), middle + scaling, 4, scaling * 4.4 - (Math.floor(count / 2) * halfScaling)); //vertical line
    if (i < 4) { //second ledger line
      rect(width * (2 / 3) - width * (1 / 5), middle + scaling * 5, width * (1 / 4), 4);
    }
    rect(width * (2 / 3) - width * (1 / 5), middle + scaling * 4, width * (1 / 4), 4); //first ledger line
    if (i > 4) {
      rect(width * (2 / 3), middle, 4, scaling); //vertical line
    }
    if (violinPitches[i].sharp == true) {
      image(imgSharp, width * (2 / 3) - 100, middle + scaling * 4.6 - (Math.floor(count / 2) * halfScaling), 40, 70);
    }
    ellipse(width * (2 / 3) - width / 13.4, middle + scaling * 5.5 - (Math.floor(count / 2) * halfScaling), width / 6, scaling);
  } else if (i > 6 && i < 26) { //middle notes
    count += Math.floor(i / 12) * 2;
    if (i % 12 > 4) {
      count++;
    }
    if (i % 12 > 9) {
      count++;
    }
    if (i < 17) { //right side vertical line
      rect(width * (2 / 3), (middle + scaling * 2) - (Math.floor(count / 2) * halfScaling), 4, scaling * 3.5);
    } else { //left side vertical line
      rect(width * (2 / 3) - width / 6.4, (middle + scaling * 5.5) - (Math.floor(count / 2) * halfScaling), 4, scaling * 3.5);
    }
    if (violinPitches[i].sharp == true) {
      image(imgSharp, width * (2 / 3) - 100, middle + scaling * 4.6 - (Math.floor(count / 2) * halfScaling), 40, 70);
    }
    ellipse(width * (2 / 3) - width / 13.4, middle + scaling * 5.5 - (Math.floor(count / 2) * halfScaling), width / 6, scaling);
  } else if (i > 25 && i < 34) { //Upper note ledger lines
    count += Math.floor(i / 12) * 2;
    if (i % 12 > 4) {
      count++;
    }
    if (i % 12 > 9) {
      count++;
    }
    rect(width * (2 / 3) - width * (1 / 5), middle - scaling * 2, 105, 4); //first upper ledger line
    if (i > 28) { //second upper ledger line
      rect(width * (2 / 3) - width * (1 / 5), middle - scaling * 3, 105, 4);
      rect(width * (2 / 3) - width / 6.4, middle, 4, scaling);
    }
    if (i > 32) { //third upper ledger line
      rect(width * (2 / 3) - width * (1 / 5), middle - scaling * 4, 105, 4);
      rect(width * (2 / 3) - width / 6.4, middle - scaling, 4, scaling * 2); //High E
    }
    rect(width * (2 / 3) - width / 6.4, (middle + scaling * 5.5) - (Math.floor(count / 2) * halfScaling), 4, scaling * 3.5);
    if (violinPitches[i].sharp == true) {
      image(imgSharp, width * (2 / 3) - 100, middle + scaling * 4.6 - (Math.floor(count / 2) * halfScaling), 40, 70);
    }
    ellipse(width * (2 / 3) - width / 13.4, middle + scaling * 5.5 - (Math.floor(count / 2) * halfScaling), width / 6, scaling);
  } else if (i > 33 && i < 46) {
    count -= 12;
    count += Math.floor((i - 12) / 12) * 2;
    if ((i - 12) % 12 > 4) {
      count++;
    }
    if ((i - 12) % 12 > 9) {
      count++;
    }
    rect(width * (2 / 3) - width / 6.4, (middle + scaling * 5.5) - (Math.floor(count / 2) * halfScaling), 4, scaling * 3.5);
    if (violinPitches[i].sharp == true) {
      image(imgSharp, width * (2 / 3) - 100, 430 - (Math.floor(count / 2) * 17.5), 40, 70);
    }
    ellipse(width * (2 / 3) - width / 13.4, middle + scaling * 5.5 - (Math.floor(count / 2) * halfScaling), width / 6, scaling);
    if (i > 37) {
      rect(width * (2 / 3) - width * (1 / 5), middle - scaling * 2, 105, 4); //first upper ledger line 
    }
    image(img8va, width * (2 / 3) - 100, 410 - (Math.floor(count / 2) * 17.5), 150, 50);
  }
}
