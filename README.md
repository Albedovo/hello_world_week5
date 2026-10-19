# Lumi — A Little Night Creature

A browser-based virtual creature made with a JavaScript class for Week 5.

https://albedovo.github.io/hello_world_week5/

## Expanded world
- **Moonlit Forest:** moss, trees, and fireflies; gentle energy use.
- **Starlight Pond:** animated ripples and water lilies; restores energy and grows 30% faster.
- **Dawn Garden:** flowers and drifting pollen; grows 60% faster but uses more energy.

## Four evolution forms
Glowling (0 growth) → Sprout (25, new leaves) → Bloom (60, flower crown) → Star Spirit (100, wings, halo, and a new color). Each transformation plays a flash and particle effect. The journey cards track discovered forms.

## Faster growth and exploration
At 1× in the forest, Lumi reaches its final form in about 50 seconds with enough energy and the lamp off. Select 3× or 8× to speed up growth only; hunger and age still use real time. At 8×, forest evolution takes about 6.25 seconds. Growth pauses at 20 energy or below; feed or rest to recover.

Explore together adds 4 growth and 8 bond, costs 5 energy, and has a five-second cooldown. Petting, feeding, sleeping, light controls, and reactions remain available.

## Run locally
Keep index.html, creature.js, sketch.js, and style.css together, then open index.html in a browser. No installation needed. Refreshing resets the creature. Simulation pauses when the page is hidden.

## Code
- `creature.js`: the Creature class, habitats, evolution thresholds, care actions, and time updates.
- `sketch.js`: input events, visible reactions, rendering, and evolution announcements.
- `style.css`: responsive layout, illustrated environments, and form-specific appearance.
- `index.html`: interface and SVG scene / creature drawings.
