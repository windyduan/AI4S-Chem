---
title: AI 怎样读懂化学？
duration: 16 min
section: AI × CHEMISTRY
source_basis: uploaded lecture pp.27–35 and pp.67–76; primary literature for scientific LLM / agent examples
---

# 04 · AI 怎样读懂化学？

前面我们一直写：

```text
x → model → y
```

现在真正进入化学。

问题是：

# 对一个分子来说，`x` 到底是什么？

人看到分子时会自然想到：

- 元素
- 键
- 官能团
- 共轭
- 空间构型
- 对称性
- 化学环境

但模型接收到的必须是可计算的表示。

这就是 **representation / featurization**。

---

## 1. Representation 是 AI 与化学之间的桥

源课件将 descriptor 定义为：把分子或材料结构转换为满足所需性质的固定数值表示；feature vector 则是这个转换产生的数值向量，也就是结构在 feature space 中的表示。

教学上只留一句：

> 同一个分子，可以有很多种“给计算机看的写法”。

并且：

> representation 的选择，会直接影响模型能不能容易地学到我们关心的规律。

---

## 2. 第一种：SMILES

源课件把 SMILES 定义为用 ASCII 字符描述分子的字符串系统。

例如：

```text
ethanol
CCO
```

苯可以写成：

```text
c1ccccc1
```

### 为什么适合入门演示？

因为它非常直观地说明：

```text
chemical structure
      ↓
     text
```

模型已经不需要“看结构图”，它可以处理字符串。

### 但要提醒

SMILES 是一种表示，不等于完整的三维分子。

源课件也指出字符串表示本身并不直接包含 molecular conformation。

---

## 3. 第二种：Molecular Fingerprint

源课件重点介绍了 ECFP / Morgan / circular fingerprint。

核心思想可以这样讲：

> 不直接把整个分子画给模型，而是问：这个分子里出现过哪些局部结构环境？

然后编码成 bit vector：

```text
0 1 0 0 1 1 0 0 1 ...
```

源课件说明 Morgan fingerprint 基于 molecular graph，对每个原子周围不同 radius 的 subgraph 进行编码，再形成 bit array。

### 网页最适合做的动画

左边：分子结构。

右边：

```text
001001010110...
```

Hover 某个 bit：

- bit 高亮
- 左边某个局部 substructure 被圈起来
- 出现手写注释：`local environment`

这会非常直观。

---

## 4. 第三种：Molecular Graph

把分子直接看成图：

```text
atoms = nodes
bonds = edges
```

比如 ethanol：

```text
C — C — O
```

节点可以带信息：

- element
- charge
- degree
- hybridization

边可以带：

- bond type
- aromaticity
- stereochemistry

### 为什么重要？

因为很多现代 molecular ML 模型直接在图上学习。

这也给后续讲 Graph Neural Network 留下入口，但本次一小时课不需要展开 message passing 数学。

---

## 5. 第四种：3D / Atomistic representation

源课件进一步强调：对于 molecules & materials，仅仅把 XYZ 坐标直接丢给模型通常不是理想表示，因为物理上等价的旋转、平移和原子置换不应该让预测发生无意义变化。

课件列出好的 molecular representation 需要考虑：

- symmetry invariance
- completeness / uniqueness
- smoothness

### 给化学听众的直觉版本

如果我拿着整个分子转 90°：

```text
same molecule
same energy
```

那么一个合理的模型不应该因为坐标系变了，就觉得它是完全不同的系统。

这正是化学 / 物理知识进入 AI 模型设计的地方。

---

# 05 · 把模型训练逻辑放回化学科研

现在所有东西已经可以串起来：

```text
Chemical Question
       ↓
      Data
       ↓
Representation
       ↓
      Model
       ↓
     Training
       ↓
    Evaluation
       ↓
Scientific Decision
```

源课件的完整 ML workflow 还包括：

- data generation / cleaning
- visualization
- train/test split
- featurization
- training and evaluation
- cross-validation
- uncertainty
- active learning
- deployment

这张 workflow 建议作为整个课程最后反复回看的总图。

---

## 6. 三类经典 AI × Chemistry 任务

为了 60 分钟不发散，主课先保留三类经典任务。

### A. Property Prediction

```text
molecule / material
      ↓
representation
      ↓
model
      ↓
property
```

例子：

- solubility
- pKa
- energy
- electronic property
- spectral property

### B. Reaction / Experiment Prediction

```text
reactants + conditions
         ↓
        model
         ↓
product / yield / selectivity
```

