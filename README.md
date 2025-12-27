# 🧠 How Logic Actually Works in Creative Coding

### 1️⃣ What do I have?
### 2️⃣ What should change?
### 3️⃣ What controls the change?
### 4️⃣ When should it change?
### 5️⃣ How smooth should it be?

## 🧩 The Core Logic Patterns (Memorize These)

#### 🟢 Pattern 1: Looping Motion
```js
x += speed
if (x > width) x = 0
```
Used in:

- Infinite movement
- Backgrounds
- Particle flows

#### 🟢 Pattern 2: Conditional Change
```js
if (keyIsPressed) {
  x += 5
} else {
  x += 1
}
```
Used in:
- User input
- Interactive elements
- Game mechanics

#### 🟢 Pattern 3: State Toggle
```js
if (mouseIsPressed) {
  isActive = !isActive
}
```
Used in:
- On/off switches
- Mode changes
- UI elements

#### 🟢 Pattern 4: Timed Events
```js
if (millis() - lastChange > interval) {
  lastChange = millis()
  // Change something
}
```
Used in:
- Animations
- Game loops
- Periodic updates  

#### 🟢 Pattern 5: Smooth Transitions
```js
x = lerp(x, targetX, 0.1)
```
Used in:
- Easing movements
- Color fades
- UI animations

#### 🟢 Pattern 6: Random Variation
```js
x += random(-1, 1)
```
Used in:
- Natural effects
- Particle systems
- Procedural generation

### 🟢 Pattern 7: Boundary Checking
```js
if (x < 0) x = 0
if (x > width) x = width
```
Used in:
- Keeping objects on screen
- Collision detection
- Game mechanics    

#### 🟢 Pattern 8: Array Management
```js
for (let i = 0; i < particles.length; i++) {
  particles[i].update()
}
```
Used in:
- Particle systems
- Object collections
- Game entities

#### 🟢 Pattern 2: Oscillation (Wave)
```js
y = Math.sin(time) * amplitude
```
Used in:
- Wave motions
- Floating effects
- Rhythmic animations

#### 🟢 Pattern 3: Follow / Ease
```js
x += (targetX - x) * 0.1
```
Used in:
- Camera follow
- Object tracking
- Smooth movements

#### 🟢 Pattern 4: Fade In/Out
```js
alpha += (targetAlpha - alpha) * 0.1
```
Used in:
- UI elements
- Scene transitions
- Visual effects

#### 🟢 Pattern 5: Directional Movement
```js
x += cos(angle) * speed
y += sin(angle) * speed
```
Used in:
- Object movement
- Particle systems
- Game mechanics

#### 🟢 Pattern 6: Scaling
```js
size += (targetSize - size) * 0.1
```
Used in:
- Object growth/shrink
- UI effects
- Visual emphasis

#### 🟢 Pattern 7: Color Change
```js
r += (targetR - r) * 0.1
g += (targetG - g) * 0.1
b += (targetB - b) * 0.1
```
Used in:
- Color transitions
- Visual effects
- UI feedback

#### 🟢 Pattern 8: Gravity Effect
```js
y += gravity
```
Used in:
- Physics simulations
- Falling objects
- Game mechanics

#### 🟢 Pattern 4: Distance-based Logic
```js
let d = dist(x1, y1, x2, y2)
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
velocity += acceleration
x += velocity
```
Used in:
- Physics simulations
- Smooth movements
- Game mechanics    

#### 🟢 Pattern 6: Object Spawning
```js
if (frameCount % spawnInterval === 0) {
  spawnObject()
}
```
Used in:
- Enemy spawning
- Particle generation
- Game events

#### 🟢 Pattern 7: Health/Damage System
```js
if (isHit) {
  health -= damage
}
```
Used in:
- Game mechanics
- Player stats
- Enemy interactions    

#### 🟢 Pattern 8: Score Tracking
```js
if (itemCollected) {
  score += points
}
```
Used in:
- Game scoring      
- Player progression
- Achievement systems

#### 🟢 Pattern 5: Random but Controlled
```js
let offset = Math.random() * 10
x += offset
```
Used in:
- Natural randomness
- Procedural effects
- Dynamic variations

#### 🟢 Time-based animation
```js
let time = performance.now() * 0.001
x = Math.sin(time) * 50
```
Used in:
- Smooth periodic motions
- Background animations
- Dynamic effects

#### 🟢 Scroll-based logic
```js
const progress = window.scrollY / (document.body.scrollHeight - innerHeight)
element.style.transform = `translateX(${progress * 300}px)`
```
Used in:
- Parallax effects
- Scroll-triggered animations
- Dynamic content loading

#### 🟢 Mouse proximity effects
```js
const d = Math.hypot(mouseX - x, mouseY - y)
if (d < 100) {
  size = 50
} else {
  size = 20
}
```
Used in:
- Interactive elements
- Hover effects
- Dynamic sizing

#### 🟢 Mouse interaction
```js
window.addEventListener("mousemove", e => {
  mouseX = e.clientX
})
```
Used in:
- Interactive experiences
- Dynamic responses
- User engagement


#### 🟢 State logic (creative websites need this!)
```js
let activeSection = 0

if (scroll > 500) activeSection = 1
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