# Lumi — A Little Night Creature

A browser-based virtual creature made with a JavaScript class for Week 5.

## Run
Unzip the folder and double-click `index.html`. Keep all five files together. No installation, internet connection, or server is needed. Refreshing or closing the page resets Lumi.

## Interactions
- Feed starlight: adds 20 energy and 3 bond points, unless sleeping or full.
- Pet Lumi: adds 5 bond points, with a short cooldown.
- Rest / wake: toggles sleep. Sleeping restores 1.5 energy per second.
- Light switch: bright light changes mood, removes the glow, increases energy loss, and slows growth.
- Growth: with energy above 30, Lumi grows new leaves in about 118 seconds in darkness. Growth takes longer with the light on.
- Time pauses while the page is hidden. Start fresh resets the creature after confirmation.

## Files
- `index.html`: page structure and SVG creature.
- `style.css`: responsive layout, breathing animation, light and dark environments.
- `creature.js`: Creature class, constructor, properties, actions, update method, and mood getter.
- `sketch.js`: creates the instance, handles input, and updates the interface.

## Class structure
`new Creature('Lumi')` creates one instance. Its properties store energy, bond, growth, age, sleep, and light state. `eat()`, `pet()`, `sleep()`, and `toggleLight()` change that state. `update(dt)` simulates elapsed seconds. The `mood` getter describes the current state. `render()` in sketch.js displays the instance on the page.

## Assignment connections
Environment: a room with controllable light. Response: mood, glow, and energy use. Change over time: age, energy, recovery, and new leaves. Interaction: feeding, petting, and resting. Interaction with classmates’ creatures is not implemented.

## AI assistance disclosure
The student requested a directly openable webpage based on a discussed nocturnal creature concept, then requested an English version and a file package. These requests were originally made in Chinese; this is an English summary. AI assisted with the initial code, design, translation, and packaging. Before submission, review every line and be ready to explain the class, properties, methods, and interface updates.

## Visual feedback
Petting makes Lumi bounce, smile with happy eyes, and release hearts. Feeding releases starlight and opens its mouth. Sleeping produces dream letters; a full creature acknowledges feeding without gaining extra energy. Reduced motion preferences are respected.
