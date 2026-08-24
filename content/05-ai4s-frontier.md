---
title: 从分子图到科学智能
section: AI × CHEMISTRY FRONTIER
status: draft
source_policy: only claims supported by original papers or official project pages
---

# 05 · 从分子图到科学智能：AI × Chemistry 的前沿地图

## 这一节回答什么问题？

前面已经知道：化学对象需要先变成模型可处理的 representation。

这一节继续往前问：

> 当模型不仅“读懂”分子，还开始利用图结构、三维几何、光谱、语言、知识图谱和专业工具时，AI × Chemistry 会发展成什么样？

本节不追求罗列最新模型，而是用有论文或官方来源支持的代表工作，建立一张相对稳定的能力地图。

---

## 听众最后必须记住的 3 件事

1. **Molecular graph 与 GNN 天然契合，但真实化学还需要进一步考虑 3D geometry 与 symmetry。**
2. **现代 AI4S 不只做 property prediction，还在进入 atomistic simulation、scientific multimodality、knowledge-enhanced reasoning 等更广泛任务。**
3. **Agent 是 AI4S 能力版图的一部分：它强调模型如何连接知识、数据、代码和专业工具，而不等同于“自动化实验室”。**

---

# 1 · 为什么分子和 Graph Neural Network 很自然？

一个分子最直接的二维抽象就是图：

```text
atoms = nodes
bonds = edges
```

因此可以把一个原子周围的局部化学环境理解成：

```text
atom
  ↓
look at neighboring atoms / bonds
  ↓
aggregate local information
  ↓
update atom representation
  ↓
repeat
```

这就是理解 message passing 的入门直觉。

不需要在本课程里推导 GNN 数学，只要让听众看到：

> **图模型的结构，与“原子通过化学键连接成分子”这件事天然对应。**

### 网页展示建议

做一个可点击的 molecular graph：

1. 第一步只亮一个中心原子；
2. 点击 `message passing step 1`，一阶邻居亮起；
3. 第二步继续扩展到更大的局部环境；
4. 右侧同步显示 atom embedding 从“只知道自己”变成“包含周围环境信息”。

这个动画的目标不是展示神经网络有多复杂，而是解释：

> 为什么 graph representation 能把“局部化学环境”自然交给模型。

### Reference basis

- *Geometric deep learning on molecular representations*, Nature Machine Intelligence 3, 1023–1032 (2021). https://doi.org/10.1038/s42256-021-00418-8

---

# 2 · 但二维 Graph 还不是全部：真实分子存在于 3D 空间

很多化学性质不仅和“谁与谁相连”有关，还与三维构型有关。

因此从 molecular graph 往前走，会遇到一个更一般的问题：

```text
Graph topology
      +
3D coordinates
      +
physical symmetry
```

这就是 **Geometric Deep Learning / Equivariant Learning** 在分子科学中重要的原因之一。

---

## 2.1 一个最直观的 symmetry 问题

如果把一个分子整体旋转 90°：

```text
same molecule
same scalar property, e.g. energy
```

一个合理的模型不应该仅仅因为坐标轴变了，就预测出完全不同的能量。

如果预测的是 force 这样的向量，则分子旋转以后，预测向量应该以一致的方式跟着旋转。

因此教学上只需要区分两个词：

```text
Invariant
input rotates → scalar output remains unchanged

Equivariant
input rotates → vector / geometric output transforms consistently
```

这正是把物理对称性“写进”模型设计的一种方式。

### Reference basis

- *Geometric deep learning on molecular representations*, Nature Machine Intelligence (2021).
- *The principles behind equivariant neural networks for physics and chemistry*, PNAS 122, e2415656122 (2025). https://doi.org/10.1073/pnas.2415656122

---

# 3 · Representative Work A：NMR chemical shift prediction

## 科学问题

NMR 谱学中的 structure–spectrum relationship 对结构解析非常重要，但从分子 / 材料结构准确预测 chemical shift 并不简单。

## AI 在哪里？

代表工作 **NMRNet** 建立了一个用于 NMR chemical shift prediction 的统一 benchmark 和深度学习框架。

原始论文明确给出的关键信息：

- 使用 **SE(3) Transformer** 对 atomic environment 建模；
- 使用 pretraining + fine-tuning paradigm；
- 建立覆盖不同 chemical systems 的 benchmark；
- 在 liquid-state 和 solid-state NMR datasets 上进行评估。

### 课程里为什么值得讲？

