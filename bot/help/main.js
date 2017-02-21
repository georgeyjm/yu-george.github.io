var atPhoneMode = false;

function toPhoneMode() {
  atPhoneMode = true;
  // $('#container').css('margin', '50px 6%');
  // $('#container').css('width', '88%');
  $('#container').css('margin', '50px 20px');
  $('#container').css('width', 'calc(100% - 40px)');
}

function toPcMode() {
  atPhoneMode = false;
  $('#container').css('margin', '50px 30%');
  $('#container').css('width', '40%');
}

setInterval(function() {
  if ($(window).width() < 900) {
    if (!atPhoneMode) {
      toPhoneMode();
    }
  } else if (atPhoneMode) {
    toPcMode();
  }
}, 500);
