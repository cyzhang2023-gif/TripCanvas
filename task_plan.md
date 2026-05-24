# Routey 项目优化计划

## 目标
将 Routey 从 demo/pitch 状态提升为**可上线的生产级旅行规划应用**，覆盖性能、代码质量、用户体验、安全性四大维度。

## 当前状态
- 线上地址：routey.top:3001（域名 routey.top 正在配置 DNS）
- 技术栈：React 19 + TanStack Router + Tailwind + PostgreSQL + DeepSeek AI
- 路线库：707 条精选路线，覆盖 41 个国家
- 部署：Aliyun ECS，PM2 + nginx

---

## 阶段 1：性能优化 `status: complete`

### 1.1 资源压缩
- [x] Hero 图片 1.7MB PNG → 72KB WebP（96% 压缩）
- [x] 全部 27 张静态图片转 WebP（总 4MB → 1.7MB，58% 压缩）
- [ ] 启用 vite 的 image 压缩插件（vite-plugin-imagemin）

### 1.2 代码分割与懒加载
- [ ] TanStack Router lazy route 优化（需要评估可行性）
- [ ] MapLibre GL (1.57MB) 按需加载，仅在 inspiration/trip 页面引入
- [ ] 将 Zod schema 从客户端 bundle 中剥离（仅服务端使用）

### 1.3 缓存策略
- [ ] 静态资源添加长期缓存头（nginx: Cache-Control max-age=31536000）
- [ ] API 响应添加 ETag/Last-Modified
- [ ] 图片 CDN 化（考虑阿里云 OSS + CDN）

### 1.4 首屏加载优化
- [ ] 关键 CSS 内联
- [ ] 字体预加载（preload）
- [x] 图片 loading="lazy" 全局应用（hero 除外保持 eager）

**已完成效果**：图片资源减少 58%，首屏 Hero 图从 1.7MB 降至 72KB

---

## 阶段 2：代码质量重构 `status: complete`

### 2.1 服务端拆分
- [x] server.ts 从 1737 行精简至 120 行，拆分为 8 个模块：
  - `server/utils.ts` — API 工具函数
  - `server/routes/trips.ts` — 行程 CRUD + 导入
  - `server/routes/explore.ts` — 路线探索 + 目的地
  - `server/routes/images.ts` — 图片获取/缓存
  - `server/routes/quiz.ts` — 测验推荐
  - `server/routes/n8n-routes.ts` — n8n 路线 + 旅行信息
  - `server/services/image-fetcher.ts` — 多源图片抓取
  - `server/services/cover-resolver.ts` — 封面图解析
  - `server/services/xhs.ts` — 小红书内容提取
  - `server/services/n8n-db.ts` — PostgreSQL 数据库
  - `server/services/import-jobs.ts` — 异步导入任务

### 2.2 清理调试代码
- [x] 移除全部 43 处 console.log/warn/debug（保留 14 处 console.error）
- [ ] 添加请求 ID 追踪（待评估 pino 日志库）

### 2.3 SQL 安全
- [x] 审查确认所有 n8n DB 查询均使用参数化查询（$1, $2 占位符）
- [ ] 添加查询超时设置

### 2.4 类型安全
- [x] server 模块零 TypeScript 类型错误
- [ ] 移除剩余 any 类型使用

**已完成效果**：代码可维护性大幅提升，server.ts 体积减少 93%

---

## 阶段 3：用户体验提升 `status: complete`

### 3.1 加载体验
- [x] 4 个页面添加骨架屏（explore、destinations、my-trips、budget）
- [x] 路由切换顶部进度条（紫色渐变动画）
- [x] 图片加载失败 fallback 占位图（ImageOff 图标 + 提示文字）

### 3.2 错误处理
- [x] 全局 ErrorBoundary 组件（捕获渲染错误 + 重试按钮）
- [x] TanStack Router errorComponent（路由加载错误 + 重试/返回首页）
- [x] 网络断开检测 + 离线提示横幅（"网络已断开"）

