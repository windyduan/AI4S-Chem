# AI for Chemistry · Content Blueprint v2

> Status: content-first planning. UI and animation are intentionally out of scope for this file.
>
> Audience: chemistry researchers with little or no formal AI background.
>
> Core route: **AI / ML fundamentals → model training → data split → generalization → chemical representation → AI × Chemistry tasks → scientific agents → group research.**

---

# 0. Course promise

这门课不是“AI 算法速成课”，也不是“大模型产品介绍”。

希望听众最后真正能回答四个问题：

1. **一个机器学习问题到底由什么组成？**
2. **一个模型到底是怎么从数据里训练出来的？**
3. **为什么训练误差低，还不能说明模型真的有效？**
4. **把研究对象换成分子、反应、光谱和材料之后，AI 工作流究竟改变了什么？**

课程结束后，听众不一定会写神经网络，但应该能够拿到一个 AI × Chemistry 项目后，用下面的框架读懂它：

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

这张图是整门课的主线。

---

# 1. INTRO · AI / ML / DL：先建立最小心智模型

## 本节回答的问题

> AI、机器学习、深度学习到底是什么关系？

## 必须讲

### 1.1 AI ≠ ChatGPT

- AI 是更大的技术集合。
- ML 是其中非常重要的一条路线：从数据中学习规律。
- DL 是使用多层神经网络的一类 ML 方法。
- LLM / Generative AI 是现代 AI 的重要分支，但不应成为理解 ML 的起点。

### 1.2 用一个化学问题定义监督学习

主例子全课贯穿：

```text
molecular structure → solubility
```

如果已经测了 500 个分子：

```text
(x₁, y₁)
(x₂, y₂)
...
(x₅₀₀, y₅₀₀)
```

希望预测第 501 个分子的溶解度。

由此定义：

- Sample
- Input / Feature / Representation
- Label / Target
- Model
- Prediction
- Loss

### 1.3 最小数学表达

```text
ŷ = f(x; θ)
```

只解释：

- `x` = 模型输入
- `θ` = 模型内部可以学习的参数
- `ŷ` = 模型预测

不展开神经网络数学。

## 本节只留一句话

> **Machine learning is learning a useful mapping from data.**

## 暂时不讲

- Transformer 结构
- CNN / RNN 历史
- backpropagation 推导
- 大模型参数量比较
- supervised / unsupervised / reinforcement learning 的完整 taxonomy

这些内容会破坏入门主线。

---

# 2. TRAIN · 一个模型到底怎么“学会”？

## 本节回答的问题

> “训练模型”到底发生了什么？

这是整门课最重要的一节。

## 2.1 参数

最简单模型：

```text
ŷ = wx + b
```

`w` 和 `b` 就是模型参数。

神经网络只是把这个“有很多可调参数的函数”变得复杂得多。

### 推荐类比

模型像一个还没有校准好的仪器。

- 数据 = 校准样品
- label = 已知参考值
- parameters = 仪器内部旋钮
- training = 根据误差不断校准

## 2.2 Prediction

```text
x → model → ŷ
```

模型刚初始化时，预测通常很差。

## 2.3 Loss

比较预测与真实值：

```text
ŷ vs. y
   ↓
 loss
```

回归问题只需要展示两个直观形式：

```text
absolute error = |ŷ-y|
squared error  = (ŷ-y)²
```

核心：**loss 把“模型错了多少”变成一个可以优化的数字。**

## 2.4 Optimization

```text
Data → Prediction → Loss → Update θ → Repeat
```

把 gradient descent 讲成：

> 看看往哪个方向调整参数会让 loss 更小，然后走一步。

不需要推导导数。

## 2.5 Learning rate

一句话：

> 每次参数更新迈多大一步。

三个状态足够：

- too small → 很慢
- reasonable → 稳定下降
- too large → 来回震荡甚至发散

## 2.6 Epoch / Batch

轻量认识术语：

```text
Dataset = 100 samples
Batch size = 20
5 batches ≈ 1 epoch
```

## 本节留下三句话

1. **Model = learnable function.**
2. **Loss = how wrong the model is under a chosen objective.**
3. **Training = changing parameters to reduce loss.**

