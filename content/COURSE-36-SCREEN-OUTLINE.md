# AI4S-Chem · 36-screen course outline v0.1

> Audience: incoming graduate students, mostly chemistry background, with little formal ML training.
>
> Duration: ~90 minutes, three presenters, ~30 minutes each.
>
> Design rule: **one screen = one cognitive move.** Existing interactions are preserved and reused rather than deleted.
>
> This is a structural outline, not final wording.

---

# Opening · 1–3

| # | Screen / question | Main teaching point | Existing interaction / asset |
|---:|---|---|---|
| 1 | 人工智能技术入门 · 从训练模型到化学科研 | Establish the whole route: concepts → training → chemistry | Keep current HOME hero and background animation |
| 2 | 为什么化学新生需要懂一点 AI？ | AI is becoming a research tool; the goal is not to become an ML engineer but to read and use AI workflows critically | Keep current hero cards / visual language |
| 3 | 贯穿问题：500 个已测分子，能预测第 501 个吗？ | Introduce the solubility running example; distinguish teaching number from real ESOL dataset | Reuse / adapt `01-ai-ml-dl-and-501.svg` |

---

# Part A · 模型到底怎么学？ · 4–14

| # | Screen / question | Main teaching point | Existing interaction / asset |
|---:|---|---|---|
| 4 | AI、ML、DL 是什么关系？ | AI ⊃ ML ⊃ DL; AI ≠ ChatGPT | **Keep current AI / ML / DL cards** |
| 5 | 一个机器学习问题由什么组成？ | Sample / Representation / Target / Model / Prediction / Loss | **Keep current glossary interaction**, extend terms later if needed |
| 6 | 分子不是 `x` | Scientific object ≠ machine-readable representation | Use #501 example; do not teach representation taxonomy yet |
| 7 | 最小公式：`ŷ = f(x; θ)` | Explain `x, θ, ŷ, y` with solubility | Simple equation reveal |
| 8 | 模型第一次预测为什么会错？ | Initial parameters are not yet fitted; prediction is an estimate, not truth | Use one molecule numerical example |
| 9 | Loss：怎么把“错多少”变成数字？ | Absolute / squared error intuition; loss is an optimization objective, not scientific value itself | Keep current Loss card language, refined |
| 10 | Training loop：模型怎么一点点变好？ | batch → prediction → loss → update → repeat | **Keep current training-loop animation** |
| 11 | 参数到底在怎么动？ | `θ ← θ − η∇L` only as an annotated intuition; no derivation | Progressive reveal |
| 12 | Learning rate 太小 / 合适 / 太大 | Step-size intuition | **Keep current gradient-descent playground**; this can occupy several reveal states without deleting it |
| 13 | Batch / Epoch 是什么？ | One update vs one pass through training set | Simple 350 samples / batch 50 example |
| 14 | 为什么不能把 500 个分子全部拿来训练和考试？ | Transition from fitting to evaluation | Lead directly into Train / Validation / Test |

**Part A live goal:** chemistry freshmen should be able to point to where data enter, where prediction is produced, where loss is computed, and what gets updated.

---

# Part B · 怎么知道模型真的学会了？ · 15–25

| # | Screen / question | Main teaching point | Existing interaction / asset |
|---:|---|---|---|
| 15 | Train / Validation / Test 各自干什么？ | Train fits parameters; Validation guides development; Test is independent final evaluation | **Keep existing Train / Validation / Test explanation** |
| 16 | 亲手切一次数据 | The point is role separation, not a sacred 70/15/15 ratio | **Keep the existing Data Split playground in full** |
| 17 | Test 为什么不能反复拿来调模型？ | Independence from development decisions, not a magical “only view once” rule | Use “Test feedback → redesign” loop warning |
| 18 | Training loss 很低，模型就很好吗？ | Introduce generalization | Transition to current GENERALIZATION page |
| 19 | Underfitting / Good fit / Overfitting | Fitting training data is not the goal | **Keep current model-complexity slider / overfitting playground** |
| 20 | “新分子”到底有多新？ | Similar analogue vs new scaffold vs future batch vs external lab | Chemistry-specific intuition |
| 21 | Random / Scaffold / Time / External split | Different splits answer different deployment questions; scaffold is not universally best | New comparison visual |
| 22 | Leakage、相关样本、弱 split 不是一回事 | Separate true leakage, statistical dependence, and evaluation that is too easy for the claim | New three-column visual |
| 23 | MAE / RMSE / R² 怎么看？ | MAE must know; RMSE emphasizes large errors; R² is baseline-relative and not a reliability score | One small hand-calculation example |
| 24 | 一个分数为什么还不够？ | Unit, baseline, error distribution, uncertainty / applicability-domain intuition | Bring evaluation back to chemistry practice |
| 25 | 对一个分子来说，模型真正看到的 `x` 是什么？ | Transition from “can we trust it?” to representation | Set up the existing representation interaction |