### 3.3 无障碍（Accessibility）
- [x] 全部 img 标签补全中文 alt 描述
- [x] 图标按钮添加 aria-label（搜索、通知、设置、关闭等）
- [ ] 颜色对比度检查（WCAG AA 标准）
- [ ] 键盘导航支持

### 3.4 交互细节
- [ ] 页面切换动画（Framer Motion 过渡）
- [ ] 下拉刷新支持
- [ ] 列表滚动位置记忆
- [ ] 搜索框防抖 + 搜索建议

**已完成效果**：骨架屏 + 进度条 + 错误边界 + 离线检测 + 无障碍改进

---

## 阶段 4：核心功能升级（竞品对齐 + 用户 Ideas） `status: pending`

> 基于用户 ideas + 圆周旅迹竞品分析，详见 findings.md

### 4.1 天气系统集成 `priority: P0`
- [ ] 接入天气 API（和风天气/OpenWeatherMap）
- [ ] 行程详情页：每日天气预报卡片（温度/天气图标/降水概率）
- [ ] 目的地页面：未来 7 天天气概览
- [ ] 天气预警提示（极端天气时提醒用户）
- [ ] 穿衣建议（根据温度自动推荐）

### 4.2 用户评分与评价系统 `priority: P0`
- [ ] 路线 5 星评分组件
- [ ] 评分数据存储（PostgreSQL 新表）
- [ ] 路线卡片展示平均评分 + 评价人数
- [ ] 评价内容（文字 + 标签：如"风景好"/"性价比高"/"适合亲子"）
- [ ] 评价排序：按热度/最新/评分

### 4.3 景点详情增强 `priority: P1`
- [ ] 多图画廊（横向滑动，类似竞品）
- [ ] AI 生成景点介绍（调用 DeepSeek）
- [ ] 真实评价聚合：Wow（好评）/ Ohno（差评）结构化展示
- [ ] 智能标签：「XX住宿top1」「Nk人规划」「距离 Xkm」
- [ ] 联系信息：电话、官网链接
- [ ] 服务设施标签：儿童友好/无障碍/WiFi/停车场等

### 4.4 热门景点排行推荐 `priority: P1`
- [ ] 目的地热门景点 Top 10 排行榜
- [ ] 基于评分 + 收藏 + 规划次数的综合热度算法
- [ ] 分类筛选：景点/美食/住宿/体验
- [ ] 首页「热门」模块展示

### 4.5 协同编辑行程 `priority: P1`
- [ ] 生成行程分享链接/邀请码
- [ ] WebSocket 实时同步编辑
- [ ] 协作者权限管理（编辑/只读）
- [ ] 编辑冲突处理
- [ ] 行程评论/讨论区

### 4.6 路线定制化（用户自定义行程） `priority: P0`
- [ ] 浏览公共路线时「一键收藏为我的行程」（fork 副本）
- [ ] 在副本上自由增删景点（已有 addSpot/deleteSpot API，需前端入口）
- [ ] 拖拽排序景点顺序
- [ ] 调整天数：合并/拆分/增删天
- [ ] 替换景点：搜索同类型景点替换当前景点
- [ ] 修改后自动重算交通时间和预算
- [ ] 「基于此路线」标签：标注原始路线来源

### 4.7 打卡 & 旅途记录 `priority: P2`
- [ ] 到达景点后「打卡」按钮
- [ ] 打卡支持拍照 + 文字
- [ ] 打卡时间线（旅行足迹回顾）
- [ ] 打卡统计（已打卡/总景点进度条）

### 4.8 导入体验优化 `priority: P2`
- [ ] 小红书导入后批量勾选添加（类似竞品的 checkbox 列表）
- [ ] 导入预览：地点卡片带图片/分类/地址
- [ ] 来源标注：链接回原始笔记

