# AI4S-Chem 三人协作操作指南

> Repository: `windyduan/AI4S-Chem`  
> 当前阶段：**内容优先（Content First）**  
> 原则：**各自在自己的分支写内容 → 提交 → Pull Request → 审核 → 合并到 `main` → 最后统一做网页与动画**

---

## 1. 当前分工与分支

| Track | 分支 | 主要内容 |
|---|---|---|
| A | `content/foundations-training` | AI / ML / DL、模型训练、Train / Validation / Test |
| B | `content/generalization-representation` | 泛化、评估、过拟合、化学表示 |
| C | `content/chemistry-frontier` | AI × Chemistry 案例、Agent、组内科研内容 |

`main` 是**正式整合分支**。

### 重要规则

- 不要直接在 `main` 上写内容。
- 每个人只在自己负责的分支工作。
- 当前阶段优先修改 `content/*.md`。
- 暂时不要修改网站布局、动画和交互代码。
- 内容完成后通过 Pull Request 合并到 `main`。
- 三个 Track 合并完成后，再统一做课程总编辑与网页实现。

---

## 2. 第一次开始工作

### 2.1 Clone 仓库

```bash
git clone https://github.com/windyduan/AI4S-Chem.git
cd AI4S-Chem
```

如果已经 clone 过，则不需要重复操作。

### 2.2 获取最新分支

```bash
git fetch origin
```

### 2.3 切换到自己的工作分支

#### Track A

```bash
git switch content/foundations-training
git pull origin content/foundations-training
```

#### Track B

```bash
git switch content/generalization-representation
git pull origin content/generalization-representation
```

#### Track C

```bash
git switch content/chemistry-frontier
git pull origin content/chemistry-frontier
```

---

## 3. 每次开始写之前

先确认自己当前在哪个分支：

```bash
git branch
```

例如：

```text
  main
* content/generalization-representation
```

带 `*` 的就是当前分支。

**确认不是 `main` 再开始修改。**

然后拉取当前分支最新内容：

```bash
git pull
```

---

## 4. 当前阶段应该修改哪些文件？

主要修改：

```text
content/*.md
```

例如：

```text
content/01-ai-fundamentals.md
content/02-model-training.md
content/03-generalization.md
content/04-ai-chemistry.md
```

需要的话也可以在 `content/` 下新增内容文件、案例笔记或参考资料说明。

### 当前阶段暂时不要修改

除非提前协调，否则不要修改：

```text
index.html
styles.css
app.js
app-resources.js
homepage-final.css
layout-fixes.css
course-effects.css
train-merge.css
```

原因：

> 现在先把“讲什么”确定下来，最后再统一决定“怎么展示”。

---

## 5. 写作统一格式

每个章节建议按照下面的结构写：

```markdown
# 章节标题

## 这一节回答什么问题？

## 听众最后必须记住的 3 件事

1.
2.
3.

## 讲述逻辑

1.
2.
3.

## 核心概念

## 贯穿例子

## 必须出现的公式 / 图

## 容易误解的地方

## Chemistry connection

## References

## 最后网站上保留什么？

- 一句话 / 一个核心问题
- 一个图、动画或交互
- 2–4 个关键概念
```

---

## 6. 统一课程术语

尽量统一使用：

```text
Sample
Feature / Representation
Label / Target
Model
Parameter
Prediction
Loss
Optimization
Train / Validation / Test
Generalization
Evaluation
```

如果需要使用同义词，要在第一次出现时说明关系。

---

## 7. 前半部分尽量使用同一个贯穿例子

推荐：

> 已知一批分子的结构 / 表示和对应溶解度，训练模型预测一个未见分子的溶解度。

这个例子可以连续用于：

```text
Input
↓
Target
↓
Prediction
↓
Loss
↓
Parameter Update
↓
Train / Validation / Test
↓
Generalization
↓
Chemical Representation
```

---

## 8. 内容资料与引用规则

优先级建议：

1. **Original Paper**
2. **Official Documentation**
3. **Official GitHub Repository / Dataset**
4. 高质量 Review / Perspective

如果介绍具体方法、模型或项目，尽量引用原始论文或官方资料。

每个重要章节最好保留 **2–4 个可靠参考来源**。

---

## 9. 写完一部分以后怎么提交？

先看自己改了什么：

```bash
git status
```

然后添加内容文件：

```bash
git add content/
```

提交：

```bash
git commit -m "refine overfitting explanation"
```

最后 push：

```bash
git push
```

### 第一次 push 如果提示没有 upstream

```bash
git push -u origin 你的分支名
```

例如：

```bash
git push -u origin content/generalization-representation
```

以后就可以直接：

```bash
git push
```

---

## 10. Commit 怎么写比较好？

推荐每完成一个完整的小任务就 commit 一次。

例如：

