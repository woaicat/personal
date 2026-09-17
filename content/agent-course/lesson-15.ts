/**
 * 第十五课正文数据。正文以 /Users/gaojiaxuan/Desktop/第十五课文案.md 为唯一内容基线；
 * 可视化组件只负责把同一份教学内容转换成可读的网页图解。
 */

export const lessonFifteenIntro = `Agent 上线以后，我们需要知道：它是否完成了任务，执行过程是否合理，哪里容易出错，以及时间和成本花在了什么地方。\n\n建立可观测性，就是记录和分析 Agent 运行时的信息，让这些问题有据可查。`;

export const lessonFifteenSection1 = {
  oneOne: `Agent 完成一次任务，可能需要多次调用模型、检索资料、使用工具，甚至把部分工作交给其他 Agent。同一个问题，也可能因为上下文或工具返回结果不同，走出不同的执行路径。\n\n只保存用户的问题和最终回答，往往不足以解释问题发生在哪里。我们还需要知道：它看到了什么信息，调用了什么工具，各步骤返回了什么结果。[Langfuse 官方文档](https://langfuse.com/docs/observability/overview)\n\n例如，在一个虚拟电商客服场景中，用户问：“这件商品还能退吗？”Agent 给出了错误答案，可能有不同原因：\n\n- 订单查询工具返回了错误的签收时间。\n- 检索到了已经失效的退货规则。\n- 正确信息已经提供给模型，但模型判断错误。\n- 工具调用失败后，Agent 仍然给出了确定的回答。\n\n这些问题需要不同的改进方法。记录执行过程，才能缩小排查范围。`,
  oneTwo: `接口正常返回、程序没有报错，只能说明技术流程可能正常，不能证明用户的问题已经解决。\n\n例如，客服 Agent 顺利完成了所有调用，却错误地承诺可以退款。这次运行在技术上没有异常，在业务上却失败了。\n\n因此，需要同时关注两类结果：\n\n- **运行结果**：是否报错、超时、重复调用或异常终止。\n- **业务结果**：回答是否正确、操作是否符合要求、用户的问题是否得到解决。\n\n业务结果需要结合明确的规则、实际业务状态、人工检查或评测来判断，不能只依赖 Agent 自己报告“任务已完成”。`,
  oneThree: `可观测性也用于发现整体变化：换模型后是否更慢，修改提示词后是否增加了工具调用，某类任务是否更容易失败。\n\n有了历史记录和版本信息，团队才能比较变化前后的表现，确定优先改进的环节，并在出现异常时及时处理。`
};

export const lessonFifteenSection2 = {
  oneOne: `理解执行记录，可以先认识三个概念：\n\n| 概念 | 含义 | 示例 |\n|---|---|---|\n| Trace：调用链路 | 一次请求从开始到结束的执行记录 | 一次退货咨询的处理过程 |\n| Span：执行步骤 | 链路中的一个操作，可以包含子步骤 | 一次模型调用、订单查询或知识检索 |\n| Log：日志 | 某个时刻发生的具体事件 | 查询超时、重试开始、人工审批通过 |\n\n这些记录通过标识关联起来，才能看出步骤之间的顺序、依赖和耗时。多轮对话还需要会话标识，把同一会话中的多次请求联系起来。[OpenTelemetry 基础概念](https://opentelemetry.io/docs/concepts/observability-primer/)、[LangSmith 数据结构](https://docs.langchain.com/langsmith/observability-concepts)\n\n前面的退货咨询，可以记录为：\n\n\`\`\`text\n用户提出退货问题\n  → 模型决定查询订单\n  → 订单工具返回签收时间\n  → 检索工具返回适用规则\n  → 模型生成判断和解释\n  → 返回用户\n\`\`\`\n\n查看这条链路时，应当能展开每个步骤，看到相应的输入、输出、状态和耗时。对于并行执行的工具或子 Agent，也要保留它们与主任务的关系。\n\n这里记录的是系统实际发生的操作和可获取的信息，不能把模型生成的解释直接当成它内部推理过程的完整记录。`,
  oneTwo: `下面是一份适合起步的记录清单，可根据业务增减。\n\n| 记录对象 | 建议记录的信息 | 主要用途 |\n|---|---|---|\n| 任务与会话 | 任务标识、会话标识、任务类型、开始与结束时间 | 找到一次运行，关联多轮对话 |\n| 版本与配置 | 应用版本、模型名称及可获取的版本、提示词版本、关键参数 | 比较不同版本，排查变更影响 |\n| 模型调用 | 实际发送的消息与上下文、模型输出、Token 用量、耗时 | 检查输入是否充分、输出是否合理 |\n| 工具调用 | 工具名称、输入参数、返回结果、错误、重试次数 | 判断工具选择、参数和执行是否正确 |\n| 检索与记忆 | 查询内容、命中的资料标识与版本、实际加入上下文的片段、记忆读写变化 | 排查信息缺失、过期或使用错误 |\n| 执行控制 | 循环次数、子 Agent 分工、权限检查、审批、转人工、停止原因 | 检查执行边界和异常处理 |\n| 最终结果 | 最终回答或操作结果、任务完成状态、用户反馈、人工或自动评测结果 | 判断业务效果，积累问题样本 |\n\n其中，提示词、模型、知识库等版本信息尤其容易遗漏。如果不知道当时使用了哪个版本，就很难解释为什么以前正常、现在却出现问题。\n\n自动接入通常能覆盖部分模型和框架调用；业务审批、订单状态变化、自定义工具等环节，仍可能需要开发人员补充记录。[LangSmith 接入说明](https://docs.langchain.com/langsmith/observability-concepts)`,
  oneThree: `单次记录帮助排查具体问题，汇总指标帮助判断整体表现。起步时可以关注四组指标：\n\n| 维度 | 常用指标 |\n|---|---|\n| 效果 | 任务成功率、回答正确率、用户满意度、人工接管率 |\n| 速度 | 首次响应耗时、任务总耗时、各步骤耗时 |\n| 成本 | 每次任务成本、模型与工具费用、Token 用量 |\n| 稳定性 | 错误率、超时率、重试次数、达到执行上限的比例 |\n\n每个指标都需要明确口径。例如，“任务成功率”要先定义什么算成功，不能把“生成了一段回答”作为所有任务的成功标准。\n\n耗时除了看平均值，也可以看 P95：即约 95% 的请求耗时不超过这个值，用来了解较慢请求的体验。交互型 Agent 还应区分系统处理时间与等待用户、等待审批的时间。\n\n指标要结合场景解释。例如，人工接管率上升可能意味着能力退化，也可能是系统正确识别了更多高风险任务。`,
  oneFour: `输入、输出和工具结果中可能包含用户资料、订单信息或内部文档。应明确哪些内容可以保存、哪些需要脱敏、谁能查看，以及保留多久；密码和密钥不应进入日志。\n\n流量较大时，可以对普通请求的详细链路进行采样，对失败、超时和重要业务操作设置更高的保留优先级。计算整体成功率和错误率时，要使用完整计数或经过正确校正的数据，避免把偏向保留失败请求的样本当成全部流量。`
};

