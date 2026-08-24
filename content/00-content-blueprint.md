# AI for Chemistry · Content Blueprint v3

> Status: content-first planning. UI and animation are intentionally out of scope for this file.
>
> Audience: incoming graduate students from both chemistry and computer science backgrounds, including students with little formal training in the other field.
>
> Core route: **从一个真实的分子性质预测问题出发 → 理解基本机器学习概念 → 看懂训练循环 → 理解 Train / Validation / Test → generalization → chemical representation → AI × Chemistry tasks → scientific agents → group research.**

> **Track A implementation (2026-08-20):** 基础概念与训练 / 数据划分已经落实到 [01-ai-fundamentals.md](./01-ai-fundamentals.md) 和 [02-model-training.md](./02-model-training.md)。可复用 16:9 SVG 位于 [`assets/teaching`](../assets/teaching/)，可运行课堂实验位于 [`notebooks/01-train-validate-test-playground.ipynb`](../notebooks/01-train-validate-test-playground.ipynb)。这两份成稿是授课与网页拆解的当前依据，本蓝图保留全课程层级的规划职责。

---

# 0. Course promise

这门课用一个分子性质预测任务串起 AI × Chemistry 的基础概念。听众不需要在第一小时掌握神经网络推导，也不必记住一长串模型名。

课程结束时，不同背景的研 0 应能用同一套问题读懂一个 AI × Chemistry 项目。

化学背景的同学能看懂常见的机器学习术语和训练逻辑；计算机背景的同学能知道 `x`、`y`、split 和 evaluation 在化学研究里各指什么。

面对一个 AI × Chemistry 项目，学生应能主动问：

```text
Scientific question 是什么？
数据从哪里来？
模型实际接收到的 representation 是什么？
模型要预测什么 target？
模型怎样训练？
Train / Validation / Test 是怎样划分的？
Evaluation 是否能够反映真正的 generalization？
模型输出最后怎样服务于科研决策？
```

整门课沿用下面这一条主线：

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

前面的基础章节先说明这些概念在同一个任务里怎样配合，再进入具体模型和化学应用。

---

# 1. INTRO · 从一个分子性质预测问题理解 AI / ML / DL

## 本节回答的问题

> **如果已经测过一批分子，怎样把“预测一个新分子的性质”写成一个机器学习问题？AI、ML、DL 又分别处于什么层级？**

本节从一个真实的 chemistry regression task 开始。AI 历史不放在这条教学主线上。

John Delaney 2004 年的 ESOL 工作可以作为贯穿前两节的例子：

```text
molecular structure / properties
              ↓
       aqueous solubility
```

论文使用 2874 条实测溶解度数据建立回归模型。

课堂中为了便于说明，可以把问题简化为：

```text
已经测过 500 个 molecule
              ↓
能不能预测第 501 个 molecule？
```

需要明确：

> 500 / 501 是教学示意，真实 ESOL 工作的数据规模和建模细节以原论文为准。

## 1.1 AI / ML / DL 的关系

保留最基本的层级：

```text
AI
└── ML
    └── DL
```

需要讲清：

- AI 是更大的技术集合，不等于 ChatGPT。
- ML 从 data 中学习 predictive mapping。
- DL 属于 ML，通常使用多层神经网络，也能学习更复杂的 representation。
- LLM / Generative AI 可以作为现代 AI 的例子，但不作为理解监督学习训练逻辑的起点。

## 1.2 用一个 running example 解释八个核心概念

全课贯穿例子：

```text
molecular representation → solubility
```

需要明确出现：

| 概念 | 溶解度任务中的含义 |
|---|---|
| Sample | 一个 molecule |
| Feature / Representation `x` | descriptor / fingerprint / graph / 3D representation |
| Label / Target `y` | measured aqueous solubility |
| Model `f(x; θ)` | 从输入表示到溶解度预测的函数 |
| Parameter `θ` | 可以通过训练调整的内部数值 |
| Prediction `ŷ` | predicted solubility |
| Loss | prediction 与 measured value 之间的误差 |
| Optimization | 根据 loss 调整 `θ` 的过程 |

听众不必先背定义；能把这些词对应到一个具体任务就够了。

## 1.3 最小数学表达

保留：

```text
ŷ = f(x; θ)
```

解释：

- `x` = model input / representation
- `θ` = learnable parameters
- `ŷ` = prediction
- `y` = known target during supervised training

不在这一节展开 neural-network mathematics。

## 1.4 本节留下的问题

在本节结束前提出：

> 如果有 500 条 measured data，是不是全部拿去训练就可以？

这个问题进入下一节的训练和 data split。

## 本节暂不展开

- Transformer architecture
- CNN / RNN 历史
- backpropagation 推导
- optimizer zoo
- 大模型参数量比较
- supervised / unsupervised / reinforcement learning 的完整 taxonomy

