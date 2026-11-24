# Suvankar & Sangita - Reception Invitation

Mobile-first wedding reception invitation (English + Bengali). Plain HTML, CSS and JavaScript, no build step.

## Run
Open `index.html` in a browser, or from this folder run `python3 -m http.server 8000` and visit http://localhost:8000

## Files
- `index.html` - all 8 pages (book, invitation, save the date, celebrations, our story, reception, venue, closing)
- `css/style.css` - design tokens and styles
- `js/main.js` - book opening, typing, tassel scroll, countdown, calendar, carousel, gallery, music
- `assets/photos` - 18 optimised photos (p01 is the hero background photo source)
- `assets/flowers` - cut-out flower images (webp with transparency)
- `assets/music.mp3` - background music, starts after tapping the book

## Edit
- Reception date/countdown: `T` and `ev` in `js/main.js`
- Gallery captions: `CAP` in `js/main.js`; function cards: `CARDS` in `js/main.js`
- Names, venue and wording: `index.html`
- Maps link: search `maps.app.goo.gl` in `index.html`