export const lessonFifteenSection2BeforeConceptTable = `理解执行记录，可以先认识三个概念：`;
export const lessonFifteenSection2AfterConceptTable = `这些记录通过标识关联起来，才能看出步骤之间的顺序、依赖和耗时。多轮对话还需要会话标识，把同一会话中的多次请求联系起来。[OpenTelemetry 基础概念](https://opentelemetry.io/docs/concepts/observability-primer/)、[LangSmith 数据结构](https://docs.langchain.com/langsmith/observability-concepts)\n\n前面的退货咨询，可以记录为：\n\n\`\`\`text\n用户提出退货问题\n  → 模型决定查询订单\n  → 订单工具返回签收时间\n  → 检索工具返回适用规则\n  → 模型生成判断和解释\n  → 返回用户\n\`\`\`\n\n查看这条链路时，应当能展开每个步骤，看到相应的输入、输出、状态和耗时。对于并行执行的工具或子 Agent，也要保留它们与主任务的关系。\n\n这里记录的是系统实际发生的操作和可获取的信息，不能把模型生成的解释直接当成它内部推理过程的完整记录。`;
export const lessonFifteenSection2BeforeFieldTable = `下面是一份适合起步的记录清单，可根据业务增减。`;
export const lessonFifteenSection2AfterFieldTable = `自动接入通常能覆盖部分模型和框架调用；业务审批、订单状态变化、自定义工具等环节，仍可能需要开发人员补充记录。[LangSmith 接入说明](https://docs.langchain.com/langsmith/observability-concepts)`;
export const lessonFifteenSection2VersionNote = `其中，提示词、模型、知识库等版本信息尤其容易遗漏。如果不知道当时使用了哪个版本，就很难解释为什么以前正常、现在却出现问题。`;
export const lessonFifteenSection2BeforeMetricTable = `单次记录帮助排查具体问题，汇总指标帮助判断整体表现。起步时可以关注四组指标：`;
export const lessonFifteenSection2AfterMetricTable = `每个指标都需要明确口径。例如，“任务成功率”要先定义什么算成功，不能把“生成了一段回答”作为所有任务的成功标准。\n\n耗时除了看平均值，也可以看 P95：即约 95% 的请求耗时不超过这个值，用来了解较慢请求的体验。交互型 Agent 还应区分系统处理时间与等待用户、等待审批的时间。\n\n指标要结合场景解释。例如，人工接管率上升可能意味着能力退化，也可能是系统正确识别了更多高风险任务。`;