这些内容留到后续课程按需要展开。当前先把基础主线走完。

## References

- Delaney, J. S. **ESOL: Estimating Aqueous Solubility Directly from Molecular Structure.** J. Chem. Inf. Comput. Sci. 44, 1000–1005 (2004).  
  https://doi.org/10.1021/ci034243x
- Dive into Deep Learning.  
  https://d2l.ai/
- scikit-learn Getting Started.  
  https://scikit-learn.org/stable/getting_started.html

---

# 2. TRAIN · 一个模型怎样从数据中学习？

## 本节回答的问题

> **训练模型时，到底发生了什么？**

目标是让听众形成下面这个基本训练循环：

```text
Data → Prediction → Loss → Update θ → Repeat
```

不要求在本节推导 gradient descent。

## 2.1 Prediction

继续使用 solubility running example：

```text
xᵢ → model f(xᵢ; θ) → ŷᵢ
```

需要讲清：

- `xᵢ` 是 molecular representation
- `yᵢ` 是 measured solubility
- `ŷᵢ` 是 predicted solubility
- `θ` 是 model parameters

训练开始时，参数还没有经过数据调整，因此 prediction 往往不够准确。

## 2.2 Parameter

最简单模型：

```text
ŷ = wx + b
```

其中 `w`、`b` 是 parameters。

可以使用“仪器校准”的类比：

- model = 待校准仪器
- data = calibration samples
- label = reference values
- parameters = 可调整的内部设置
- training = 根据误差反复调整参数

这个类比用于帮助建立直觉，不作为严格数学等价关系。

## 2.3 Loss

展示两个简单的回归形式：

```text
absolute error = |ŷ-y|
squared error  = (ŷ-y)²
```

核心：

> **Loss 把 prediction 与 target 之间的差异表示成一个数值目标。**

不在这一节比较各种 loss function。

## 2.4 Optimization

基本关系：

```text
current θ
   ↓
prediction
   ↓
loss
   ↓
update
   ↓
new θ
```

gradient descent 只讲直觉：

> 根据当前 loss 判断参数往哪个方向调整可能让 loss 更小，然后更新一次参数。

不推导 gradient 公式。

## 2.5 Learning rate

只讲 parameter update 的 step size：

```text
too small  → slow
reasonable → stable progress
too large  → oscillate / diverge
```

不展开 momentum、Adam、RMSProp。

## 2.6 Batch / Epoch

使用简单数字说明：

```text
Dataset = 100 training samples
Batch size = 20

batch 1 → update
batch 2 → update
batch 3 → update
batch 4 → update
batch 5 → update

≈ 1 epoch
```

需要明确：

- batch size = 一次 parameter update 使用多少样本
- epoch = 完整处理一次 training set

## 2.7 完整训练循环

```text
1. take a batch
       ↓
2. make predictions
       ↓
3. compare with targets
       ↓
4. compute loss
       ↓
5. update parameters
       ↓
6. repeat
```

后面介绍更复杂模型时，可以继续使用这套训练框架。

---

# 3. DATA SPLIT · 为什么不能用同一批数据既训练又评估？

这一部分并入 `02-model-training.md` 作为训练章节的后半段。

原因是训练循环介绍完成后，自然会出现一个问题：

> training loss 已经下降，怎样判断模型对没有见过的数据也有效？

## 本节回答的问题

> **一个模型在手上的数据上表现很好，为什么还不能直接认为它能够处理新的数据？**

## 3.1 回到第 501 个 molecule

教学场景：

```text
500 measured molecules
```

如果全部用于训练，再在同样 500 个 molecules 上评估：

```text
seen during training
        ↓
evaluated again
```

这个结果不能可靠回答：

```text
第 501 个没有见过的 molecule 会怎样？
```

scikit-learn 官方文档明确指出，在同一数据上学习参数并测试模型是一种 methodological mistake，因为一个只记住训练数据的模型也可能得到很高分，却无法处理 unseen data。

## 3.2 Training set

Training set 真正参与 parameter learning：

```text
Train
 ↓
prediction
 ↓
loss
 ↓
update θ
```

一句话：

> **Training set 用于学习 model parameters。**

## 3.3 Validation set

Validation set 不直接参与 parameter gradient update，但会影响：

- model selection
- learning rate / hyperparameter tuning
- epoch count
- early stopping
- checkpoint selection

一句话：

> **Validation set 用于开发过程中的选择和调整。**

## 3.4 Test set

Test set 尽量在模型和主要训练方案确定之后使用：

```text
Train
  ↓
learn parameters

Validation
  ↓
choose model / hyperparameters

model development finished
  ↓
Test
  ↓
final evaluation
```

需要明确：