**预期效果**：从工具型 App 升级为平台型产品，核心体验对齐竞品并超越

---

## 阶段 5：用户系统 & 社交 `status: pending`

### 5.1 用户系统
- [ ] 微信登录/手机号登录
- [ ] 用户数据云同步（当前全部 localStorage）
- [ ] 收藏/历史记录持久化
- [ ] 用户资料页（头像/昵称/旅行偏好）

### 5.2 社交功能
- [ ] 路线分享生成海报图
- [ ] 用户关注系统
- [ ] 动态 feed（关注的人的行程/打卡）
- [ ] 多语言支持（中/英切换）

---

## 阶段 6：生产部署 `status: pending`

### 5.1 域名与 HTTPS
- [ ] routey.top DNS 配置（进行中）
- [ ] Let's Encrypt SSL 证书
- [ ] HTTP → HTTPS 301 重定向
- [ ] nginx gzip 压缩

### 5.2 监控与日志
- [ ] 接入 Sentry 错误监控
- [ ] 添加 PM2 监控面板
- [ ] API 响应时间日志
- [ ] 用户行为埋点（简易 GA/自建）

### 5.3 备份与恢复
- [ ] PostgreSQL 每日自动备份
- [ ] 部署回滚脚本
- [ ] 配置文件版本管理

### 5.4 CI/CD
- [ ] GitHub Actions 自动构建
- [ ] Push to deploy 分支自动部署到服务器
- [ ] 构建失败通知

**预期效果**：稳定可靠的生产环境

---

## 优先级排序

### 已完成
| 优先级 | 任务 | 影响 | 状态 |
|--------|------|------|------|
| P0 | Hero 图片压缩 | 首屏快 1.5s | ✅ 完成 |
| P0 | console.log 清理 | 专业度 | ✅ 完成 |
| P0 | SQL 参数化查询 | 安全 | ✅ 已确认安全 |
| P1 | 错误边界 + 骨架屏 | 用户体验 | ✅ 完成 |
| P1 | 图片懒加载 + alt | 性能+a11y | ✅ 完成 |
| P2 | server.ts 拆分 | 可维护性 | ✅ 完成 |
| P0 | nginx 端口修复 | 部署可用 | ✅ 完成 |

### 待做 — 功能升级（阶段 4）
| 优先级 | 任务 | 影响 | 复杂度 |
|--------|------|------|--------|
| **P0** | 天气系统集成 | 实用性核心，用户强需求 | 中 |
| **P0** | 用户评分/评价系统 | 社区互动，内容沉淀 | 中 |
| **P1** | 景点详情增强（画廊+AI介绍+评价） | 信息丰富度，对齐竞品 | 高 |
| **P1** | 热门景点排行推荐 | 内容发现，用户粘性 | 中 |
| **P1** | 协同编辑行程 | 社交核心，差异化 | 高 |
| **P0** | 路线定制化（fork+增删景点+排序） | 核心交互，用户创造力 | 中 |
| **P2** | 打卡 & 旅途记录 | 旅途互动，回忆价值 | 中 |
| **P2** | 导入体验优化（批量勾选） | 操作效率 | 低 |

### 待做 — 基础设施
| 优先级 | 任务 | 影响 | 复杂度 |
|--------|------|------|--------|
| P0 | HTTPS 证书 | 安全基础 | 低 |
| P2 | 图片 CDN 化 | 加载速度 | 中 |
| P3 | 用户系统（登录） | 产品化前提 | 高 |
| P3 | CI/CD 流水线 | 开发效率 | 中 |

---

## 遇到的错误
| 错误 | 尝试次数 | 解决方案 |
|------|---------|---------|
| launch.json port 不匹配 | 1 | vite dev 默认 8080，修正 launch.json |
| trips.ts 类型错误 | 1 | schema 用 deleteSpot 非 removeSpot，对齐 Zod 定义 |
