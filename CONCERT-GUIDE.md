# Lucas Dangelis Concert Rating App - Quick Guide

## 🎸 What This App Does

This is a mobile-first web app that allows concert attendees to rate Lucas Dangelis' guitar interpretations in real-time during his concert. Each song gets its own rating page where the audience can:

1. **Score the interpretation** (1-10 scale)
2. **Leave comments** with their thoughts

## 📱 User Experience

### Navigation
- **Swipe up/down** or use **arrow keys** to move between songs
- Each page is full-screen with the song's background image
- Page indicators on the right show progress

### Pages Flow
1. **Welcome** - "Lucas Dangelis - Concierto de Guitarra"
2. **Song 1** - Rate and comment
3. **Song 2** - Rate and comment
4. **Song 3** - Rate and comment
5. **Thank You** - Social media links

## ⚙️ Before the Concert - Setup Checklist

### Required Steps:

- [ ] **Add background images** to `src/assets/`:
  - `back-1.jpeg`, `back-2.jpeg`, `back-3.jpeg`
  
- [ ] **Update email** in `src/App.tsx` line 57:
  ```typescript
  <form action="https://formsubmit.co/lucas@example.com" method="POST">
  ```
  
- [ ] **Update song information** in `src/App.tsx` lines 12-34:
  ```typescript
  {
    id: 1,
    songTitle: "Actual Song Title",
    composer: "Composer Name",
    backgroundImage: "./assets/back-1.jpeg",
    accentColor: "#FF6B35",
  }
  ```

- [ ] **Verify FormSubmit email** - Submit a test form and click the verification link

- [ ] **Update social media links** in `src/App.tsx` lines 114-129

- [ ] **Test on mobile device** - Use browser dev tools or actual phone

### Optional Steps:

- [ ] Add more songs (just add entries to the `songs` array)
- [ ] Customize colors (change `accentColor` for each song)
- [ ] Update placeholder text for comments

## 🎯 During the Concert

### How to Use:

1. **Share the URL** with attendees (QR code works great!)
2. People open it on their phones
3. They swipe through songs and rate as Lucas plays
4. Submissions go directly to your email

### Tips:

- Display a QR code on screen during the concert
- Test the form before the concert starts
- Keep the URL short and easy to type (or use a link shortener)
- Consider having the URL on printed cards

## 📧 What Emails Look Like

Each submission includes:
- **Subject**: "Evaluación: [Song Title] - [Composer]"
- **Song Title**: Automatically included
- **Composer**: Automatically included
- **Puntuación**: The score (1-10)
- **Comentario**: The user's comment

FormSubmit uses the "box" template for clean, formatted emails.

## 🔧 Adding More Songs

To add a 4th song:

```typescript
const songs: SongData[] = [
  // ... existing songs
  {
    id: 4,
    songTitle: "Fourth Song",
    composer: "Composer D",
    backgroundImage: "./assets/back-4.jpeg",
    accentColor: "#FFA500", // amber
  },
];
```

Don't forget to add `back-4.jpeg` to the assets folder!

## 🎨 Design Philosophy

- **Neobrutalism**: Bold but subtle - borders and shadows without being overwhelming
- **Concert colors**: Orange, yellow, purple inspired by stage lights
- **Mobile-first**: Designed for portrait phone screens
- **Quick to use**: People can rate in 10-15 seconds per song
- **Minimal friction**: No account required, no page loads

## 🐛 Troubleshooting

### Forms not submitting?
- Check FormSubmit email verification
- Ensure you clicked the verification link
- Test with a simple submission first

### Images not showing?
- Verify files are in `src/assets/` folder
- Check file names match exactly (case-sensitive)
- Refresh the dev server

### Swipe not working?
- Use Chrome or Safari mobile browsers
- Check that touch-action is enabled
- Test on actual mobile device (not just dev tools)

## 📊 After the Concert

All ratings will be in your email inbox. You can:
- Review all scores and comments
- Calculate average scores per song
- Share feedback with Lucas
- Use insights for future concerts

---

**Good luck with the concert! 🎸🎵**
