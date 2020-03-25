// Find all links in the body of a paragraph
var link = document.querySelectorAll("p a");

link.forEach(
  function(item) {
    // Wrap each letter in a span
    item.innerHTML = item.textContent.replace(
      /\S/g,
      "<span class='letter'>$&</span>"
    );

    // Play animation on hover
    item.onmouseenter = function() {
      animation.play();
    };

    // Stop animation
    item.onmouseleave = function() {
      animation.pause();
      animation.seek(0);
    };

    // Animatation
    var animation = anime({
      targets: item.querySelectorAll(".letter"),
      translateY: [0, "-0.16em", 0],
      translateZ: 0,
      duration: 1000,
      easing: 'easeInOutBack',
      delay: anime.stagger(50),
      loop: true,
      autoplay: false
    });
  },
);
