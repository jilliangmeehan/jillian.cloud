// cursor clouds: lovingly inspired by appy-hour.glitch.me
let mojis = [...'🌧🌸🍓🍃✨🍄'];

let started = false;
let disabled = false;
let mx = 0;
let my = 0;
let speed = .9;
let wid = 0;
let hgt = 0;
let mojiEls;

let trailEl;

function start() {
  if (disabled) return;
  trailEl = document.createElement('div');
  trailEl.id = 'trail';
  document.body.appendChild(trailEl);

  // let stopLink = document.createElement('a');
  // stopLink.href = '#';
  // stopLink.innerText = 'hide cursor trail';
  // Object.assign(stopLink.style, {
  //   position: 'absolute',
  //   right: '1em',
  //   top: '1em',
  //   fontSize: '.9em',
  //   color: '#000'
  // });
  // document.body.appendChild(stopLink);

  let spawn = document.querySelector('h1');
  mx = spawn.offsetLeft + spawn.offsetWidth / 2;
  my = spawn.offsetTop + spawn.offsetHeight / 2;
  mojiEls = mojis.map(m => {
    let el = document.createElement('span');
    el.innerHTML = m;
    trailEl.appendChild(el);
    return {
      el,
      a: 0,
      x: mx,
      y: my,
      r: 0
    };
  });
  wid = mojiEls[0].el.offsetWidth / 2;
  hgt = mojiEls[0].el.offsetHeight / 2;
  started = true;
  update();

  stopLink.addEventListener('click', function (e) {
    e.preventDefault();
    started = false;
    disabled = true;
    trailEl.parentNode.removeChild(trailEl);
    stopLink.parentNode.removeChild(stopLink);
  });

}

function update() {
  let is = 1 - speed;
  let ap = 1200;
  mojiEls.forEach((o, i, a) => {
    let angle = i / mojiEls.length * 6.28;
    let oldX = o.x;
    let oldY = o.y;
    if (i === 0) {
      o.x = mx * is + o.x * speed;
      o.y = my * is + o.y * speed;
    } else {
      o.x = o.x * speed + a[i - 1].x * is;
      o.y = o.y * speed + a[i - 1].y * is;
    }
    let r = 1 / (1 + Math.hypot(o.x - oldX, o.y - oldY));
    o.r = r * is + o.r * speed;
    let tx = o.x + 120 * Math.cos(angle - Date.now() / ap) * o.r - wid;
    let ty = o.y + 120 * Math.sin(angle - Date.now() / ap) * o.r - hgt;
    o.el.style.transform = 'translate(' + tx + 'px,' + ty + 'px)';
  });
  if (started) {
    requestAnimationFrame(update);
  }
}

document.body.addEventListener('mousemove', function (e) {
  if (!started) {
    start();
  }
    mx = e.pageX;
    my = e.pageY;
});

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