export const lessonFifteenSection3 = {
  intro: `以下方案都能帮助观察 Agent，但侧重点不同。功能与部署方式依据本次查阅的官方文档整理；适用场景是结合这些能力给出的选型判断。`,
  platforms: [
    { number: "3.1", name: "LangSmith", description: "LangSmith 提供调用链路查看、性能监控、反馈标注和评测等功能。它支持 LangChain、LangGraph，也支持其他框架和自定义代码。", link: "https://docs.langchain.com/langsmith/observability", linkLabel: "官方文档", feature: "可以在同一平台中查看运行记录、标记问题，并继续开展评测。使用 LangChain 或 LangGraph 的团队可以优先考虑，接入方式与现有开发流程比较接近。", tradeoff: "需要考虑商业服务的使用费用和数据存储要求。其自托管版本属于企业方案的附加选项，不能因为 LangChain 开源，就认为 LangSmith 平台也可以免费自行部署。", tradeoffLinks: [{ text: "部署说明", url: "https://docs.langchain.com/langsmith/self-hosted" }], icon: "link" },
    { number: "3.2", name: "Langfuse", description: "Langfuse 是面向大模型应用的开源平台，提供链路追踪、Token 与成本分析、提示词管理、评测和看板，既有云服务，也支持自行部署。", link: "https://langfuse.com/docs/observability/overview", linkLabel: "功能说明", feature: "把运行观察与提示词、评测放在一起，同时提供较灵活的部署选择。适合希望保留数据控制权，并持续迭代 Agent 的团队。", tradeoff: "自行部署需要承担存储、备份、升级和服务维护工作；部分附加功能需要商业许可。开源可以减少部分许可费用，但不等于没有运维成本。", tradeoffLinks: [{ text: "自托管说明", url: "https://langfuse.com/self-hosting" }], icon: "bars" },
    { number: "3.3", name: "Arize Phoenix", description: "Phoenix 提供链路追踪、评测、提示词实验和数据集管理，基于 OpenTelemetry，并通过 OpenInference 接入多种模型和框架。", link: "https://arize.com/docs/phoenix/", linkLabel: "官方文档", feature: "适合开发和实验过程中的问题分析，例如查看检索结果是否相关、回答是否有依据，以及修改提示词后表现是否改善。支持在自己的环境中运行。", tradeoff: "自行部署仍需维护服务，业务指标也需要团队定义。Phoenix 源码可用，采用 ELv2 许可证，允许免费自托管，但对向第三方提供托管服务有明确限制。", tradeoffLinks: [{ text: "许可说明", url: "https://arize.com/docs/phoenix/self-hosting/license" }, { text: "许可证", url: "https://github.com/Arize-ai/phoenix/blob/main/LICENSE" }], icon: "search" },
    { number: "3.4", name: "Datadog", description: "Datadog 的 Agent Observability 提供调用追踪、耗时、Token、错误和质量分析，并能与其应用性能监控关联。", link: "https://docs.datadoghq.com/llm_observability/investigate/", linkLabel: "官方文档", feature: "可以把 Agent 与后端接口等应用运行情况一起排查。例如，用户反馈响应慢时，可以继续判断是模型调用慢，还是业务服务出现了问题。已有 Datadog 监控体系的团队可以优先评估。", tradeoff: "属于商业平台，需要结合采集规模和所用功能评估费用。对于只需要查看少量 Agent 运行记录的小项目，应比较其接入、配置和使用成本。", tradeoffLinks: [], icon: "server" },
    { number: "3.5", name: "开源工具自建", description: "也可以组合已有开源工具搭建观测系统，例如：", link: "https://opentelemetry.io/docs/what-is-opentelemetry/", feature: "可以复用企业已有的监控系统，数据和展示方式更容易按自身需求调整。", tradeoff: "提示词查看、模型费用计算、回答质量评测等 Agent 专属能力，需要额外接入或开发。更适合已有基础设施和运维能力的团队。", tradeoffLinks: [], icon: "box" }
  ],
  openSourceList: `- **OpenTelemetry**：生成、采集和传输观测数据。\n- **Tempo**：存储和查询调用链路。\n- **Prometheus**：采集和查询指标。\n- **Loki**：汇总和查询日志。\n- **Grafana**：展示看板，并关联查询相关数据。\n\nOpenTelemetry 本身不提供完整的数据存储和分析界面，需要与后端工具配合。[OpenTelemetry](https://opentelemetry.io/docs/what-is-opentelemetry/)、[Tempo](https://grafana.com/oss/tempo/)、[Prometheus](https://prometheus.io/docs/introduction/overview/)、[Loki](https://grafana.com/oss/loki/)`
};

export const lessonFifteenSection4 = `先列举出最核心的待观测信息，快速建立观测平台，再根据业务需要逐步扩展。\n\n以退货咨询为例，第一版至少应做到：能够找到用户的问题，查看订单查询与规则检索结果，确认使用的模型和提示词版本，看到最终回答、耗时、成本。\n\n然后完成三件事：\n\n1. **建立看板**：关注任务成功率、耗时、成本和工具错误率，并支持按任务类型、版本查看。\n2. **设置告警**：为持续超时、工具故障、异常成本等情况设置触发条件，明确由谁处理。\n3. **定位问题**：从异常指标进入具体链路，确定问题原因。\n4. **建立测试集**：将有代表性的失败案例加入评测集。\n\n可观测性提供运行证据，评测依据标准判断质量。把线上发现的问题转化为测试样本，才能检查后续修改是否有效，也能减少同类问题再次出现。\n\n本课产出：一份观测方案，明确需要记录的关键步骤与字段、关注的指标，以及采用的平台或自建方案。`;
