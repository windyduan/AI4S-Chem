# AI4S-Chem · Editorial Quality Audit

> Branch: `content/course-editorial`
>
> Purpose: decide which duplicated explanations survive, correct scientifically misleading wording, and separate the full reference layer from the live 90-minute teaching layer.
>
> This document records editorial decisions before UI work resumes.

---

# 1. Editorial rule: repetition is allowed only when it advances the argument

Not all repetition is bad.

A concept may reappear if its role changes:

```text
A introduces a concept
→ B stress-tests it scientifically
→ C uses it in a real research workflow
```

What should be removed is **re-teaching the same definition at the same depth**.

Examples:

- `representation` may appear in A as the meaning of `x`, but the full descriptor / fingerprint / SMILES / graph / 3D comparison belongs to B.
- Train / Validation / Test may appear in A as three roles, but chemistry-aware split design belongs to B.
- molecular graph may appear in B as a representation, but message passing belongs to C.

---

# 2. Track A audit · Fundamentals / Training

## 2.1 Keep: the #501 / ESOL running example

This is the strongest organizing device in the current material.

Use the classroom simplification:

> 500 measured molecules → can we predict molecule #501?

Keep the real ESOL paper as evidence that solubility prediction is a genuine molecular ML task.

Important source distinction:

- Delaney's paper states that the model was derived from **2874 measured solubilities** using linear regression against **nine molecular properties**.
- `500 → 501` is a teaching construction, not the size of the original ESOL dataset.

Do not blur these two numbers.

## 2.2 Keep: `ŷ = f(x; θ)`

This is the minimum mathematical anchor for the whole course.

Required roles:

- `x`: model input / representation
- `θ`: learnable parameters
- `ŷ`: prediction
- `y`: observed / defined target available during supervised training

### Wording correction

Do **not** define `y` globally as an “experimental truth”.

In the solubility running example it is an experimental measurement, but in chemistry ML a target may also be a computed energy, database annotation, class label, or another defined quantity.

Preferred wording:

> `y` is the target recorded for the training example; in the running example it is the measured `logS`.

## 2.3 Reduce: detailed molecular representations in Track A

The current A draft already lists descriptors, fingerprints, graphs, and 3D representations in detail.

That material is higher quality and more complete in Track B.

Track A should only say:

> A molecule is the scientific object; `x` is the machine-readable representation we choose for it. We will return to that choice later.

One teaser graphic is fine. Do not teach five representation types here.

## 2.4 Keep: parameter vs hyperparameter

This distinction is useful and often confused.

```text
parameter     → learned from training data
hyperparameter → chosen by the development procedure / researcher / search
```

Examples:

- parameters: weights, biases
- hyperparameters: learning rate, batch size, regularization strength, architecture choices

## 2.5 Keep: training loop

Preferred backbone:

```text
batch of (x, y)
→ prediction ŷ
→ loss
→ parameter update
→ repeat
```

The gradient formula may appear as an optional mathematical annotation:

```text
θ ← θ − η ∇θ L
```

No backpropagation derivation is needed.

## 2.6 Keep: learning rate / batch / epoch

The current explanations are good.

Important precision:

- learning rate is an update step-size scale, not “how much knowledge is learned”.
- batch size is the number of examples used to form one update estimate, not the dataset size.
- an epoch is approximately one complete pass through the training set; it usually contains many parameter updates.

## 2.7 Keep but compress: Train / Validation / Test

Track A owns the basic roles:

```text
Train       → fit parameters
Validation  → make development choices
Test        → estimate final performance after development choices are fixed
```

### Wording correction: “open Test only once” is too literal

The real principle is not a magical one-view rule.

Preferred wording:

> Test information should not be used to tune the model, preprocessing, hyperparameters, or reporting choices. If Test feedback changes the system, that set is no longer an independent final evaluation set.

A project may pre-specify repeated test evaluation across seeds or repeated runs; independence from development decisions is the core idea.

