# ChemAI Lab — Teaching Script

> Audience: chemistry researchers with little or no formal AI background.
>
> Main theme: **AI fundamentals → how models are trained → how AI connects to chemistry.**
>
> Teaching principle: intuition first, equations second; chemistry context after the core ML training loop is clear.

## Course information

### Courses

- **人工智能技术入门**
- **AI 模型训练**

### 主讲人（排名不分先后）

- 朱雨阳
- 段志高
- 涂佳怡

### 课程协助

- **李露阳** — 人工智能技术入门
- **曹昊** — AI 模型训练

### 时间

**2026 年 8 月 30 日上午，09:00 开始**

> 感谢各位老师、同学观看与参与。

---

## Detailed teaching modules

- [`01-ai-fundamentals.md`](./01-ai-fundamentals.md) — AI / ML / DL + Sample / Feature / Label / Model / Loss
- [`02-model-training.md`](./02-model-training.md) — Parameters, prediction, loss, optimization, epoch / batch / learning rate, train / validation / test
- [`03A-generalization.md`](./03A-generalization.md) — Track B (03A): Generalization, underfitting / overfitting, MAE / RMSE / R², K-fold cross-validation
- [`03B-chemical-representation.md`](./03B-chemical-representation.md) — Track B (03B): descriptors, fingerprints, SMILES, molecular graphs, and 3D representations
- [`04-ai-chemistry.md`](./04-ai-chemistry.md) — SMILES, fingerprint, graph, 3D representations, AI × Chemistry workflow and molecular discovery loop

These Markdown files are the editable content layer. The website should use shorter, interactive versions of the same ideas rather than copying the full notes onto one page.

---

## 00 · Home

### 人工智能技术入门：从训练模型到化学科研

这套课程主要回答三个问题：

1. AI / ML / DL 到底是什么关系？
2. 一个模型到底是怎么通过数据“训练出来”的？
3. 当研究对象变成分子、反应、光谱和材料以后，这套训练逻辑怎样进入化学科研？

**Course promise:** 不要求大家会实现复杂模型，但希望能够看懂一个典型 AI 项目的训练逻辑，并知道化学问题如何被整理成可以交给模型处理的问题。

---

## 01 · AI / ML / DL

先建立最基本的概念地图：

- **Artificial Intelligence (AI)**：更大的技术概念集合。
- **Machine Learning (ML)**：从数据中学习可以泛化的规律。
- **Deep Learning (DL)**：使用多层神经网络学习复杂函数和表示。
- **Generative AI**：学习数据分布，并产生新的输出或候选。
- **LLM**：以大规模语言建模为核心的一类模型。

### Five words to know

Sample → 一个数据样本  
Feature → 输入的数值表示  
Label / Target → 模型希望预测的答案  
Model → 从输入到输出的可学习函数  
Loss → 衡量预测有多错

### Core message

AI 不是 ChatGPT 的同义词；ChatGPT 是现代 AI 技术中的一个代表性产品形态。

---

## 02 · How model training works

这一部分是整套课程的核心。

最简单的训练循环：

`Data → Model → Prediction → Loss → Update parameters ↺`

### 2.1 Data

模型需要看到很多输入和对应答案。

Example:

`x → y`

可以先完全不谈化学，用散点拟合做直觉例子。

### 2.2 Prediction

模型根据当前参数做出预测：

`ŷ = model(x; θ)`

不需要深入函数形式，只告诉大家 **θ 是模型内部需要被学习的参数**。

### 2.3 Loss

比较预测 `ŷ` 与真实答案 `y`。

Loss 把“错了多少”转换成一个数字。

### 2.4 Optimization

优化算法根据 loss 改变参数：

`θ → θ'`

希望下一轮预测更准确。

重复：

`predict → calculate error → update → predict again`

这就是“训练”的核心直觉。

### 2.5 Epoch / Batch / Learning rate

只做轻量解释：

- **Epoch**：完整看过一次训练数据。
- **Batch**：一次拿一部分样本来更新。
- **Learning rate**：每次参数更新迈多大一步。

不展开推导。

### Playground 01 · Gradient Descent

网页中提供一个可玩的线性回归训练实验：

- 黑色点 = observed data
- 蓝色线 = model prediction
- 虚线 = underlying trend hint
- 橙色 residual = prediction error
- 按一次“训练一步”，执行一次参数更新
- 可以连续训练、暂停、重置、换数据
- 可以调整 learning rate

