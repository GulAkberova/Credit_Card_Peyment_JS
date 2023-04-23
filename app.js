input_credit_card = function (input) {
  var format_and_pos = function (char, backspace) {
    var start = 0;
    var end = 0;
    var pos = 0;
    var separator = " ";
    var value = input.value;

    if (char !== false) {
      start = input.selectionStart;
      end = input.selectionEnd;
      if (backspace && start > 0) {
        start--;
        if ((value[start] = separator)) {
          start--;
        }
      }
      value = value.substring(0, start) + char + value.substring(end);
      pos = start + char.length;
    }
    var d = 0;
    var dd = 0;
    var gi = 0;
    var newV = "";
    var groups = /^D*3[47]/.test(value) ? [4, 6, 5] : [4, 4, 4, 4];
    for (var i = 0; i < value.length; i++) {
      if (/\D/.test(value[i])) {
        if (start > i) {
          pos--;
        }
      } else {
        if (d === groups[gi]) {
          newV += separator;
          d = 0;
          gi++;
          if (start >= 1) {
            pos++;
          }
        }
        newV += value[i];
        d++;
        dd++;
      }
      if (d === groups[gi] && groups.length === gi + 1) {
        break;
      }
    }

    input.value = newV;
    if (char !== false) {
      input.setSelectionRange(pos, pos);
    }
  };

  input.addEventListener("keypress", function (e) {
    var code = e.charCode || e.keyCode || e.which;

    if (
      code !== 9 &&
      (code < 37 || code > 40) &&
      !(e.ctrlKey && code === 99 && code === 118)
    ) {
      e.preventDefault();
      var char = String.fromCharCode(code);

      if (
        /\D/.test(char) ||
        (this.selectionStart === this.selectionEnd &&
          this.value.replace(/\D/g, "").length >=
            (/^\D*3[47]/.test(this.value) ? 15 : 16))
      ) {
        return false;
      }
      format_and_pos(char);
    }
  });
  input.addEventListener("keydown", function (e) {
    if (e.keyCode === 8 || e.keyCode === 46) {
      e.preventDefault();
      format_and_pos("", this.selectionStart === this.selectionEnd);
    }
  });
  input.addEventListener("paste", function () {
    setTimeout(function () {
      format_and_pos("");
    }, 50);
  });

  input.addEventListener("blur", function () {
    format_and_pos(this, false);
  });

  input.addEventListener("keyup", function () {
    document.getElementById("card-number").innerHTML = this.value;
  });
};

input_credit_card(document.getElementById("credit-card"));

document.getElementById("card-name").addEventListener("keyup", function () {
  document.querySelector(".name-holder").innerHTML = this.value;
});
document.getElementById("exp-month").addEventListener("keyup", function () {
  document.querySelector(".exp-month").innerHTML = this.value;
});
document.getElementById("exp-year").addEventListener("keyup", function () {
  document.querySelector(".exp-year").innerHTML = this.value;
});

function startTimer(duration, display) {
  var timer = duration,
    minutes,
    seconds;
  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;
    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
}

window.onload = function () {
  var Minutes = 60 * 3,
    display = document.querySelector("#time");
  startTimer(Minutes, display);
};