## 2.8 Move from A to B

The following are useful but belong to Track B:

- random vs scaffold vs time split
- applicability to deployment scenario
- detailed leakage taxonomy
- grouped / chemistry-aware cross-validation
- interpretation of prospective / external evaluation

A should end by asking:

> What does a meaningful “new molecule” actually mean in chemistry?

---

# 3. Track B audit · Generalization / Evaluation

## 3.1 Keep: generalization as the main question

Preferred definition:

> Generalization is performance on future examples relevant to the intended use, not merely performance on the data used to fit model parameters.

This avoids treating “test set exists” as sufficient proof of generalization.

## 3.2 Clarify the word “unseen”

The current draft defines unseen data as data that participated in neither fitting nor model selection. That is stricter than common informal usage and may confuse Validation with Test.

Preferred vocabulary:

```text
not used to fit θ      → held out from parameter fitting
validation data        → used for development decisions
independent test data  → not used for fitting or development decisions
future / deployment data → the real target population or use scenario
```

Avoid using `unseen` as if it always means exactly one of these.

## 3.3 Correct: data leakage is not a cause of overfitting

The current underfit / overfit table lists `data leakage` among causes of overfitting.

That is conceptually misleading.

- **Overfitting**: the learned model fits idiosyncrasies of the development data and does not generalize well.
- **Data leakage / evaluation contamination**: information that should be unavailable enters training or model selection, making performance estimates invalid or optimistic.

They can occur together, but leakage is not simply another form of model capacity overfitting.

Move leakage into its own section.

## 3.4 Correct: similar scaffolds across Train and Test are not automatically “leakage”

The current leakage list mixes several different problems.

Use three categories instead:

### True leakage / contamination

- exact duplicate or near-duplicate records created from the same underlying observation across sets
- fitting a scaler / imputer / feature selector on all data before splitting
- using target-derived or future information in features
- using Test feedback to alter the model or reporting pipeline

### Statistical dependence / grouping problem

- multiple measurements from the same compound across sets
- multiple structures / frames / conformations derived from the same source trajectory or experiment
- batches or repeated observations split as if independent

### Weak split for the intended scientific question

- close analogues or shared scaffolds across Train and Test when the claimed use is novel-scaffold prediction

The last category can yield optimistic performance for a particular deployment claim, but it is not automatically data leakage.

## 3.5 Keep: split depends on intended use

This is one of the strongest scientific messages in Track B.

```text
intended future use
→ what kind of change matters?
→ choose a split that approximates that change
→ inspect overlap and distribution shift
```

Useful examples:

- random split: interpolation-like evaluation within a similar sampled population
- scaffold / series-aware split: structural-family transfer stress test
- time split: past → future / prospective-style evaluation
- external test: independent source / laboratory / database shift

### Important nuance

Do not present scaffold split as the universally correct chemistry split.

A scaffold split is one operational choice, not a synonym for all out-of-distribution evaluation.

## 3.6 Keep: MAE / RMSE / R²

The current formulas and hand calculation are sound.

### Preferred interpretation

- MAE: typical absolute error in the target's units
- RMSE: same units, more sensitive to large errors because residuals are squared
- R²: performance relative to predicting the mean on that evaluated sample; do not use it alone as a universal reliability score

Avoid the loose phrase “R² tells how much variation the model explains” when discussing held-out predictive evaluation. The baseline-relative formula is more precise.

## 3.7 Keep: residuals / applicability domain, but mark as a bridge

For a beginner course, the key habit is enough:

> Before trusting a prediction, ask whether the candidate resembles the domain supported by training data and whether the model was validated in that regime.

Avoid implying that a single fingerprint-similarity threshold universally defines an applicability domain.

## 3.8 Add: Best Practices in ML for Chemistry as the main evaluation reference

Use it to support the course-level message:

> The evaluation set should represent the intended application range, and the train / validation / test construction must be reported clearly.

