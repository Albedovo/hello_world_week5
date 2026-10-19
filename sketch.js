// The page receives input; Creature decides how its state changes.
const lumi = new Creature('Lumi');
const byId = id => document.getElementById(id);
let lastInteraction = 0;
let reactionTimer;
// A temporary visual reaction is independent from the creature's lasting stats.
function react(kind) {
  const pet = byId('pet');
  clearTimeout(reactionTimer);
  pet.getAnimations().forEach(animation => animation.cancel());
  pet.dataset.reaction = kind;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reducedMotion) {
    pet.animate([
      { translate: '0 0', scale: '1 1' },
      { translate: '0 5px', scale: '1.12 .88', offset: 0.15 },
      { translate: '0 -32px', scale: '.95 1.07', offset: 0.45 },
      { translate: '0 0', scale: '1.04 .96', offset: 0.8 },
      { translate: '0 0', scale: '1 1' }
    ], { duration: kind === 'dream' ? 600 : 900, easing: 'ease-out' });
  }
  const symbols = kind === 'love' ? ['♥', '♥', '♡'] : kind === 'snack' ? ['✦', '✧', '✦', '✧'] : kind === 'dream' ? ['z', 'z', 'Z'] : ['✓'];
  const room = document.querySelector('.habitat');
  const petBox = pet.getBoundingClientRect();
  const roomBox = room.getBoundingClientRect();
  symbols.forEach((symbol, index) => {
    const particle = document.createElement('span');
    particle.className = `reaction-particle ${kind}`;
    particle.setAttribute('aria-hidden', 'true');
    particle.textContent = symbol;
    particle.style.left = `${petBox.left - roomBox.left + petBox.width / 2 + (index - (symbols.length - 1) / 2) * 35}px`;
    particle.style.top = `${petBox.top - roomBox.top + petBox.height * (kind === 'snack' ? .73 : .35)}px`;
    room.appendChild(particle);
    if (reducedMotion) { setTimeout(() => particle.remove(), 1000); return; }
    const animation = particle.animate(kind === 'snack' ? [
      { transform: `translate(${(index % 2 ? 1 : -1) * 60}px, 60px) scale(.4)`, opacity: 0 },
      { opacity: 1, offset: .25 },
      { transform: 'translate(0, -5px) scale(1.3)', opacity: 1, offset: .7 },
      { transform: 'translate(0, -12px) scale(0)', opacity: 0 }
    ] : [
      { transform: 'translateY(0) scale(.4)', opacity: 0 },
      { opacity: 1, offset: .2 },
      { transform: `translate(${(index - 1) * 15}px, -90px) scale(1.2)`, opacity: 0 }
    ], { duration: 1400, delay: index * 100, fill: 'both', easing: 'ease-out' });
    animation.onfinish = () => particle.remove();
  });
  reactionTimer = setTimeout(() => { delete pet.dataset.reaction; }, 1600);
}

function render() {
  for (const key of ['energy', 'bond', 'growth']) {
    byId(key).value = lumi[key];
    byId(`${key}-value`).textContent = `${Math.round(lumi[key])} / 100`;
  }
  byId('age').textContent = `${Math.floor(lumi.age / 60)}:${String(Math.floor(lumi.age % 60)).padStart(2, '0')}`;
  byId('stage').textContent = lumi.growth >= 100 ? 'Growing' : 'Baby';
  byId('mood').textContent = lumi.mood;
  byId('environment').textContent = lumi.lightOn ? '☼ DAY · LIGHTS ON' : '☾ NIGHT · LIGHTS OFF';
  byId('light').textContent = lumi.lightOn ? '☾ Turn off the light' : '☼ Turn on the light';
  byId('light').setAttribute('aria-pressed', String(lumi.lightOn));
  byId('sleep').innerHTML = lumi.sleeping ? '☀ Wake Lumi up <small>A fresh little moment</small>' : '☾ Let Lumi rest <small>Recharge slowly</small>';
  document.body.classList.toggle('lit', lumi.lightOn);
  document.body.classList.toggle('sleeping', lumi.sleeping);
  document.body.classList.toggle('adult', lumi.growth >= 100);
}
for (const [id, method] of [['feed','eat'], ['sleep','sleep'], ['pet','pet'], ['light','toggleLight']]) {
  byId(id).addEventListener('click', () => {
    // A short cooldown prevents repeated pats from filling the bond instantly.
    if (id === 'pet' && performance.now() - lastInteraction < 600) return;
    if (id === 'pet') lastInteraction = performance.now();
    const canEat = !lumi.sleeping && lumi.energy < 100;
    byId('speech').textContent = lumi[method]();
    if (id === 'pet') react(lumi.sleeping ? 'dream' : 'love');
    if (id === 'feed') react(canEat ? 'snack' : lumi.sleeping ? 'dream' : 'full');
    render();
  });
}
byId('reset').addEventListener('click', () => {
  if (confirm('Start again? Growth and bond will return to their starting values.')) {
    Object.assign(lumi, new Creature('Lumi'));
    byId('speech').textContent = 'Hi, I’m Lumi. Let’s get to know each other again.';
    render();
  }
});
let previousTime = performance.now();
setInterval(() => {
  const now = performance.now();
  // Pause while the page is hidden so Lumi does not run out of energy away from you.
  const dt = document.hidden ? 0 : Math.min((now - previousTime) / 1000, 2);
  previousTime = now;
  const wasAdult = lumi.growth >= 100;
  lumi.update(dt);
  if (!wasAdult && lumi.growth >= 100) byId('speech').textContent = 'Look! New leaves! You helped me grow.';
  render();
}, 250);
render();