**Part B live goal:** students should learn to ask “how was the data split?” before being impressed by a high score.

---

# Part C · AI 怎样真正进入化学科研？ · 26–35

| # | Screen / question | Main teaching point | Existing interaction / asset |
|---:|---|---|---|
| 26 | 同一个分子可以有很多机器表示 | Descriptor / Fingerprint / SMILES / Graph / 3D are different views, not an advancement ranking | **Keep current representation tabs completely**; extend with Descriptor / 3D later rather than replace |
| 27 | Representation 和 Model 不是一回事 | Representation controls available information; model learns a mapping from it | Small pairing map: fingerprint + RF, graph + GNN, etc. |
| 28 | 为什么分子很适合 Graph Neural Network？ | atoms = nodes, bonds = edges; message passing = collect neighbor information | Add a simple message-passing reveal while preserving graph tab |
| 29 | 为什么真实化学还要看 3D？ | Geometry, conformations, interactions; 3D is useful when task requires it, not automatically superior | Molecule rotation visual |
| 30 | Invariant / Equivariant：旋转分子以后什么应该变？ | Energy invariant; force vectors rotate equivariantly | One intuitive physical example, no group theory |
| 31 | AI × Chemistry 到底有哪些任务？ | Property / spectrum prediction; reaction / experiment prediction; discovery / design | **Keep current CHEMISTRY three task cards and workflow** |
| 32 | 从预测到科研决策：Discovery loop | Data → model → screen / generate → select → experiment / computation → new data | Add loop; active learning only as a special data-acquisition strategy |
| 33 | 真实案例 1–2：从 3D 到模拟 | NMR chemical shift + electrolyte ML potential as two concrete examples | Research-card style, real paper links |
| 34 | 真实案例 3：从多模态 / 知识到科研工作流 | Choose one of Uni-XAS / NOSE / Cat-KG+LLM for live detail; others remain gallery cards | Reuse Research Gallery format |
| 35 | Scientific Agent：不是机器人，而是模型 + 工具 + 迭代工作流 | Goal → model/planner → tools → evidence → next action; verification remains essential | **Keep current NOW / Agent page in full**, refine wording rather than delete |

**Part C live goal:** students should see that AI × Chemistry is still the same scientific workflow—question, data, representation, model, evaluation, decision—just with chemistry-specific objects and tools.

---

# Closing · 36

| # | Screen / question | Main teaching point | Existing interaction / asset |
|---:|---|---|---|
| 36 | 以后看到一个 AI × Chemistry 项目，先问哪 6 个问题？ | Scientific question → data → representation → model/output → evaluation/generalization → scientific decision | Keep **RESEARCH → RESOURCES → GROUP / FINISH** as the course exit path rather than deleting these pages |

Final six questions:

```text
1. 它到底想解决什么科学问题？
2. 数据从哪里来，target 是怎样定义的？
3. 模型实际看见的 representation 是什么？
4. 模型学什么、输出什么？
5. 它怎样证明在真正相关的新数据上有效？
6. 这个输出最后怎样改变科研决策？
```

---

# Existing interaction preservation policy

The following existing elements should remain in the codebase and, unless later testing shows a clear problem, remain in the live course:

- HOME hero / chemistry-space background
- AI / ML / DL concept cards
- glossary interaction
- training-loop animation
- gradient-descent playground
- Train / Validation / Test data-split playground
- model-complexity / overfitting playground
- representation tabs
- Chemistry task cards / workflow
- NOW / Agent page
- Research Gallery
- Resources
- Group / Finish

The editorial task is to improve the **content around these interactions**, not to delete them.

---

# Approximate speaker split

```text
Speaker A: Screens 3–14  (~30 min)
Speaker B: Screens 15–25 (~30 min)
Speaker C: Screens 26–35 (~30 min)
Shared:    Screens 1–2 and 36 as opening / closing
```

The actual screen count may grow later. If one concept is clearer as three lightweight reveal screens rather than one dense screen, split it. This 36-screen version is the first structural pass, not a hard cap.
