# AI4S-Chem · Editorial Integration Plan

> Working branch: `content/course-editorial`
>
> Goal: integrate Tracks A/B/C into one 90-minute beginner course while preserving useful existing website pages, interactions, and animations.
>
> Rule: **content is reorganized first; the current website is not rewritten during this pass.**

---

# 1. Final teaching structure: 90 minutes

Three presenters, approximately 30 minutes each.

The course should feel like one continuous argument rather than three independent talks:

```text
A · How does a model learn?
        ↓
B · How do we know it really works, and what does the model see?
        ↓
C · How does this become real AI × Chemistry research?
```

Recommended pacing for each presenter:

- ~25 min core teaching
- ~5 min interaction / transition / buffer

Do not try to speak every paragraph in the Markdown. Markdown is the full teaching and reference layer; the live course uses a selected subset.

---

# 2. Track A · ~30 min

## Core question

> **A model actually learns what, and how?**

## Main narrative

```text
The 501st molecule
↓
AI / ML / DL
↓
Sample / Representation / Target
↓
Model / Parameter / Prediction
↓
Loss
↓
Optimization
↓
Batch / Epoch / Learning Rate
↓
Train / Validation / Test
```

## Primary source files

- `01-ai-fundamentals.md`
- `02-model-training.md`

## Keep from Track A

- ESOL / “500 measured molecules → molecule #501” running example
- AI ⊃ ML ⊃ DL mental map
- `x → f(x; θ) → ŷ`, with known target `y`
- distinction between molecule and representation
- parameter / prediction / loss / optimization roles
- intuitive learning rate / batch / epoch
- training loop
- Train / Validation / Test responsibilities
- preprocessing leakage as a short warning
- teaching SVGs and optional notebook

## Do not expand live in Track A

Track A currently contains useful material on:

- scaffold split
- time split
- model-selection overfitting
- detailed leakage taxonomy
- cross-validation design

Keep these in the full notes, but live teaching should only plant the question.

### Handoff to Track B

End with:

> **Train / Validation / Test tells us why we need unseen data. But in chemistry, what counts as a genuinely meaningful “unseen” molecule?**

This avoids duplicating Track B.

---

# 3. Track B · ~30 min

## Core question

> **Training loss is low — can we actually trust the model? And what exactly did the model see?**

## Main narrative

```text
Generalization
↓
Underfitting / Overfitting
↓
What does “unseen” mean?
↓
Random / Scaffold / Time / External split
↓
Data leakage
↓
MAE / RMSE / R²
↓
Error distribution / applicability domain
↓
What is x for a molecule?
↓
Descriptor / Fingerprint / SMILES / Graph / 3D
```

## Primary source files

- `03A-generalization.md`
- `03B-chemical-representation.md`

## Preserve old material

Keep the existing `03-generalization.md` in the repository during this editorial pass.

Reason: the old file contains concise language and teaching ideas closely connected to the current website's generalization playground. It remains useful as UI / animation design source even though `03A-generalization.md` becomes the richer lecture script.

## Track B owns the detailed split discussion

The clean A/B boundary is:

- **A:** Why Train / Validation / Test must have different roles.
- **B:** How data should be split and evaluated so the result actually measures the intended chemical generalization.

## Metrics depth

For the live course:

- MAE: must explain
- RMSE: must explain
- R²: intuitive only
- residual / applicability domain: useful but concise
- classification metrics: leave as optional / note

## Representation depth

Use the same molecule to compare:

- Descriptor
- Fingerprint
- SMILES
- Graph
- 3D

Do not turn this into a taxonomy lecture.

### Handoff to Track C

End with:

> **Now we know what a molecule can look like to a model. What can modern models actually do with these representations in real chemistry research?**

---

# 4. Track C · ~30 min

## Core question

> **How does the same data → representation → model → evaluation logic become real AI × Chemistry research?**

## Main narrative

```text
Scientific Question
↓
Data
↓
Representation
↓
Model
↓
Evaluation
↓
Prediction / Ranking / Generation / Simulation
↓
Scientific Decision
```

Then introduce only a compact modern-model map:

```text
Property / Reaction / Discovery
↓
Graph / GNN
↓
3D Geometry / Symmetry
↓
Atomistic ML / Simulation
↓
Multimodal / Knowledge / LLM
↓
Agent / Tool Use
↓
Research Gallery
```

## Primary source files

- `04-ai-chemistry.md`
- `05-ai4s-frontier.md`

The previous version of `04-ai-chemistry.md` is preserved at:

- `archive/04-ai-chemistry-v1.md`

## Live case-study policy

The six curated cases are valuable and should remain in the repository / website gallery, but do **not** teach all six in detail.

