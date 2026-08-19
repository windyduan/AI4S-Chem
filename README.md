# AI4S-Chem · ChemAI Lab

Interactive AI for Chemistry · 60-minute group teaching site

## Product idea

A single-page teaching experience for chemistry researchers with little or no AI background.

The site should feel like an **interactive scientific notebook**:

- academic first
- lightly hand-drawn
- subtle Japanese/anime graphic-design influence
- responsive hover / drag / scroll interactions
- no cartoon overload
- sources visible and traceable

## Teaching arc

1. Why AI for Chemistry?
2. AI / ML / DL in one mental model
3. The machine-learning workflow
4. How does AI see a molecule?
5. Overfitting + evaluation playground
6. AI × Chemistry application map
7. Research in our group
8. Inspiration: *The Thinking Game*
9. Curated open-source projects and datasets
10. “Could AI help my research?” closing prompt

## Content architecture

Course prose lives in `content/*.md`.

Curated links live in `data/resources.json`.

Group research projects live in `data/research.json`.

The user-facing experience is one continuous page built from:

- `index.html`
- `styles.css`
- `app.js`

## Run locally

Serve the folder rather than double-clicking `index.html`, because resource cards are loaded from JSON.

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Design rule

Animation should respond to **user intent**:

scroll → reveal progression  
hover → show meaning  
drag → change model behavior  
click → transform representation

Do not make everything move continuously.

## Source discipline

Every external project/card should contain:

- canonical name
- one-sentence original description
- official URL
- source / owner
- date checked

Prefer original diagrams and animations built for this course. Do not copy screenshots, logos, or large passages unless licensing allows it.

## Roadmap

### v0.1

- Hero + story flow
- Chemical-space ambient animation
- Representation switcher
- Overfitting playground
- Inspiration card
- Open-source resource cards

### v0.2

- Drag-and-drop AI / ML / DL exercise
- RDKit.js molecule depiction / fingerprint demo
- Cross-validation animation
- AI molecular discovery loop
- Better scientific scroll transitions

### v0.3

- Group research cards with real projects
- Search / command palette
- GitHub project metadata integration
- Public teaching deployment + custom domain
