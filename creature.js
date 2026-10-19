// Creature keeps each creature’s state and behavior together.
class Creature {
  constructor(name) {
    this.name = name;
    this.energy = 75;
    this.bond = 10;
    this.growth = 0;
    this.age = 0;
    this.sleeping = false;
    this.lightOn = false;
  }
  // Keep every stat between 0 and 100, including after feeding.
  clamp(value) { return Math.max(0, Math.min(100, value)); }
  eat() {
    if (this.sleeping) return 'I’m still sleeping. A snack when I wake up?';
    if (this.energy >= 100) return 'My tummy is already full of starlight.';
    this.energy = this.clamp(this.energy + 20);
    this.bond = this.clamp(this.bond + 3);
    return 'Nom! Starlight tastes so sweet.';
  }
  sleep() {
    this.sleeping = !this.sleeping;
    return this.sleeping ? 'Good night. Stay quietly with me for a while.' : 'I’m awake! Let’s spend some time together.';
  }
  pet() {
    if (this.sleeping) return 'Zzz… Lumi is dreaming of glowing stars.';
    this.bond = this.clamp(this.bond + 5);
    return 'I like having you here. Come a little closer.';
  }
  toggleLight() {
    this.lightOn = !this.lightOn;
    return this.lightOn ? 'A little bright… I prefer the night.' : 'The lights are off. Now I can glow again.';
  }
  // dt is elapsed time in seconds; growth depends on energy and light.
  update(dt) {
    this.age += dt;
    this.energy = this.clamp(this.energy + dt * (this.sleeping ? 1.5 : this.lightOn ? -0.5 : -0.15));
    if (this.energy > 30) this.growth = this.clamp(this.growth + dt * (this.lightOn ? 0.2 : 0.85));
  }
  get mood() {
    if (this.sleeping) return 'Collecting starlight in a dream';
    if (this.energy < 25) return 'Feeling hungry for a little starlight';
    if (this.lightOn) return 'Too bright in here. Missing the night.';
    if (this.growth >= 100) return 'New leaves! Thank you for caring for me.';
    return this.bond >= 50 ? 'Feeling safe and close to you' : 'Enjoying the quiet night';
  }
}
if (typeof module !== 'undefined') module.exports = Creature;
