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

例如 ethanol：

```text
CCO
```

苯可以写成：

```text
c1ccccc1
```

它非常直观地说明：

```text
chemical structure
      ↓
     text
```

模型不需要直接“看结构图”，而可以处理字符串。

但要提醒：

> **SMILES 是一种表示，不等于完整的三维分子。**

---

## 3. 第二种：Molecular Fingerprint

源课件重点介绍了 ECFP / Morgan / circular fingerprint。

核心思想可以这样讲：

> 不直接把整个分子画给模型，而是编码分子中出现过哪些局部结构环境。

然后得到 bit vector，例如：

```text
0 1 0 0 1 1 0 0 1 ...
```

### 网页展示建议

左边：分子结构。

右边：

```text
001001010110...
```

点击某个 bit：

- bit 高亮
- 左边对应的局部 substructure 被圈起来
- 出现注释：`local environment`

---

## 4. 第三种：Molecular Graph

把分子看成图：

```text
atoms = nodes
bonds = edges
```

例如 ethanol：

```text
C — C — O
```

节点可以包含 element、charge、degree 等信息；边可以包含 bond type、aromaticity、stereochemistry 等信息。

### 为什么重要？

因为分子的连接关系天然就是 graph structure，很多现代 molecular ML 模型直接在图上学习。

这一节先只建立 representation 直觉；Graph Neural Network 和 message passing 在下一节继续展开。

---

## 5. 第四种：3D / Atomistic representation

对于 molecules & materials，仅仅把 XYZ 坐标直接交给模型通常还不够，因为物理上等价的旋转、平移，以及相同粒子的置换，不应该带来没有物理意义的预测变化。

给化学听众最直观的例子：

如果把整个分子转 90°：

```text
same molecule
same energy
```

合理的模型不应该因为坐标系改变，就认为它是完全不同的系统。

这一点为下一节的 **Geometric Deep Learning / Equivariant Learning** 留下入口。

---

# 05 · 把模型训练逻辑放回化学科研

前面的训练逻辑现在可以重新写成：

```text
Scientific Question
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

这里最重要的是让听众意识到：

> **AI × Chemistry 并不是另一套完全不同的 AI；变化的是科学问题、数据、representation 和评价标准。**

---

## 6. 三类经典 AI × Chemistry 任务

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

例如：

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

重点不是“AI 自动做化学”，而是把一个预测、筛选或排序任务整理成可以学习的数据问题。

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

这里开始从“预测一个答案”走向“帮助科研做下一步选择”。

---

## 7. Molecular Discovery Loop

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

### Active Learning 的一句话版本

> 不是什么数据都继续收，而是让模型帮助决定“下一条最值得获得的数据是什么”。

---

## 8. 真实科研里 AI 最容易失败在哪里？

源课件列出的典型 challenges：

- 数据太少
- 数据不具代表性 / bias
- 数据质量差 / noise
- representation / features 不合适
- overfitting

所以模型生成很多“看起来合理”的结果，并不意味着它已经覆盖了真正重要的 chemical space。

---

# 06 · 下一步：从 Representation 到 Scientific AI

到这里，听众已经有了最基本的 AI × Chemistry 地图：

```text
structure
   ↓
representation
   ↓
model
   ↓
prediction / ranking / generation
   ↓
scientific decision
```

下一节再继续问几个更前沿、但仍然很具体的问题：

- 为什么 molecular graph 和 GNN 很自然？
- 为什么真实化学还要考虑 3D geometry 与 symmetry？
- machine-learning potential 怎样进入 atomistic simulation？
- AI 怎样同时处理 structure、spectrum、sequence 和 language？
- LLM 怎样与 knowledge graph、专业模型和科研工具协同？
- Scientific Agent 在这张版图里处于什么位置？

对应内容见：[`05-ai4s-frontier.md`](./05-ai4s-frontier.md)

---

## 本节留下的三句话

1. **A molecule is not automatically a machine-learning input.**
2. **Representation connects chemical structure to a model.**
3. **The goal is not an AI score — the goal is a better scientific decision.**
