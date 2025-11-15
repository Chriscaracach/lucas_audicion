# Setup Instructions - Lucas Dangelis Concert

## ✅ Concert Rating App Complete!

A mobile swipeable app for audience members to rate Lucas Dangelis' guitar interpretations during his concert.

## 🖼️ Required Assets

You need to add background images to the `src/assets/` folder:

- `back-1.jpeg` - Background for first form page
- `back-2.jpeg` - Background for second form page  
- `back-3.jpeg` - Background for third form page

These images will be displayed as full-screen backgrounds for the form pages.

## 🚀 Running the App

```bash
npm run dev
```

Then open the displayed local URL (typically http://localhost:5173) in your browser.

## 📱 Testing on Mobile

For the best experience, test on a mobile device or use browser developer tools:

1. Open Developer Tools (F12)
2. Toggle device toolbar (Ctrl+Shift+M / Cmd+Shift+M)
3. Select a mobile device preset
4. Reload the page

## ✨ Features Implemented

- **Vertical swipe navigation** - Swipe up/down to navigate pages
- **Keyboard navigation** - Arrow keys (↑↓) for navigation
- **5 pages total**:
  1. Landing page - "Lucas Dangelis - Concierto de Guitarra"
  2. Song rating pages (3 songs with different composers)
  3. Thank you page with social media links
- **Song rating forms**:
  - Score selection (1-10 dropdown)
  - Comment textarea for feedback
  - Each song shows title and composer
- **FormSubmit.co integration** - Automatic email delivery
- **Neobrutalism design** - Subtle borders, shadows, high contrast
- **Page indicators** - Fixed navigation dots on the right
- **Animations** - Pulsing title, bouncing swipe indicator

## ⚙️ Configuration

### 1. Update Form Submit Email (REQUIRED)

In `src/App.tsx`, line 57, update the FormSubmit email:

```typescript
<form action="https://formsubmit.co/YOUR-EMAIL@example.com" method="POST">
```

**Important**: On first submission, FormSubmit will send a verification email. Click the link to activate.

### 2. Update Song Information

In `src/App.tsx`, update the `songs` array with actual song titles and composers:

```typescript
const songs: SongData[] = [
  {
    id: 1,
    songTitle: "Your Song Title",
    composer: "Composer Name",
    backgroundImage: "./assets/back-1.jpeg",
    accentColor: "#FF6B35", // orange
  },
  // Add more songs...
];
```

### 3. Update Social Media Links

In `src/App.tsx`, lines 114-129, update the social media URLs with Lucas' actual profiles.

### 4. Add More Songs

To add more songs, add entries to the `songs` array and corresponding background images.

## 🎨 Color Palette

The app uses these concert-inspired colors:

- Black (`#000000`) - Backgrounds
- White (`#FFFFFF`) - Text & borders
- Orange (`#FF6B35`) - Warm stage light
- Yellow (`#FFD23F`) - Stage spotlight
- Purple (`#B565D8`) - Purple spotlight
- Pink (`#E31B6D`) - Accent color
- Amber (`#FFA500`) - Additional accent

## 📋 Notes

- The app is mobile-only by design
- All text uses Courier New monospace font
- Form submissions go through FormSubmit.co (requires email verification)
- FontAwesome icons are loaded from CDN
- Each song rating includes:
  - Song title and composer (displayed prominently)
  - Score dropdown (1-10)
  - Comment textarea (optional)
  - Hidden fields for email subject and formatting
- Forms are more subtle with semi-transparent backgrounds
- The comment field is optional (score is required)

## 📧 FormSubmit Features Used

- `_subject` - Custom email subject with song info
- `_captcha` - Disabled for smooth UX
- `_template` - "box" template for nice formatting
- Hidden fields include song title and composer for each submission
