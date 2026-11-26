---
version: 1
slug: "src-app-tsx"
primary_target: "src/App.tsx"
related_targets: ["index.html"]
---

# Portfolio home (single page)

Mode: Experience. Audience: hiring reviewers for data science, analytics, BI, AI and ML engineering roles; desk review plus phones from LinkedIn. Action: open a project, follow its code/live/write-up links, open the resume, reach out. Proof: four real projects with README-sourced figures, roles, SURF paper, credentials, all from src/content/site.ts. Constraints: no availability/start-date copy, no role-seeking paragraph; content in one file. User feedback: the periodic-table world was rejected as cluttered; the user wants sleek and clean and explicitly liked the effects (flood open, illumination filter, count-up, flip, tilt, keyboard paging). This world replaces it.

## Direction contract

THESIS: A studio portal: one living shader field is the ground of the whole page, and the work floats over it as thin, sparse type and a few dark panels. Refuses both the busy grid of tiles and the default dark card-grid dev portfolio by letting one moving surface and huge condensed type carry the identity, with very little else on screen.
OWN-WORLD: Void #0B0D1A ground driven by a WebGL fragment shader (flowing silk-like contour ribbons, lilac #6A6CF6 into ember #FF6A3D, fine grain), panels in ink #13162B with 1px mist hairlines, mist #BFD2FF type, ember only for active/hover. Archivo variable condensed (wdth 62-75) uppercase for display; small labels tracked +0.24em; body in plain sentence case. No glass blur, no glow halos, no mono, no gradients on text.
STORY: Visitor lands in the field with the name huge beside his portrait, reads one line, then scrolls in the user's order: experience, education & research, projects (hover shifts the field to the project's hue; open dissolves into a full-screen sheet with highlights, arrows page), skills (illumination), certifications (flip to certificate), and a single contact card. No headline numbers anywhere; numbers in sentences are tinted.
FIRST VIEWPORT: Desktop 1440x900: thin top bar (tracked wordmark left, tracked section links and resume pill right). Name OMKAR / KULKARNI condensed light at ~8rem on the left, tagline tracked small below, two actions (Explore, primary lilac; Resume, ember outline). On the right a framed 4:5 portrait plate with the Currently readout (iA role, Purdue MS) under it. Broad silk ribbons cross the right half behind the portrait, void behind the text. Right edge: scroll rail. Phone: round portrait above the name.
FORM: Shader Studio (challenger webgl-shader-portal, chosen by the user from re-roll 1); seed:1f28e12934ea72af. User-directed since: section order experience → education → projects → skills → certifications → contact; portrait in the hero. Raises carried from the previous round: unlit states designed (dimmed, never hidden); tight ruled credit block at each entry's foot; in-progress items marked by dashed outline; colour never the only signal. Signature interaction: hovering a project shifts the shader toward that project's hue; opening it dissolves into a full-screen sheet via clip-path reveal from the card, arrow keys page, Esc returns focus. Motion grammar: shader drift tied to time and scroll, cursor bends the ribbons, inertial scroll, masked word rises for headings, portrait develops in via clip-path, credential flips, card tilt (count-ups dropped at the user's no-big-numbers instruction); reduced motion freezes the field and drops all of it.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
