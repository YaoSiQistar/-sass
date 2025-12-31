你是我的 Staff Full-Stack Engineer / 架构师 / 产品工程负责人。你将做一个高品质作品集级项目：求职投递管理 SaaS + Chrome 插件采集 + 渠道 ROI 分析。目标是：好看、好用、可上线、工程质量高，让面试官愿意深挖并认可。
【仓库与结构】
● Repo A：web-saas（Next.js App Router + TS + Supabase）
● Repo B：chrome-extension（MV3 + TS）
你必须按“两个独立工程”输出文件结构与命令
【技术栈与强约束（固定）】
● Web：Next.js(App Router) + TypeScript + Tailwind + shadcn/ui + Framer Motion + React Query + TanStack Table + Recharts
● Auth/DB：Supabase Auth + Supabase Postgres + RLS（Web 的业务读写必须严格走 RLS）
● Storage：Supabase Storage（attachments bucket，private + policies）
● 文案：只中文
● 代码风格：英文命名 + 中文注释/中文文档
● 质量策略：速度与严谨平衡，但任何安全/一致性/可用性问题必须优先修复
●  不需要你写测试/CI/质量体系；但必须保证核心链路可运行、数据一致、权限安全（RLS/Token）不出错。
【产品范围（MVP 必须包含，固定）——详细规格】
MVP 目标：在 14 天内交付一个“可上线、可演示、可长期使用”的求职投递闭环产品。MVP 不追求功能海量，但要求每个核心功能都具备：可用性（空态/错误态/加载态）、一致性（数据不乱）、安全性（RLS）、可维护性（结构清晰）。
MVP 必须包含以下模块与能力（全部必做）：
1. 全局基础能力（所有页面共享）
● 统一布局：Sidebar + Topbar + Content（极简 SaaS 风格），支持 dark 跟随系统
● 页面三态：Loading Skeleton / Empty State 引导 / Error State（带重试）
● 全局提示：toast（成功/失败），重要操作确认弹窗
● 权限：未登录不可访问业务页；登录后回跳；所有数据读写必须通过 Supabase session 并遵守 RLS
● 软删除：所有核心表包含 deleted_at；默认查询过滤 deleted_at IS NULL；“删除”操作=更新 deleted_at（不做物理删除）
● 批量操作：列表需支持多选并批量执行（至少：批量改状态/批量删除/批量改渠道其一，最终按模块要求实现）
1. 线索与投递分层（核心数据模型与业务闭环）
● JobClip（线索/收藏）：来源于插件采集或手动创建/CSV 导入
  ○ 允许不完整：解析失败也要保存 url/rawText/title
  ○ 字段示例：url、company_text、role_text、city_text、salary_text、raw_text、source_id、captured_at、parse_status、client_request_id
● Application（投递/管理）：进入推进流程的“干净条目”
  ○ 必须可从 JobClip 一键转入（convert）
  ○ 必须保留 job_clip_id 关联（可追溯来源）
  ○ 允许同公司同岗位多次投递（不能用唯一约束阻止）；但 UI 需给“重复提示”
● 分层要求：
  ○ Clip 是“先存下来不丢”，Application 是“真正推进”
  ○ Convert 时要提供字段校正与初始状态选择
4. 状态列可自定义（Workflow Builder）
● 状态列来自 statuses 表（用户自定义），而不是写死 enum
● 功能要求：
  ○ 新增/编辑/删除（软删）状态列
  ○ 拖拽排序（order）
  ○ 归档列（is_archived）：归档列不出现在看板列中，但历史记录仍可显示
  ○ 默认种子：提供一套默认状态（待投递/已投递/笔试/一面/二面/HR/Offer/拒绝/放弃等）
● Application.status_id 必须引用 statuses.id
● 状态变更必须写入 status_history（from_status_id → to_status_id，changed_at，note 可选）
3. Clips 线索箱（可用于真实工作流）
● 页面：/clips（TanStack Table）
● 必须支持：
  ○ 搜索（公司/岗位/关键词至少）
  ○ 过滤（source、parse_status、是否已转入管理）
  ○ 排序与分页
  ○ 多选批量操作（至少：批量转入管理、批量软删除）
● 详情展示：点击行打开抽屉（Drawer）
  ○ 可编辑结构化字段（company/role/city/salary/source/keywords等）
  ○ 展示 rawText（可折叠/可搜索高亮可选）
  ○ 原链接打开
  ○ 重复提示：同时做 url 重复 +（company+role+city）近似重复提示（提示即可，不阻止保存）
4. Clip → Application 转入（Convert）
● 在 Clip 抽屉中提供“加入投递管理”
● Convert 交互要求：
  ○ 弹窗确认并允许用户校正字段（公司/岗位/城市/渠道/初始状态）
  ○ 成功后：
    ■ Clip 显示“已转入”标记
    ■ Application 列表可看到新条目
● 写入规则：
  ○ 创建 application（关联 job_clip_id）
  ○ 写入一条 status_history（from null → 初始 status_id）
  ○ 若用户选择“已投递/已申请”：必须写入或 upsert APPLIED event（用于 ROI）
  ○ 防重复 convert：同一个 clip 默认只允许转入一次（如需多次，必须设计“版本/复制”机制，但 MVP 默认不做）
4. Applications 投递管理（列表必须专业）
● 页面：/applications（TanStack Table）
● 必须支持：
  ○ 搜索（公司/岗位/备注）
  ○ 过滤：状态列（status_id）、渠道（source_id）、城市、日期范围（至少投递日期）
  ○ 排序：更新时间/投递日期
  ○ 列配置（显示/隐藏部分列）
  ○ 多选批量操作：批量改状态、批量软删除（至少这两个）
  ○ 行内快捷改状态（下拉/快捷按钮）
● 状态变更写入：
  ○ update applications.status_id
  ○ insert status_history
  ○ 触发事件规则（例如从“待投递→已投递”时提示是否写 APPLIED）
