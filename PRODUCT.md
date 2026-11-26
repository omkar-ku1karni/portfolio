# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vite + React + TypeScript, static build (user choice). Deploys as a static site; the previous portfolio was hosted on Netlify. All editable content lives in a single typed data file so updates never require touching components.

## Users

Recruiters, hiring managers and technical interviewers evaluating Omkar Kulkarni for roles across Data Science, Data Analytics, BI Engineering, AI Engineering and ML Engineering. They usually arrive from a resume, LinkedIn or an application link, skim in under a minute, and dig into one or two projects if something catches.

## Product Purpose

A personal portfolio that lets the work speak: projects, experience, research and credentials presented so a visitor quickly understands what Omkar builds and how rigorously. Success is a visitor opening a project, the resume, or a contact link.

## Positioning

Someone who has shipped production AI systems (agent frameworks, MCP servers, automation with measured impact at Zebra Technologies) and who also does rigorous analytics work (causal inference, experimentation, graph ML, forecasting). The site stays deliberately general about target roles and lets the work frame him toward data, BI, AI and ML roles. The profile is AI-leaning (user, 2026-11-26): the hero line leads with building AI and machine-learning systems (LLM agents, RAG, recommenders, experimentation) and keeps the analytics rigour as its second half.

## Operating Context

Viewed on desktop during recruiting review and on phones from LinkedIn. Visitors compare it against many other candidate portfolios. The resume PDF is a primary exit.

## Capabilities and Constraints

- No explicit statement of availability or job-start date anywhere on the site (user instruction).
- No paragraph spelling out the roles being sought; framing stays implicit (user instruction).
- Purdue MS end date shown as Jul 2027 (user instruction; may change).
- Content must be easy to modify and maintain: one data file, modular section components.
- Some content is outdated and will be revised later by the user; structure must make that trivial.

## Brand Commitments

- Name: Omkar Kulkarni.
- The previous site's look (JetBrains Mono, blueprint/console theme, cyan accent) is explicitly not to be reused.
- Sleek and clean over busy (user, 2026-11-25): a periodic-table world was built and rejected as too cluttered.
- No headline numbers (user, 2026-11-25): never feature one big figure for a project or role. Describe the whole task; numbers inside sentences may be tinted to stand out, never enlarged.
- The user values the interaction effects (open-sheet reveal, illumination filtering, flips, tilt, keyboard paging) and wants them kept.

## Evidence on Hand

Real content in `src/content/site.ts` (mostly from the previous site):
- Education: MS Business Analytics & Information Management, Purdue University, West Lafayette (Aug 2026 to Jul 2027); B.Tech ECE, PES University, Bangalore (Sep 2021 to Jun 2025).
- Experience mirrors the resume in `public/resume.pdf` (user instruction, 2026-11-26: keep site and resume consistent): AI Operations Fellow at iA (prev. Innovation Associates), Nov 2026 – Present, Indianapolis, hybrid; Software AI Engineer and Software Engineering Intern at Zebra Technologies, Bangalore, hybrid. The Syllexa Solutions internship is not on the current resume and is commented out in `site.ts`.
- Four projects (Experiment Decision Engine, ReelRank, Fieldnote, Casefile), each with a GitHub repo and a live GitHub Pages project page, three with a long-form write-up; every number in their descriptions comes from that repo's README results. They replaced the six projects from the old site (user instruction, 2026-11-25).
- One IEEE ISDFS 2025 publication (SURF).
- Twelve certifications with certificate images in `public/certifications/`; dates follow the certificate images. Several have no verify URL, the two AWS Credly URLs from the old site looked malformed and were dropped, and AWS Cloud Practitioner has no image.
- Headshot (`public/headshot.webp`, from the user's IMG_2555.jpg, shown ungraded), resume (`public/resume.pdf`, the user's current version).
- Contact: reachomkarkulkarni.work@gmail.com, linkedin.com/in/reachomkarkulkarni, github.com/omkar-ku1karni.

Absent, and not to be fabricated: testimonials, project screenshots, employer logos, metrics beyond those stated in the repos.

## Product Principles

1. The work speaks first. Projects and measured outcomes carry the page, not self-description.
2. Numbers are earned. Show only the metrics that exist in the content; never inflate.
3. Interactive, never at the cost of legibility. A recruiter skimming in 30 seconds must still get it.
4. Maintenance is a feature. Changing content means editing one file.

## Accessibility & Inclusion

Respect `prefers-reduced-motion` for every animation; keyboard-navigable interactions; WCAG AA contrast.