它可以非常自然地承接前面的：

```text
molecular / atomic structure
        ↓
3D geometric representation
        ↓
SE(3)-aware model
        ↓
NMR chemical shift
```

所以它不是单纯“又一个 property prediction 案例”，而是一个很好的 **3D geometry + spectroscopy** 案例。

### Source status

**正式发表**：Nature Computational Science, 2025.

### Primary source

- *Toward a unified benchmark and framework for deep learning-based prediction of nuclear magnetic resonance chemical shifts*. Nature Computational Science 5, 292–300 (2025). https://doi.org/10.1038/s43588-025-00783-z

---

# 4 · Representative Work B：机器学习势函数与电解液化学空间

## 科学问题

电池电解液的化学空间很大。

传统 classical molecular dynamics 受到 force field accuracy 限制；ab initio calculations 又有较高的计算成本。

## AI 在哪里？

代表工作构建了一个面向电解液的 **universal machine learning potential (uMLP)**，通过随机组成数据上的 iterative training，提高对不同电解液体系的适用范围。

原始论文明确描述：

- uMLP 用于 electrolyte molecular dynamics；
- 可在较广的 electrolyte chemical space 上计算关键性质；
- 研究重点包括 transport properties 与 solvation properties；
- 工作进一步使用 Li-ion coordination lifetime 来定量描述 solvation strength。

论文正文还说明，该体系使用包含 **2300+ solvent molecules 和 20 salts** 的数据库生成随机组成电解液，并使用 MLMD 计算 density、viscosity、ionic conductivity 和 operating temperature range 等性质。

### 课程里为什么值得讲？

它最适合用来解释一个重要 trade-off：

```text
ab initio
high fidelity / expensive
        ↓
learn potential-energy surface
        ↓
machine-learning potential
        ↓
longer / larger molecular dynamics
```

所以课堂不要笼统说“GNN / 几何模型算不动”。

更准确的说法是：

> **模型表达能力、物理约束、transferability、simulation scale 与 computational cost 之间存在 trade-off；机器学习势函数本身正是在尝试改善精度—成本矛盾。**

### Source status

**正式发表**：Nature Communications，online publication 31 Dec 2025；version of record 2026.

### Primary source

- *Domain oriented universal machine learning potential enables fast exploration of chemical space of battery electrolytes*. Nature Communications 17, 1226 (2026). https://doi.org/10.1038/s41467-025-67982-0

---

# 5 · AI4S 不只有 molecule：还有 scientific multimodality

化学研究中真正的数据远不止 molecular graph：

```text
molecular / atomic structure
spectra
protein sequence
natural-language description
literature
experimental condition
```

因此现代 Scientific AI 的一个明显方向，是学习不同科学模态之间的对应关系。

这里用两个组内 / 合作工作说明即可，不需要展开模型细节。

---

## Representative Work C：Uni-XAS

### 科学问题

X-ray absorption spectroscopy (XAS) 用于探测局部原子环境，但 spectrum 和 3D atomic structure 是两种非常不同的数据模态。

### AI 在哪里？

**Uni-XAS** 把双向 XAS 建模重新表述为 cross-modal alignment + conditional generation 问题。

预印本明确描述其任务包括：

```text
3D local atomic structure → XAS spectrum
XAS / composition → local structural information
```

并建立了包含 **328,839 structure–spectrum pairs** 的 standardized benchmark。

### 课程里为什么值得讲？

这是一个非常直接的 Scientific Multimodality 例子：

> 模型不再只从“结构预测一个数字”，而是在 **3D structure 与 spectrum 两个科学模态之间建立共享 representation**。

### Source status

**论文预印本已公开；课题组官方页面说明已被 ACM Multimedia 2026 接收。**

在 ACM proceedings 正式可查之前，课程中不要写成“已正式发表”。

### Sources

- *Uni-XAS: Alignment-Driven Bidirectional Multimodal Learning for X-ray Absorption Spectroscopy*. arXiv:2607.20906 (2026). https://arxiv.org/abs/2607.20906
- Official project / group announcement: https://fujiepku.github.io/

---

## Representative Work D：NOSE

### 科学问题

嗅觉涉及从 molecule 到 receptor 再到 language description 的多层信息链。

### AI 在哪里？

**NOSE** 构建了一个 tri-modal representation learning framework，对齐：

```text
molecular structure
receptor sequence
natural-language odor description
```