Recommended live deep examples: 3.

### Suggested example 1 · NMR chemical shift

Teaches:

- spectroscopy
- local 3D atomic environment
- geometric / equivariant modeling intuition

### Suggested example 2 · Electrolyte machine-learning potential

Teaches:

- atomistic ML
- energy / force modeling
- simulation
- chemical-space exploration

### Suggested example 3 · Knowledge Graph + LLM or Scientific Agent workflow

Teaches:

- structured knowledge
- traceability
- LLM + tools / domain models
- workflow orchestration

The other cases remain as Research Gallery / optional reading.

## Agent depth

Keep Agent to one conceptual screen / short segment:

```text
Goal
↓
Model / Planner
↓
Tools / Search / Code / Database / Specialist model
↓
Evidence / Result
↓
Next action
```

Main message:

> Agent is not synonymous with autonomous laboratory. The useful concept is workflow orchestration with tools, evidence, verification, and human judgment.

---

# 5. Existing website: preserve first, revise later

The current website already has a useful teaching structure and good interactions. Do not discard it simply because the Markdown became richer.

## Keep the current conceptual pages

```text
HOME
↓
INTRO
↓
TRAIN + gradient-descent playground
↓
DATA SPLIT playground
↓
GENERALIZATION playground
↓
REPRESENTATION tabs
↓
CHEMISTRY task cards / workflow
↓
NOW / Agent
↓
RESEARCH
↓
RESOURCES
↓
GROUP / FINISH
```

## Keep useful current interactions

- AI / ML / DL cards + glossary
- training-loop visualization
- gradient-descent playground
- Train / Validation / Test data-split playground
- model-complexity / overfitting playground
- Molecule / SMILES / Fingerprint / Graph representation interaction
- Chemistry model-flow diagram
- Agent / NOW page
- Research cards
- Resources / finish structure

The new content should **feed these pages**, not automatically replace them.

---

# 6. New supporting material: what to keep

## Keep

- `assets/teaching/01-ai-ml-dl-and-501.svg`
- `assets/teaching/02-training-loop.svg`
- `assets/teaching/02-data-split.svg`
- `notebooks/01-train-validate-test-playground.ipynb`
- expanded `SOURCES.md`
- all primary / official references retained in the Track files

These can serve as:

- PPT assets
- fallback figures
- optional practical exercises
- after-class material
- source / verification layer

## Do not force into the main website

If an existing interactive page communicates the concept better than a new static SVG, keep the interaction and use the SVG only as supporting material.

---

# 7. Duplicate-content decisions

## Train / Validation / Test

- definition and responsibilities: Track A
- chemistry-aware split design and generalization meaning: Track B

## Representation

- Track A may introduce the word `representation` because it is required to define `x`
- Track B owns the full comparison of descriptor / fingerprint / SMILES / graph / 3D
- Track C assumes representation is known and only uses it to introduce GNN / geometry / atomistic models

## GNN / 3D

- Track B: what Graph / 3D representations contain
- Track C: what modern models do with Graph / 3D representations

## Agent

- Track C owns the concept and research-workflow framing
- existing website Agent page should be preserved and later updated, not duplicated into multiple new pages

---

# 8. Editorial pass after import

Next editorial work should be done in this order:

1. Read A/B/C as one continuous 90-minute lecture.
2. Remove repeated definitions from the live-teaching layer while keeping useful details in Markdown.
3. Standardize terminology.
4. Standardize the ESOL / #501 running example.
5. Check transitions between speakers.
6. Decide exactly what is **must teach / optional / after class**.
7. Rebuild `COURSE.md` as the final integrated course map.
8. Rebuild `00-content-blueprint.md` only after the course map is stable.
9. Only then map the final content back onto the existing website.
10. UI / animation adjustments come last.

---

# 9. Shared terminology

Prefer these terms consistently:

- Sample
- Representation / Feature
- Target / Label
- Model
- Parameter
- Prediction
- Loss
- Optimization
- Hyperparameter
- Train / Validation / Test
- Generalization
- Evaluation
- Data leakage
- Applicability domain

Important distinction:

```text
research object ≠ representation
prediction ŷ ≠ measured target y
parameter ≠ hyperparameter
validation ≠ final test
low training loss ≠ good generalization
```

---

# 10. Course-level final message

The three speakers should converge on one scientific reading framework:

```text
What scientific question are we asking?
↓
What data do we have?
↓
What does the model actually see?
↓
What does the model learn / output?
↓
How was it evaluated on genuinely relevant unseen data?
↓
How does the output change a scientific decision?
```

If the audience can use these questions to read an AI × Chemistry project after 90 minutes, the course has achieved its main goal.