MoleculeNet / DeepChem can support examples of molecular splitters; Sheridan supports time-split logic.

---

# 4. Track B audit · Chemical Representation

## 4.1 Keep: this is the canonical representation section

Track B's comparison is clearer and more complete than the representation section duplicated in `04-ai-chemistry.md`.

Therefore Track B owns:

- descriptors
- molecular fingerprints
- SMILES
- molecular graphs
- 3D / atomistic representations

## 4.2 Wording correction: “3D contains more information”

Prefer:

> 3D representations add explicit geometric information, but they also introduce conformer choice, sampling, symmetry handling, and computational cost.

“More information” can sound like “always better”, which is exactly what the course should avoid.

## 4.3 Wording correction: 800 noisy samples example

Do not claim a specific sample count is intrinsically too small for a model family.

Preferred wording:

> With only hundreds of noisy labels, training a high-capacity sequence or 3D model from scratch is difficult to justify without strong priors, pretraining, or convincing validation. Start with transparent baselines and compare under the same evaluation protocol.

## 4.4 Wording correction: scaffold split is not mandatory for representation comparison

Current wording says all representations must use the same de-duplication rules, scaffold split, and metrics.

Change to:

> Compare representations under the same data-cleaning rules, the same split appropriate to the scientific question, and the same evaluation metrics.

The split can be scaffold, time, grouped, random, or external depending on the intended use.

## 4.5 Keep: representation ≠ model

This distinction is important:

```text
representation → what information is made available
model          → how a function is learned from that information
```

The pairing examples are illustrative rather than exclusive.

---

# 5. Track C audit · AI × Chemistry

## 5.1 Remove the duplicated representation lecture from `04-ai-chemistry.md`

`04-ai-chemistry.md` currently re-teaches SMILES, fingerprints, graphs, and 3D.

Track B already does this better.

Refocus `04-ai-chemistry.md` on:

```text
Scientific Question
→ Data
→ Representation
→ Model
→ Evaluation
→ Scientific Decision
```

Then show three task families:

- property / spectrum prediction
- reaction / experiment prediction
- discovery / design / search

This creates a clean B → C handoff.

## 5.2 Keep: molecular discovery loop

This is a useful transition from prediction to research decision-making:

```text
existing data
→ train
→ search / generate
→ predict / rank
→ select
→ experiment / calculation
→ new data
↺
```

### Active learning precision

Use:

> Active learning is a strategy in which the data-acquisition decision uses the current model and an acquisition criterion to choose informative or useful new labels / calculations / experiments.

The one-line intuition “choose the next data worth obtaining” is good, but should not imply that every discovery loop is active learning.

## 5.3 Correct the modern-model map: it is not a linear ladder

The current frontier file shows:

```text
Representation → Graph/3D → Prediction/Simulation → Multimodality → Knowledge+LLM → Agent
```

This looks like one technology evolves into the next.

That is misleading.

Use a branching capability map instead:

```text
Scientific data / representations
├── molecular graph → GNN / message passing → molecular prediction
├── 3D atoms + geometry → geometric / equivariant models → energies / forces / structure
├── multimodal data → structure ↔ spectrum ↔ sequence ↔ language
└── literature / KG / databases + LLM + tools → scientific workflows / agents
```

These directions coexist and can be combined.

## 5.4 Keep and sharpen: invariance / equivariance

Use physically explicit examples:

- energy: should be invariant to a rigid rotation / translation of the whole system
- force vectors: should rotate with the system (equivariance)

This is clearer than saying only “some scalars stay unchanged”.

## 5.5 Add an atomistic ML caution

Machine-learning potentials can approximate reference electronic-structure data and accelerate atomistic simulation, but they are not automatically reliable outside the chemical / configurational space covered by training and validation.

This links naturally back to Track B's generalization lesson.

## 5.6 Agent wording

Use the narrower term **LLM-based scientific agent** when discussing current tool-using systems.

Preferred mental model:

