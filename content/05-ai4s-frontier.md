---
title: 从分子图到科学智能
section: AI × CHEMISTRY FRONTIER
status: teaching-draft
source_policy: primary papers / official project pages for technical claims; WeChat links retained as supplementary reading
---

# 05 · 从分子图到科学智能：AI × Chemistry 前沿入门

## 这一节回答什么问题？

前面已经知道，化学对象需要先变成模型可处理的 representation。

这一节不追求“讲完 AI4S”，而是回答一个更适合入门课的问题：

> **现在 AI 到底已经怎样进入真实化学科研？**

我们只建立一张大地图：

```text
Representation
    ↓
Graph / 3D Geometry
    ↓
Prediction / Simulation
    ↓
Scientific Multimodality
    ↓
Knowledge + LLM
    ↓
Scientific Agent / Tool Use
```

这里的重点不是模型名越来越多，而是：

> **AI 能处理的科学信息越来越丰富，也开始参与越来越多科研步骤。**

---

## 0 · 这张地图从哪里来？

课程主线不依赖某一个项目宣传，而参考多个层级的综述与正式论文。

### 大图景参考

- *Scientific discovery in the age of artificial intelligence*. **Nature** 620, 47–60 (2023).  
  https://doi.org/10.1038/s41586-023-06221-2
- *AI for Science 2025* report / Nature Research Intelligence overview.  
  https://www.nature.com/articles/d42473-025-00164-0
- *A Survey of Scientific Large Language Models: From Data Foundations to Agent Frontiers* (2025).  
  https://arxiv.org/abs/2508.21148
- *From AI for Science to Agentic Science: A Survey on Autonomous Scientific Discovery* (2025).  
  https://arxiv.org/abs/2508.14111

这些资料只用来搭“大图景”。具体科研案例的技术描述，仍然回到原始论文或官方项目页面核验。

---

# 1 · 分子为什么很适合 Graph Neural Network？

一个分子最自然的二维抽象就是图：

```text
atoms = nodes
bonds = edges
```

所以可以先完全不讲公式，只讲一个直觉：

```text
一个原子
   ↓
看看周围有哪些原子和化学键
   ↓
把邻居的信息汇总进来
   ↓
得到更丰富的局部化学环境表示
```

多做几次以后，一个原子的表示就逐渐包含更远邻域的信息。

这就是理解 **message passing** 的最简单方式。

### 课堂一句话

> **Molecular graph 和 GNN 天然适配，因为“原子—化学键”的连接关系本身就是图。**

### 网页以后可以怎么做？

做一个可点击的分子图：

- Step 0：只亮中心原子；
- Step 1：一阶邻居亮起；
- Step 2：更大的局部环境亮起；
- 右侧显示 `local environment becomes richer`。

不需要展示神经网络公式。

### 背书

- *Geometric deep learning on molecular representations*. **Nature Machine Intelligence** 3, 1023–1032 (2021).  
  https://doi.org/10.1038/s42256-021-00418-8

---

# 2 · 真实化学不只有“谁和谁相连”：还有 3D Geometry

二维 molecular graph 很重要，但真实分子存在于三维空间。

一个非常适合入门课的问题：

> 把同一个分子整体旋转 90°，它的能量应该变吗？

当然不应该仅仅因为坐标轴改变而改变。

因此可以非常轻地引出两个词：

```text
Invariant
旋转输入 → 某些标量性质保持不变

Equivariant
旋转输入 → 向量 / 几何输出以一致方式跟着旋转
```

这就是 **Geometric Deep Learning / Equivariant Learning** 在分子与材料问题中重要的原因之一。

### 课堂一句话

> **几何深度学习试图让模型不仅看到“连接关系”，还尊重真实三维空间中的对称性。**

### 背书

- *The principles behind equivariant neural networks for physics and chemistry*. **PNAS** 122, e2415656122 (2025).  
  https://doi.org/10.1073/pnas.2415656122

---

# 3 · AI4S 可以做什么？先只记四种感觉

入门课不用严格分类，只给大家四种感觉。

## A. Predict — 从结构预测性质

```text
structure → model → property / spectrum
```

例如 chemical shift、能量、溶解度、反应性质等。

## B. Simulate — 用机器学习加速原子尺度模拟

```text
atomic structure
   ↓
learn energy / force
   ↓
molecular dynamics
```

这里的目标往往是在计算精度、可迁移性和计算成本之间取得更好的平衡。

## C. Connect modalities — 连接不同科学模态

```text
structure ↔ spectrum
molecule ↔ receptor ↔ language
```

科学数据不只有数字表格，还包括 3D structure、spectra、sequence、text 等。

## D. Connect knowledge and tools — 连接知识、模型与科研工具

```text
literature / knowledge graph
        +
LLM
        +
code / model / database / simulation
```

这里自然进入 Scientific LLM 和 Agent，但不需要把自动化实验当成唯一方向。

---

# 4 · Research Gallery：六个真实工作，简单看一圈

