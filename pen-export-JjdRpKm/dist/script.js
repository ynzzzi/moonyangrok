


const scrollSection = document.querySelector('.horizontal-scroll__section');
const scrollContent = document.querySelector('.horizontal-scroll__content');

const scrollHeight = scrollSection.clientHeight;
const contentWidth = scrollContent.clientWidth;

document.addEventListener('scroll', e => {
  const scrolled = window.pageYOffset;
  const sectionOffset = Math.abs(scrollSection.offsetTop - scrolled);
  const notReachedBottom = parseInt(Math.max(0, scrollSection.getBoundingClientRect().bottom - window.innerHeight));

  if (scrollSection.offsetTop <= scrolled && notReachedBottom) {

    gsap.to(scrollContent, {
      x: -sectionOffset });

  }
});



const heroTween = background => {
  const tl = gsap.timeline();

  tl.to(background, {
    height: '100%',
    ease: 'power3.easeOut' });



  return tl;
};

const controller = new ScrollMagic.Controller();

const heroScene = new ScrollMagic.Scene({
  triggerElement: '.hero',
  triggerHook: 0,
  duration: '40%' }).

setTween(heroTween('.hero__background')).
addIndicators({ name: "1" });
//.addTo(controller);


window.addEventListener('load', () => {
  const track = document.querySelector('.slider-track');
  const speed = 0.8;               // px/frame, 필요 시 조절
  const images = Array.from(track.children);
  const gap = 32;                  // CSS gap 값과 일치시킬 것

  // 1) 트랙 복제: 기존 이미지 모두 복사해서 뒤에 붙이기
  images.forEach(img => {
    const clone = img.cloneNode(true);
    track.appendChild(clone);
  });

  // 2) 절반 트랙 너비 계산 (원본 부분만)
  const singleTrackWidth = images.reduce((sum, img) => {
    return sum + img.offsetWidth + gap;
  }, 0) - gap; // 마지막 gap 제거

  let position = 0;

  function loop() {
    position -= speed;
    // 절반 만큼 넘어가면 리셋
    if (Math.abs(position) >= singleTrackWidth) {
      position = 0;
    }
    track.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(loop);
  }
  loop();

  // 3) 호버 시 이미지 교체
  document.querySelectorAll('.slider-track img').forEach(img => {
    const orig = img.src;
    const hov  = img.getAttribute('data-hover');
    img.addEventListener('mouseenter', () => hov && (img.src = hov));
    img.addEventListener('mouseleave', () => img.src = orig);
  });
});

gsap.registerPlugin(ScrollTrigger);

// 컨테이너를 화면에 고정(pin)
ScrollTrigger.create({
  trigger: ".scale-section",
  start: "top top",
  end: "bottom top",
  pin: ".scale-container",
  pinSpacing: false,
});

// 왼쪽 이미지만 가로로 2배 확대
gsap.fromTo(
  ".scale-img.left",
  { scaleX: 1 },
  {
    scaleX: 2,
    scrollTrigger: {
      trigger: ".scale-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  }
);