4. Application 详情（必须同时提供抽屉 + 独立页）
● 抽屉详情：从列表/看板打开，用于快速查看与编辑
● 独立详情页：/applications/:id（可复制链接给面试官或自用）
● 详情页至少包含模块：
  a. Overview（公司/岗位/城市/渠道/链接/状态等可编辑）
  b. Timeline：status_history + events（按时间倒序）
  c. Tasks：任务列表与操作（见第 7）
  d. Attachments：附件列表与操作（见第 8）
  e. Interviews：多轮面试管理（见第 11，MVP 也要基础能力）
● 详情页应支持软删除与恢复（可选恢复；至少删除）
7. Tasks（任务/待办，MVP 必须）
● 任务与 application 关联（application_id）
● 功能要求：
  ○ 新建任务：title、due_at、priority(可选)
  ○ 完成/取消完成：done_at
  ○ 编辑/软删除
  ○ 在 application 详情中完整呈现
● 最低可用性：
  ○ 任务到期高亮（视觉提示）
  ○ 可按“未完成/已完成”切换
4. Attachments（附件，MVP 必须）
● 使用 Supabase Storage：bucket=attachments（private）
● 附件记录落库 attachments 表（storage_path、file_name、mime、size、uploaded_at、application_id）
● 功能要求：
  ○ 上传（选择/拖拽）、上传进度与失败重试
  ○ 列表展示、下载（signed URL）、删除（软删）
  ○ 删除一致性策略说明：
    ■ 推荐：软删 DB + 同步删除 storage object（失败则保留待清理标记，或允许后台重试；MVP 至少要有清晰策略）
4. Views（保存视图，MVP 必须）
● views 表：name、filters(jsonb)、sort(jsonb)、columns(jsonb)、is_default
● /applications 顶部必须有 ViewSwitcher：
  ○ 切换视图立即生效
  ○ 保存当前、另存为、设为默认、删除
  ○ 默认视图：刷新后自动应用
● 视图至少覆盖：筛选条件 + 排序 + 列显示配置
10. Board 看板（必须，且为亮点）
● 页面：/board
● 列：来自 statuses（按 order；排除 archived/deleted）
● 卡片：公司/岗位/城市/渠道/更新时间（至少这些）
● 交互要求（硬性）：
  ○ dnd-kit 拖拽跨列
  ○ React Query 乐观更新：立即更新 UI
  ○ 失败回滚：恢复原列 + toast 提示 + 重试
  ○ 尽量支持 Undo：成功 toast 提供撤销回到原状态，并写入历史
  ○ 并发策略：同一 application 连续拖拽时，保证最终一致（最少要求：禁用重复提交或最后写入胜出）
5. Interviews 多轮面试（MVP 也要基础能力）
● interviews 表：application_id、round、scheduled_at、format(可选)、result(可选)、notes
● 功能要求：
  ○ 在 application 详情中新增/编辑/删除面试记录
  ○ round 必须可选（1/2/HR/终面等）
● 事件联动：
  ○ 创建/更新 interview 时必须写入 INTERVIEW_SCHEDULED event（用于 ROI），并带 round 信息
4. Events 事件系统（ROI 的数据基础，MVP 必须）
● events 表用于统一口径统计，至少包含：
  ○ APPLIED（投递发生）
  ○ RESPONDED（首次反馈）
  ○ INTERVIEW_SCHEDULED（约面，支持多轮）
  ○ OFFER、REJECTED、WITHDRAWN
● 写入规则（最低要求）：
  ○ APPLIED：当用户在 convert 或 application 中设置 applied_at 时 upsert（同 application 只保留一个）
  ○ RESPONDED：只统计首次反馈（earliest）；允许用户手动录入或自动规则（MVP 手动录入即可）
  ○ INTERVIEW_SCHEDULED：每轮面试都记录（可多条），带 round
● Timeline 需要展示 events，并用于 ROI 汇总
13. ROI 渠道分析（/insights/roi，MVP 必须）
● 顶部过滤：时间范围（7/30/90/自定义）、渠道多选
● KPI（至少这些，带样本量 n）：
  ○ 投递数(APPLIED)
  ○ 有反馈数(RESPONDED)
  ○ 约面数(INTERVIEW_SCHEDULED)
  ○ 面试率（有面试的 application / 投递 application，口径需说明）
  ○ Offer 数/率（OFFER）
  ○ 反馈时长：RESPONDED-APPLIED 的中位数与 P75
● 图表（Recharts）：
  ○ 渠道对比（面试率/Offer率至少一个）
  ○ 漏斗（Applied→Responded→Interview→Offer）
● drill-down（必须）：
  ○ 点击图表某渠道/漏斗层 → 展示对应 applications 明细（复用表格组件或抽屉）
● UI tooltip 必须写清口径、去重规则与样本量
14. CSV 导入/导出（MVP 必须）
● /data 页面
● CSV 导入：
  ○ 字段映射、导入预览、校验（必填字段缺失提示）
  ○ 分批写入（避免一次性过大）
  ○ 导入后生成 applications（必要时生成 APPLIED event）
  ○ 去重策略：URL 去重 +（company+role+city）提示/处理（必须说明策略：跳过/合并/保留两条）
● CSV 导出：
  ○ 允许按当前筛选导出 applications
  ○ 导出包含状态列名、渠道名、关键日期字段
4. ICS 导出（MVP 必须）
● 导出为 .ics：
  ○ tasks：due_at 生成日历事件
  ○ interviews：scheduled_at 生成日历事件（带 round 信息）
● 入口：/data 或详情页下载
16. 全局搜索（MVP 必须）
● 提供一个全局搜索入口（Topbar）
● 至少支持搜索：
  ○ applications（company/role/notes）
  ○ clips（company/role/rawText可选）
  ○ tasks（title）
  ○ interviews（notes/round）
● 搜索结果页/抽屉：可点击跳转对应详情
17. 演示数据 500（MVP 必须）
● 提供一键生成 500 条演示数据（仅当前用户）
● 数据应包含真实分布：
  ○ 多渠道、多状态、多事件、多轮面试、任务到期、附件记录（可用占位）
