"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ExternalLink, RotateCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { papers } from "@/content/ai-papers/papers";
import PaperSiteHeader from "./PaperSiteHeader";
import styles from "./ai-papers.module.css";

const alexnet = papers.find((paper) => paper.slug === "alexnet")!;

const stages = [
  { id: "input", label: "输入图像", meta: "224 × 224 × 3", description: "论文中的网络接收固定尺寸的 RGB 图像。示例猫照片只用于帮助理解数据流。" },
  { id: "conv1", label: "卷积 1", meta: "96 个 11 × 11 核", description: "第一层在局部区域扫描，形成 96 组特征图；其后接 ReLU、局部响应归一化与池化。" },
  { id: "conv2", label: "卷积 2", meta: "256 个 5 × 5 核", description: "第二层继续组合前一层的局部信息；其后同样接 ReLU、归一化与池化。" },
  { id: "conv3", label: "卷积 3", meta: "384 个 3 × 3 核", description: "第三层开始在更深的表示上提取特征，论文中的两块 GPU 在这一层交换信息。" },
  { id: "conv4", label: "卷积 4", meta: "384 个 3 × 3 核", description: "继续组合特征；卷积 3、4、5 之间没有插入池化层。" },
  { id: "conv5", label: "卷积 5", meta: "256 个 3 × 3 核", description: "第五层卷积之后进行池化，随后把特征交给全连接部分。" },
  { id: "fc6", label: "全连接 1", meta: "4096 个单元", description: "把前面提取的空间特征汇总为用于分类的表示。训练时，这一层使用 dropout 抑制过拟合。" },
  { id: "fc7", label: "全连接 2", meta: "4096 个单元", description: "进一步组合特征；论文同样在这一层使用 dropout。" },
  { id: "fc8", label: "分类输出", meta: "1000 个类别", description: "最后一层输出 1000 个类别的分数，再经 softmax 得到类别概率分布。" }
] as const;

const inputGrid = [
  [1, 1, 1, 1, 1],
  [1, 2, 2, 2, 1],
  [1, 2, 9, 2, 1],
  [1, 2, 2, 2, 1],
  [1, 1, 1, 1, 1]
];

const kernels = {
  edge: { label: "突出变化", matrix: [[0, -1, 0], [-1, 4, -1], [0, -1, 0]], description: "周围像素与中心差得越多，输出越明显。" },
  average: { label: "邻域平均", matrix: [[1 / 9, 1 / 9, 1 / 9], [1 / 9, 1 / 9, 1 / 9], [1 / 9, 1 / 9, 1 / 9]], description: "把附近九个数取平均，局部差异会变柔和。" }
} as const;

type KernelKey = keyof typeof kernels;

function calculateOutput(kernel: number[][]) {
  return Array.from({ length: 3 }, (_, row) =>
    Array.from({ length: 3 }, (_, column) => {
      let sum = 0;
      for (let offsetRow = 0; offsetRow < 3; offsetRow += 1) {
        for (let offsetColumn = 0; offsetColumn < 3; offsetColumn += 1) {
          sum += inputGrid[row + offsetRow][column + offsetColumn] * kernel[offsetRow][offsetColumn];
        }
      }
      return sum;
    })
  );
}

