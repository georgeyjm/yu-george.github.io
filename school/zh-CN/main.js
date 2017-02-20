function toEnglish() {
  document.location = '../en-US';
}

function toJapanese() {
  document.location = '../ja-JP';
}

var avatarImg = document.getElementById('avatarImg');

avatarImg.addEventListener('mouseenter', function(event) {
  var imageId = Math.round(Math.random() * 4 + 1);
  var imageSrc = 'url(\'../images/avatar' + imageId + '.jpg\')'
  avatarImg.style.backgroundImage = imageSrc;
});

avatarImg.addEventListener('mouseleave', function(event) {
  avatarImg.style.backgroundImage = 'url(\'../images/avatar.jpg\')';
});

$(window).on('scroll', function() {
  var windowScroll = $(window).scrollTop();
  if (windowScroll < 1250 && windowScroll > 285) {
    $('#avatarImg').css('margin-top', windowScroll * -0.1 + 90);
    $('#intro').css('margin-top', windowScroll * -0.3 + 270);
  }
  if (windowScroll < 1300 && windowScroll > 790) {
    $('#plxLeft').css('margin-left', windowScroll - 1295);
    $('#plxRight').css('margin-left', -windowScroll + 1305);
  }
});