● 目的：用于性能展示与面试演示
● 需提供“清空演示数据”（可选但推荐）
18. 插件（MVP 必须包含基础能力）
● 目标：把“看到 JD → 保存到 Clips”做到零摩擦，并保证永不丢
● 插件能力（最低要求）：
  ○ 页面注入按钮 + Quick Save Modal（可编辑公司/岗位/城市/渠道/是否直接转入管理开关）
  ○ Extractor：Boss 专配 + Generic 兜底；保存 url/title/rawText；解析失败也要保存
  ○ 本地队列：断网可保存；联网自动上传；popup 可查看队列并重试
  ○ 鉴权：Personal Token（Web 生成，插件粘贴）
  ○ 去重：client_request_id 唯一 + url 重复提示
● Web 端配套：
  ○ /settings/extension：生成/撤销 token，安装指引，隐私说明链接
  ○ /api/extension/clips：校验 token（hash），最小权限写入 job_clips 并设置 user_id
完成标准（Definition of Done）：
● 以上每个模块都具备可演示路径；不允许仅“做出来页面但不可用”
● 核心链路必须一镜到底：
  a. 插件保存 JD → Clips 出现
  b. Clips 转入 Application → 列表/看板可管理
  c. 添加任务/附件/面试 → Timeline 有记录
  d. ROI 指标变化且可 drill-down
  e. CSV/ICS 导入导出可用
  f. 500 条数据仍能操作顺滑
【面试多轮与事件口径（固定）——详细规格】
目标：所有 ROI 统计必须基于 events 表（事件口径），而不是“猜 status”。status 用于流程管理与看板展示；events 用于可解释、可复盘、可扩展的指标计算。面试必须支持多轮（round 1/2/HR/终面），并可统计“轮次数”“进入下一轮比例”“每轮反馈时长”等。
一、数据实体（必须存在）
1. interviews（多轮面试记录）
● 用途：记录每一次面试安排与结果，是“具体事实记录”。
● 最少字段：
  ○ id, user_id, application_id
  ○ round（string 或 smallint，推荐 string：'R1'/'R2'/'HR'/'FINAL' 或自定义文本；必须可统计）
  ○ scheduled_at（timestamp，面试时间）
  ○ format（可选：online/onsite/phone）
  ○ result（可选：PASS/FAIL/CANCELLED/UNKNOWN）
  ○ notes（可选）
  ○ created_at, updated_at, deleted_at（软删）
● 规则：
  ○ 允许同一轮 round 多次记录（例如改期），但 UI 需提示并按时间线展示。
  ○ 删除面试记录默认软删，统计需排除 deleted_at 非空。
4. events（统一事件表，ROI 唯一数据源）
● 用途：所有核心指标都从事件推导，口径必须可解释（tooltip 必须说明）。
● 最少字段：
  ○ id, user_id, application_id
  ○ type（枚举：APPLIED, RESPONDED, INTERVIEW_SCHEDULED, OFFER, REJECTED, WITHDRAWN）
  ○ occurred_at（timestamp，事件发生时间）
  ○ meta（jsonb，可选但强烈建议，用于 round、渠道、备注等扩展）
  ○ created_at, updated_at, deleted_at
● 约束：
  ○ APPLIED：每个 application 最多 1 条有效事件（upsert），取 earliest 或用户最新选择（需明确，推荐 earliest + 可编辑）
  ○ RESPONDED：每个 application 最多 1 条有效事件（upsert），必须代表“首次反馈”，取 earliest
  ○ INTERVIEW_SCHEDULED：允许多条（每轮/每次面试都记录）
  ○ OFFER/REJECTED/WITHDRAWN：每个 application 最多 1 条（可 upsert），以最终结果为准（可编辑）
● meta 推荐结构（示例）：
  ○ INTERVIEW_SCHEDULED.meta = { "round": "R1", "format": "online" }
  ○ APPLIED.meta = { "source_id": "...", "resume_version": "v3" }（可选）
  ○ RESPONDED.meta = { "channel": "email" }（可选）
二、事件定义与写入规则（必须严格遵守）
1. APPLIED（投递发生）
● 定义：用户真正“完成投递/申请”的时间点。
● 写入触发：
  ○ 在 Convert（Clip → Application）时如果用户选择“已投递”，必须写入 APPLIED
  ○ 在 Application 编辑中用户填写/修改 applied_at 时必须 upsert APPLIED
● 时间取值：
  ○ occurred_at = applied_at（若用户只填日期则默认当天 12:00 本地时间或 00:00，需统一）
● 去重/upsert：
  ○ 同 application 只保留 1 条 APPLIED（deleted_at 为空的那条）
  ○ 若用户修改 applied_at：更新 APPLIED.occurred_at（而不是新增多条）
● 边界：
  ○ 允许重复投递（同公司同岗位多次 application）→ 每个 application 独立拥有自己的 APPLIED
  ○ 如果用户把 applied_at 清空：APPLIED 事件应软删或置为无效（推荐软删）
6. RESPONDED（首次反馈）
● 定义：从投递到首次收到任何形式反馈（包括拒信、约面、要简历补充等）。
● 写入触发：
  ○ 用户在 Application/Timeline 中点击“记录首次反馈”，填写 responded_at → upsert RESPONDED
  ○ 若用户新增面试并且此前没有 RESPONDED，可选择自动补写 RESPONDED=面试创建时间（可选；MVP 可先不自动，但要说明策略）
● 时间取值：
  ○ occurred_at = responded_at（必须代表首次反馈）
● 去重/upsert：
  ○ 同 application 只保留 1 条 RESPONDED（取 earliest）
  ○ 若用户试图填更晚的 responded_at，系统应提示“首次反馈应取更早时间”，但允许覆盖（可配置）；推荐保持 earliest，并提示用户
● 边界：
  ○ 如果 APPLIED 不存在但 RESPONDED 存在：ROI 计算反馈时长时需排除或标记缺失（UI 显示数据缺口）
  ○ 如果应用被撤回（WITHDRAWN）也可能有 RESPONDED，统计口径需说明是否排除撤回（默认不排除，但可筛选）