> 教学原则：每个工作讲 1–2 分钟。看一张原论文 / 项目图，回答“做什么、AI 在哪”，然后留下原文链接和公众号解读链接。

---

## 4.1 NMR chemical shift prediction

### 做什么？

从分子 / 材料中的原子环境预测 NMR chemical shift，并建立统一 benchmark 来比较深度学习方法。

### AI 在哪？

原论文的 NMRNet 使用 **SE(3) Transformer** 对原子环境进行建模，并采用 pretraining + fine-tuning。

### 入门关键词

`NMR` · `3D atomic environment` · `SE(3)` · `spectroscopy`

### 原始论文

*Toward a unified benchmark and framework for deep learning-based prediction of nuclear magnetic resonance chemical shifts*. **Nature Computational Science** 5, 292–300 (2025).  
https://doi.org/10.1038/s43588-025-00783-z

### 公众号解读（用户提供）

https://mp.weixin.qq.com/s/vknxEa-GXEyED0FRD0c_ww

---

## 4.2 通用机器学习势函数探索电池电解液化学空间

### 做什么？

面向复杂电解液体系，训练可用于 molecular dynamics 的通用机器学习势函数，以更高效地计算和探索电解液性质。

### AI 在哪？

原论文通过 iterative training 构建 electrolyte universal machine-learning potential，并用于 transport / solvation properties 的分子动力学研究。

### 入门关键词

`machine-learning potential` · `molecular dynamics` · `electrolyte` · `chemical space`

### 原始论文

*Domain oriented universal machine learning potential enables fast exploration of chemical space of battery electrolytes*. **Nature Communications** 17, 1226 (2026; published online 31 Dec 2025).  
https://doi.org/10.1038/s41467-025-67982-0

### 公众号解读（用户提供）

https://mp.weixin.qq.com/s/e_8OnH4pYRbqPlqvWTD8nw

---

## 4.3 先进封装电子电镀配方研发智能体

### 做什么？

面向电镀配方研发，把多个垂域预测 / 设计模型与通用大模型的任务理解、推理能力组合起来，支持候选筛选和配方优化流程。

### AI 在哪？

上海 AI 实验室官方项目介绍列出的垂域能力包括 molecular adsorption、interfacial diffusion、molecular design 和 CVS response prediction，并在此基础上形成配方研发智能体。

### 入门关键词

`domain models` · `LLM` · `screening` · `workflow orchestration`

### 官方项目页

上海人工智能实验室，WAIC 2026 “与书生共创”联合创新成果：  
https://www.shlab.org.cn/news/5444277

> 课程中把它作为“官方项目成果”介绍，不把项目页面中的性能描述自动当成 peer-reviewed paper 结论。

### 公众号解读（用户提供）

https://mp.weixin.qq.com/s/iZiJMhEshDZ5ZY8v2i70aw

---

## 4.4 Uni-XAS：结构与 XAS 光谱的双向多模态学习

### 做什么？

把 X-ray absorption spectrum 与局部 3D atomic structure 放到统一的跨模态学习框架中。

### AI 在哪？

Uni-XAS 将双向 XAS 建模表述为 cross-modal alignment + conditional generation，并在大规模 structure–spectrum benchmark 上评估。

### 入门关键词

`XAS` · `3D structure` · `spectrum` · `multimodal learning`

### 原始论文 / 预印本

*Uni-XAS: Alignment-Driven Bidirectional Multimodal Learning for X-ray Absorption Spectroscopy*. arXiv:2607.20906 (2026).  
https://arxiv.org/abs/2607.20906

> 当前课堂标注为：preprint；课题组公开信息称已被 ACM Multimedia 2026 接收，在正式 proceedings 可查前不写成“已正式发表”。

### 公众号解读（用户提供）

https://mp.weixin.qq.com/s/uPIY3edV2uM9p7nY5WlyQA

---

## 4.5 NOSE：分子—受体—气味语言的三模态表示

### 做什么？

把 molecular structure、receptor sequence 和 natural-language odor description 放进同一个 representation learning framework。

### AI 在哪？

NOSE 使用 tri-modal orthogonal contrastive learning 学习跨模态表示，并评估 zero-shot generalization。

### 入门关键词

`molecule` · `receptor` · `language` · `multimodal representation`

### 原始论文

*NOSE: Neural Olfactory-Semantic Embedding with Tri-Modal Orthogonal Contrastive Learning*. **ACL 2026**, Long Papers.  
https://aclanthology.org/2026.acl-long.898/

### 公众号解读（用户提供）

https://mp.weixin.qq.com/s/jbrVtnDJtyS0yS0MFIsbFw

---

## 4.6 Knowledge Graph + LLM：催化路径推荐

### 做什么？

从催化文献中组织结构化知识，再利用 knowledge graph、化学规则与 LLM 辅助 relay catalysis pathway recommendation。

### AI 在哪？

原论文的流程包括 LLM-assisted information acquisition、Cat-KG、路径查询 / scoring，以及把结构化结果转成化学家更易读的描述。

