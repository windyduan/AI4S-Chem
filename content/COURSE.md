# ChemAI Lab — 60 minute teaching script

> Audience: chemistry researchers with little or no formal AI background.
>
> Teaching principle: chemistry question first, model second.

## 00 · Home

### Learn AI through chemical problems

不用先学一整套计算机科学，也不用先记住所有算法。

我们从化学研究者熟悉的问题出发：

> 如果已经有一批分子、实验或计算数据，我们能不能从中学习规律，帮助决定下一步算什么、测什么、合成什么？

**Course promise:** 60 分钟后，你不一定会“做 AI”，但应该能看懂一个 AI-for-Chemistry 项目的基本逻辑，并判断自己的科研问题是否值得尝试机器学习。

---

## 01 · Why AI for Chemistry? · 5 min

化学研究经常同时面对三个问题：

- 候选空间巨大
- 高精度实验或计算昂贵
- 我们真正能测量 / 计算的数据只是空间里很小的一部分

机器学习的核心价值之一，不是“替代化学”，而是：

**从已有数据中学习可用的规律，帮助缩小搜索空间。**

Visual story:

`Chemical Space → Model → Promising Candidates → Experiment / Calculation → New Data`

开场问题：**Which molecule should we try next?**

---

## 02 · AI / ML / DL · 7 min

- **Artificial Intelligence (AI)**：更大的技术概念集合。
- **Machine Learning (ML)**：从数据中学习规律。
- **Deep Learning (DL)**：使用多层神经网络学习复杂模式与表示。
- **Generative AI**：学习数据分布，并生成新的内容或候选。
- **LLM**：以语言建模为核心的一类大型模型。

### Chemistry mapping

Sample → molecule / reaction / spectrum  
Feature → descriptor / fingerprint / learned representation  
Label → solubility / energy / yield / class  
Model → a function learned from data  
Prediction → estimate for an unseen example

Interaction idea: drag “AI / ML / DL / LLM / Neural Network” into a conceptual hierarchy.

---

## 03 · The ML workflow · 10 min

Use one example throughout the lecture:

**Molecular structure → solubility**

Course-level pipeline:

`Question → Data → Representation → Model → Train → Evaluate → Discover`

Expanded research workflow:

1. Define the scientific task.
2. Generate / collect / clean data.
3. Explore data and identify bias or outliers.
4. Split data for training and evaluation.
5. Choose a useful representation.
6. Train a model.
7. Evaluate on unseen data.
8. Use cross-validation and tuning when appropriate.
9. Assess uncertainty and failure modes.
10. Iterate with better data or active learning.

**Core message:** a sophisticated model cannot rescue a badly defined question or unreliable data.

---

## 04 · How does AI see a molecule? · 10 min

Humans see atoms, bonds, functional groups, symmetry, 3D structure and chemical intuition.

A machine model receives **numbers**.

The bridge is the **representation**.

### Three representations for the first lesson

#### SMILES
A compact string representation. Example: ethanol → `CCO`.

#### Molecular fingerprint
A fixed-length bit / numeric vector encoding structural patterns.

#### Molecular graph
Atoms become nodes; bonds become edges. Node and edge features encode chemical information.

Interaction: `Molecule → SMILES → Fingerprint → Graph`.

Later enhancement: use RDKit.js for real in-browser depictions and fingerprints.

---

## 05 · Train ≠ memorize · 10 min

The model should perform well on **unseen** data, not only on examples used during fitting.

### Underfitting
Model is too inflexible to capture the useful pattern.

### Good fit
Model captures the relevant trend and generalizes.

### Overfitting
Model follows training data too closely and fails on new examples.

### Playground

Slider: **Model complexity**.

As the learner drags:

- fitted curve changes
- training error generally falls
- test error can eventually rise
- annotate the “good generalization” region

For a first regression lesson, introduce MAE, RMSE and R² by intuition before formulas.

---

## 06 · AI × Chemistry · 8 min

Use an interactive map rather than a long algorithm catalog.

- **Property prediction:** structure → energy / solubility / pKa / spectra / etc.
- **Reaction prediction:** reactants + conditions → products / yield / selectivity
- **Spectroscopy:** spectrum → patterns / components / structure-related information
- **Materials & catalysis:** structure/composition → properties → screening
- **Molecular design:** desired property → model/generator → candidate molecules
- **Scientific automation + LLMs:** literature, extraction, code assistance, experiment planning, tool-using agents

Make clear that capability, reliability and data requirements differ across these applications.

---

## 07 · What are we doing with AI? · 7 min

Use a fixed template for every group project:

1. **Chemical Question** — What is the real scientific problem?
2. **Data** — What observations / calculations / structures do we have?
3. **Representation** — What does the model actually receive?
4. **Model** — What class of method do we use?
5. **Output** — What does it predict / rank / generate?
6. **Chemical Meaning** — Why does this help the science?
7. **Links** — Paper · GitHub · Demo · Dataset

Avoid opening with architecture details. Let the chemistry question lead.

---

## 08 · Inspiration · 3 min

### The Thinking Game

Use this as a **research culture / inspiration** moment, not as evidence that everyday research looks cinematic.

Suggested framing:

> 真实科研通常比纪录片慢、乱、琐碎得多，也会有失败、重复和漫长等待。
>
> 但“好奇心、和聪明的人一起解决问题、以及第一次让某件原本做不到的事成为可能”也是真实存在的科研体验。

Button label: **Watch later ↗**

---

## 09 · Closing · 3 min

### Could AI help my research?

Ask three questions:

1. Do I have data — experimental, computational, spectral, structural or textual?
2. Is there a target, decision, ranking, pattern or search problem I can define?
3. Is the current workflow expensive, repetitive, slow or hard to scale?

If yes to some of these:

**There may be an ML-shaped opportunity — but the right next step is to define the scientific question and inspect the data, not to choose the fanciest model.**