---

# 3. DATA SPLIT · 为什么不能拿所有数据一边训练一边考试？

## 本节回答的问题

> 如果一个模型在手上的数据上表现很好，为什么还不能相信它？

## 3.1 Train / Validation / Test

### Training set

真正参与参数学习。

### Validation set

用于：

- 选择模型
- 调 learning rate 等 hyperparameters
- 比较不同方案
- early stopping

### Test set

最后才打开。

用于模拟：

> 这个模型面对真正没见过的数据时会怎样？

## 3.2 最好用的类比

- Train = 平时做练习题
- Validation = 模拟考试
- Test = 最后的正式考试

核心规则：

> **不要一边看最终试卷答案，一边修改模型。**

## 3.3 需要提前埋下的伏笔

随机切分并不是永远合理。

特别在化学里：

- 相似 scaffold 可能同时进入 train 和 test
- 同系列分子可能造成信息泄漏
- 不同实验来源可能存在 batch / lab bias
- 时间顺序也可能影响真实使用场景

此处只提出问题，不展开；下一节 generalization 再解释。

---

# 4. GENERALIZATION · 训练得很好，不等于真的学会

## 本节回答的问题

> Training loss 越低，模型是不是一定越好？

答案：不是。

真正的目标是：

> **generalization to unseen data**

## 4.1 三种状态

### Underfitting

```text
train error: high
validation error: high
```

模型连主要规律都没有抓住。

### Appropriate fitting

```text
train error: low
validation error: low
```

抓到主要规律，同时没有过度追噪声。

### Overfitting

```text
train error: very low
validation error: higher
```

模型把噪声、偶然结构和数据集偏差也当成规律。

## 4.2 为什么化学尤其要认真对待 split？

因为化学空间不是随机均匀分布。

一个漂亮的 random split score 并不自动等价于：

> 对真正新的化学空间同样可靠。

要把问题改成：

> **这个 test set 是否代表我未来真正想预测的对象？**

## 4.3 Evaluation

主课只介绍：

- MAE
- RMSE
- R²

重点不在公式，而在解释它们回答什么问题。

### MAE

平均离真实值差多少。

### RMSE

同样衡量误差，但更重罚大错误。

### R²

描述模型解释目标变化的程度；不能单独作为“模型可信”的证明。

## 4.4 Cross-validation

作为进阶但值得讲的概念：

```text
Fold 1: VAL TRAIN TRAIN TRAIN TRAIN
Fold 2: TRAIN VAL TRAIN TRAIN TRAIN
...
```

重点：减少一次随机划分的偶然性。

## 本节留下三句话

1. **Low training error is not the goal.**
2. **Generalization is the goal.**
3. **Evaluation depends on the data split.**

---

# 5. REPRESENTATION · AI 怎样“看到”一个分子？

## 本节回答的问题

> 普通 ML 里写 `x` 很容易，但对一个分子来说，`x` 到底是什么？

这是 AI 与 Chemistry 真正连接起来的位置。

## 5.1 同一个分子有很多机器表示

### SMILES

```text
ethanol → CCO
benzene → c1ccccc1
```

直觉：

```text
chemical structure → string
```

提醒：字符串表示不是完整三维构象。

### Descriptor / Fingerprint

```text
[0,1,0,0,1,1,0,...]
```

例如 Morgan / ECFP：编码局部化学环境。

### Molecular Graph

```text
atoms = nodes
bonds = edges
```

节点可包含 element / charge / hybridization 等信息；边包含 bond type 等信息。

### 3D / atomistic representation

输入可能包含：

- atomic species
- coordinates
- neighborhood / geometry

必须引出科学机器学习中的重要思想：

> 同一个体系旋转、平移以后，物理性质不应该无缘无故变化。

由此介绍 invariance / equivariance，只讲直觉。

## 5.2 最重要的教学结论

> **Representation is a modeling decision.**

不是“哪个表示最新就一定最好”，而是：

- 任务需要什么信息？
- 数据量多大？
- 3D 是否重要？
- 需要什么 symmetry / physics prior？

---

# 6. AI × CHEMISTRY · 同一套机器学习逻辑，怎样进入化学科研？