论文还强调 knowledge graph 的 structured / traceable information 可用于降低纯 LLM 输出的不可靠性，并支持回溯原始文献。

### 入门关键词

`knowledge graph` · `LLM` · `catalysis` · `traceability`

### 原始论文

*Synergizing a knowledge graph and large language model for relay catalysis pathway recommendation*. **National Science Review** 12(8), nwaf271 (2025).  
https://doi.org/10.1093/nsr/nwaf271

### 公众号解读（用户提供）

https://mp.weixin.qq.com/s/ZoVkyrkyagXUpUkCG2Y-XQ

---

# 5 · Agent 到底讲多少？一页就够

不要把 Agent 讲成“自动实验室”的同义词。

入门课只展示一个能力版图：

```text
Scientific Goal
      ↓
LLM / Planner
      ↓
┌──────────────────────────────────────┐
│ Literature / Search                  │
│ Knowledge Graph / Database           │
│ Code / Numerical Analysis            │
│ Specialist Prediction Models         │
│ Simulation                           │
│ Multimodal Scientific Data           │
│ Experiment / Automation (one option) │
└──────────────────────────────────────┘
      ↓
Evidence / Result
      ↓
Next step
```

### 课堂一句话

> **Agent 的关键不是“机器人”，而是模型能围绕一个目标组织不同知识和工具，并根据结果继续推进任务。**

### 为什么这里要保守一点？

目前 Scientific LLM / Agent 仍面临可靠性、评测、数据质量、可追溯性和领域泛化等问题。入门课只介绍能力和方向，不把 demo 泛化成“AI 已能独立完成科研”。

---

# 6 · 一个适合“入门 + 水时长”的讲法

## 6.1 GNN / Geometry：约 4–6 分钟

- 分子为什么是 graph
- message passing 动画
- 旋转一个 3D 分子
- invariant / equivariant 只讲直觉

## 6.2 AI4S 四种感觉：约 3–4 分钟

- Predict
- Simulate
- Connect modalities
- Connect knowledge / tools

## 6.3 六个真实工作：约 10–15 分钟

每个 1–2 分钟：

```text
科学问题是什么？
AI 大概做了什么？
看一张图
留下 Paper / 公众号链接
```

不解释复杂 architecture，不追 benchmark 小数点。

## 6.4 Agent panorama：约 3–5 分钟

- LLM ≠ Agent
- Agent = model + context + tools + iterative actions
- automation 只是其中一种工具

### 总计

这一节很容易自然讲到 **20–30 分钟**，但听众仍然只需要记住几条直觉。

---

# 7 · 最后网站上怎么呈现？

最终主页面统一设计时，建议不是把 Markdown 全贴上去，而是做成三层。

## 第一层：一条主视觉

```text
Molecule
 → Graph
 → 3D Geometry
 → Prediction / Simulation
 → Multimodal AI
 → Knowledge + LLM
 → Agent / Tools
```

## 第二层：六张 Research Cards

每张卡只显示：

- 工作名称（匿名化人物）
- 一句话 scientific question
- 一句话 AI idea
- 2–4 个关键词
- `Paper ↗`
- `公众号解读 ↗`

点击后再展开多一点说明。

## 第三层：Explore / References

把综述、论文、官方项目页面放在课后阅读，不要求现场全部讲。

---

# 8 · 课程里不要做的事

- 不按模型架构逐篇讲论文。
- 不为了“前沿”堆很多 SOTA 数字。
- 不把 GNN 简化成“很慢”，也不暗示 3D 模型一定优于简单 representation。
- 不把 preprint / accepted / published 混在一起。
- 不把官方项目宣传中的性能 claim 当作同行评议结论。
- 不把 Agent 等同于 autonomous lab。
- 不把公众号作为重要技术细节的唯一证据。

---

# 9 · Verification table

| 内容 | 课堂使用的主要依据 | 状态 |
|---|---|---|
| Geometric Deep Learning | Nature Machine Intelligence review + PNAS perspective | Published |
| NMRNet | Nature Computational Science | Published 2025 |
| Electrolyte uMLP | Nature Communications | Published online 2025 / volume 2026 |
| Electroplating R&D Agent | Shanghai AI Laboratory official page | Official project result |
| Uni-XAS | arXiv preprint | Preprint 2026; acceptance separately stated by group |
| NOSE | ACL Anthology | Published ACL 2026 |
| Cat-KG + LLM | National Science Review | Published 2025 |
| AI4S macro framing | Nature review/report + Shanghai AI Lab surveys | Review / report / preprint survey |

## 后续编辑规则

- 技术 claim 优先追原论文 / 官方项目页。
- 公众号链接保留为中文扩展阅读入口，但正文不依赖公众号独立支撑关键事实。
- 人物姓名不作为课程主叙事；主要介绍 scientific question、AI idea 和科研意义。
- 如果后续加入新组内工作，优先做成同样的轻量 Research Card，而不是继续扩展理论章节。
