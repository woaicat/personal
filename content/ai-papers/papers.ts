export type PaperTopic = "人机协作" | "视觉理解" | "生成模型" | "语言模型" | "多模态" | "推理与检索";

export type Paper = {
  slug: string;
  year: number;
  title: string;
  shortTitle: string;
  summary: string;
  topic: PaperTopic;
  sourceUrl: string;
  explainerUrl?: string;
};

// Add new papers as entries; the catalogue sorts them by year.
export const papers: Paper[] = [
  {
    slug: "licklider",
    year: 1960,
    title: "Man-Computer Symbiosis",
    shortTitle: "人机共生",
    summary: "提出让人和计算机紧密往返协作，帮助人形成问题并实时思考。",
    topic: "人机协作",
    sourceUrl: "https://ieeexplore.ieee.org/document/4503259",
    explainerUrl: "/ai-papers/licklider"
  },
  {
    slug: "alexnet",
    year: 2012,
    title: "ImageNet Classification with Deep Convolutional Neural Networks",
    shortTitle: "AlexNet",
    summary: "深层卷积网络在大规模图像分类中取得突破。",
    topic: "视觉理解",
    sourceUrl: "https://proceedings.neurips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html",
    explainerUrl: "/ai-papers/alexnet"
  },
  {
    slug: "gan",
    year: 2014,
    title: "Generative Adversarial Nets",
    shortTitle: "GAN",
    summary: "让生成器与判别器在对抗中学习数据分布。",
    topic: "生成模型",
    explainerUrl: "/ai-papers/gan",
    sourceUrl: "https://proceedings.neurips.cc/paper_files/paper/2014/hash/f033ed80deb0234979a61f95710dbe25-Abstract.html"
  },
  {
    slug: "transformer",
    year: 2017,
    title: "Attention Is All You Need",
    shortTitle: "Transformer",
    summary: "以注意力机制重构序列建模的方式。",
    topic: "语言模型",
    sourceUrl: "https://arxiv.org/abs/1706.03762",
    explainerUrl: "/ai-papers/transformer"
  },
  {
    slug: "scaling-laws",
    year: 2020,
    title: "Scaling Laws for Neural Language Models",
    shortTitle: "Scaling Laws",
    summary: "刻画语言模型损失与规模、数据和算力的关系。",
    topic: "语言模型",
    sourceUrl: "https://arxiv.org/abs/2001.08361",
    explainerUrl: "/ai-papers/scaling-laws"
  },
  {
    slug: "rag",
    year: 2020,
    title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
    shortTitle: "RAG",
    summary: "先从维基百科检索相关片段，再让生成模型综合片段作答；比较整句与逐词使用证据的两种方式。",
    topic: "推理与检索",
    sourceUrl: "https://arxiv.org/abs/2005.11401",
    explainerUrl: "/ai-papers/rag"
  },
  {
    slug: "gpt-3",
    year: 2020,
    title: "Language Models are Few-Shot Learners",
    shortTitle: "GPT-3",
    summary: "把任务说明和少量示例放进输入，在不针对任务微调的情况下完成多种语言任务。",
    topic: "语言模型",
    sourceUrl: "https://arxiv.org/abs/2005.14165",
    explainerUrl: "/ai-papers/gpt-3"
  },
  {
    slug: "ddpm",
    year: 2020,
    title: "Denoising Diffusion Probabilistic Models",
    shortTitle: "DDPM 扩散模型",
    summary: "从图片逐步加噪，训练网络预测噪声；生成时从新抽取的噪声逐步得到图片。",
    topic: "生成模型",
    sourceUrl: "https://arxiv.org/abs/2006.11239",
    explainerUrl: "/ai-papers/ddpm"
  },
  {
    slug: "vit",
    year: 2020,
    title: "An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale",
    shortTitle: "ViT",
    summary: "把图像切成 patch token 交给 Transformer；大规模预训练后迁移到多种图像分类任务。",
    topic: "视觉理解",
    sourceUrl: "https://arxiv.org/abs/2010.11929",
    explainerUrl: "/ai-papers/vit"
  },
  {
    slug: "clip",
    year: 2021,
    title: "Learning Transferable Visual Models From Natural Language Supervision",
    shortTitle: "CLIP",
    summary: "用图文对比学习建立可迁移的视觉表示。",
    topic: "多模态",
    sourceUrl: "https://arxiv.org/abs/2103.00020"
  },
  {
    slug: "latent-diffusion",
    year: 2021,
    title: "High-Resolution Image Synthesis with Latent Diffusion Models",
    shortTitle: "潜扩散模型",
    summary: "先学压缩与重建，再在较小的潜空间逐步去噪，降低高分辨率图片生成的计算成本。",
    topic: "生成模型",
    sourceUrl: "https://arxiv.org/abs/2112.10752",
    explainerUrl: "/ai-papers/latent-diffusion"
  },
  {
    slug: "chain-of-thought",
    year: 2022,
    title: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models",
    shortTitle: "Chain-of-Thought",
    summary: "用中间推理步骤提升复杂任务表现。",
    topic: "推理与检索",
    sourceUrl: "https://arxiv.org/abs/2201.11903"
  },
  {
    slug: "instructgpt",
    year: 2022,
    title: "Training language models to follow instructions with human feedback",
    shortTitle: "InstructGPT",
    summary: "用监督微调与人类反馈训练更善于遵循指令的模型。",
    topic: "语言模型",
    sourceUrl: "https://arxiv.org/abs/2203.02155",
    explainerUrl: "/ai-papers/instructgpt"
  }
];

export const paperTopics: Array<"全部" | PaperTopic> = ["全部", "人机协作", "视觉理解", "生成模型", "语言模型", "多模态", "推理与检索"];

export const chronologicalPapers = [...papers].sort((first, second) => first.year - second.year);
