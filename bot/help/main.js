var atPhoneMode = false;

function toPhoneMode() {
  atPhoneMode = true;
  $('#container').css('margin', '50px 6%');
  $('#container').css('width', '88%');
  // $('#container').css('margin', '50px 20px');
  // $('#container').css('width', 'calc(100% - 40px)');
  $('ul#command-list > li').css('transition','none');
  $('ul#command-list > li').css('box-shadow','none');
  $('ul#command-list > li').css('padding','0px');
}

function toPcMode() {
  atPhoneMode = false;
  $('#container').css('margin', '50px 25%');
  $('#container').css('width', '50%');
  $('ul#command-list > li').css('box-shadow','0px 0px 12px 4px rgba(0,0,0,.2)');
  $('ul#command-list > li').css('padding','15px');
  $('ul#command-list > li').css('transition','0.5s ease');
}

setInterval(function() {
  if ($(window).width() < 1000) {
    if (!atPhoneMode) {
      toPhoneMode();
    }
  } else if (atPhoneMode) {
    toPcMode();
  }
}, 500);

window.onload = function() {
  allCommands = $('code.command-name')
  for (var i = 0; i < allCommands.length; i++) {
    allCommands[i].parentElement.id = allCommands[i].innerHTML.split('[')[0].split('&lt;')[0].trim()
  }
}
