# 🧠 How Logic Actually Works in Creative Coding

### 1️⃣ What do I have?

### 2️⃣ What should change?

### 3️⃣ What controls the change?

### 4️⃣ When should it change?

### 5️⃣ How smooth should it be?

## 🧩 The Core Logic Patterns (Memorize These)

#### 🟢 Pattern 1: Looping Motion

```js
x += speed;
if (x > width) x = 0;
```

Used in:

- Infinite movement
- Backgrounds
- Particle flows

#### 🟢 Pattern 2: Conditional Change

```js
if (keyIsPressed) {
  x += 5;
} else {
  x += 1;
}
```

Used in:

- User input
- Interactive elements
- Game mechanics

#### 🟢 Pattern 3: State Toggle

```js
if (mouseIsPressed) {
  isActive = !isActive;
}
```

Used in:

- On/off switches
- Mode changes
- UI elements

#### 🟢 Pattern 4: Timed Events

```js
if (millis() - lastChange > interval) {
  lastChange = millis();
  // Change something
}
```

Used in:

- Animations
- Game loops
- Periodic updates

#### 🟢 Pattern 5: Smooth Transitions

```js
x = lerp(x, targetX, 0.1);
```

Used in:

- Easing movements
- Color fades
- UI animations

#### 🟢 Pattern 6: Random Variation

```js
x += random(-1, 1);
```

Used in:

- Natural effects
- Particle systems
- Procedural generation

### 🟢 Pattern 7: Boundary Checking

```js
if (x < 0) x = 0;
if (x > width) x = width;
```

Used in:

- Keeping objects on screen
- Collision detection
- Game mechanics

#### 🟢 Pattern 8: Array Management

```js
for (let i = 0; i < particles.length; i++) {
  particles[i].update();
}
```

Used in:

- Particle systems
- Object collections
- Game entities

#### 🟢 Pattern 2: Oscillation (Wave)

```js
y = Math.sin(time) * amplitude;
```

Used in:

- Wave motions
- Floating effects
- Rhythmic animations

#### 🟢 Pattern 3: Follow / Ease

```js
x += (targetX - x) * 0.1;
```

Used in:

- Camera follow
- Object tracking
- Smooth movements

#### 🟢 Pattern 4: Fade In/Out

```js
alpha += (targetAlpha - alpha) * 0.1;
```

Used in:

- UI elements
- Scene transitions
- Visual effects

#### 🟢 Pattern 5: Directional Movement

```js
x += cos(angle) * speed;
y += sin(angle) * speed;
```

Used in:

- Object movement
- Particle systems
- Game mechanics

#### 🟢 Pattern 6: Scaling

```js
size += (targetSize - size) * 0.1;
```

Used in:

- Object growth/shrink
- UI effects
- Visual emphasis

#### 🟢 Pattern 7: Color Change

```js
r += (targetR - r) * 0.1;
g += (targetG - g) * 0.1;
b += (targetB - b) * 0.1;
```

Used in:

- Color transitions
- Visual effects
- UI feedback

#### 🟢 Pattern 8: Gravity Effect

```js
y += gravity;
```

Used in:

- Physics simulations
- Falling objects
- Game mechanics

#### 🟢 Pattern 4: Distance-based Logic

```js
let d = dist(x1, y1, x2, y2);
if (d < threshold) {
  // Trigger event
}
```

Used in:

- Proximity effects
- Interaction zones
- Game mechanics

#### 🟢 Pattern 5: Acceleration and Deceleration

```js
velocity += acceleration;
x += velocity;
```

Used in:

- Physics simulations
- Smooth movements
- Game mechanics

#### 🟢 Pattern 6: Object Spawning

```js
if (frameCount % spawnInterval === 0) {
  spawnObject();
}
```

Used in:

- Enemy spawning
- Particle generation
- Game events

#### 🟢 Pattern 7: Health/Damage System

```js
if (isHit) {
  health -= damage;
}
```

Used in:

- Game mechanics
- Player stats
- Enemy interactions

#### 🟢 Pattern 8: Score Tracking

```js
if (itemCollected) {
  score += points;
}
```

Used in:

- Game scoring
- Player progression
- Achievement systems

#### 🟢 Pattern 5: Random but Controlled

```js
let offset = Math.random() * 10;
x += offset;
```

Used in:

- Natural randomness
- Procedural effects
- Dynamic variations

#### 🟢 Time-based animation

```js
let time = performance.now() * 0.001;
x = Math.sin(time) * 50;
```

Used in:

- Smooth periodic motions
- Background animations
- Dynamic effects

#### 🟢 Scroll-based logic

```js
const progress = window.scrollY / (document.body.scrollHeight - innerHeight);
element.style.transform = `translateX(${progress * 300}px)`;
```

Used in:

- Parallax effects
- Scroll-triggered animations
- Dynamic content loading