## 本节回答的问题

> AI × Chemistry 到底可以做什么？

先重复全课主线：

```text
Question → Data → Representation → Model → Training → Evaluation → Decision
```

## 6.1 Property Prediction

```text
molecule / material → property
```

例子：

- solubility
- pKa
- energy
- spectra
- toxicity / activity
- electronic / materials properties

建议这里选 **solubility** 作为贯穿课程的完整例子。

## 6.2 Reaction / Experiment Prediction

```text
reactants + conditions → product / yield / selectivity
```

强调：

AI 不等于“自动发现反应”。

首先仍是一个数据定义问题：

- 输入是什么？
- 标签是什么？
- negative data 有吗？
- 实验条件是否一致？

## 6.3 Discovery / Design

```text
large chemical space
      ↓
predict / generate
      ↓
rank candidates
      ↓
experiment / computation
```

这部分不要只讲 generative AI。

更重要的概念是：

> AI 帮我们改变搜索顺序，减少昂贵实验 / 计算次数。

## 6.4 Molecular / Materials discovery loop

```text
Existing Data
     ↓
   Train
     ↓
Predict / Generate / Search
     ↓
Select Candidates
     ↓
Experiment / Compute
     ↓
New Data
     └──────────↺
```

这里自然引出：

### Active Learning

一句话：

> 不是什么数据都去收，而是让模型帮助判断下一条最值得获得的数据。

### Uncertainty

一句话：

> 不只问模型“预测多少”，还要问“它有多确定”。

---

# 7. MODERN MODELS · 从 descriptor ML 到 GNN / 3D / Foundation Models

这一节建议做成“地图”，不做算法课。

## 7.1 Classical descriptor ML

```text
molecule → descriptors/fingerprint → RF / SVM / MLP
```

优点：

- 小数据常常仍然非常有竞争力
- 快
- 易做 baseline

## 7.2 Graph Neural Networks

```text
molecular graph → message passing → molecular embedding → property
```

只解释 message passing 的直觉：

> 每个原子从邻居收集信息，逐层扩大“看到”的局部化学环境。

可以把 Chemprop / D-MPNN 作为真实工具入口，而不是细讲架构。

## 7.3 3D geometric / atomistic models

适合：

- energies
- forces
- atomistic simulation
- structures where geometry is central

强调 symmetry-aware learning。

## 7.4 Foundation / multimodal molecular models

只作为“现在正在发生什么”的窗口：

- sequence
- graph
- 3D
- spectra
- text

可能被统一到更大的 learned representation 中。

不要在本课深入比较具体 foundation model leaderboard。

---

# 8. AGENTS · 从“模型给答案”到“模型调用工具完成工作流”

## 本节回答的问题

> 为什么现在大家开始讲 Agent，而不只是 Chatbot？

核心区别：

```text
LLM answer
```

vs.

```text
LLM
 ↓
choose tool
 ↓
search / code / database / file / simulation
 ↓
read result
 ↓
continue workflow
```

## 8.1 化学科研里可能加速的事情

- literature triage
- information extraction
- database querying
- code drafting
- data cleaning
- plotting / analysis
- calculation workflow orchestration
- repeated tool calls

## 8.2 最重要的风险不是“说错一句话”

而是错误可能隐藏在工作流中间：

```text
wrong citation
wrong unit conversion
wrong data processing
wrong code
wrong tool input
wrong intermediate assumption
```

因此 agent 章节的核心不是炫技，而是：

> **workflow observability + validation + human judgment**

需要讲三个词：

- tool use
- guardrails / validation
- tracing / audit trail

## 本节留下的一句话

> **AI can accelerate scientific workflows; evidence and final judgment still belong to researchers.**

---

# 9. OUR RESEARCH · 用同一张模板读懂组内项目

这一节不应该从模型名字开始。

每个组内案例固定回答：

1. **Scientific Question** — 想解决什么？
2. **Data** — 数据来自哪里？多少？质量如何？
3. **Representation** — 模型到底看到了什么？
4. **Model** — 为什么选这个模型？
5. **Split / Evaluation** — 怎么验证泛化？
6. **Output** — 模型输出什么？
7. **Scientific Decision** — 这个输出怎样改变下一步科研动作？
8. **Failure / Limitation** — 什么情况下不能信？

