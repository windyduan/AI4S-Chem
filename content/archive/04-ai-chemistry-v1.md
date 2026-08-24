---
title: AI 怎样读懂化学？
duration: 12 min
section: AI × CHEMISTRY
source_basis: uploaded lecture pp.27–35 and pp.67–76
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

## 6. 三类化学任务

为了 60 分钟不发散，主课只保留三类。

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

## 8. 真实科研里 AI 最容易失败在哪里？

源课件列出的典型 challenges：

- 数据太少
- 数据不具代表性 / bias
- 数据质量差 / noise
- features 不合适
- overfitting

其中 generative molecule example 还特别展示了生成分子的 bias：模型可能漏掉某类 saturated / aliphatic structures。

这是一个非常值得讲的科研态度：

> 模型生成很多“看起来合理”的东西，不代表它覆盖了真正应该覆盖的化学空间。

---

## 9. 讲完之后回到组内项目

每个组内项目统一回答六个问题：

1. **Chemical Question** — 想解决什么？
2. **Data** — 数据从哪来？
3. **Representation** — 模型实际看到什么？
4. **Model** — 用什么方法学习？
5. **Evaluation** — 怎么知道它真的有效？
6. **Scientific Meaning** — 最终帮科研做了什么？

只要听众能用这六个问题读懂一个组内项目，这一小时课程就已经成功。

---

## 本节留下的三句话

1. **A molecule is not automatically a machine-learning input.**
2. **Representation connects chemical structure to a model.**
3. **The goal is not an AI score — the goal is a better scientific decision.**