```text
clarify train validation test distinction
add solubility running example
refine overfitting explanation
add sources for molecular fingerprints
add molecular graph section
add atomistic model case study
```

不推荐：

```text
update
修改
final
final2
改了一些东西
```

---

## 11. 内容完成后开 Pull Request

进入 GitHub 仓库页面。

通常 GitHub 会提示：

> Compare & pull request

点击后确认：

```text
base: main
compare: 你的工作分支
```

例如 Track B：

```text
base: main
compare: content/generalization-representation
```

### PR 标题示例

```text
Content B: generalization and chemical representation
```

### PR 描述建议

```markdown
## 已完成

- Generalization
- Underfitting / Overfitting
- MAE / RMSE / R²
- Chemical representation
- SMILES / Fingerprint / Graph / 3D

## 请重点审核

- 是否对没有 ML 背景的化学研究者足够清楚
- 是否和前一章节重复
- 是否有概念讲得过深
- 化学案例是否合适
- References 是否足够可靠

## 暂未处理

- 网页排版
- 动画
- 交互
```

---

## 12. 其他人怎么 Review？

进入 PR → `Files changed`

建议重点检查：

- 科学内容是否正确
- 初学者是否能理解
- 是否与其他章节重复
- 术语是否统一
- 例子是否自然衔接
- 有没有讲得太深
- 有没有关键内容缺失
- 引用是否可靠
- 本章结尾是否能自然引出下一章

尽量把具体意见留在 PR 里，方便后续修改和追踪。

---

## 13. PR 被要求修改怎么办？

不用重新开 PR。

回到自己的分支继续修改：

```bash
git add content/
git commit -m "address review comments"
git push
```

原来的 PR 会自动更新。

---

## 14. 审核通过以后怎么合并？

推荐使用：

> **Squash and merge**

这样一个 Track 即使有很多小 commit，进入 `main` 后也会保持清晰。

---

## 15. 三个 Track 全部完成后

三条内容线都合并到 `main` 后，再创建最终总编辑分支：

```bash
git switch main
git pull origin main

git switch -c content/course-editorial
git push -u origin content/course-editorial
```

这个分支负责：

- 删除重复内容
- 统一术语
- 调整章节顺序
- 调整难度
- 检查前后衔接
- 统一贯穿案例
- 补充 References
- 决定网页每一屏最后保留什么

---

## 16. ChatGPT 多对话协作方式

如果三个人分别用不同 ChatGPT 对话工作，每个对话开头都明确告诉 ChatGPT：

```text
Repository: windyduan/AI4S-Chem

Working branch:
content/你的分支

Scope:
你的 Track 内容

Rules:
1. Do not modify main.
2. Do not redesign the website.
3. Work content-first in content/*.md.
4. Prefer primary / official sources.
5. Follow COLLABORATION.md.
6. When content is ready, prepare it for a PR to main.
```

---

## 17. 如果不会 Git 命令，也可以直接用 GitHub 网页

对于只编辑 Markdown 的情况：

1. 打开 GitHub 仓库
2. 左上角切换到自己的 branch
3. 打开 `content/`
4. 打开对应 `.md`
5. 点击铅笔图标 `Edit`
6. 修改内容
7. 点击 `Commit changes`
8. **确认提交到当前自己的 branch**
9. 内容完成后再创建 Pull Request

### 最重要的是

**提交前一定确认当前不是 `main`。**

---

## 18. 如果 push 失败怎么办？

虽然仓库是 Public，但：

> Public 只代表所有人都可以查看和 clone，并不代表所有人都可以直接 push。

如果出现：

```text
Permission denied
403
You don't have permission to push
```

需要仓库 Owner 将你添加为 collaborator。

对于本次三人内部合作，推荐直接添加为 collaborators，继续使用已经创建好的三个工作分支。

---

## 19. 最重要的四条规则

1. **不要直接修改 `main`。**
2. **每个人只在自己的内容分支工作。**
3. **当前阶段专注 `content/*.md`，不调网页。**
4. **写完 → Push → PR → Review → 修改 → Approve → Squash Merge。**

---

## 20. 整体工作流

```text
                        AI4S-Chem
                            │
                           main
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
          ▼                 ▼                 ▼
 foundations-training   generalization     chemistry-frontier
                        representation
          │                 │                 │
          ▼                 ▼                 ▼
       写内容             写内容              写内容
          │                 │                 │
        commit            commit            commit
          │                 │                 │
         push              push              push
          │                 │                 │
          └────────────── Pull Request ───────┘
                            │
                          Review
                            │
                        修改 / Approve
                            │
                      Squash and merge
                            │
                           main
                            │
                            ▼
                 content/course-editorial
                            │
                      课程总编辑 / 统一
                            │
                           PR
                            │
                           main
                            │
                            ▼
                  最后再做网页 / 动画
```

---

## 21. 一句话总结

> **分开写，集中审；内容先定，界面最后做。**