关键不是“AI 自动做化学”，而是把一个重复的预测或筛选任务变成数据问题。

### C. Discovery / Design

```text
target property
      ↓
generate / screen
      ↓
candidates
      ↓
experiment / calculation
```

源课件的 research example 就是 generative molecular design of organic electronics：生成候选、预测性质、筛选、加入数据库并再次训练，形成迭代循环。

---

## 7. Molecular Discovery Loop

这非常适合做课程高潮动画：

```text
Existing Data
     ↓
   Train
     ↓
Generate / Search
     ↓
Predict Properties
     ↓
Select Candidates
     ↓
Experiment / Compute
     ↓
New Data
     └──────────↺
```

源课件的 OLED / generative molecular design 案例正体现这种循环。

### 这里顺便讲 Active Learning

不需要系统推导。

一句话就够：

> 不是什么数据都继续收，而是让模型帮助决定“下一条最值得获得的数据是什么”。

---

# 06 · 从 LLM 到 Scientific Agent

前面的模型大多可以理解成：

```text
input → model → output
```

但科研工作通常不是一次预测就结束。

真实任务更像：

```text
提出问题
  ↓
查资料
  ↓
调用计算 / 数据库 / 模型
  ↓
读结果
  ↓
决定下一步
  ↓
必要时重复
```

这正是 **Scientific Agent** 值得讲的地方。

---

## 8. LLM 和 Agent 不是一回事

教学上不要把 Agent 讲成“一个更大的 LLM”。

更准确的直觉是：

> **LLM 提供语言理解、任务分解和决策能力；Agent 把模型放进一个可以调用工具、观察结果、继续行动的循环里。**

可以写成：

```text
Goal
 ↓
LLM / Planner
 ↓
Choose an action
 ↓
Tool / Search / Code / Model / Database / Robot
 ↓
Observation
 ↓
LLM / Planner
 └──────────────↺
```

所以一个 Scientific Agent 常见的组成不是只有 LLM，而是：

- **Model / Planner** — 理解目标、决定下一步
- **Tools** — 搜索、数据库、代码、计算模型、实验设备等
- **Context / Memory** — 保存任务状态、历史结果和约束
- **Execution loop** — action → observation → next action
- **Human checkpoint** — 对高风险、昂贵或不可逆操作进行人工确认

### 一句话区分

```text
LLM: “我认为下一步应该做什么？”
Agent: “我选择工具去做，读取结果，再决定下一步。”
```

---

## 9. 为什么 Chemistry 特别需要 Tool Use？

因为很多化学问题不能只靠语言模型“凭记忆回答”。

例如：

- 精确 molecular weight → cheminformatics / database
- 已知化合物信息 → PubChem / literature
- reaction prediction → reaction model / database
- retrosynthesis → synthesis planning tool
- numerical analysis → Python
- quantum chemistry → simulation software
- 实验执行 → automation API / robot

这里要强调一个重要科研观念：

> **语言模型负责组织任务，不等于语言模型本身就是可靠的化学数据库、计算器或实验仪器。**

把可验证的工作交给合适的工具，通常比要求 LLM 独自生成答案更合理。

---

## 10. Case Study A · ChemCrow：让 LLM 调用化学工具

Bran 等人在 *Nature Machine Intelligence* 发表的 ChemCrow 工作，把 GPT-4 与一组 chemistry-specific tools 连接起来，用于 organic synthesis、drug discovery 和 materials design 等任务。

论文中的核心不是“LLM 记住了更多化学知识”，而是：

```text
user task
   ↓
LLM decides what to do
   ↓
chemistry tool
   ↓
observation
   ↓
LLM decides next step
```

论文实现中包含 reaction、molecule、safety、search 等类别的工具；实验展示还连接了 robotic synthesis platform。

### 这个案例应该让听众看到什么？

不是记工具数量，而是看到一个结构变化：

```text
Chat model
```

变成：

```text
Reasoning / planning layer
        +
Specialized scientific tools
        +
Iterative execution
```

这就是“Agent”比单轮聊天更接近科研 workflow 的原因。

---

## 11. Case Study B · Coscientist：从信息到实验动作

Boiko 等人在 *Nature* 报道的 Coscientist 把 LLM planner 与多个模块连接起来，包括：

- web / documentation search
- Python code execution
- laboratory automation

论文展示的任务包括 synthesis planning、读取硬件文档、控制 liquid handling，以及设计和执行 palladium-catalysed cross-coupling experiments。

对于本课程，最值得保留的是这条链：