论文使用 orthogonal constraints 来分离不同模态贡献，并评估 zero-shot generalization。

### 课程里为什么值得讲？

它非常适合让听众看到：

> 化学 AI 的 representation 不一定只对应“分子本身”，还可以把分子结构与生物受体、人的语言描述放进同一个跨模态表征问题。

### Source status

**正式发表**：ACL 2026 Main Conference long paper。

### Primary source

- *NOSE: Neural Olfactory-Semantic Embedding with Tri-Modal Orthogonal Contrastive Learning*. ACL 2026, pp. 19615–19647. https://doi.org/10.18653/v1/2026.acl-long.898

---

# 6 · 从 Language Model 到 Scientific Reasoning

LLM 在 AI4S 中值得讲，但不要把它讲成“什么都会”。

真正重要的是区分：

```text
parametric knowledge in an LLM
            vs
structured / traceable scientific knowledge
```

一个很好的组内 / 合作案例，是把 LLM 与 knowledge graph 结合。

---

## Representative Work E：Knowledge Graph + LLM for catalysis

### 科学问题

Relay catalysis pathway design 需要跨越多个 catalytic reactions，并依赖大量文献与条件知识。

### AI 在哪里？

这项工作构建了 catalysis knowledge graph (Cat-KG)，并把 knowledge graph、chemistry-based scoring rules 与 LLM 组合起来做 pathway recommendation。

原始论文明确描述的流程包括：

```text
literature
   ↓
LLM-assisted information acquisition / organization
   ↓
Cat-KG
   ↓
KG query + chemistry-based scoring
   ↓
ranked relay-catalysis pathways
   ↓
LLM converts structured results into readable descriptions
```

论文特别强调：structured and traceable information from the KG 可以帮助减少 LLM hallucination，并保留对原始文献的追溯能力。

### 课程里为什么值得讲？

这比单纯展示“问 LLM 一个化学问题”更有教育意义：

> **LLM 的语言能力可以和结构化、可追溯的专业知识互补。**

### Source status

**正式发表**：National Science Review, 2025.

### Primary source

- *Synergizing a knowledge graph and large language model for relay catalysis pathway recommendation*. National Science Review 12(8), nwaf271 (2025). https://doi.org/10.1093/nsr/nwaf271

---

# 7 · Agent：作为能力版图的一部分，而不是整节课的终点

Scientific Agent 可以用一个宽口径定义来讲：

> 一个模型不只输出文本，而是围绕科学目标，在上下文中选择并组织不同的信息源、模型或工具，并根据结果继续决定下一步。

可以画成：

```text
Scientific Goal
      ↓
LLM / Planner
      ↓
┌───────────────┬──────────────┬──────────────┐
│ Literature    │ Database / KG│ Code / Model │
├───────────────┼──────────────┼──────────────┤
│ Spectra tools │ Simulation   │ Experiment   │
└───────────────┴──────────────┴──────────────┘
      ↓
Observation / Evidence
      ↓
Next step
```

重点是 **多方面能力**：

- literature / search
- structured scientific knowledge
- coding / numerical analysis
- specialist prediction models
- simulation
- multimodal scientific data
- planning / workflow orchestration
- experiment / automation（只是其中一个方向）

因此本课程不把 Agent 等同于 robotics，也不把“自动实验”作为 C 线主轴。

### Broader AI4S reference

上海 AI 实验室等机构参与的综述 *From AI for Science to Agentic Science* 将 agentic systems 放在更广泛的 AI for Science 演进框架里，并覆盖 chemistry、materials、life sciences、physics 等领域。该综述可以作为宏观趋势参考，而不作为具体性能 claim 的依据。

- *From AI for Science to Agentic Science: A Survey on Autonomous Scientific Discovery*. arXiv:2508.14111 (2025). https://arxiv.org/abs/2508.14111

---

## Representative Work F：面向电镀配方研发的 Scientific Agent

### 科学问题

先进封装电子电镀配方研发长期存在依赖经验试错、研发周期较长的问题。

### 官方项目页面明确介绍的 AI 部分

上海 AI 实验室官方成果页面描述，该项目：

- 构建覆盖 **molecular adsorption、interfacial diffusion、molecular design、CVS response prediction** 的垂域模型体系；
- 在此基础上融合通用大模型的 task understanding / reasoning；
- 形成面向电镀配方研发的智能体，用于 high-throughput prediction、candidate screening、multi-objective formulation optimization 与 iterative optimization。

