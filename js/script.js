//     safari
document.addEventListener("DOMContentLoaded", () => {
  const isDesktop = window.innerWidth >= 768;
  const isSafari = /safari/i.test(navigator.userAgent) && !/chrome|android/i.test(navigator.userAgent) && !/mobile/i.test(navigator.userAgent);

  if (isDesktop) {
    // PCではCSSでスクロール
    document.body.classList.add("desktop-scroll");
  } else {
    // スマホではJS無限スクロール
    document.body.classList.add("mobile-scroll");
    startJSScroll(); // 既存のrequestAnimationFrameループ
  }
});


//     open menu
jQuery(function ($) {
  $('.menu-btn').on('click', function () {
    $('body').toggleClass('open');
  });

  $('.gallery').each(function () {
    $(this).modaal({
      type: 'image'
    });
  });

  /*$('.gallery').modaal({
    type: 'image'
  });*/
});

//     tag linear
document.addEventListener("DOMContentLoaded", () => {
  const tagInner = document.querySelector(".tag-inner");
  if (!tagInner) return;

  tagInner.style.willChange = "transform";
  tagInner.style.transform = "translateZ(0)";

  tagInner.innerHTML += tagInner.innerHTML;
  const tags = Array.from(tagInner.children);

  function calcTotalWidth() {
    const style = getComputedStyle(tagInner);
    const gap = parseFloat(style.gap) || 0;

    const tagWidths = tags.map(tag => {
      const span = tag.querySelector("span");
      const spanMargin = span ? parseFloat(getComputedStyle(span).marginRight) : 0;
      return tag.getBoundingClientRect().width + gap + spanMargin;
    });

    return tagWidths.slice(0, tags.length / 2).reduce((a, b) => a + b, 0);
  }

  let totalWidth = calcTotalWidth();
  let pos = 0;
  const speed = 60; // px/秒（ここを調整）
  let lastTime = performance.now();

  function loop(now) {
    const delta = (now - lastTime) / 1000; // 経過秒数
    lastTime = now;

    pos -= speed * delta;

    if (pos <= -totalWidth) pos += totalWidth;

    tagInner.style.transform = `translateX(${pos}px)`;
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);

  window.addEventListener("resize", () => {
    totalWidth = calcTotalWidth();
  });
});