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
}