这个 Playground 用来让听众直观看到：

`parameter update → prediction changes → loss changes`

---

## 03 · Train / Validation / Test

### Training set

模型真正用来学习参数的数据。

### Validation set

用于选择超参数、比较方案、判断什么时候停止训练。

### Test set

最后才使用，用于模拟模型面对真正未见数据时的表现。

### Why this matters

一个模型在训练集上表现很好，并不代表它学到了可推广的规律。

引出：**generalization**。

---

## 04 · Underfitting / Overfitting

网页 Playground：拖动模型复杂度。

### Underfitting

模型能力不足，训练数据都没有解释好。

### Appropriate fit

模型学到了数据中的主要规律，并且能推广到新样本。

### Overfitting

模型过度追随训练集细节甚至噪声，训练误差非常低，但测试误差变差。

### Core message

**Training is not memorization.**

真正关心的是：

> Can it work on unseen data?

### Evaluation vocabulary

回归问题先认识：

- MAE
- RMSE
- R²

只讲它们“衡量什么”，公式可以放 hover / optional details。

---

## 05 · From data to representation

到这里再正式进入化学。

普通 ML 的输入最终都是数字。

但化学研究对象可能是：

- molecule
- material
- reaction
- spectrum
- experimental condition
- text / literature

所以第一个真正属于 AI × Chemistry 的问题是：

> **How do we represent chemistry for a machine?**

### Molecule example

Human sees: atoms, bonds, functional groups, geometry, chemical intuition.

Machine can receive:

#### SMILES

`CCO`

#### Descriptor / Fingerprint

`[0, 1, 0, 0, 1, ...]`

#### Molecular Graph

Atoms = nodes  
Bonds = edges

#### 3D Representation

Atomic species + coordinates + symmetry-aware features.

网页交互：

`Molecule → SMILES → Fingerprint → Graph`

---

## 06 · AI × Chemistry

强调：AI × Chemistry 并不是另一套完全不同的 AI。

它依旧可以写成：

`Scientific Question → Data → Representation → Model → Training → Evaluation → Scientific Decision`

区别主要在：

- 数据是什么
- 化学对象怎么表示
- 哪些物理 / 化学规律需要纳入模型
- 模型输出如何转化成科研决策

### Example A · Property Prediction

`molecular structure → property`

Targets:

- solubility
- energy
- pKa
- spectra
- toxicity
- material properties

### Example B · Reaction / Experiment

`reactants + conditions → product / yield / selectivity`

### Example C · Discovery / Design

`large candidate space → prediction / generation → promising candidates → experiment`

### Example D · Scientific LLM / Agent

文献、信息抽取、代码、工具调用、实验规划。

提醒：LLM 和传统 supervised ML 在数据、任务和可靠性要求上并不完全相同。

---

## 07 · Our research

之后补组内真实项目。

每个项目都用同一模板，不从模型架构开始：

1. **Scientific Question** — 我们想解决什么问题？
2. **Data** — 有什么数据？
3. **Representation** — 模型看到了什么？
4. **Model** — 用什么方法学习？
5. **Training / Evaluation** — 怎么训练和验证？
6. **Output** — 模型提供什么预测 / 排名 / 生成结果？
7. **Chemical Meaning** — 对实际科研有什么帮助？
8. **Links** — Paper / GitHub / Demo / Dataset

---

## 08 · Inspiration

### The Thinking Game

作为科研文化和愿景片段，而不是科研日常的写实展示。

> 真实科研会有重复、失败、调参、等待和大量并不“电影化”的工作。
>
> 但好奇心、长期投入、与不同背景的人合作，以及第一次解决一个以前做不到的问题，也确实是科研中非常吸引人的部分。

Button: **Watch later ↗**

---

## 09 · Explore / Closing

课后资源按四条路线分类：

- AI fundamentals
- Deep learning
- LLM & Agents
- AI × Chemistry / Scientific AI

### Three final questions

1. 我的研究数据是什么？
2. 我希望模型学习 / 预测 / 排名 / 生成什么？
3. 我怎么知道模型对真正的新问题有效？

如果这三件事能够定义清楚，就已经开始具备一个 AI 项目的雏形。

### Group links

- Laboratory: https://ai4ec.ac.cn/
- Cheng Group: https://cheng-group.net/
- Group Wiki: https://wiki.cheng-group.net/
- Bilibili: https://space.bilibili.com/3546683021462470
