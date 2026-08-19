---
title: 一个 AI 模型是怎么训练出来的？
duration: 12 min
section: TRAIN
source_basis: uploaded lecture pp.15–19
---

# 02 · 一个 AI 模型是怎么训练出来的？

这一节是整堂课的核心。

目标不是让听众会推导梯度下降，而是让他们形成一个稳定的训练心智模型：

```text
Data → Prediction → Loss → Update → Repeat
```

---

## 1. 从一个最简单的问题开始

继续沿用同一个例子：

> 已知一批分子的结构表示 `x` 和溶解度 `y`，我们希望训练一个模型预测新分子的溶解度。

对于第 `i` 个样本：

```text
xᵢ → model → ŷᵢ
```

其中：

- `xᵢ`：输入
- `yᵢ`：真实值
- `ŷᵢ`：模型预测

训练前，模型参数通常还没有被调整好，所以预测会有误差。

---

## 2. 什么是参数 Parameter？

可以把模型想成一个带很多“旋钮”的函数。

```text
ŷ = f(x; θ)
```

`θ` 就是所有可学习参数。

对于线性模型：

```text
ŷ = wx + b
```

这里 `w` 和 `b` 就是参数。

对于神经网络，只是参数数量更多、函数更灵活。

### 讲课类比

模型像一台还没校准好的仪器。

- 数据告诉它“输入是什么”
- 标签告诉它“正确答案是什么”
- 参数决定它现在怎么计算
- 训练就是不断校准这些参数

---

## 3. 预测以后，怎么知道模型错了多少？

需要一个 **loss function**。

源课件把 loss 描述为：把 ground truth 与 model prediction 之间的距离压缩成一个数，用这个数评价模型，并在训练过程中把它最小化。

例如回归里可以用：

### Absolute error

```text
|ŷ - y|
```

### Squared error

```text
(ŷ - y)²
```

第一小时不用推公式细节，只要强调：

> loss 越小，说明在当前评价规则下预测和真实答案越接近。

---

## 4. 训练的本质：让 loss 变小

源课件明确把 ML training 描述为 minimizing the loss，并以 stochastic gradient descent 作为典型例子。

教学动画建议：

```text
Step 1
Model predicts 3.2
Truth is 5.0
Loss = large

Step 2
update parameters

Step 3
Model predicts 4.1
Loss = smaller

Step 4
update again
...
```

可以用一个非常简单的线性回归 toy model：

```text
y = wx + b
```

网页上提供两个参数滑杆：

- slope `w`
- intercept `b`

先让听众手动调。

然后点击：

**Let the model learn →**

页面自动迭代几步，把线慢慢移动到数据附近，同时显示：

```text
loss: 2.41 → 1.52 → 0.87 → 0.31
```

这样他们会先“看见训练”，再听术语。

---

## 5. Learning rate 是什么？

只讲直觉：

> 每次调整参数时，走多大一步。

可以做一个小动画：

### 太小

```text
learning rate = 0.001
```

模型慢慢靠近最优解。

### 合适

```text
learning rate = 0.05
```

比较快收敛。

### 太大

```text
learning rate = 1.0
```

在最优位置两边来回跳，甚至越来越差。

不需要解释 Hessian、momentum 或 Adam。

---

## 6. Epoch 与 Batch

### Epoch

整个训练数据被模型完整看过一遍。

### Batch

一次用多少样本计算预测和更新。

可以用卡片动画：

```text
Dataset: 100 molecules
Batch size: 20

batch 1 → update
batch 2 → update
batch 3 → update
batch 4 → update
batch 5 → update

= 1 epoch
```

这一层讲到“知道这些词是什么意思”即可。

---

## 7. 为什么训练数据不能全部拿来考试？

源课件把 training dataset 定义为模型真正看到并用于学习的数据，而 test/validation dataset 应该保持未见，用来评估模型是否真的学到了可泛化的规律。

因此：

```text
Dataset
├── Training set
├── Validation set
└── Test set
```

第一小时建议讲成：

- **Train**：做题练习
- **Validation**：模拟考试，用来调模型和超参数
- **Test**：最后一次真正考试

最重要的规则：

> 不要一边看最终试卷答案，一边修改模型。

---

## 8. 模型训练的完整最小循环

```text
1. Take a batch of data
       ↓
2. Make predictions
       ↓
3. Compare with labels
       ↓
4. Compute loss
       ↓
5. Update parameters
       ↓
6. Repeat
```

把这张图做成全网站的“核心动画”。

后面讲任何模型都可以回来指它：

> 神经网络更复杂，分子图更复杂，大模型更复杂，但训练思想仍然围绕这个循环展开。

---

## 9. 这一节结束要留下的三句话

1. **Model = a learnable function.**
2. **Loss tells us how wrong the model is.**
3. **Training changes parameters to reduce loss.**

下一节马上问：

> 如果 training loss 越来越低，是不是说明模型一定越来越好？

答案当然不是。

这自然进入：**generalization / overfitting**。

---

## English summary

A model contains learnable parameters `θ`. During supervised training, inputs are passed through the model to make predictions. A loss function measures the discrepancy between predictions and known targets. Optimization repeatedly updates the parameters to reduce this loss. The training set is used to learn parameters, while held-out validation/test data are used to evaluate whether what was learned generalizes beyond the examples seen during training.
