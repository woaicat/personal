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
  { id: "input", label: "输入图像", meta: "224 × 224 × 3", description: "先把彩色图片变成固定大小的数字表，交给网络处理。示例猫照片只用来帮助理解流程。" },
  { id: "conv1", label: "卷积 1", meta: "96 个 11 × 11 核", description: "像拿着小窗口在图片上移动，寻找颜色变化、边缘等局部线索，并把结果记录成新的数字表。" },
  { id: "conv2", label: "卷积 2", meta: "256 个 5 × 5 核", description: "把上一层找到的简单线索继续组合，发现更复杂的局部形状。之后会缩小数字表，减少后面的计算量。" },
  { id: "conv3", label: "卷积 3", meta: "384 个 3 × 3 核", description: "继续组合已经找到的线索。论文使用两块 GPU，并在这一层交换部分计算结果。" },
  { id: "conv4", label: "卷积 4", meta: "384 个 3 × 3 核", description: "把前面的线索再组合一次，让网络逐渐得到更完整的判断依据。" },
  { id: "conv5", label: "卷积 5", meta: "256 个 3 × 3 核", description: "完成最后一轮局部观察，再把得到的线索交给负责整体分类的部分。" },
  { id: "fc6", label: "全连接 1", meta: "4096 个单元", description: "开始综合整张图片中找到的线索，而不是只看一个局部。训练时会随机暂时停用部分单元，减少死记训练图片。" },
  { id: "fc7", label: "全连接 2", meta: "4096 个单元", description: "继续整理整张图片的线索，让不同线索共同影响最后的判断。" },
  { id: "fc8", label: "分类输出", meta: "1000 个类别", description: "给 1000 个类别分别打分。分数越高，表示网络越倾向于把图片归到那一类。" }
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
          <h3>从图片细节，一步步做出分类</h3>
          <p>AlexNet 先用 5 层卷积寻找并组合局部线索，再用 3 层全连接汇总线索并分类。选择下方任意一步，看看它在整条处理链中的位置。</p>
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
          <div className={styles.gridLabel}><strong>计算结果（特征图）</strong><span>点击任意格子</span></div>
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
            <small>正确答案没进模型最有把握的 5 个类别，就算一次错误；数字越低越好。<br />ILSVRC 2012 测试集 · 数值引自论文摘要</small>
          </div>
        </div>

        <section className={styles.plainExplanation} aria-labelledby="plain-explanation-title">
          <h2 id="plain-explanation-title">小学生也能看懂的解释</h2>
          <p>先把图片想成一张由许多数字组成的方格纸，每个位置都记录着颜色。AlexNet 要做的事，是根据这些数字判断整张图片属于哪一类，比如猫、狗或汽车。它需要从大量已经标好答案的图片中学习，才能做出判断。</p>
          <p>它会用一个小窗口在图片上移动，每次只看附近的一小块，找出边缘、颜色变化等线索。这种局部观察和计算叫“卷积”。窗口怎样找线索，是网络在训练中学出来的；前面的层找到简单线索，后面的层再把它们组合起来，逐渐形成判断物体所需的信息。AlexNet 连续用了五层卷积。</p>
          <p>接下来，网络会缩小一部分中间结果，再用三层“全连接”把找到的线索汇总，给 1000 个类别分别打分。你可以把最后一步理解为：把看到的线索放在一起，判断它最像哪一类。下方交互里的 ReLU 是一种简单处理：把计算得到的负数变成 0。</p>
          <p>这些观察方法不是人提前一条条写给它的。训练时，网络先猜答案，再和图片的正确类别比较，按错误调整每层内部的数字，反复练习。论文的突破也离不开大量训练图片、GPU 计算，以及让深层网络更容易训练的方法。下面的结构图和小实验，就是把这段过程拆开来看。</p>
        </section>

        <nav className={styles.detailSectionNav} aria-label="本页内容">
          <a href="#architecture">核心结构</a><a href="#problem">提出的问题</a><a href="#try">动手试</a><a href="#impact">影响与原文</a>
        </nav>

        <section id="architecture" className={styles.detailSection}>
          <div className={styles.detailSectionHead}><span>01 / 结构</span><div><h2>点开每一层，看图片怎样变成判断</h2><p>下面根据论文中的网络结构画出简化流程。先看每一步在做什么，再看具体数字。</p></div></div>
          <ArchitectureExplorer />
        </section>

        <section id="problem" className={styles.detailSection}>
          <div className={styles.detailSectionHead}><span>02 / 问题</span><div><h2>让模型从大量图片中识别物体</h2><p>同一个物体在照片里可能有不同的角度、大小和光线。网络能不能只看像素数字，通过大量图片学会辨认它？</p></div></div>
          <div className={styles.problemStrip}><div><strong>约 120 万</strong><span>训练图片</span></div><div><strong>1000</strong><span>个分类类别</span></div><div><strong>5 + 3</strong><span>卷积层 + 全连接层</span></div></div>
        </section>

        <section id="try" className={styles.detailSection}>
          <div className={styles.detailSectionHead}><span>03 / 动手试</span><div><h2>移动观察窗口，理解一次卷积计算</h2><p>这里把图片简化成数字方格。点击结果中的格子，看左侧哪 9 个数字参与计算；再切换上方的计算规则，对比结果。</p></div></div>
          <ConvolutionLab />
        </section>

        <section id="impact" className={styles.detailSection}>
          <div className={styles.detailSectionHead}><span>04 / 影响与边界</span><div><h2>真正改变了什么？</h2><p>突破来自网络结构、训练方法、大规模数据和 GPU 计算能力的共同作用。</p></div></div>
          <div className={styles.impactGrid}>
            <div><span>01</span><h3>训练得动</h3><p>ReLU 让深层网络训练更快；论文还用两块 GPU 分担计算。</p></div>
            <div><span>02</span><h3>减少死记硬背</h3><p>训练时让图片产生一些变化，也会随机暂时停用部分单元，帮助网络学规律，而不是只记住练习过的图片。</p></div>
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
