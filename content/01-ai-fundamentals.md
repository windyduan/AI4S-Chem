---
title: AI / ML / DL — 建立最小心智模型
duration: 8 min
section: INTRO
source_basis: uploaded lecture pp.15–16 plus course redesign
---

# 01 · AI / ML / DL — 建立最小心智模型

## 这一节结束后，听众应该知道什么？

1. AI、ML、DL 不是三个互相独立的词，而是不同层级的技术概念。
2. 对这门课来说，最重要的是 **Machine Learning = 从数据中学习输入到目标之间的可预测关系**。
3. 一个监督学习问题至少包含：输入 `x`、目标 `y`、模型 `f(x)`、训练数据，以及一个衡量预测误差的标准。
4. ChatGPT / LLM 很重要，但它们不是 AI 的全部，也不是理解机器学习训练逻辑的起点。

---

## 讲述入口

不要先从历史定义开始。

先问大家：

> 如果给你 500 个已经测过的分子，每个分子都有结构和溶解度，能不能让计算机总结其中的规律，然后预测第 501 个分子的溶解度？

如果可以，这就是这节课想讨论的一类典型机器学习问题。

源课件将机器学习描述为：寻找一个把 **input space** 连接到 **target space** 的 predictive function，并通过数据和 performance measure 改进模型。

教学上可以把它压缩成：

```text
input x  ──→  model f(x)  ──→  prediction ŷ
                                  │
                                  ↓
                              compare with y
```

---

## AI / ML / DL 的关系

### Artificial Intelligence · AI

最宽泛的概念。

我们只需要让听众记住：

> AI 是“让机器完成通常需要智能的任务”的大集合。

这里面既可能有规则系统，也可能有机器学习。

### Machine Learning · ML

这门课的核心。

> 不再把所有判断规则直接写死，而是让模型从数据中学习一个输入到输出的关系。

对于监督学习：

```text
x → f(x) → ŷ
```

训练时我们知道真实答案 `y`，于是可以比较 `ŷ` 和 `y`。

### Deep Learning · DL

深度学习仍然是在做“从数据中学习”，只是模型通常由多层神经网络组成，并且能够同时学习更复杂的表示。

第一小时课程不需要讲反向传播推导。

只需要建立一句话：

> Deep Learning is still Machine Learning — the model is just much more flexible.

---

## 五个词，先认识再反复使用

### Sample

一个数据样本。

化学里可以是：

- 一个分子
- 一个反应
- 一张光谱
- 一个材料结构
- 一组实验条件

### Feature / Representation

模型实际接收到的输入数值。

例如：

- molecular descriptor
- fingerprint
- molecular graph
- learned embedding

后面在 AI × Chemistry 章节再详细展开。

### Label / Target

希望模型学习或预测的答案。

例如：

- solubility
- pKa
- reaction yield
- energy
- class

### Model

一个可调整的函数：

```text
ŷ = f(x; θ)
```

其中 `θ` 表示模型中可以学习的参数。

### Loss

把“预测错了多少”变成一个数。

```text
prediction ŷ  vs.  truth y
          ↓
        loss
```

源课件强调：模型学习的函数关系由 loss function 所定义的训练目标约束；训练过程就是尽量减小这个误差。

---

## 现场互动

### 快问快答

给出：

> 分子结构 → 溶解度

请听众回答：

- Sample 是什么？→ molecule
- Input 是什么？→ molecular representation
- Label 是什么？→ solubility
- Model 输出什么？→ predicted solubility

再换一个：

> 反应物 + 条件 → 产率

让大家重复一遍。

### 网页交互建议

第一版：hover glossary。

第二版：把 `AI / ML / DL / LLM / Neural Network` 拖到概念层级中。

---

## 本节不要讲太多的内容

暂时不要展开：

- Transformer architecture
- backpropagation derivation
- optimizer variants
- CNN / RNN 历史
- 大模型参数量比较

因为下一节真正重要的是：

# 模型究竟是怎样通过数据训练出来的？

---

## English summary

**Machine learning** learns a predictive mapping from an input space to a target space using data and a performance objective. In supervised learning we have examples `(x, y)`, a model `f(x; θ)`, a prediction `ŷ`, and a loss measuring the discrepancy between prediction and ground truth. Deep learning is a flexible class of machine-learning models based on multi-layer neural networks.
