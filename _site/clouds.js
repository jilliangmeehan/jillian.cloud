// Find all links in the body of a paragraph
var link = document.querySelectorAll("a:not(.link-with-arrow)");

link.forEach(
  function(item) {
    // Wrap each letter in a span
    Splitting({
      target: item,
      by: "chars",
    }).forEach(split => {
      split.words.forEach(word => {
        if (word.parentElement.getAttribute("aria-label")) {
          word.setAttribute("aria-hidden", true);
        }
      });
    });

    // Play animation on hover
    item.onmouseenter = function() {
      animation.play();
    };

    // Stop animation
    item.onmouseleave = function() {
      animation.pause();
      animation.seek(0);
    };

    var animation = anime({
      targets: item.querySelectorAll('.char'),
      translateY: [0, "0.05em", "-0.03em", 0],
      translateZ: 0,
      scale: [1, 0.95, 1],
      duration: 400,
      easing: 'easeInOutSine',
      delay: anime.stagger(50),
      endDelay: 1200,
      loop: true,
      autoplay: false
    });
  });