如果研究者根据 test score 反复修改模型，test set 就已经间接参与了 model selection。

因此：

> **Test set 的作用是提供尽可能独立的最终评估。**

## 3.5 数据划分比例只是示意

例如：

```text
500 molecules

350 Train
75  Validation
75  Test
```

70 / 15 / 15 只作为教学示例。

真实 split 需要根据：

- 数据量
- 数据分布
- 未来使用场景
- 是否使用 cross-validation
- 是否存在时间顺序
- 是否存在 scaffold / series structure
- 是否可能出现 data leakage

进行设计。

## 3.6 化学任务中的额外问题

化学数据中不同样本之间常常具有明显的结构相关性。

需要提前提醒：

- 相似 scaffold 可能同时进入 train 和 test
- 同系列 analogues 可能造成较高相似性
- 不同实验来源可能存在 batch / lab bias
- 时间顺序可能影响真实使用场景

这一节先提出问题。

下一节 Generalization 再继续讨论：

> **Test set 是否有意义，要看它是否代表未来要预测的数据，而不只看模型是否见过其中的样本。**

## 本节最后留下四句话

1. **Model = a learnable function.**
2. **Loss = prediction error under a chosen objective.**
3. **Training = changing parameters to reduce loss.**
4. **Low training loss is not evidence of good unseen-data performance.**

## References

- scikit-learn, Cross-validation: evaluating estimator performance.  
  https://scikit-learn.org/stable/modules/cross_validation.html
- scikit-learn, Getting Started — Model evaluation.  
  https://scikit-learn.org/stable/getting_started.html
- Dive into Deep Learning, Minibatch Stochastic Gradient Descent.  
  https://d2l.ai/chapter_optimization/minibatch-sgd.html
- Dive into Deep Learning, Stochastic Gradient Descent.  
  https://en.d2l.ai/chapter_optimization/sgd.html
- Delaney ESOL paper.  
  https://doi.org/10.1021/ci034243x

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

描述模型解释目标变化的程度；不能单独作为「模型可信」的证明。

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

# 5. REPRESENTATION · AI 怎样「看到」一个分子？

## 本节回答的问题

> 普通 ML 里写 `x` 很容易，但对一个分子来说，`x` 到底是什么？

这里开始讨论 AI 怎样接收化学对象。

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

选 representation 时，先问：

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

这里继续用 solubility 作为贯穿课程的完整例子。

## 6.2 Reaction / Experiment Prediction

```text
reactants + conditions → product / yield / selectivity
```

强调：

AI 不等于「自动发现反应」。

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

> 不必把所有数据一股脑收进来。模型可以帮助判断下一条实验数据值不值得做。

### Uncertainty

一句话：

> 不只问模型「预测多少」，还要问「它有多确定」。

---

# 7. MODERN MODELS · 从 descriptor ML 到 GNN / 3D / Foundation Models

这一节建议做成概览，不做算法推导。

## 7.1 Classical descriptor ML

```text
molecule → descriptors/fingerprint → RF / SVM / MLP
```

优点：

- 小数据场景下仍然常常具有竞争力
- 训练和推理较快
- 适合作为 baseline

## 7.2 Graph Neural Networks

```text
molecular graph → message passing → molecular embedding → property
```

只解释 message passing 的直觉：

> 每个原子从邻居收集信息，逐层整合更大范围的局部化学环境。

可以把 Chemprop / D-MPNN 作为真实工具入口，而不是细讲架构。

## 7.3 3D geometric / atomistic models

适合：

- energies
- forces
- atomistic simulation
- structures where geometry is central

强调 symmetry-aware learning。

## 7.4 Foundation / multimodal molecular models

作为当前研究趋势的概览：

- sequence
- graph
- 3D
- spectra
- text

这些模态可以被用于学习更通用的 representation。

本课不深入比较具体 foundation model leaderboard。

---

# 8. AGENTS · 从「模型给答案」到「模型调用工具完成工作流」

## 本节回答的问题

> 为什么现在会讨论 Agent，而不仅仅是 Chatbot？

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

## 8.1 化学科研里可能加速的工作

- literature triage
- information extraction
- database querying
- code drafting
- data cleaning
- plotting / analysis
- calculation workflow orchestration
- repeated tool calls

## 8.2 Agent 工作流中的风险

错误可能出现在：

```text
wrong citation
wrong unit conversion
wrong data processing
wrong code
wrong tool input
wrong intermediate assumption
```

因此 agent 章节重点讨论：

> **workflow observability + validation + human judgment**

需要讲三个词：

- tool use
- guardrails / validation
- tracing / audit trail

## 本节留下的一句话

> **AI can accelerate scientific workflows; evidence and final judgment still belong to researchers.**

---

# 9. OUR RESEARCH · 用同一张模板读懂组内项目

这一节不从模型名字开始。

