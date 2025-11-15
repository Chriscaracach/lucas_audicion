# Mobile Swipeable App with Neobrutalism Design - Implementation Guide

## Overview
Transform a standard React app into a mobile-only, swipeable page experience with neobrutalism design aesthetic and concert-inspired color palette.

## Design Philosophy
- **Mobile-first**: No desktop layout considerations
- **Neobrutalism**: Thick borders (4-5px), heavy shadows (8-12px offset), bold typography, high contrast
- **Concert theme**: Color palette inspired by stage lights at a guitar concert
- **Vertical swipe navigation**: Users swipe up/down to navigate between full-screen pages

## Color Palette
```css
--black: #000000      /* Backgrounds */
--white: #FFFFFF      /* Text & borders */
--orange: #FF6B35     /* Warm stage light */
--yellow: #FFD23F     /* Stage spotlight */
--purple: #B565D8     /* Purple spotlight */
--pink: #E31B6D       /* Accent color */
--amber: #FFA500      /* Additional accent */
```

## App Structure

### 1. Component Architecture (App.tsx)

**State Management:**
```typescript
const [currentPage, setCurrentPage] = useState(0);
const [touchStart, setTouchStart] = useState(0);
const [touchEnd, setTouchEnd] = useState(0);
```

**Data Structure - Pages Array:**
```typescript
interface PageData {
  id: number;
  backgroundImage: string;
  field1Placeholder: string;
  field2Placeholder: string;
  accentColor: string;
}

const pages: PageData[] = [
  {
    id: 1,
    backgroundImage: "./assets/back-1.jpeg",
    field1Placeholder: "Tu nombre?",
    field2Placeholder: "Tu canción favorita?",
    accentColor: "#FF6B35",
  },
  // Add more pages as needed
];
```

**Touch Handlers:**
- `handleTouchStart`: Capture initial touch Y position
- `handleTouchMove`: Track current touch Y position
- `handleTouchEnd`: Calculate swipe direction (75px threshold)
  - Swipe up (touchStart - touchEnd > 75): Next page
  - Swipe down (touchStart - touchEnd < -75): Previous page

**Keyboard Navigation:**
- Arrow Down: Next page
- Arrow Up: Previous page

### 2. Page Types

#### First Page (Welcome/Landing)
```tsx
const FirstPage = () => (
  <div className="page first-page">
    <div className="first-page-content">
      <h1 className="neo-title">ROBIDU</h1>
      <p className="neo-subtitle">Te Ama</p>
      <div className="swipe-indicator">
        <span>↓</span>
        <p>Deslizá para continuar</p>
      </div>
    </div>
  </div>
);
```

**Features:**
- Pure black background
- Large title with multi-color text shadow (orange + purple)
- Bordered subtitle with pink shadow
- Animated swipe indicator (bounce animation)
- Pulsing title animation

#### Form Pages (Data-driven)
```tsx
const FormPage = ({ page }: { page: PageData }) => (
  <div className="page form-page" style={{ backgroundImage: `url(${page.backgroundImage})` }}>
    <div className="page-overlay"></div>
    <div className="neo-form-container">
      <form action="https://formsubmit.co/email@example.com" method="POST">
        <input name="field1" placeholder={page.field1Placeholder} style={{ borderColor: page.accentColor }} />
        <input name="field2" placeholder={page.field2Placeholder} style={{ borderColor: page.accentColor }} />
        <button type="submit" style={{ backgroundColor: page.accentColor, borderColor: page.accentColor }}>
          <span>ENVIAR</span>
        </button>
      </form>
    </div>
  </div>
);
```

**Features:**
- Full-screen background image
- Dark overlay (60% opacity black)
- Centered form with black background
- White border + white shadow on form container
- Inputs with dynamic border colors from page data
- Button with dynamic background from page data
- All inputs uppercase with bold Courier New font

#### Last Page (Social/Contact)
```tsx
const LastPage = () => (
  <div className="page last-page">
    <div className="last-page-content">
      <h2 className="neo-title-small">CONECTÁ</h2>
      <div className="social-grid">
        <a href="instagram-url" className="neo-social-button">
          <i className="fab fa-instagram"></i>
          <span>INSTAGRAM</span>
        </a>
        {/* More social buttons */}
      </div>
    </div>
  </div>
);
```

**Features:**
- Black background
- 2x2 grid of social buttons
- Each button has unique color (pink, orange, yellow, purple)
- Icons + text labels
- FontAwesome icons

