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

  // タグを2セットに複製
  tagInner.innerHTML += tagInner.innerHTML;
  const tags = Array.from(tagInner.children);

  // 元セット幅を計算する関数（小数も考慮）
  function calcTotalWidth() {
    const style = getComputedStyle(tagInner);
    const gap = parseFloat(style.gap) || 0;

    const tagWidths = tags.map(tag => {
      const span = tag.querySelector("span");
      const spanMargin = span ? parseFloat(getComputedStyle(span).marginRight) : 0;
      return tag.getBoundingClientRect().width + gap + spanMargin;
    });

    // 元セット分の合計幅
    return tagWidths.slice(0, tags.length / 2).reduce((a, b) => a + b, 0);
  }

  let totalWidth = calcTotalWidth();
  let pos = 0;
  const speed = 1; // px/frame

  function loop() {
    pos -= speed;

    // 元セット分の幅を超えたら正確にリセット
    if (pos <= -totalWidth) pos += totalWidth;

    tagInner.style.transform = `translateX(${pos}px)`;
    requestAnimationFrame(loop);
  }

  loop();

  // リサイズ時に totalWidth を再計算
  window.addEventListener("resize", () => {
    totalWidth = calcTotalWidth();
  });
});