```text
Goal
→ model / planner
→ tool call(s)
→ observation / evidence
→ update plan
→ next action
```

Do not equate:

- Agent with chatbot
- Agent with robot
- Agent with autonomous laboratory
- tool execution with scientifically validated discovery

Add reliability concepts:

- trace / provenance
- tool-input validation
- intermediate-result checks
- human review at consequential decisions

---

# 6. Research-gallery verification decisions

## NMRNet

Status: **Published, Nature Computational Science (2025)**.

Safe course claim:

- NMRNet uses an SE(3) Transformer for atomic-environment modeling.
- The work uses a pretraining + fine-tuning paradigm and establishes a benchmark across liquid- and solid-state NMR datasets.

## Electrolyte universal machine-learning potential

Status: **Nature Communications, volume 17 (2026), published online 31 Dec 2025**.

Safe course claim:

- a domain-oriented universal ML potential for battery electrolytes
- iterative training / broad electrolyte chemical-space coverage
- used in molecular-dynamics calculations of transport / solvation-related behavior

## Electroplating R&D agent

Status: **official Shanghai AI Laboratory project result, not automatically a peer-reviewed paper**.

Keep it, but label the evidence type on the slide / card.

Do not repeat promotional performance numbers unless independently supported by a paper or technical report.

## Uni-XAS

Status: **arXiv preprint (2026)** in the current verified course source layer.

Safe course claim:

- bidirectional XAS / 3D-structure multimodal learning
- cross-modal alignment + conditional generation framing

Do not state a publication status beyond what can be independently verified from proceedings / publisher records.

## NOSE

Status: **ACL 2026 Long Paper**.

Safe course claim:

- aligns molecular structure, receptor sequence, and odor-language descriptions
- tri-modal representation-learning example

## Cat-KG + LLM relay catalysis

Status: **National Science Review (2025)**.

Safe course claim:

- LLM-assisted literature information acquisition
- structured catalysis knowledge graph
- chemistry-informed path querying / scoring
- LLM used to render structured results into chemist-readable outputs
- traceability to structured knowledge / literature is a core advantage

---

# 7. Slide / screen count policy

Do **not** optimize for a traditional low slide count.

The course is closer to an interactive lecture / visual walkthrough than a conventional text-heavy seminar.

Preferred rule:

> **One slide / screen = one cognitive move.**

For 30 minutes, **20–30 slides is completely acceptable** when many slides are diagrams, progressive reveals, interactions, examples, or single-question screens.

A reasonable initial target is:

- Track A: ~22–28 slide beats
- Track B: ~25–30 slide beats
- Track C: ~26–32 slide beats
- shared opening / transitions / closing: ~4–8 beats

Total: roughly **75–95 lightweight slide beats**.

This is not a quota. If a concept deserves three visual steps instead of one dense page, use three pages.

---

# 8. What survives from the old website

The existing page structure is not considered obsolete.

Keep as first-choice teaching surfaces where they are already effective:

- AI / ML / DL cards
- glossary / term interactions
- training-loop animation
- gradient-descent playground
- Train / Validation / Test split playground
- model-complexity / overfitting playground
- representation tabs
- Chemistry workflow / task cards
- Agent / NOW concept page
- Research Gallery
- Resources / finish pages

New Markdown content should improve the teaching script and supply new slide / screen beats; it should not erase effective existing interaction for the sake of visual consistency.

---

# 9. Final editorial standard

Before a paragraph reaches the final live-teaching layer, ask:

1. Is it scientifically correct?
2. Is the term used consistently with earlier sections?
3. Is another speaker already teaching the same thing better?
4. Does it move the argument forward?
5. Does it need to be spoken live, or is it better as notes / optional reading?
6. Is the claim supported by the cited source at the stated evidence level?
7. Could this idea be clearer as two or three visual screens instead of one dense slide?

The goal is not “less content”.

The goal is **less duplication, better sequencing, and higher scientific precision**.