每个项目只讲一条主故事。

不要堆模型 architecture。

---

# 10. CLOSING · 最后让听众带走什么？

最后不要总结成名词列表。

只留下四个问题：

1. **我的研究对象怎样变成 data？**
2. **模型真正看到的 representation 是什么？**
3. **我希望模型学会预测 / 排名 / 生成什么？**
4. **我怎样证明它在真正的新问题上有效？**

如果四件事能回答清楚，一个 AI for Chemistry 项目的雏形就已经出现了。

---

# 推荐的课程叙事顺序

```text
01 AI / ML / DL
   ↓
02 How models train
   ↓
03 Train / Validation / Test
   ↓
04 Generalization / Overfitting
   ↓
05 Chemical Representation
   ↓
06 AI × Chemistry Tasks
   ↓
07 Modern Molecular / Atomistic ML Map
   ↓
08 Agents & Scientific Workflows
   ↓
09 Our Research
   ↓
10 Resources / Closing
```

这个顺序的关键是：

**先让听众真正理解训练与泛化，再进入“AI 在化学里有哪些厉害应用”。**

否则后半部分很容易变成案例罗列。

---

# Source map · 现阶段内容来源

## A. 已上传课程课件

主要用于：

- ML = input space → target space 的 predictive function
- loss minimization
- gradient descent / regularization
- underfit / appropriate fit / overfit
- molecular representations
- SMILES
- ECFP / Morgan fingerprints
- representation invariance / completeness / smoothness
- full ML workflow
- K-fold cross-validation
- uncertainty
- generative molecular design / OLED example
- ML challenges / dataset bias

课程内容应优先保留课件的术语与结构，再做教学化压缩。

## B. Existing course notes

- `01-ai-fundamentals.md`
- `02-model-training.md`
- `03A-generalization.md`
- `03B-chemical-representation.md`
- `04-ai-chemistry.md`

这些已经构成主要知识骨架，本 blueprint 的作用是重新组织叙事，而不是把它们全部推倒重写。

## C. External reading / verification pool

### General molecular / chemistry ML

- von Lilienfeld et al. / Chemical Reviews style reviews on combining ML and computational chemistry
- molecular property prediction and reaction prediction reviews
- Nature Reviews Methods Primers: Graph Neural Networks

### Property prediction / GNN

- Yang et al., **Analyzing Learned Molecular Representations for Property Prediction** — Chemprop / directed message-passing line of work
- Chemprop official documentation
- DeepChem tutorials

### Protein structure example

- Jumper et al., **Highly accurate protein structure prediction with AlphaFold**, Nature (2021)

Use as one iconic example only; do not let drug discovery dominate the chemistry course.

### Atomistic / materials ML

- FAIR-Chem documentation and Open Catalyst / atomistic ML ecosystem
- SchNetPack documentation

### Agents

- OpenAI Agents SDK documentation: agents, tools, handoffs, guardrails, tracing

This section should be framed as workflow orchestration, not as a claim that agents can autonomously validate chemistry.

---

# Content development priorities

下一步按下面顺序补内容，不调整 UI：

## Priority 1 · 写透四个基础章节

1. AI / ML / DL
2. Training
3. Data Split
4. Generalization

目标：完全没有 AI 背景的化学听众也能顺着听懂。

## Priority 2 · 写透 Chemistry bridge

5. Representation
6. AI × Chemistry

每一种 representation 都配一个明确化学例子。

## Priority 3 · 选真实案例

最终只选 3–4 个：

- molecular property prediction
- atomistic / energy model
- reaction / experimental prediction
- discovery / active learning

每个案例回答同一套 workflow 问题。

## Priority 4 · Agents

只讲科研工作流和验证。

## Priority 5 · Group research

等组内项目材料确定后，再按统一模板补。

---

# One-line design rule for later UI work

> **每一屏只承担一个认知动作；动画只服务于这个认知动作。**

现在先把内容写清楚，再回头决定哪些地方值得做动画。
