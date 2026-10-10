# Cleaning Ladies – Website Demo

Professional, mobile-first website concept for **Cleaning Ladies**, a cleaning service operating in and around Pretoria, South Africa.

**Slogan:** Doing the job you hate.

This is a demonstration / proposal website. It is **not** an officially approved live site until the business owners review and approve it.

---

## Files Included

```
cleaning-ladies/
├── index.html          # Main page
├── style.css           # All styles (mobile-first)
├── script.js           # Interactions, form, WhatsApp, gallery
├── README.md           # This file
└── assets/
    ├── icons/
    │   ├── favicon.svg
    │   └── logo.svg
    └── images/
        ├── hero-cleaning.jpg
        ├── service-*.jpg
        ├── gallery-*.jpg
        └── about-us.jpg
```

All images are licensed Unsplash photographs used for demonstration only. Replace them with real photos of Cleaning Ladies’ work when available.

---

## How to Test Locally

1. Download or clone this folder.
2. Open `index.html` in any modern browser (Chrome, Firefox, Safari, Edge).
3. Or run a simple local server:
   ```bash
   # Python 3
   python -m http.server 8000
   # then visit http://localhost:8000
   ```
4. Test on different screen widths (DevTools → Toggle device toolbar):
   - ~360px (small phone)
   - ~390px (common phone)
   - 768px (tablet)
   - 1200px+ (desktop)

---

## How to Deploy on GitHub Pages (Free)

1. Create a new GitHub repository (e.g. `cleaning-ladies` or `cleaning-ladies-website`).
2. Upload all files in this folder to the **root** of the repository (or into a subfolder if preferred).
3. Go to the repository **Settings → Pages**.
4. Under **Source**, select:
   - Branch: `main` (or `master`)
   - Folder: `/ (root)`
5. Click **Save**.
6. After a minute or two, your site will be live at:
   ```
   https://YOUR-USERNAME.github.io/REPO-NAME/
   ```
7. If you placed the files in a subfolder, use that subfolder path in the Pages settings or adjust relative paths.

### Relative paths
All asset links use relative paths (`assets/...`, `style.css`, `script.js`), so the site works both at the domain root and inside a subdirectory.

---

## Confirm With the Business Owner Before Publishing

Please verify the following with Agnes / Cynthia before making the site public:

| Item | Current Demo Value | Action Needed |
|------|--------------------|---------------|
| WhatsApp number | 071 045 5286 (Cynthia) | Confirm this number is WhatsApp-enabled and correct |
| Phone numbers | Agnes 076 826 2624 · Cynthia 071 045 5286 | Confirm both are current |
| Email | cleaningladies012@gmail.com | Confirm |
| Service list | Spring, After-Event, Wedding, Funeral, Move-Out | Confirm or edit |
| About Us copy | Proposed text | Approve or rewrite |
| Gallery photos | Stock images | Replace with real work photos |
| Testimonials | Placeholders only | Add real reviews with permission |
| Google Business Profile | Placeholder note | Add real link when available |
| Business credentials | None claimed | Only add insurance/certification if verified |

---

## How to Update Content Later

### Change services
Edit the service cards inside the `#services` section in `index.html`.  
Also update the `<select id="service">` options in the quote form so they stay in sync.

### Change photos
Replace files in `assets/images/`. Keep the same filenames, or update the `src` attributes in `index.html`.

### Change contact details
Search for the phone numbers and email in both `index.html` and `script.js` (WhatsApp number is in `script.js` as `WHATSAPP_NUMBER`).

### Change colours / branding
Edit the CSS variables at the top of `style.css` (`:root { ... }`).

### Add real testimonials
Replace the three `.testimonial-card.placeholder` blocks in the `#testimonials` section with real customer quotes (with permission).

---

## Technical Notes

- Pure HTML, CSS and JavaScript — no build step, no frameworks, no paid APIs.
- Mobile-first responsive design.
- Accessible: skip link, focus states, ARIA labels, form labels, keyboard support.
- Form does **not** store data. It only opens a pre-filled WhatsApp message.
- Respects `prefers-reduced-motion`.
- SEO-friendly meta tags and semantic structure.
- Floating WhatsApp button on mobile (hides when the quote form is visible).

---

## Licence / Credits

- Website concept created as a professional proposal for Cleaning Ladies.
- Stock photographs: Unsplash (replace with original photos for production use).
- Fonts: Inter & Playfair Display via Google Fonts.

---

**Website concept created for Cleaning Ladies.**
