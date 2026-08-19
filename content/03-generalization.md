---
title: 训练得很好，不等于真的学会
duration: 10 min
section: GENERALIZATION
source_basis: uploaded lecture pp.19–23 and p.68
---

# 03 · 训练得很好，不等于真的学会

这一节回答一个关键问题：

> 如果 training loss 越来越小，是不是说明模型一定越来越好？

不是。

真正重要的是：

# 模型能不能在没见过的数据上也表现好？

这叫 **generalization**。

---

## 1. 三种情况

源课件用非常直观的三幅图区分：

### Underfitting · 欠拟合

模型太简单，连训练数据中的基本规律都没抓住。

典型表现：

```text
training error: high
validation error: high
```

### Appropriate fitting · 合适拟合

模型足够灵活，能捕获主要规律，同时没有追着每一个噪声点跑。

```text
training error: low
validation error: low
```

### Overfitting · 过拟合

模型非常灵活，几乎把训练数据“背下来”，但面对新数据时表现变差。

```text
training error: very low
validation error: high
```

源课件强调：过拟合会让 unseen data 上的误差增加，因为模型在训练集上用了过于复杂的函数去逼近一个本来更简单的关系。

---

## 2. 为什么“复杂模型”不一定更好？

想象我们只有十几个数据点。

一条非常复杂的曲线可以穿过所有点：

```text
training error ≈ 0
```

但这条曲线可能只是把：

- 测量噪声
- 偶然波动
- 数据集偏差

也当成了真正规律。

所以机器学习不是比赛：

> 谁把训练集拟合得最完美。

真正比赛的是：

> 谁能对新的、合理分布内的数据预测得更可靠。

---

## 3. 网页 Playground：Model Complexity

当前网页已有 complexity slider。

建议现场这样讲：

### Step 1 · 拉到左边

曲线太简单。

问：

> 它连训练数据都描述不好，这是什么？

答案：**underfitting**。

### Step 2 · 移到中间

曲线抓住趋势。

训练点和测试点都比较合理。

### Step 3 · 拉到最右边

曲线开始疯狂弯折。

训练误差继续下降，但测试误差上升。

此时页面手写弹出：

> **memorizing ≠ generalizing**

---

## 4. Train / Validation / Test 为什么要分开？

这是避免自我欺骗的基本设计。

可以类比：

### Training set

平时练习题。

模型可以看答案并不断修改自己。

### Validation set

模拟考试。

用来比较：

- 模型复杂度
- learning rate
- regularization strength
- 其他 hyperparameters

### Test set

最终考试。

不应该反复用它指导模型设计。

否则 test set 也会被“间接学进去”。

---

## 5. Cross-validation 是什么？

当数据量不大时，只做一次 train/validation split 可能很偶然。

源课件给出 K-fold cross validation：把 training/validation data 分成若干 folds，轮流让一份作为 validation，其余用于 training，再综合多次结果。

例如 5-fold：

```text
Round 1: [VAL][TRAIN][TRAIN][TRAIN][TRAIN]
Round 2: [TRAIN][VAL][TRAIN][TRAIN][TRAIN]
Round 3: [TRAIN][TRAIN][VAL][TRAIN][TRAIN]
Round 4: [TRAIN][TRAIN][TRAIN][VAL][TRAIN]
Round 5: [TRAIN][TRAIN][TRAIN][TRAIN][VAL]
```

然后取平均表现。

课件指出 K-fold CV 可用于：

- model validation
- hyperparameter optimisation
- 识别数据不平衡或异常情况
- 减少单次划分带来的偶然性

### 网页动画

五张 molecule cards 自动轮换：

```text
TRAIN TRAIN TRAIN TRAIN TEST
```

一张一张轮流变色。

这会比公式更容易理解。

---

## 6. 怎么评价回归模型？

源课件列出：

- MAE
- RMSE
- R²

第一小时建议只给直觉。

### MAE · Mean Absolute Error

> 平均来说，我们预测离真实值差多少？

如果预测溶解度：

```text
MAE = 0.3
```

就是平均绝对误差约为 0.3 个目标单位。

### RMSE · Root Mean Squared Error

和 MAE 类似，但更惩罚大的错误。

因此少数非常离谱的预测会让 RMSE 上升得更明显。

### R²

表示模型解释数据变化的程度。

入门课不要把它讲成“越接近 1 模型就绝对可靠”。

因为：

- 数据划分方式
- 数据分布
- 外推范围
- 不确定度

都仍然重要。

---

## 7. 化学数据里为什么尤其容易出问题？

源课件列出的常见 ML challenge 包括：

- insufficient training data
- nonrepresentative data / bias
- poor-quality data / noise
- irrelevant features
- overfitting

这些问题在化学里很真实。

例如数据库可能主要包含：

- 容易合成的分子
- 某类骨架
- 某一测量条件
- 成功发表的结果

于是模型真正学到的可能是：

> “这个数据库长什么样”

而不一定是：

> “所有化学空间真正遵循什么规律”。

---

## 8. 一个非常重要的科研习惯

不要只问：

> 我的模型 MAE 是多少？

还要问：

> 这个测试集真的代表我以后想预测的问题吗？

例如：

如果训练集和测试集里都有非常相似的分子，结果可能很好看。

但真正使用模型时，你可能要预测完全不同的 scaffold。

那么实际难度会更高。

---

## 本节留下的三句话

1. **Low training error is not the goal.**
2. **Generalization to unseen data is the goal.**
3. **Evaluation quality depends on how you split and understand the data.**

下一节自然转向：

> 对化学来说，模型输入的 `x` 到底是什么？

也就是 **molecular representation**。
