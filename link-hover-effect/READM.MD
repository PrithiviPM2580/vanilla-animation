# Link Hover Effect

## Use four block only:

1. Structural(HTML)
2. Styling(CSS)
3. Inputs(Events)
4. Motion Logic(JS)


### Structure(What exists)
```yml
Wrapper
- Link (a)
  - Span (text)
- Cursor (div)
```

### Styling(How it looks)
```text
Wrapper
- center aligned

Link
- transition (color/transform)

Text (span)
- pointer-event: none
- transition

Cursor
- fixed position
- transition: transform
- default scale:1
```
### Inputs (What user does)
```text
Mouse move
Mouse enter (link)
Mouse leave (link)
```

### Motion Logic (What happens)
```text
State:
cursorX
cursorY
cursorScale

Rules:
Rule 1: Cursor follows mouse (with easing)
Rule 2: On link hover -> cursoeScale =8
Rule 3: On leave -> cursoeScale =1
```

### Translate Logic
```js
//Follow Motion

x+= (mouseX -x) * 0.1
y+= (mouseY -y) * 0.1

//Hover Sate
mouseenter -> scale=8
mouseleave -> scale=1

//Apply transform
transform: translate(x,y) scale(scale)
```