每个组内案例固定回答：

1. **Scientific Question** — 想解决什么？
2. **Data** — 数据来自哪里？多少？质量如何？
3. **Representation** — 模型实际接收到什么？
4. **Model** — 为什么选择这个模型？
5. **Split / Evaluation** — 怎样验证泛化？
6. **Output** — 模型输出什么？
7. **Scientific Decision** — 这个输出怎样影响下一步科研动作？
8. **Failure / Limitation** — 什么情况下不能信？

每个项目只讲一条主线。

不要堆叠模型 architecture。

---

# 10. CLOSING · 最后让听众带走什么？

最后保留四个问题：

1. **我的研究对象怎样变成 data？**
2. **模型真正看到的 representation 是什么？**
3. **我希望模型学会预测 / 排名 / 生成什么？**
4. **我怎样证明它在真正的新问题上有效？**

能回答这四个问题，就能用一个基本框架读懂多数 AI for Chemistry 项目。

---

# 推荐的课程叙事顺序

文件结构上，`Train / Validation / Test` 并入 `02-model-training.md`。

课程叙事仍然把它作为一个明确的认知节点：

```text
01 AI / ML / DL + eight core terms
   ↓
02 How models train
   ↓
   Train / Validation / Test
   ↓
03 Generalization / Overfitting
   ↓
04 Chemical Representation
   ↓
05 AI × Chemistry Tasks
   ↓
06 Modern Molecular / Atomistic ML Map
   ↓
07 Agents & Scientific Workflows
   ↓
08 Our Research
   ↓
09 Resources / Closing
```

认知顺序是：

> **先知道模型在学习什么，再知道模型怎样训练；随后讨论怎样判断模型是否能处理没有见过的数据。**

在这个基础上，再进入 GNN、3D model 和 Agent，会更容易建立完整理解。

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

课程内容优先保留课件术语与结构，再做教学化压缩。

## B. Existing course notes

- `01-ai-fundamentals.md`
- `02-model-training.md`
- `03-generalization.md`
- `04-ai-chemistry.md`

目前 01 / 02 已按「真实 running example + training loop + data split」重新组织。

## C. External verification pool

### Running example

- Delaney, J. S. **ESOL: Estimating Aqueous Solubility Directly from Molecular Structure.** J. Chem. Inf. Comput. Sci. 44, 1000–1005 (2004).  
  https://doi.org/10.1021/ci034243x

### Training / evaluation

- scikit-learn, **Cross-validation: evaluating estimator performance**  
  https://scikit-learn.org/stable/modules/cross_validation.html
- scikit-learn, **Getting Started — Model evaluation**  
  https://scikit-learn.org/stable/getting_started.html
- Dive into Deep Learning, **Minibatch Stochastic Gradient Descent**  
  https://d2l.ai/chapter_optimization/minibatch-sgd.html
- Dive into Deep Learning, **Stochastic Gradient Descent**  
  https://en.d2l.ai/chapter_optimization/sgd.html

### General molecular / chemistry ML

- molecular property prediction and reaction prediction reviews
- Nature Reviews Methods Primers: Graph Neural Networks

### Property prediction / GNN

- Yang et al., **Analyzing Learned Molecular Representations for Property Prediction**
- Chemprop official documentation
- DeepChem tutorials

### Protein structure example

- Jumper et al., **Highly accurate protein structure prediction with AlphaFold**, Nature (2021)

Use as one iconic example only; do not let drug discovery dominate the chemistry course.

### Atomistic / materials ML

- FAIR-Chem documentation and Open Catalyst / atomistic ML ecosystem
- SchNetPack documentation

### Agents

- OpenAI Agents documentation: agents, tools, guardrails, tracing

This section should be framed as workflow orchestration, not as a claim that agents can autonomously validate chemistry.

---

# Content development priorities

## Priority 1 · 写透四个基础章节

1. AI / ML / DL + eight core terms
2. Training loop
3. Train / Validation / Test
4. Generalization

目标是让不同本科背景的研 0 学生，都能够把这些概念放回一个具体科研任务中。

## Priority 2 · 写透 Chemistry bridge

5. Representation
6. AI × Chemistry

每一种 representation 都配一个明确、可核查的 chemistry example。

## Priority 3 · 选择真实案例

最终只选 3–4 个：

- molecular property prediction
- atomistic / energy model
- reaction / experimental prediction
- discovery / active learning

每个案例回答同一套 workflow 问题。

如果没有可靠出处，不使用为了教学方便而虚构的科研案例。

## Priority 4 · Agents

只讲科研工作流和验证。

## Priority 5 · Group research

等组内项目材料确定后，再按统一模板补。

---

# One-line design rule for later UI work

> **每一屏只承担一个认知动作，动画只服务于这个认知动作。**
