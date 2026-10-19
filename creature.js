// One instance owns its needs, environment, growth, and available actions.
class Creature {
  static habitats = {
    forest: { name: 'Moonlit Forest', growth: 1, energy: -0.18, description: 'Fireflies, soft moss, and a familiar moon. A gentle place to begin.', explore: 'We found a little firefly hiding in the moss!' },
    pond: { name: 'Starlight Pond', growth: 1.3, energy: 0.35, description: 'Cool water restores energy. Reflected starlight helps Lumi grow 30% faster.', explore: 'Look at those ripples! The pond is full of tiny stars.' },
    garden: { name: 'Dawn Garden', growth: 1.6, energy: -0.45, description: 'Warm flowers boost growth by 60%, but exploring here takes more energy.', explore: 'A flower shared its golden pollen with me!' }
  };
  static forms = [
    { name: 'Glowling', threshold: 0, detail: 'A tiny light finding its feet.', symbol: '●' },
    { name: 'Sprout', threshold: 25, detail: 'Two new leaves reach for the sky.', symbol: '❧' },
    { name: 'Bloom', threshold: 60, detail: 'A flower crown, grown with care.', symbol: '✿' },
    { name: 'Star Spirit', threshold: 100, detail: 'Wings unfold. A little world takes flight.', symbol: '✧' }
  ];
  constructor(name) {
    this.name = name;
    this.energy = 75;
    this.bond = 10;
    this.growth = 0;
    this.age = 0;
    this.sleeping = false;
    this.lightOn = false;
    this.habitat = 'forest';
    this.growthSpeed = 1;
    this.exploreCooldown = 0;
  }
  clamp(value) { return Math.max(0, Math.min(100, value)); }
  get formIndex() { return Creature.forms.reduce((index, form, i) => this.growth >= form.threshold ? i : index, 0); }
  get form() { return Creature.forms[this.formIndex]; }
  get environment() { return Creature.habitats[this.habitat]; }
  eat() {
    if (this.sleeping) return 'I’m still sleeping. A snack when I wake up?';
    if (this.energy >= 100) return 'My tummy is already full of starlight.';
    this.energy = this.clamp(this.energy + 20);
    this.bond = this.clamp(this.bond + 3);
    return 'Nom! Starlight tastes so sweet.';
  }
  sleep() {
    this.sleeping = !this.sleeping;
    return this.sleeping ? 'Good night. Stay quietly with me for a while.' : 'I’m awake! Where shall we explore next?';
  }
  pet() {
    if (this.sleeping) return 'Zzz… Lumi is dreaming of glowing stars.';
    this.bond = this.clamp(this.bond + 5);
    return 'I like having you here. Come a little closer.';
  }
  toggleLight() {
    this.lightOn = !this.lightOn;
    return this.lightOn ? 'A little bright… I grow better with the lamp off.' : 'That’s better. Let my little light shine.';
  }
  travel(habitat) {
    if (!Object.hasOwn(Creature.habitats, habitat)) return 'That place is still a mystery.';
    this.habitat = habitat;
    return `Welcome to ${this.environment.name}. Let’s make a little memory here.`;
  }
  setGrowthSpeed(speed) {
    if ([1, 3, 8].includes(speed)) this.growthSpeed = speed;
  }
  explore() {
    if (this.sleeping) return 'Let me finish my dream before we explore.';
    if (this.exploreCooldown > 0) return 'One little breath before our next adventure.';
    if (this.energy < 10) return 'A snack first? I need a little energy to explore.';
    this.energy = this.clamp(this.energy - 5);
    this.bond = this.clamp(this.bond + 8);
    this.growth = this.clamp(this.growth + 4);
    this.exploreCooldown = 5;
    return this.environment.explore;
  }
  // Only growth is sped up: hunger and age always follow real seconds.
  update(dt) {
    this.age += dt;
    this.exploreCooldown = Math.max(0, this.exploreCooldown - dt);
    this.energy = this.clamp(this.energy + dt * (this.sleeping ? 2 : this.environment.energy - (this.lightOn ? 0.25 : 0)));
    if (this.energy > 20) {
      const rate = 2 * this.environment.growth * this.growthSpeed * (this.lightOn ? 0.6 : 1);
      this.growth = this.clamp(this.growth + dt * rate);
    }
  }
  get mood() {
    if (this.sleeping) return 'Collecting starlight in a dream';
    if (this.energy <= 20) return 'Feeling hungry. Growth is paused.';
    if (this.lightOn) return 'A little bright, but I’m still growing';
    if (this.formIndex === 3) return 'A star spirit, with you by my side';
    return this.bond >= 50 ? 'Feeling safe and close to you' : `Feeling at home in ${this.environment.name}`;
  }
}
if (typeof module !== 'undefined') module.exports = Creature;
