# Omkar Kulkarni · Portfolio

A single-page portfolio set over a living WebGL field: broad lilac-to-ember ribbons that drift with
time and scroll, bend under the cursor, and lean toward the colour of whichever project you hover.
Order: hero with portrait → experience → education & research → projects → skills → certifications → contact.

Built with Vite, React 19, TypeScript, [Motion](https://motion.dev) and [Lenis](https://lenis.darkroom.engineering/).

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-checks, then builds to dist/
npm run preview    # serves the production build
```

## Editing content (the only file you usually need)

Everything a visitor reads lives in **`src/content/site.ts`**. Sections, cards, sheets and nav are
generated from it, so you never need to touch components to:

| To… | Do this in `site.ts` |
| --- | --- |
| Add a project | Add an object to `projects`: `title`, a one-or-two sentence `summary`, `family`, `links`. |
| Link a project | `links: { repo, live }` become the **GitHub** and **Website** buttons; leave one out to hide it. |
| Project preview | `preview: 'pipeline' \| 'funnel' \| 'fusion' \| 'agents'` picks a diagram from `components/sections/ProjectPreview.tsx`. Add a new diagram there, or leave `preview` out and the card draws generated flow-line art. |
| Colour a project | `family: 'ai'` (ember on hover) or `'analytics'` (lilac). |
| Add a job | Add to `experience` (newest first). Wrap text in `**double asterisks**` to bold it. A period containing "Present" gets a *Current* badge. |
| Mark study in progress | `status: 'in-progress'` on a school. |
| Add a certificate | Add to `credentials`, put the image in `public/certifications/`, set `group` to file it under a heading. |
| Add a skill | Add a string to a `skills` group. |
| Contact links / resume | Edit `reach`. Replace `public/resume.pdf` to update the resume. |
| Keep site and resume in step | Experience, education and the paper mirror `public/resume.pdf`. When the resume changes, update `experience` / `education` / `publications` to match. |
| Photo | Replace `public/headshot.webp` (4:5 crop works for both the desktop frame and the phone circle). |

Numbers in descriptions and bullets ("95%", "32,487", "5.0 s") are tinted automatically. There are
no headline figures by design; write the number in the sentence.

## Changing the look

- **Colours, type scale, spacing, motion timing:** `src/styles/tokens.css`.
- **The field:** `src/components/Field/shader.ts` (GLSL). Colours, line density (`sin(f * 90.0)`),
  and where it is strongest (`mask`) are all there. `ShaderField.tsx` renders it at half resolution.
- **Section order:** `src/App.tsx`.

## How it's organised

```
src/
  content/       site.ts (all content) · types.ts
  lib/           store.tsx (open sheet) · smoothScroll.ts (Lenis) · motion.ts (reduced/still mode)
                 useActiveSection.ts
  components/
    Field/       ShaderField.tsx + shader.ts: the WebGL ground; fieldState.ts lets cards tint it
    Header/      wordmark, section nav with active dot, resume
    ScrollRail/  right-edge scroll position + current section
    Hero/        name, tagline, actions, "Currently" readout
    Sheet/       full-screen certificate sheet (clip-path reveal, paging, focus trap)
    sections/    Work (project cards, tilt, ProjectPreview diagrams, FlowArt fallback),
                 Experience (scroll rail), Capabilities (skill-group lighting), Research,
                 Credentials (flip to certificate), Contact
    ui/          RichText (bold + number tint), SectionHead (masked word rise), Icons
  styles/        tokens.css · global.css
```

## Interaction and accessibility

- Every certification opens in a dialog with a focus trap; ← / → page, Esc closes and returns
  focus to what opened it.
- `prefers-reduced-motion` freezes the field, turns off inertial scroll, and drops every entrance and
  tilt. Adding `?still` to the URL (or any automated browser) does the same, which is handy for
  screenshots.
- Without WebGL the field falls back to a still CSS rendition.

## Deploying

`netlify.toml` is included: connect the repo on Netlify (build `npm run build`, publish `dist`).
Any static host works.

## Content to revisit

- Two AWS credential verify links from the old site looked like placeholders and were left out;
  AWS Cloud Practitioner has no certificate image. See the `TODO(omkar)` notes in `site.ts`.
- Credential dates follow the certificate images.
- Project summaries come from each repo's README; update them there first, then here.

## Project websites

The four project pages (`omkar-ku1karni.github.io/<repo>/`) live on each repo's `gh-pages` branch and
share this site's look through two identical files in each: `theme.css` (palette, Archivo, components)
and `field.js` (the ribbon background). Change the theme in one and copy it to the other three.
Working copies are in `/Volumes/Crucial_1TB/projects/project-sites/` (with the master copy in `_theme/`).
