

// Wrap each letter in a span
var textWrapper = document.querySelectorAll("p a");
textWrapper.forEach(
  function(item) {
    item.innerHTML = item.textContent.replace(
      /\S/g,
      "<span class='letter'>$&</span>"
    );
  },
);

// Animatation
var animation = anime({
  targets: "a .letter",
  translateY: [0, "-0.16em", 0],
  translateZ: 0,
  duration: 500,
  easing: 'linear',
  delay: anime.stagger(100),
  loop: true,
  autoplay: false
});

textWrapper.onmouseenter = function() {
  animation.play();
};

textWrapper.onmouseleave = function() {
  animation.pause();
  animation.seek(0);
};
