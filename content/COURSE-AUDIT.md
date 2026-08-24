# COURSE AUDIT · 两门课程顺序、重复与衔接

> 目标人群：化学背景新生。
>
> 原则：保留原有交互和动画；重复概念只有在“作用改变”时才允许再次出现；两门课顺序固定为 **01 人工智能技术入门 → 02 AI 模型训练**。

## 一、最终课程顺序

### COURSE 01 · 人工智能技术入门

主线：**先知道 AI 能做什么、化学对象怎样进入模型、现代 AI×Chemistry 项目长什么样。**

建议屏幕顺序：

1. Home / 课程总览
2. 为什么化学新生需要懂 AI
3. 第 501 个分子：500 个已测样本能否预测下一个？
4. AI / ML / DL
5. Sample / Representation / Target / Model 等角色地图（Loss / Optimization 只作名词预告，不在此展开训练）
6. Chemical representation：Descriptor / Fingerprint / SMILES / Graph / 3D
7. Representation ≠ Model
8. GNN message passing
9. 3D geometry：invariance / equivariance
10. AI×Chemistry capability map：Graph / 3D / Multimodal / Knowledge+Tools
11. Predict / Simulate / Search & Design
12. Discovery loop
13. NMRNet：3D → SE(3) Transformer → pretrain/fine-tune → chemical shift
14. Electrolyte uMLP：chemical space → concurrent learning/DFT → uMLP → MLMD → properties
15. Cat-KG + LLM：literature → extraction → KG → chemistry rules → traceable pathway
16. NOSE：molecule + receptor sequence + odor language → aligned representation
17. Uni-XAS：XAS spectrum ↔ shared latent space ↔ local 3D structure
18. Electroplating R&D Agent：specialist models → orchestration → screening → experiment → iterate
19. Agent：tool orchestration / provenance / verification
20. Research Gallery：6 项工作统一入口
21. Reviews / Perspectives：Best Practices / GNN Primer / Electrochemistry Perspective / Agentic Science survey

第一门课的结论：

> AI × Chemistry 不等于某一种模型。一个科研系统可以做预测、模拟、跨模态学习、知识检索与工具编排；真正判断价值时，要回到数据、任务、验证和科学决策。

---

### COURSE 02 · AI 模型训练

主线：**再把“模型是怎样学会的、为什么值得相信”拆开。**

建议屏幕顺序：

1. `ŷ = f(x; θ)`：x / θ / ŷ / y
2. Prediction vs Target vs Loss
3. Training loop：Data → Prediction → Loss → Update
4. Gradient Descent Playground / Learning Rate
5. Batch / Epoch
6. 为什么不能所有样本都拿去训练
7. Train / Validation / Test Playground
8. Generalization：训练表现 ≠ 未来表现
9. Training vs Validation curve / overfitting
10. “Unseen” 是开发流程角色，不等于 OOD
11. Random / Scaffold / Time / External split
12. Leakage / dependence / weak split 三分法
13. MAE / RMSE
14. R² 相对 mean baseline
15. Applicability / trust zone
16. Generalization checkpoint

第二门课的结论：

> 训练的目标不是让 training loss 尽可能小，而是构建一个在预期使用场景中能被可信评估、能稳定泛化的模型。

---

## 二、当前内容中曾经存在、现在需要避免的冲突

### 1. 原首页顺序：Training → Chemistry

旧页面的导航和 Hero 容易让人理解为：

`AI concepts → model training → chemistry`

这与两门课程的实际顺序冲突。

**处理：** 页面运行时明确改成：

`Course 01 AI Intro / Chemistry / Cases → Course 02 Training / Generalization`

原动画不删除，只重排。

### 2. Representation 重复

旧 INTRO、03B、旧 04 都会重复解释 descriptor / fingerprint / graph / 3D。

**最终归属：**

- Course 01 的 Representation 页面是唯一完整定义页；
- 第 501 个分子和角色地图只说“x 是 representation”，不展开比较；
- 案例页只说明“这个项目为什么需要 3D / multimodal / KG”，不重新讲表示定义。

### 3. Generalization 与 Train/Val/Test 重复

Course 01 只允许出现一句提醒：“看到模型结果要问它怎样验证”。

完整的 Train / Validation / Test、overfitting、split、metrics 全部归 Course 02。

### 4. Agent 重复

Cat-KG 与电镀 Agent 已经包含 Agent 元素；NOW 页不应再重复讲“Agent 是什么”十分钟。

**建议：** NOW 页改成 2–3 分钟总结：

`Goal → planner/model → tools → evidence → update plan → next action`

并强调 provenance / tool validation / human review。

### 5. Research Gallery 与 6 个案例页重复

专题页负责讲故事；Gallery 不再重新讲方法。

**Gallery 的作用改成：**

- 快速回顾 6 个项目；
- 查看 evidence status；
- 点论文 / 代码 / APP / 数据 / 项目主页；
- 课后自由浏览。

因此这不是重复教学，而是“索引页”。

---

## 三、还建议补的内容

### MUST · 课程现场补一句

在 Course 01 → Course 02 的桥接页明确说：

> 第一门我们故意先看“AI 能怎样进入化学”。现在第二门倒回来拆黑箱：这些 prediction 是怎样通过数据、Loss 和参数更新学出来的？

这样先应用后机制不会显得顺序奇怪，反而更适合新生。

### MUST · 每个真实案例统一回答 4 个问题

1. Scientific question 是什么？
2. Data / representation 是什么？
3. Model / workflow 做了什么？
4. Output 怎样被验证或用于下一步科学决策？

### OPTIONAL · 原论文 Figure

目前优先采用根据论文方法重画的 HTML/CSS 流程图。

只有以下情况值得加入原论文 Figure：

- 原图表达了无法用简化流程图替代的科学结果；
- 图像许可 / 论文使用规则明确；
- 标明 `Source: Paper Figure X`；
- 页面上仍保留论文链接。

不要为了“像科研报告”而大量截图。

### OPTIONAL · 综述层

Reviews / Perspectives 建议长期保留 4 类：

- 化学 ML 最佳实践；
- GNN / geometric ML 方法 Primer；
- 一个贴近课题组方向的领域 Perspective；
- Agentic Science / Scientific Agent 总览。

这样资源页不只是教程，也能给新生一条“从入门到看前沿综述”的阅读路径。

---

## 四、六个案例的能力链

六项工作不建议按发表时间排列，而按能力扩展排列：

```text
NMRNet
3D structure → atom-level prediction

↓

Electrolyte uMLP
3D atomistic learning → molecular simulation

↓

Cat-KG + LLM
literature → structured knowledge → traceable reasoning

↓

NOSE
molecule ↔ receptor ↔ language multimodality

↓

Uni-XAS
spectrum ↔ 3D structure bidirectional multimodality

↓

Electroplating R&D Agent
specialist models + tools + experiments → orchestrated R&D workflow
```

教学上形成：

**Predict → Simulate → Organize Knowledge → Connect Modalities → Generate / Invert → Orchestrate Research**

这比“连续介绍 6 篇论文”更容易让新生记住。