#### 🟢 Mouse proximity effects

```js
const d = Math.hypot(mouseX - x, mouseY - y);
if (d < 100) {
  size = 50;
} else {
  size = 20;
}
```

Used in:

- Interactive elements
- Hover effects
- Dynamic sizing

#### 🟢 Mouse interaction

```js
window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
});
```

Used in:

- Interactive experiences
- Dynamic responses
- User engagement

#### 🟢 State logic (creative websites need this!)

```js
let activeSection = 0;

if (scroll > 500) activeSection = 1;
```

Used in:

- Section-based animations
- Dynamic content changes
- Interactive storytelling

#### 🟢 Responsive design logic

```js
if (window.innerWidth < 600) {
  // Adjust layout for mobile
}
```

Used in:

- Adaptive layouts
- Mobile-friendly designs
- Dynamic styling

```javascript
document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const gallery = document.getElementById("gallery");
  const spin = gallery.querySelector("ul");
  const items = spin.children;

  const scrollBar = document.getElementById("scroll");
  const scrollSpace = scrollBar.firstElementChild;
  const dragger = scrollSpace.firstElementChild;

  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");

  // State
  let distance = 0;
  let offset = 0;
  let current = 0;
  let origin = 0;
  let end = 0;

  let start = {};
  const scroll = 100;
  const angle = 360 / 20;

  let radius;

  // Canvas data
  const dots = 20;
  const data = [];
  const center = {};

  // Utils
  const random = (min, max) => Math.random() * (max - min) + min;

  const convert = (n, z) => n / (z / 2000 + 1);

  const opacity = (i) => 1 - Math.abs((origin - angle * i) / 30);

  const pixels = (value) => (value * scroll) / end;

  const degrees = (value) => (value * end) / scroll;

  const change = (value) => {
    offset = value;
    distance = offset;
    current = origin;
  };

  // Canvas animation
  const drawCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    data.forEach((dot) => {
      const z = dot.r * Math.cos(dot.a);
      const s = convert(1, z);

      const x = center.x + convert(dot.x, z);
      const y = center.y + convert(dot.r * Math.sin(dot.a), z);

      const o = (-z / dot.r) * 0.4;

      ctx.fillStyle = `rgba(255,255,255,${o})`;
      ctx.fillRect(x, y, s, s);

      dot.a += offset / 2000 + 0.002 * (offset < 0 ? -1 : 1);

      if (dot.a > Math.PI * 1.5) dot.a -= Math.PI;
      if (dot.a < Math.PI * 0.5) dot.a += Math.PI;
    });
  };

  // Update gallery
  const updateProjects = () => {
    spin.style.transform = `rotateX(${origin}deg)`;
    dragger.style.transform = `translateY(${(origin * 100) / end}px)`;

    [...items].forEach((item, i) => {
      item.style.opacity = opacity(i);
    });
  };

  const move = () => {
    offset *= 0.96;
    origin = current + distance - offset;
  };

  const animate = () => {
    move();
    updateProjects();
    // drawCanvas();
    requestAnimationFrame(animate);
  };

  // Wheel scroll
  const wheel = (event) => {
    const direction = event.deltaY > 0 ? 1 : -1;
    const step = angle / 2;

    if (origin > end - step && direction > 0) distance = end - origin;
    else if (origin < step && direction < 0) distance = origin * direction;
    else distance = step * direction;

    offset = distance;
    current = origin;

    event.preventDefault();
  };

  // Resize
  const resize = () => {
    canvas.width = document.body.offsetWidth;
    canvas.height = document.body.offsetHeight;

    center.x = canvas.width / 2;
    center.y = canvas.height / 2;

    createDots();
  };

  // Create particles
  const createDots = () => {
    data.length = 0;

    const width = canvas.width / 2 / 20;
    const circles = Math.ceil(canvas.width / 2 / width);

    for (let i = 0; i < circles; i++) {
      const x = i * width;
      const r = random(100, 10);

      for (let j = 0; j < dots; j++) {
        data.push({
          x: x,
          r: r,
          a: Math.PI * (j / dots) + Math.PI / 2,
        });

        if (i) {
          data.push({
            x: -x,
            r: r,
            a: Math.PI * (j / dots) + Math.PI / 2,
          });
        }
      }
    }
  };

  // Style 3D gallery
  const style = () => {
    gallery.style.transform = `translateZ(-${radius}px)`;

    [...items].forEach((item, i) => {
      item.style.transform = `rotateX(-${angle * i}deg) translateZ(${radius}px)`;
    });
  };

  // Init values
  const initValues = () => {
    end = angle * (items.length - 1);

    radius = gallery.offsetHeight / 1.7 / Math.tan(Math.PI / 20);
  };

  // Events
  document.addEventListener("wheel", wheel);
  window.addEventListener("resize", resize);

  // Start
  initValues();
  resize();
  style();
  animate();
});
```