6. INTERVIEW_SCHEDULED（约面/面试安排，多轮）
● 定义：每次面试被安排（包含 R1/R2/HR/终面等），支持多轮统计。
● 写入触发：
  ○ 用户创建/更新 interviews 记录时必须写入/同步 INTERVIEW_SCHEDULED：
    ■ 新建 interview → insert INTERVIEW_SCHEDULED（occurred_at = scheduled_at，meta.round = round）
    ■ 修改 scheduled_at/round → 更新对应 event（保持关联）
    ■ 删除 interview（软删）→ 对应 event 也需软删（或标记无效），保持一致性
● 关联方式（必须明确一种并实现）：
  ○ 推荐：events.meta 存 interview_id，或者 events 表增加 interview_id 外键（更干净）
● 统计策略（必须支持并在 UI 说明）：
  ○ A) “达到过面试”的 application 数（去重到 application，回答：有多少投递至少约面一次）
  ○ B) “面试轮次/次数”总量（不去重，用于展示你经历了多少轮/多少场面试）
  ○ 至少要在 ROI 中明确选用哪一种作为“约面数”，并在 tooltip 写清（推荐 KPI 同时显示：约面应用数 + 面试总轮次）
5. OFFER / REJECTED / WITHDRAWN（结果类事件）
● 定义：
  ○ OFFER：拿到 offer（可在 meta 标记口头/正式）
  ○ REJECTED：被拒
  ○ WITHDRAWN：主动撤回/终止
● 写入触发：
  ○ 用户在 Application 状态或 Timeline 中设置结果时写入/upsert
● 互斥关系（建议但不强制）：
  ○ OFFER 与 REJECTED/WITHDRAWN 通常互斥；若用户切换结果，应更新/软删旧事件，保持最终一致
● 统计口径：
  ○ Offer 率 = OFFER applications / APPLIED applications（默认）
  ○ 被拒率/撤回率可作为扩展指标
三、ROI 指标的严格口径（必须在 UI tooltip 解释）
以过滤区间 [from, to] 为准（按事件 occurred_at 过滤，或按 APPLIED occurred_at 作为 cohort 过滤，需明确；MVP 推荐“按 APPLIED occurred_at 在区间内”的 cohort 口径，最可解释）：
1. 投递数（Applied Count）
● count of applications that have APPLIED event in range（按 application 去重）
● 样本量 n_applied 需显示
2. 有反馈数（Responded Count）
● count of applications that have RESPONDED event (and APPLIED in cohort)；若按 cohort，RESPONDED 可在之后发生也可计入（需说明）
● 样本量 n_responded 显示；缺 APPLIED 的 RESPONDED 不计入反馈时长统计
3. 约面数（Interview）
必须清晰说明是：
● 约面应用数：count distinct application_id with INTERVIEW_SCHEDULED（与 cohort 相交）
● 面试轮次总量：count of INTERVIEW_SCHEDULED events（与 cohort 相交）
推荐 KPI 同时提供：
● “约面应用数” + “面试总轮次”（例如：12 / 18轮）
4. 面试率（Interview Rate）
● 默认：约面应用数 / 投递数（distinct applications）
● tooltip 必须写清“按 application 去重”
5. Offer 数/率
● Offer 数：distinct applications with OFFER
● Offer 率：Offer / 投递（或 Offer / 约面，作为扩展）
6. 反馈时长（Response Time）
● 仅统计同时拥有 APPLIED 与 RESPONDED 的 applications
● response_time = RESPONDED.occurred_at - APPLIED.occurred_at
● 展示：
  ○ 中位数（median）
  ○ P75（75th percentile）
● tooltip 必须写清“仅统计有反馈的投递；缺失将不计入；使用中位数与P75抗离群”
7. 漏斗（Funnel）
● Applied → Responded → Interview → Offer
● 每一层按“distinct applications”计数（默认）
● 点击某层 drill-down：返回对应 applications 列表：
  ○ Applied 但未 Responded（可做卡点列表：超过 X 天）
  ○ Responded 但未 Interview
  ○ Interview 但未 Offer（可选）
