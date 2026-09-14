# NOAM — Career Mentor Website

A premium Hebrew (RTL) marketing website for a fictional private career mentor brand, "NOAM". Built as static HTML/CSS/JS — no build step, no dependencies, no backend.

## Structure

```
index.html      Markup for all sections (header, hero, problem, big idea,
                 method, diagnostic quiz, services, before/after, about,
                 trust, testimonials, FAQ, final CTA, contact, footer)
css/styles.css   All styling — CSS custom properties for the design tokens
                 (color, type, spacing, motion), mobile-first responsive
                 rules, RTL-aware layout via logical properties
js/script.js     Vanilla JS, no dependencies: sticky header, mobile menu,
                 scroll-reveal animation (IntersectionObserver), the
                 5-question diagnostic quiz, FAQ accordion, and contact
                 form validation/success state
```

## Running locally

No build step required. Either:

- Open `index.html` directly in a browser, or
- Serve the folder with any static server, e.g. `npx serve .` or `python3 -m http.server`

## Notes for further development

- **Fonts**: Frank Ruhl Libre (display/serif) + Heebo (body/UI), loaded from Google Fonts in `index.html`. Both support Hebrew.
- **Design tokens**: all colors, spacing, timing, and easing live as CSS custom properties at the top of `css/styles.css` (`:root`) — change the palette or type scale from one place.
- **RTL**: the whole page is built RTL-first (`dir="rtl"` on `<html>`, plus `direction: rtl` in CSS as a belt-and-suspenders fallback). Layout uses CSS logical properties (`margin-inline`, `border-inline-end`, `inset-inline-start`, etc.) rather than hardcoded `left`/`right`, so it mirrors correctly.
- **Diagnostic quiz**: question/answer data and the scoring logic live in `js/script.js` (`questions` and `results` objects). It's a lightweight self-reflection tool with client-side scoring only — no backend, no data storage.
- **Contact form**: client-side validation and a success state only; there's no backend wired up. To make it functional, point the `<form>` at a real endpoint (e.g. Formspree, a serverless function, or your own API) and replace the `submit` handler in `js/script.js` accordingly.
- **WhatsApp / phone / email**: placeholder values (`972500000000`, `050-000-0000`, `hello@noam-mentor.co.il`) — replace with real contact details before deploying.
- **Content**: all copy is fictional demo content for a fictional mentor persona.

## Deploying

Static file hosting works out of the box (GitHub Pages, Netlify, Vercel, Cloudflare Pages, S3, etc.) — just push these three files/folders as-is.