```text
Natural-language scientific goal
        ↓
Planner
        ↓
Search / Documentation / Python
        ↓
Experiment command
        ↓
Experimental result
```

它说明 Agent 的价值不只是“回答问题”，而可能是 **orchestrate scientific actions**。

但这里必须马上补一句：

> 能调用实验设备，不代表系统已经能够替代科研判断。

实验可靠性、边界条件、异常处理、安全、成本，以及最终科学结论仍然需要独立验证和人的责任判断。

---

## 12. Scientific Agent 最容易被误解的地方

### 误解 1：Agent = 更聪明的 ChatGPT

不准确。

Agent 的关键是 **model + tools + state + execution loop**，而不是仅仅更大的模型。

### 误解 2：能调用工具 = 结果一定正确

不成立。

可能出错的位置更多：

```text
wrong plan
wrong tool
wrong arguments
bad data
software failure
misread observation
wrong scientific conclusion
```

因此 Agent evaluation 不能只看最后一句回答“像不像对的”。

### 误解 3：自动化 = 自主科研

自动执行某个 protocol，与提出可靠科学问题、设计有效对照、识别 confounder、解释异常和形成可复现结论，不是同一件事。

### 本节真正要留下的科研态度

> **Automation can accelerate a workflow; scientific validity still has to be earned.**

---

# 07 · 回到真实科研项目

## 13. 真实科研里 AI 最容易失败在哪里？

源课件列出的典型 challenges：

- 数据太少
- 数据不具代表性 / bias
- 数据质量差 / noise
- features 不合适
- overfitting

其中 generative molecule example 还特别展示了生成分子的 bias：模型可能漏掉某类 saturated / aliphatic structures。

这是一个非常值得讲的科研态度：

> 模型生成很多“看起来合理”的东西，不代表它覆盖了真正应该覆盖的化学空间。

进入 Agent 以后还要再多问几层：

- tool 输出能否追溯？
- 文献来源是否可靠？
- 中间步骤有没有被验证？
- 失败以后系统是否会错误地继续执行？
- 哪些动作必须经过 human approval？

---

## 14. 讲完之后回到组内项目

每个组内项目统一回答八个问题，不从“我们用了什么高级模型”开始：

1. **Scientific Question** — 想解决什么？
2. **Data** — 数据从哪来？
3. **Representation** — 模型实际看到什么？
4. **Model / Agent** — 用什么方法学习或组织任务？
5. **Training / Evaluation** — 怎么训练、验证或评估？
6. **Output / Action** — 最终给出预测、排名、生成结果，还是执行动作？
7. **Scientific Meaning** — 最终帮科研做了什么？
8. **Evidence** — Paper / Dataset / GitHub / Demo 在哪里？

### 如果是传统 ML 项目

优先画：

```text
Data → Representation → Model → Prediction → Evaluation
```

### 如果是 Agent 项目

优先画：

```text
Scientific Goal
      ↓
Planner
      ↓
Tools / Models / Database / Code
      ↓
Observation
      ↓
Next Action
      └────────↺
```

只要听众能用这套问题读懂一个组内项目，这一小时课程就已经成功。

> TODO：这里需要用组内真实项目替换抽象占位案例；在没有论文 / 项目资料之前，不编造具体研究结果。

---

## 本节留下的五句话

1. **A molecule is not automatically a machine-learning input.**
2. **Representation connects chemical structure to a model.**
3. **AI × Chemistry still follows question → data → model → evaluation → scientific decision.**
4. **An agent is not just an LLM: it couples a model to tools and an action–observation loop.**
5. **The goal is not an AI score — the goal is a better scientific decision.**

---

## References

### Course source material

- Uploaded lecture material, especially pp.27–35 and pp.67–76, as recorded in the original content draft.

### Scientific LLM / Agent examples

1. Bran, A. M. et al. **Augmenting large language models with chemistry tools.** *Nature Machine Intelligence* **6**, 525–535 (2024). https://doi.org/10.1038/s42256-024-00832-8
2. Boiko, D. A., MacKnight, R., Kline, B. & Gomes, G. **Autonomous chemical research with large language models.** *Nature* **624**, 570–578 (2023). https://doi.org/10.1038/s41586-023-06792-0
3. ChemCrow public implementation: https://github.com/ur-whitelab/chemcrow-public

### Reference-use note

- 课堂主线优先引用原始论文或官方项目。
- Agent 案例用于说明系统结构与科研 workflow，不应把论文中的 demo 直接泛化成“AI 已经能独立完成化学科研”。