四、与状态 status 的关系（必须说明并实现）
● statuses 用于流程管理与看板展示，可自定义，不是 ROI 的唯一来源
● events 是 ROI 统计的唯一来源：不能直接用 status 推导指标（除非作为“补写事件”的引导）
● 当用户改变状态为“已投递”，UI 应提示是否设置 applied_at（从而写入 APPLIED）
● 当用户添加面试时，必须写入 INTERVIEW_SCHEDULED，不依赖状态
五、边界与一致性（必须处理）
● 软删除：被软删的 interviews/events 不参与统计与列表
● 重复投递：同公司同岗位多条 application 独立统计；去重只发生在“同 application 内的 APPLIED/RESPONDED”
● 时间区间：必须明确是“按 APPLIED 作为 cohort”还是“按事件发生时间”，并在 UI 文案写清；默认推荐 cohort 口径
● 时区：统一用用户本地时区展示；存储用 UTC（Supabase timestampz）
● 数据修正：用户修改 applied_at/responded_at/interview scheduled_at 必须同步更新对应事件
● 数据缺失：允许存在 APPLIED 无 RESPONDED；RESPONDED 无 APPLIED（导入可能出现）——需在 UI 提示并在统计中排除不合法样本
六、UI 必须体现口径（面试官最看重）
● 每个 KPI 旁边有 “i” tooltip：写清口径与样本量 n
● Drill-down：从 KPI/图表点击能定位到对应 applications 列表（可操作：批量设置状态/任务）
● Timeline：清晰区分 status_history 与 events 与 interviews，按时间线展示
【插件策略与安全边界（固定）——详细规格】
目标：插件负责“采集 JD 并写入 Clips”，做到零摩擦、永不丢数据；同时必须保证安全边界清晰：插件不能直接获得 Supabase 用户 session，也不能用 service role；插件只用 Personal Token 调用 Web 的 Next.js API；API 在服务端以“最小权限”写入 job_clips，除此之外不越权。
一、架构与职责边界（必须遵守）
1. 插件（chrome-extension 仓库）只负责：
● 页面采集与字段提取（Boss 专配 + Generic 兜底）
● Quick Save Modal 让用户确认/修正字段
● 本地队列存储与自动重试（永不丢）
● 调用 SaaS 的 API（/api/extension/clips）上报 clip
● 提供 popup 管理队列与查看最近保存结果
● 不直接连接 Supabase，不使用 supabase-js，不持有 Supabase session cookie
2. SaaS Web（web-saas 仓库）负责：
● 生成/撤销 Personal Token（在 /settings/extension）
● 提供 /api/extension/clips 接口接收插件上报
● 将 clip 写入 job_clips 表（并设置 user_id）
● 提供隐私说明（插件采集范围、存储范围、用户控制）
● Web 端业务读写严格走 RLS（用户 session）
3. Service Role 使用限制（硬约束）
● 在 Web 业务页面/普通 API 中：严禁用 service role 绕过 RLS
● 只允许在 /api/extension/* 这一类“token 校验 + 写入剪藏”接口使用 service role
● 该接口必须实现最小权限：
(a) 校验 token -> 得到 user_id
(b) 写入 job_clips 并设置 user_id（不可由客户端传入）
其他任何表写入/读取都不允许在该接口使用 service role
二、Personal Token（插件鉴权）的规范（必须实现）
1. 生成方式与存储原则
● Token 只在生成当下展示明文一次（用户复制到插件），之后无法再次查看
● 服务端永不存明文 token；只存：
  ○ prefix（例如 token 前 8 位，用于识别）
  ○ token_hash（对完整 token 做强哈希：推荐 SHA-256 + server-side pepper）
  ○ created_at
  ○ revoked_at（撤销时写入）
  ○ last_used_at（可选，加分）
  ○ user_id
● 数据表建议：extension_tokens（软删除可选，推荐用 revoked_at 控制有效性）
2. Token 格式建议（固定规范）
● token = "jt_" + base64url(random_bytes_32) 或 hex
● prefix = token 的前 N 位（例如 8 位）
● 哈希输入：hash = SHA256(token + PEPPER)；PEPPER 存在服务器环境变量中
● 输出给用户：只给 token 明文，不给 hash
3. Token 生命周期与撤销
● /settings/extension 提供：
  ○ “生成新 Token”（生成后展示一次）
  ○ “撤销 Token”（写 revoked_at）
  ○ “显示已撤销/仍有效状态”
● 插件端：
  ○ token 由用户粘贴保存到 chrome.storage.sync 或 local（建议 sync，方便跨设备；但考虑安全可用 local）
  ○ token 失效时（401/403），插件必须提示用户去设置页重新生成
三、插件上报 API（/api/extension/clips）的详细要求
1. 请求（插件 -> SaaS API）
● Method: POST
● Auth: Authorization: Bearer 
● Body（ClipDraft）至少包含：
  ○ client_request_id（UUID，必填，用于去重）
  ○ url（必填）
  ○ page_title（可选）
  ○ company_text、role_text、city_text、salary_text（可选但推荐）
  ○ source_hint（可选，例如 "boss" / "generic"）
  ○ raw_text（必填：仅 JD 内容，需截断规则）
  ○ captured_at（可选：插件采集时间）
  ○ extractor_version（可选）
  ○ parse_status（SUCCESS/PARTIAL/FAILED）
4. 服务端校验（必须）
● 校验 Authorization token：
  ○ 取出 token，计算 hash，与 extension_tokens 表匹配 user_id（且 revoked_at is null）
  ○ 若无匹配：401 Unauthorized（返回中文提示：“Token 无效或已撤销”）
● 校验 payload：
  ○ client_request_id、url、raw_text 必填
  ○ url 合法性验证（至少 http/https）
  ○ raw_text 长度限制（例如 50k 字符内），超出截断
● 去重逻辑（必须）
  ○ 先按 unique(user_id, client_request_id) 检查：若重复，返回 200（idempotent）并给出已存在 clip_id
  ○ 再按 unique(user_id, url) 检查：若重复，返回 409 并给出已存在 clip_id（插件应提示“已保存”并提供打开链接）
  ○ 如果二者都不冲突：插入新 clip
4. 返回值（建议）
● 成功 201：{ clip_id, status: "created" }
● 幂等 200：{ clip_id, status: "duplicate_request" }
● URL 重复 409：{ clip_id, status: "duplicate_url" }
● token 无效 401：{ error: "...", code: "TOKEN_INVALID" }
● payload 错误 400：{ error: "...", code: "BAD_REQUEST" }
● 服务端异常 500：{ errorId, code: "INTERNAL" }
四、插件“永不丢数据”队列系统（必须实现）
1. 核心原则
● 用户点击保存后：先入本地队列再上传（任何情况下都先落地）
● 任何失败都不能丢：保留失败原因，可重试；断网可保存；恢复网络自动 flush
2. 队列数据结构（建议固定 schema）
● QueueItem：
  ○ id = client_request_id
  ○ createdAt
  ○ payload（ClipDraft）
  ○ status: "PENDING" | "UPLOADING" | "SUCCESS" | "FAILED"
  ○ retryCount
  ○ nextRetryAt
  ○ lastError（message + code）
  ○ clipId（成功后写入）
● 队列存储：chrome.storage.local（可靠且容量足够）
3. 状态机与重试策略（必须）
● 保存动作：
  ○ enqueue(PENDING)
  ○ triggerFlush()
● flush：
  ○ 逐个取 PENDING/FAILED 且 nextRetryAt <= now 的项，置为 UPLOADING
  ○ 发请求
  ○ 成功：标记 SUCCESS 并从队列移除（或保留最近 N 条历史）
  ○ 409 duplicate_url：标记 SUCCESS（逻辑上成功）并提示“已保存”
  ○ 401 token_invalid：标记 FAILED 且停止自动重试，提示用户更新 token
  ○ 网络错误/5xx：标记 FAILED，按指数退避设置 nextRetryAt（例如 1m/5m/15m/1h 上限）
● 并发：默认串行上传，避免频率过高与竞态（可选：并发=2）
● 去重：若用户在同一页面重复点击，生成不同 client_request_id 也会被 url 去重；UI 提示“已保存”
4. Popup 与可视化（必须）
● Popup 页面展示：
  ○ 登录/Token 状态（已配置/未配置/无效）
  ○ 最近保存记录（成功/失败/待上传）
  ○ 队列列表（最多显示 20 条，支持滚动）
  ○ 操作：单条重试、全部重试、删除本地记录（仅删除队列项，不影响服务器）
● Modal 保存后的反馈：
  ○ toast：已加入队列/已上传/已存在/Token 无效等
五、采集范围与隐私（必须有页面说明）
1. 采集范围（固定）
● 只采集 JD 页面必要字段与 JD 内容 raw_text
● 不采集：用户输入框内容、聊天记录、个人邮箱/手机号等敏感信息（除非用户主动填写在 modal 的备注字段，且该字段属于 SaaS 管理范围）
● raw_text 截断规则要公开说明（例如最多 50k 字符）
2. Web 端隐私说明页（必须）
● 在 /settings/extension 或单独 /privacy：
  ○ 插件采集哪些字段
  ○ 何时采集（仅点击保存时）
  ○ 数据存储在哪（你的 Supabase DB/Storage）
  ○ 用户如何撤销（撤销 token、软删除记录、导出数据）
六、Boss 专配 + Generic 兜底（MVP 站点策略）
● Extractor 策略模式：
  ○ BossExtractor：尽量准确提取公司/岗位/城市/薪资
  ○ GenericExtractor：url + title + raw_text（通用兜底）
● parse_status：
  ○ SUCCESS：提取到关键字段（company/role 至少一个）
  ○ PARTIAL：只提取到部分字段
  ○ FAILED：只保存 url/title/raw_text（仍然必须保存）
● extractor_version：方便后续迭代解析逻辑
七、与 SaaS 数据模型的对接约束（必须一致）
● 插件只写入 job_clips；不得直接创建 applications、tasks、events
● Convert 与事件写入发生在 Web 中（或在 Web API 中，走 RLS），保持模型纯净
● job_clips 表必须包含：
  ○ user_id（服务端根据 token 填充，客户端不得传 user_id）
  ○ url、raw_text、client_request_id、captured_at、parse_status 等
● 重复提示：服务端以 url 唯一约束为准；company/role/city 重复只是“提示”，不强制阻止
完成标准（Definition of Done）
● Token 生成/撤销：明文只显示一次；服务端只存 hash；撤销后插件立刻无法上传并提示更新
● 插件断网保存：能入队列；恢复网络后能自动上传
● 409 URL 重复：插件提示“已保存”，不会重复创建
● 队列状态清晰：popup 可查看、可重试、失败原因可读
● 插件采集范围有隐私说明；权限最小化；不会在页面加载时自动抓取
【视觉与动效（固定）——详细全面规范】
目标：做出“极简 SaaS（Linear/Notion 风）”的高级质感：干净、克制、信息层级清晰；同时具备“明显动效”（Framer Motion）带来的顺滑与反馈，但绝不花哨、不拖慢效率。视觉与动效必须先建立一套可复用的 tokens（设计变量与动画变量），后续全站统一复用，禁止每个页面各写各的导致风格漂移。
一、视觉风格（UI Style，固定）
1. 风格定位
● 极简 SaaS（Linear/Notion 风）：留白、弱边界、灰阶为主、强调色点到为止
● 主题色：蓝（作为 primary/brand）
● 字体：系统字体（不引入外部字体），同时保持良好排版
● 语言：界面文案中文；代码英文命名 + 中文注释/文档
2. 颜色系统（必须用 tokens，禁止硬编码）
● 基础：background / foreground / muted / border / ring / destructive
● 品牌：primary（蓝）+ primary-foreground
● 语义色：success / warning / info（可选，但必须统一）
● 状态色：用于 statuses（用户自定义列），可提供预设 palette
要求：
● 使用 shadcn/ui 的 CSS variables 体系（HSL 变量），由 Tailwind 读取
● 必须支持 dark 模式（跟随系统 prefers-color-scheme）
● 对比度：正文文字与背景对比必须足够（避免浅灰字难读）
● Recharts 图表颜色：尽量使用主题与灰阶，避免“彩虹图”
3. 间距与排版（必须统一）
● 间距系统：8px 网格（p-2/p-3/p-4…）
● 页面宽度：内容区有最大宽度（如 1200~1400），大屏居中不拉太散
● 字体层级（建议固定）：
  ○ Page Title（大标题）
  ○ Section Title（模块标题）
  ○ Body（正文）
  ○ Caption（辅助说明）
  ○ Label（表单标签）
● 行高：正文舒适（1.5 左右），表格密度适中但不拥挤
4. 形状与质感（必须统一）
● 圆角：统一 rounded-xl（或 12px 级别），输入框/按钮略小一档
● 边框：极细（1px），多用 border + subtle shadow，而不是厚重边线
● 阴影：统一三档
  ○ card：非常轻（几乎不可见）
  ○ popover/drawer：更明显（强调浮层层级）
  ○ dragging：最明显（看板拖拽时）
● 分隔：使用 divider/section gap，而不是过多卡片堆叠
5. 组件风格（必须统一并复用）
必须基于 shadcn/ui，并为项目建立统一组件规范（必要时封装）：
● Button：primary/secondary/ghost/destructive，hover/pressed/focus 统一
● Input/Textarea/Select：focus ring 一致，错误态一致（红色 + 文案）
● Badge/Tag：用于渠道、状态、解析状态
● Tabs：用于详情页模块切换（Overview/Timeline/Tasks/Attachments/Interviews）
● Drawer/Sheet：详情抽屉的统一宽度、层级、滚动区域、Header 布局
● Dialog：确认与表单弹窗（如 Convert、删除确认）
● Toast：成功/失败/撤销 Undo 的统一样式
● Table：TanStack Table 的表头、行 hover、选中、多选 checkbox 风格统一
要求：
● 所有表单必须有清晰 label、hint、错误提示（中文）
● 空态必须提供行动引导（如“安装插件”“导入 CSV”“创建第一条”）
● 列表与看板的“信息密度”要专业：不花哨但高效
6. 页面布局（固定布局骨架）
● Sidebar：固定导航（Clips/Applications/Board/Insights/Tasks/Data/Settings）
● Topbar：全局搜索入口 + 用户菜单 + 当前页操作（可选）
● Content：模块化布局（标题区 + 工具栏 + 主内容）
● 响应式：
  ○ 小屏：Sidebar 折叠为 drawer
  ○ 抽屉详情：小屏全屏覆盖
● 所有页面必须保持一致的标题区与工具栏高度
二、动效系统（Motion System，固定）
1. 动效目标与原则
● 动效“明显”但“克制”：强化层级变化、状态变化、操作反馈
● 优先服务效率：动效不能拖慢操作；必须支持 prefers-reduced-motion
● 动效必须统一：建立 motion tokens（duration/easing/spring）与通用动画组件
● 关键场景必须有动效：页面切换、抽屉/弹窗、列表过滤、看板拖拽、toast/undo、tab 切换、图表加载（轻量）
2. Motion Tokens（必须定义并全局复用）
必须建立一份统一 tokens（示例含义，不限定数值）：
● duration：
  ○ fast（hover/press）
  ○ normal（modal/drawer）
  ○ slow（page transition/large layout）
● easing：
  ○ standard（大多数过渡）
  ○ emphasized（进场强调）
● spring：
  ○ drawerSpring（抽屉进出）
  ○ cardSpring（卡片移动/回弹）
● stagger：列表项逐个出现
要求：
● 只允许在 tokens 中修改参数；组件里不得随意写魔法数字
3. 动效组件库（必须封装并复用）
建议建立 components/motion/*：
● PageTransition：路由切换进出（App Router 可在 layout 包裹）
● FadeSlide：通用淡入+位移（用于模块出现/空态出现）
● MotionDialog/MotionDrawer：统一弹窗/抽屉进出
● MotionList：列表过滤时的重排动画（不要求每次都做复杂，但至少过渡）
● ToastMotion：toast 出现/消失
● KPIReveal：KPI 卡片进入动画（可选）
要求：
● 所有页面与关键组件只能用这些封装，避免风格漂移
4. 关键交互动效（必须覆盖）
● 抽屉（详情 Drawer）：
  ○ 从右侧滑入 + 背景遮罩淡入
  ○ 关闭时反向
  ○ header 固定、body 可滚动
● Dialog（确认/表单）：
  ○ 缩放+淡入，关闭反向
● Tabs 切换：
  ○ 内容区域淡入/位移，选中指示条滑动（可选）
● 表格过滤/排序：
  ○ 行的更新有轻量过渡（至少避免“瞬闪”）
● 批量操作：
  ○ 选中行的高亮过渡
● 看板拖拽：
  ○ 拖起卡片阴影增强 + 略微放大
  ○ 目标列高亮
  ○ 放下回弹（spring）
  ○ 失败回滚时有明显回退动效（增强可解释性）
● Undo：
  ○ 成功 toast 内提供“撤销”，点击后状态回退，并有短促反馈动效
8. 动效性能与可访问性（必须）
● prefers-reduced-motion：在该设置下，禁用大幅位移/弹性，只保留淡入
● 避免 layout thrash：动画尽量用 transform/opacity，而非频繁触发布局
● 大列表（500 条）：
  ○ 避免对每一行都做昂贵动画（只对可见部分或关键变化做）
● 动效与拖拽兼容：dnd-kit 时避免冲突导致卡顿
三、图表与数据可视化风格（Recharts，必须统一）
● 图表容器与卡片风格一致（同样圆角/边框/阴影）
● 网格线与轴线使用 muted 颜色，信息干净
● tooltip 样式与全局 popover 一致
● 颜色尽量少：主题蓝 + 灰阶 + 语义色（success/warning）少量点缀
● 任何指标必须在 UI 上提供口径 tooltip（i 图标），避免误导
四、Definition of Done（视觉与动效层面）
一个页面/模块算“完成”，除了功能外，必须同时满足：
● 视觉：符合 tokens、排版层级清晰、空态/错误态/加载态齐全
● 动效：关键交互（打开抽屉/弹窗、过滤、拖拽、toast）有明显但克制动效
● 一致性：不出现“这个页面像 A、那个页面像 B”的风格漂移
● 可访问性：focus 可见、键盘可操作基本可用、reduced-motion 支持
【工程质量（硬要求）——详细全面规范】
目标：这是一个真实可上线的高品质产品，不是玩具 demo。所有实现必须满足：可维护、可扩展、可测试、可观测、安全、性能可接受、体验完整。任何“能跑但不可靠/不一致/无错误态/无空态/无权限控制”的实现都不合格。
一、代码结构与可维护性（必须）
1. 目录与分层（建议固定并保持一致）
● /app：路由与页面（App Router）
● /components：可复用组件（UI、表格、布局、motion wrapper）
● /lib：基础能力（supabase clients、auth、errors、logger、formatters、csv/ics utils）
● /types：TypeScript 类型（DTO、domain types、zod schemas 的推导类型）
● /styles：设计 tokens 与全局样式（如需要）
要求：
● 业务逻辑不得散落在 page 里；page 只负责组装
● 数据访问集中在 lib/data/* 或 hooks 中，统一 queryKey 与错误处理
● 所有公共组件必须可复用，避免复制粘贴
2. TypeScript 标准
● 禁止 any（除非显式注释说明原因）
● 所有 API 与数据读写必须有清晰的 DTO 类型（输入/输出）
● zod 校验与 TS 类型推导一致（z.infer）
● 统一时间类型处理（timestampz 与本地显示）
3. 组件质量
● 组件粒度合理：一个组件只做一件事
● 复杂页面拆分：Layout / Toolbar / Table / Drawer / Form / Timeline 等
● 表单统一：react-hook-form + zod（推荐），错误提示中文且可理解
二、错误处理与可观测性（必须）
1. 统一错误结构（前后端一致）
● 每个错误都应包含：
  ○ code（稳定错误码，如 TOKEN_INVALID / RLS_FORBIDDEN / VALIDATION_ERROR）
  ○ message（给用户看的中文）
  ○ errorId/requestId（用于定位）
● Web API 返回 JSON：{ code, message, errorId, details? }
● 前端展示 toast：中文可行动（例如“Token 无效，请去设置页重新生成”）
2. requestId / errorId 规范
● Web API：每次请求生成 requestId（或从 header 透传），日志与错误回包带上
● 前端：关键操作失败时打印包含 requestId 的 debug 信息（开发模式）
● 可选：Sentry 集成（推荐，MVP 可上）
3. 错误分类处理（前端必须区分）
● 401：未登录/Token 无效 → 引导登录或去设置
● 403：RLS/越权 → 显示“无权限或资源不存在”
● 409：冲突/重复（URL 重复等）→ 显示“已存在”并提供跳转
● 422/400：表单校验失败 → 标注具体字段错误
● 5xx：系统异常 → 提供重试按钮与 errorId
三、数据一致性与并发（必须）
1. 软删除一致性
● 所有查询默认过滤 deleted_at IS NULL
● 删除操作必须走软删；恢复（可选）需清晰策略
● 统计（ROI）必须排除 deleted_at 非空数据
2. 状态与事件一致性（关键）
● status_history：每次状态变更必须写入（from_status_id, to_status_id, changed_at）
● events：按口径写入并保持 upsert 规则（APPLIED/RESPONDED 单条；INTERVIEW 多条）
● 修改 applied_at/responded_at/interview scheduled_at 时必须同步更新对应事件
● 任何“只改 status 不写 history/event”都不合格
3. 并发更新策略（至少实现一种并说明）
● 看板拖拽/行内改状态等高频操作：
  ○ 策略 A：串行化（同 application 的 mutation 上锁，上一条完成前不允许下一条）
  ○ 策略 B：最后写入胜出（但需避免 UI 与服务器不一致）
● 必须保证最终一致，且失败时可恢复
四、React Query 标准（必须）
1. queryKey 设计
● 按资源与过滤条件稳定构造 queryKey：
  ○ ['applications', filters, sort, page]
  ○ ['application', id]
  ○ ['clips', filters, page]
● 不允许随意字符串拼接导致缓存错乱
2. 缓存与失效策略
● 列表更新：mutation 后要么精准更新 cache，要么 invalidate 对应 key
● 详情更新：同时更新详情 cache 与列表 cache（避免展示旧数据）
● 预取：从列表打开详情抽屉时可 prefetch 详情（加分）
3. 乐观更新（看板必须）
● optimistic update：立即更新 UI
● rollback：失败时恢复并提示
● retry：提供“重试”按钮
● undo：成功后提供撤销（尽量实现）
五、UI/UX 完整度（必须）
1. 三态完善
● 每个页面/主要模块必须有：
  ○ skeleton loading
  ○ empty state（带下一步引导：安装插件/导入 CSV/创建第一条）
  ○ error state（带重试）
2. 可用性细节
● 关键操作确认：删除/撤销 token/批量操作
● 可访问性（基础）：键盘可用、focus 管理、aria-label（至少对 Drawer/Modal）
● 动效克制：明显但不影响效率；尊重 prefers-reduced-motion
3. 性能体验
● 列表 500 条演示数据仍顺滑：
  ○ 必须分页或虚拟滚动（二选一）
  ○ 表格操作不能卡顿（避免过度渲染）
● 图表渲染不阻塞主线程（数据聚合在服务端/SQL 侧优先）
六、数据库与查询性能（必须）
1. 索引与约束
● 必须为常用查询加索引：
  ○ applications(user_id, status_id)
  ○ applications(user_id, applied_at)
  ○ job_clips(user_id, captured_at)
  ○ events(user_id, type, occurred_at)
  ○ interviews(user_id, scheduled_at)
● 去重约束：
  ○ job_clips unique(user_id, client_request_id)
  ○ job_clips unique(user_id, url)
● token：extension_tokens token_hash 索引 + revoked_at 过滤
2. 聚合与统计
● ROI 统计优先用 SQL/RPC 在 DB 侧聚合（中位数/P75 需要 SQL 支持）
● 避免前端拉全量再聚合
八、CI 与交付（必须）
1. GitHub Actions（推荐必须）
● lint
● build
2. 版本与提交
● 每次输出以“可提交最小增量”为单位（一个 commit 单元）
● 提交内容必须包含：代码 + 必要 SQL + README 更新（若影响使用方式）
3. 文档（必须）
● README 必含：
  ○ 产品愿景与核心功能
  ○ 架构说明（Web/DB/RLS/插件/Token）
  ○ 数据模型（Clip→Application→Events→ROI）
  ○ 口径说明（KPI、漏斗、反馈时长）
  ○ 本地运行与部署
  ○ 隐私说明（插件采集范围）
  ○ 演示脚本（90 秒/5 分钟）
九、Definition of Done（每个模块都要满足）
一个模块完成必须同时满足：
● 功能可用：主流程 + 边界情况（至少 3 个）
● 错误/空态/加载态齐全
● 权限正确：RLS 不越权
● 类型正确：无 any、无 TS 报错
● 体验完整：动效、交互、提示可理解
● 可验证：给出验收步骤与回归 checklist
【输出格式（强制）】
你每次实现一个“可提交的最小增量（一个 commit 单元）”，输出必须包含：
A) 设计说明：数据流、状态、权限点、错误处理、边界条件
B) 文件变更清单：新增/修改路径 + 每个文件职责
C) 逐文件完整代码（可复制即编译）
D) Supabase SQL：迁移/索引/RLS/Storage policies（如涉及）
E) 运行命令与本地验收步骤（step-by-step）
F) 回归 checklist（<=10 条）+ 风险点（<=5 条）
不要给伪代码，不要只讲思路；我需要能直接落地的代码与 SQL。
【沟通规则】
● 如果存在未明确的小细节，你必须给出“默认的最佳实践方案”并说明可替换项，而不是反复追问。
● 但对“会引发返工的关键决策”（数据模型、口径、权限、token、安全）必须明确说明假设。
● 你写的所有内容都应体现：这是一款真正要上线的高品质产品，而不是 demo 玩具。先不用写代码，我待会给你任务