### 课程里为什么值得讲？

这个案例适合放在 Agent 页面最后，只用来回答：

> 当一个科研任务需要同时调用多个垂域模型、知识与优化步骤时，Agent 可以承担“workflow organization”的角色。

不要把它泛化成“AI 已经可以自主完成材料研发”。

### Source status

**官方联合创新项目成果**；目前本课程依据上海 AI 实验室官方成果页面介绍，不把其中项目描述当作 peer-reviewed paper result。

### Official source

- 上海人工智能实验室，WAIC 2026 “与书生共创”联合创新成果：https://www.shlab.org.cn/news/5444277

---

# 8 · 六个真实工作怎样串成一条课程线？

不要按“论文列表”讲，而是按能力发展讲：

```text
Molecular / Atomic Representation
        ↓
Graph + 3D Geometry
        ↓
NMRNet
结构 → 光谱性质
        ↓
Atomistic ML / Machine-Learning Potential
结构 → energy / force → molecular dynamics
        ↓
Scientific Multimodality
Uni-XAS / NOSE
structure ↔ spectrum / receptor / language
        ↓
Structured Scientific Knowledge + LLM
Cat-KG + LLM
        ↓
Scientific Agent
models + knowledge + tools + workflow
```

这条线的重点不是“模型越来越大”，而是：

> **AI 能接触到的科学信息类型越来越丰富，能参与的科研步骤越来越多。**

---

# 9 · 容易误解的地方

## 误解 1：GNN 天然适合 molecule，所以已经解决 molecular AI

不成立。

2D graph 不等于完整的 3D molecular geometry；不同任务对 representation 的需求也不同。

## 误解 2：3D / equivariant model 一定比简单 representation 好

不成立。

模型选择仍然取决于 task、data、accuracy requirement、computational cost 与 deployment constraints。

## 误解 3：Machine-learning potential 只是“更快的量子化学”

不准确。

其能力取决于训练数据覆盖、potential 的 transferability 和 simulation domain；超出训练分布仍需要谨慎验证。

## 误解 4：Multimodal 就是把很多数据拼起来

不准确。

关键是不同 scientific modalities 之间是否存在有意义、可学习、可验证的 correspondence。

## 误解 5：Agent = 自动实验室

不准确。

实验 automation 只是 possible tool / action 之一；Agent 还可以用于 literature、knowledge、code、simulation、model orchestration 等任务。

---

# 10 · 最后网站上保留什么？

## 一句话

> **From molecular representation to scientific reasoning: AI is learning not only to predict chemistry, but to connect structures, spectra, simulations, knowledge and tools.**

## 一个主视觉

一条可点击的 evolution map：

```text
SMILES
 → Fingerprint
 → Molecular Graph
 → GNN
 → 3D / Geometric Learning
 → Atomistic Model
 → Multimodal Scientific AI
 → LLM + Knowledge
 → Scientific Agent
```

点击每个节点，只弹出一个真实工作作为例子。

## 最多保留 6 个代表工作

- NMRNet — 3D geometry + spectroscopy
- Electrolyte uMLP — atomistic ML + simulation
- Uni-XAS — structure–spectrum multimodality
- NOSE — molecule–receptor–language multimodality
- Cat-KG + LLM — structured knowledge + scientific reasoning
- Electroplating R&D Agent — domain models + workflow orchestration

---

# References / verification status

| Work | Evidence used in course | Status |
|---|---|---|
| Molecular Geometric Deep Learning | Nature Machine Intelligence review + PNAS perspective | Published |
| NMRNet | Nature Computational Science | Published 2025 |
| Electrolyte uMLP | Nature Communications | Published online 2025 / volume 2026 |
| Uni-XAS | arXiv preprint + official group acceptance announcement | Accepted to ACM MM 2026; proceedings not yet used here |
| NOSE | ACL Anthology | Published at ACL 2026 |
| Cat-KG + LLM | National Science Review | Published 2025 |
| Electroplating R&D Agent | Shanghai AI Laboratory official project page | Official project result; not treated here as peer-reviewed paper |

## Writing rule for later edits

- 不根据公众号宣传文案补模型细节；重要技术细节回到论文 / 官方项目页核验。
- 不把“已接收”写成“已正式发表”。
- 不把机构项目页面中的性能宣传自动当作 peer-reviewed scientific conclusion。
- 课程正文匿名化人物，只介绍 scientific question、AI method、output 和 scientific meaning。