### 3. Navigation System

**Pages Wrapper:**
```tsx
<div className="pages-wrapper" style={{ transform: `translateY(-${currentPage * 100}vh)` }}>
  <FirstPage />
  {pages.map((page) => <FormPage key={page.id} page={page} />)}
  <LastPage />
</div>
```

**Page Indicators:**
```tsx
<div className="page-indicators">
  {Array.from({ length: totalPages }).map((_, index) => (
    <button
      key={index}
      className={`indicator ${currentPage === index ? "active" : ""}`}
      onClick={() => setCurrentPage(index)}
    />
  ))}
</div>
```

## CSS Implementation (App.css)

### Key Styles

**App Container:**
```css
.app-container {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  touch-action: pan-y; /* Enable vertical swipe */
}
```

**Pages Wrapper:**
```css
.pages-wrapper {
  height: 100vh;
  width: 100vw;
  transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55); /* Bounce easing */
}
```

**Neobrutalism Input:**
```css
.neo-input {
  padding: 1rem;
  font-size: 1rem;
  font-family: "Courier New", monospace;
  border: 4px solid var(--white);
  background: var(--white);
  color: var(--black);
  text-transform: uppercase;
  font-weight: 700;
}

.neo-input:focus {
  outline: none;
  transform: translate(-4px, -4px);
  box-shadow: 8px 8px 0 currentColor; /* Shadow lifts on focus */
}
```

**Neobrutalism Button:**
```css
.neo-button {
  padding: 1.2rem;
  font-size: 1.2rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  border: 4px solid var(--black);
  cursor: pointer;
  box-shadow: 8px 8px 0 var(--black);
}

.neo-button:active {
  transform: translate(4px, 4px); /* Press down effect */
  box-shadow: 0 0 0 var(--black);
}
```

**Page Indicators:**
```css
.page-indicators {
  position: fixed;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 1000;
}

.indicator {
  width: 12px;
  height: 12px;
  border: 3px solid var(--white);
  background: transparent;
}

.indicator.active {
  background: var(--white);
  box-shadow: 0 0 0 3px var(--orange);
}
```

**Animations:**
```css
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(20px); }
}
```

### Typography
- **Font**: Courier New (monospace) for everything
- **Title sizes**: 4.5rem (main), 3rem (section)
- **All uppercase** for buttons and titles
- **Letter spacing**: 0.2-0.5rem for titles
- **Font weights**: 700 (inputs), 900 (buttons, titles)

### Shadows & Borders
- **Form container**: 5px border, 12px shadow
- **Inputs**: 4px border, 8px shadow on focus
- **Buttons**: 4px border, 8px shadow
- **Social buttons**: 4px border, 6px shadow
- **All shadows**: Hard offset (no blur), black color

### Background Images
- **Full coverage**: `background-size: cover`
- **Centered**: `background-position: center`
- **Overlay**: 60% black opacity for readability

## Implementation Steps

1. **Replace App.tsx** with the new structure including:
   - Import useState, useRef, useEffect
   - Define PageData interface
   - Create pages array
   - Implement touch handlers
   - Create FirstPage, FormPage, LastPage components
   - Set up pages-wrapper with transform animation
   - Add page indicators

2. **Replace App.css** entirely:
   - Define CSS variables for color palette
   - Reset styles with overflow: hidden on body
   - Implement pages structure (.app-container, .pages-wrapper, .page)
   - Style first-page with animations
   - Style form-page with overlay and form styles
   - Style last-page with social grid
   - Add neobrutalism styles (borders, shadows, transforms)
   - Add page indicators styles

3. **Ensure index.css** has a basic CSS reset

4. **Assets needed**:
   - Background images in `./assets/` folder
   - FontAwesome loaded in HTML for icons

## Customization Points

- **Add pages**: Append to `pages` array with new data
- **Change colors**: Modify CSS variables or individual `accentColor` values
- **Adjust swipe sensitivity**: Change threshold from 75px in touch handlers
- **Animation speed**: Modify transition duration in `.pages-wrapper`
- **Form action**: Update form `action` attribute with your endpoint

## Dependencies
- React (with hooks support)
- FontAwesome (for icons in social buttons)
- No additional npm packages required

## Mobile Considerations
- `touch-action: pan-y` allows native vertical scrolling feel
- `position: fixed` prevents address bar interference
- `100vh` ensures full screen on all mobile browsers
- All touch targets meet accessibility guidelines (48x48px minimum)
