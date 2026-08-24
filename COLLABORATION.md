# AI4S-Chem Collaboration Workflow

This repository uses a content-first collaboration workflow. UI and animation changes are intentionally deferred until the course content is reviewed and merged.

## 1. Roles and branches

Three content tracks work in parallel:

| Track | Branch | Scope |
|---|---|---|
| A | `content/foundations-training` | AI / ML / DL, model training, Train / Validation / Test |
| B | `content/generalization-representation` | Generalization, evaluation, chemical representation |
| C | `content/chemistry-frontier` | AI × Chemistry cases, scientific agents, group research |

`main` is the reviewed integration branch. Do not use `main` for day-to-day drafting.

After A/B/C are merged, create a final editorial branch:

`content/course-editorial`

This branch is used only for cross-chapter consistency, terminology, transitions, trimming, source cleanup, and final website extraction.

## 2. What to edit now

During the content phase, contributors should mainly edit:

- `content/*.md`
- optional new source/case notes under `content/`

Avoid editing the website implementation unless explicitly coordinated:

- `index.html`
- `styles.css`
- `app.js`
- `app-resources.js`
- layout / animation CSS files

The principle is:

> Full reasoning and references live in Markdown first; the website later receives a compressed teaching version.

## 3. Standard writing template

Each section should answer the following:

1. What question does this section answer?
2. What 3 things must the audience remember?
3. What is the teaching sequence?
4. What running example should be used?
5. What formula / diagram is worth showing?
6. What common misconception should be prevented?
7. What reliable references support the claims?
8. What should finally appear on the website?

The website extraction should usually be no more than:

- one main sentence / question
- one figure, diagram, or interaction
- 2–4 key concepts

## 4. Shared terminology

Prefer consistent vocabulary throughout the course:

- Sample
- Feature / Representation
- Label / Target
- Model
- Parameter
- Prediction
- Loss
- Optimization
- Train / Validation / Test
- Generalization
- Evaluation

When synonyms are used, define the relationship explicitly instead of silently switching terms.

## 5. Running example

Use one recurring beginner-friendly example across the early course whenever possible:

> measured molecular structures / representations + solubility values → predict the solubility of an unseen molecule

This example should connect:

- input / target
- prediction
- loss
- parameter update
- Train / Validation / Test
- generalization
- representation

## 6. Source policy

Prefer, in order:

1. Original papers
2. Official documentation
3. Official repositories / datasets
4. High-quality reviews for field-level context

Do not make a named method or project depend only on a secondary summary when a primary source is available.

Each substantive section should ideally include 2–4 reliable references.

## 7. Git workflow

Before working:

```bash
git fetch origin
git switch <your-branch>
git pull origin <your-branch>
```

After a coherent content change:

```bash
git status
git add content/
git commit -m "describe the content change"
git push origin <your-branch>
```

Prefer small, meaningful commits rather than one very large commit at the end.

Examples:

- `clarify train validation test distinction`
- `add solubility running example`
- `add sources for molecular fingerprints`
- `refine overfitting explanation`

## 8. Pull request workflow

When a track is ready for review:

- Base: `main`
- Compare: the contributor's content branch
- Open a Pull Request
- Summarize what is complete
- Explicitly list unresolved teaching questions
- Request review from the other contributors

Review should focus on:

- scientific correctness
- beginner comprehensibility
- duplicated content
- terminology consistency
- source quality
- whether the chapter naturally hands off to the next chapter

Make review fixes on the same branch and push again; the PR updates automatically.

After approval, use **Squash and merge** so `main` stays readable.

## 9. Final editorial pass

After Tracks A, B, and C are merged into `main`:

```bash
git switch main
git pull origin main
git switch -c content/course-editorial
git push -u origin content/course-editorial
```

The editorial pass should answer:

- Are concepts introduced before they are used?
- Are examples reused effectively instead of constantly changing?
- Are any chapters redundant?
- Are technical depths consistent across contributors?
- Are terms consistent?
- Are transitions between sections natural?
- Are sources sufficient and primary where possible?
- What should be removed from the website version?

Only after this PR is merged should the team return to visual layout, animation, and interaction tuning.

## 10. Chat / AI working convention

If different ChatGPT conversations are used for parallel work:

- One conversation acts as **main / coordinator / editor**.
- Each content branch can have its own separate working conversation.
- Branch conversations should only edit their assigned branch and content scope.
- The coordinator conversation reviews PRs, checks cross-track consistency, and plans final integration.
- Do not let separate conversations independently redesign the website during the content phase.

At the start of a branch-specific chat, state clearly:

> Repository: `windyduan/AI4S-Chem`
> Working branch: `<branch>`
> Scope: `<track scope>`
> Do not modify `main` or website layout. Work content-first in `content/*.md`. Open a PR to `main` when ready for review.

## 11. Definition of done for the content phase

The content phase is complete when:

- all three track PRs are merged
- the editorial PR is merged
- major scientific claims have sources
- terminology and examples are consistent
- the course has a clear beginning → training → evaluation → chemistry → applications narrative
- every website screen has a defined content purpose before UI polishing resumes