function formatNumber(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function ArchitectureExplorer() {
  const [selected, setSelected] = useState(1);
  const stage = stages[selected];

  return (
    <div className={styles.architectureExplorer}>
      <div className={styles.architectureIntro}>
        <div className={styles.architecturePhoto}>
          <Image src="/hero-slide-04.jpg" alt="橘白色猫的示例照片，用于理解图像输入" fill sizes="(max-width: 700px) 36vw, 180px" />
          <span>示例图像</span>
        </div>
        <div className={styles.architectureIntroCopy}>
          <p className={styles.sectionEyebrow}>架构示意 · 点击任意层</p>
          <h3>从局部特征，到 1000 类输出</h3>
          <p>AlexNet 有 8 个带参数的层：前 5 层做卷积，后 3 层做全连接。选择下方任意一步，看它在整条处理链中的位置。</p>
        </div>
      </div>
      <div className={styles.stageScroller}>
        <div className={styles.stageRail} role="group" aria-label="AlexNet 网络结构逐层查看">
          {stages.map((item, index) => (
            <div className={styles.stageSlot} key={item.id}>
              <button
                type="button"
                className={`${styles.stageButton} ${selected === index ? styles.stageButtonActive : ""}`}
                onClick={() => setSelected(index)}
                aria-pressed={selected === index}
              >
                <span>{item.label}</span><small>{item.meta}</small>
              </button>
              {index < stages.length - 1 && <ArrowRight className={styles.stageArrow} size={15} aria-hidden="true" />}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.stageExplanation} aria-live="polite">
        <div><span className={styles.stageStep}>第 {String(selected + 1).padStart(2, "0")} 步 / {stages.length}</span><h4>{stage.label} <small>{stage.meta}</small></h4></div>
        <p>{stage.description}</p>
      </div>
      <p className={styles.demoDisclaimer}>这是一张结构教学图；上方照片没有经过 AlexNet 实时推理。</p>
    </div>
  );
}

function ConvolutionLab() {
  const [kernelKey, setKernelKey] = useState<KernelKey>("edge");
  const [selectedCell, setSelectedCell] = useState<[number, number]>([1, 1]);
  const [useRelu, setUseRelu] = useState(true);
  const kernel = kernels[kernelKey];
  const output = useMemo(() => calculateOutput(kernel.matrix.map((row) => [...row])), [kernel]);
  const rawValue = output[selectedCell[0]][selectedCell[1]];
  const shownValue = useRelu ? Math.max(0, rawValue) : rawValue;

  return (
    <div className={styles.lab}>
      <div className={styles.labControls}>
        <div className={styles.kernelChoices} role="group" aria-label="选择示意卷积核">
          {(Object.keys(kernels) as KernelKey[]).map((key) => (
            <button type="button" key={key} className={`${styles.choiceButton} ${kernelKey === key ? styles.choiceActive : ""}`} aria-pressed={kernelKey === key} onClick={() => setKernelKey(key)}>{kernels[key].label}</button>
          ))}
        </div>
        <button type="button" className={`${styles.reluButton} ${useRelu ? styles.reluActive : ""}`} aria-pressed={useRelu} onClick={() => setUseRelu((current) => !current)}>
          {useRelu ? <Check size={16} aria-hidden="true" /> : <span className={styles.emptyCheck} aria-hidden="true" />} 应用 ReLU
        </button>
      </div>
      <div className={styles.labFlow}>
        <div className={styles.gridGroup}>
          <div className={styles.gridLabel}><strong>输入</strong><span>5 × 5 像素值示意</span></div>
          <div className={styles.inputGrid} aria-label="5乘5输入数值矩阵">
            {inputGrid.map((row, rowIndex) => row.map((value, columnIndex) => (
              <span className={`${styles.inputCell} ${rowIndex >= selectedCell[0] && rowIndex < selectedCell[0] + 3 && columnIndex >= selectedCell[1] && columnIndex < selectedCell[1] + 3 ? styles.inputCellSelected : ""}`} key={`${rowIndex}-${columnIndex}`}>{value}</span>
            )))}
          </div>
        </div>
        <ArrowRight className={styles.labArrow} size={22} aria-hidden="true" />
        <div className={styles.gridGroup}>
          <div className={styles.gridLabel}><strong>卷积核</strong><span>3 × 3 固定示意权重</span></div>
          <div className={styles.kernelGrid} aria-label="3乘3卷积核权重矩阵">
            {kernel.matrix.map((row, rowIndex) => row.map((value, columnIndex) => <span className={styles.kernelCell} key={`${rowIndex}-${columnIndex}`}>{kernelKey === "average" ? "⅑" : value}</span>))}
          </div>
        </div>
        <ArrowRight className={styles.labArrow} size={22} aria-hidden="true" />
        <div className={styles.gridGroup}>
          <div className={styles.gridLabel}><strong>输出特征图</strong><span>点击任意格子</span></div>
          <div className={styles.outputGrid} role="group" aria-label="3乘3输出特征图">
            {output.map((row, rowIndex) => row.map((value, columnIndex) => {
              const displayed = useRelu ? Math.max(0, value) : value;
              return <button type="button" className={`${styles.outputCell} ${selectedCell[0] === rowIndex && selectedCell[1] === columnIndex ? styles.outputCellSelected : ""}`} key={`${rowIndex}-${columnIndex}`} aria-pressed={selectedCell[0] === rowIndex && selectedCell[1] === columnIndex} aria-label={`第${rowIndex + 1}行第${columnIndex + 1}列，输出${formatNumber(displayed)}`} onClick={() => setSelectedCell([rowIndex, columnIndex])}>{formatNumber(displayed)}</button>;
            }))}
          </div>
        </div>
      </div>
      <div className={styles.labInsight} aria-live="polite">
        <div><span>当前选中格</span><strong>{formatNumber(shownValue)}</strong></div>
        <p>输入中高亮的 3 × 3 区域与卷积核逐格相乘，再求和{useRelu ? "，最后由 ReLU 将负数变为 0" : ""}。{kernel.description}</p>
        <button type="button" onClick={() => { setKernelKey("edge"); setSelectedCell([1, 1]); setUseRelu(true); }}><RotateCcw size={14} aria-hidden="true" /> 重置演示</button>
      </div>
      <p className={styles.demoDisclaimer}>此处使用手工设定的小矩阵解释计算方式；它不是论文模型的真实输入、权重或特征图。</p>
    </div>
  );
}

export default function AlexNetPage() {
  return (
    <div className={styles.paperSite}>
      <PaperSiteHeader onDetail />
      <main className={styles.detailMain}>
        <div className={styles.detailHero}>
          <div className={styles.detailHeroText}>
            <p className={styles.eyebrow}>论文图解 01 / 视觉理解</p>
            <h1>AlexNet</h1>
            <p className={styles.originalTitle}>{alexnet.title}</p>
            <p className={styles.detailDeck}>2012 年，这篇论文让深层卷积网络在大规模图像分类任务上取得突破。沿着一张图片的处理路径，看看它如何把局部视觉信息逐层转成分类结果。</p>
            <div className={styles.detailMeta}><span>Alex Krizhevsky · Ilya Sutskever · Geoffrey E. Hinton</span><span>NeurIPS 2012</span></div>
            <a className={styles.inlineSource} href={alexnet.sourceUrl} target="_blank" rel="noopener noreferrer">查看论文原文 <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
          <div className={styles.detailHeroFact}>
            <p>论文中的关键结果</p>
            <div className={styles.comparison}><div><strong>15.3%</strong><span>AlexNet top-5 错误率</span></div><div><strong>26.2%</strong><span>当年第二名 top-5 错误率</span></div></div>
            <small>ILSVRC 2012 测试集 · 数值引自论文摘要</small>
          </div>
        </div>

        <nav className={styles.detailSectionNav} aria-label="本页内容">
          <a href="#architecture">核心结构</a><a href="#problem">提出的问题</a><a href="#try">动手试</a><a href="#impact">影响与原文</a>
        </nav>

        <section id="architecture" className={styles.detailSection}>
          <div className={styles.detailSectionHead}><span>01 / 结构</span><div><h2>点开每一层，看信息如何向前流动</h2><p>这是论文 Figure 2 所述结构的简化导览，保留了层数与主要尺寸，方便先建立整体认识。</p></div></div>
          <ArchitectureExplorer />
        </section>

        <section id="problem" className={styles.detailSection}>
          <div className={styles.detailSectionHead}><span>02 / 问题</span><div><h2>让模型从大量图片中识别物体</h2><p>真实世界的图像有角度、光照与背景差异。论文关注的是：能否用足够大的数据集与深层网络，直接从像素中学出有效的视觉特征？</p></div></div>
          <div className={styles.problemStrip}><div><strong>约 120 万</strong><span>训练图片</span></div><div><strong>1000</strong><span>个分类类别</span></div><div><strong>5 + 3</strong><span>卷积层 + 全连接层</span></div></div>
        </section>

        <section id="try" className={styles.detailSection}>
          <div className={styles.detailSectionHead}><span>03 / 动手试</span><div><h2>移动观察窗口，理解一次卷积计算</h2><p>点击输出特征图上的格子，看看输入区域如何移动；切换示意卷积核，观察结果怎样变化。</p></div></div>
          <ConvolutionLab />
        </section>

        <section id="impact" className={styles.detailSection}>
          <div className={styles.detailSectionHead}><span>04 / 影响与边界</span><div><h2>真正改变了什么？</h2><p>突破来自网络结构、训练方法、大规模数据和 GPU 计算能力的共同作用。</p></div></div>
          <div className={styles.impactGrid}>
            <div><span>01</span><h3>训练得动</h3><p>ReLU 让深层网络训练更快；论文还用两块 GPU 分担计算。</p></div>
            <div><span>02</span><h3>减少过拟合</h3><p>数据增强和 dropout 帮助大规模网络在训练集之外保持表现。</p></div>
            <div><span>03</span><h3>看清边界</h3><p>这里验证的是图像分类能力。上方交互用于解释机制，不代表实时运行原始 AlexNet 模型。</p></div>
          </div>
          <div className={styles.sourcePanel}><div><p className={styles.sectionEyebrow}>继续阅读</p><h3>回到论文，看作者如何描述实验</h3><p>ImageNet Classification with Deep Convolutional Neural Networks · NeurIPS 2012</p></div><a href={alexnet.sourceUrl} target="_blank" rel="noopener noreferrer">论文原文 <ExternalLink size={16} aria-hidden="true" /></a></div>
        </section>
        <div className={styles.detailEnd}><Link href="/ai-papers"><ArrowLeft size={17} aria-hidden="true" /> 返回全部论文</Link><span>下一篇图解正在制作中</span></div>
      </main>
      <footer className={styles.siteFooter}><span>© {new Date().getFullYear()} jiaxuan · 人工智能论文图解</span><Link href="/ai-papers">论文目录 <ArrowRight size={15} aria-hidden="true" /></Link></footer>
    </div>
  );
}
