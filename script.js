const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function typeText(el, text, speed = 55) {
  for (let i = 0; i <= text.length; i++) {
    el.textContent = text.slice(0, i);
    await sleep(speed);
  }
}

async function deleteText(el, speed = 35) {
  const text = el.textContent;
  for (let i = text.length; i >= 0; i--) {
    el.textContent = text.slice(0, i);
    await sleep(speed);
  }
}

async function fadeOutText(el, duration = 300) {
  el.style.transition = `opacity ${duration}ms ease`;
  el.style.opacity = '0';
  await sleep(duration);
  el.textContent = '';
  el.style.transition = 'none';
  el.style.opacity = '1';
}

async function runIntro() {
  const el = document.getElementById('typewriter-text');
  const sub = document.getElementById('hero-sub');
  const hint = document.querySelector('.scroll-hint');

  await sleep(500);
  await typeText(el, 'Sehr geehrte Damen & Herren…', 60);
  await sleep(1100);
  await deleteText(el, 32);
  await sleep(250);
  await typeText(el, 'Servus, ich bin der Fabian', 65);

  sub.classList.add('visible');
  hint.classList.add('visible');

  loopGreeting(el);
}

async function loopGreeting(el) {
  while (true) {
    await sleep(4000);
    await fadeOutText(el);
    await sleep(200);
    await typeText(el, 'Sehr geehrte Damen & Herren…', 55);
    await sleep(1300);
    await deleteText(el, 30);
    await sleep(200);
    await typeText(el, 'Servus, ich bin der Fabian', 60);
  }
}

function setupScrollReveal() {
  const targets = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  targets.forEach((el) => observer.observe(el));
}

runIntro();
setupScrollReveal();

console.log(
  '%cHey, neugieriger Developer 👋',
  'color:#e8a33d; font-weight:bold; font-size:14px;'
);
console.log(
  '%cJa, auch diese Zeile wurde mit viel Schweiss handgeschrieben.',
  'color:#b8ad9c;'
);
console.log(
  '%cGeschätzter Stromverbrauch für diese Seite: ~0.4 kWh.\nDas reicht für ein kühles Bier, aber nicht für ein gebrautes.',
  'color:#e8a33d;'
);
