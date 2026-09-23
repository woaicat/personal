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
            <div className={styles.comparison}><div><strong>15.3%</strong><span>作者团队参赛系统 top-5 错误率</span></div><div><strong>26.2%</strong><span>当年第二名 top-5 错误率</span></div></div>
            <small>正确答案没进模型最有把握的 5 个类别，就算一次错误；数字越低越好。<br />ILSVRC 2012 测试集 · 参赛成绩来自多个网络的预测组合</small>
          </div>
        </div>

        <section className={styles.plainExplanation} aria-labelledby="plain-explanation-title">
          <h2 id="plain-explanation-title">小学生也能看懂的解释</h2>
          <p>你可以把一张图片想成由很多小格子拼起来的画。电脑看到图片时，并不知道里面是猫、狗还是汽车，它一开始只能看到这些小格子的颜色。</p>
          <p>AlexNet 会拿一个小方框，在图片上从左到右、从上到下慢慢移动。每到一个地方，它就看看这里有没有一些特别的样子，比如一条边、一块颜色，或者一个拐角。这个“小方框到处找特征”的过程，就叫卷积。</p>
          <p>第一层找到的东西通常很简单，比如横线、竖线和颜色变化。到了后面的层，网络会把前面找到的小线索组合起来：几条线可能组成一个圆，一些圆和边可能组成一只眼睛，再往后，眼睛、耳朵和毛发这些线索组合起来，网络就越来越容易认出“这可能是一只猫”。</p>
          <p>图片里的信息很多，没必要把每个细节都一直记着。所以中间还会做几次“精简”：保留比较重要的线索，把重复和不重要的信息丢掉。最后，AlexNet 把找到的所有线索放在一起，分别判断它有多像猫、多像狗、多像汽车……一共要在 1000 个类别里做选择，得分最高的就是它认为的答案。</p>
          <p>当然，它一开始也不会认。训练时，人们会给它看大量已经写好答案的图片。它猜错了，就根据正确答案调整自己；再看下一张，再猜，再调整。看得足够多以后，它就慢慢学会了：看到什么样的线索，通常代表什么东西。</p>
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
          <div className={styles.detailSectionHead}><span>04 / 影响</span><div><h2>真正改变了什么？</h2><p>AlexNet 的意义不只是把 ImageNet 的错误率降了下来。更重要的是，它证明了一条新的技术路线确实可行，并改变了此后计算机视觉研究和工程实践的方向。</p></div></div>
          <div className={styles.impactGrid}>
            <div><span>01</span><h3>从“人工设计特征”转向“让网络自己学习特征”</h3><p>在 AlexNet 之前，图像识别通常需要工程师先设计规则，告诉计算机应该关注边缘、纹理、形状等特征，再把这些特征交给分类器判断。AlexNet 展示了另一条路线：直接把图片交给深层神经网络，让网络在训练过程中自己学会应该关注什么。前面的层学习简单的边缘和颜色，后面的层逐渐组合出眼睛、轮廓甚至完整物体。从此，图像识别的核心开始从“人怎么设计特征”转向“网络怎么学习特征”。</p></div>
            <div><span>02</span><h3>大数据 + GPU + 深度网络成为一套可行的方法</h3><p>深层神经网络并不是 AlexNet 才出现，但过去一直很难在大规模图像任务上真正跑起来。AlexNet 把大规模标注数据、GPU 计算和深层卷积网络结合起来，同时使用 ReLU、数据增强、dropout 等方法解决训练速度和过拟合问题。它证明了一件很重要的事：只要有足够的数据、计算能力和合适的训练方法，更大的神经网络可以获得明显更好的效果。这种“数据 + 算力 + 模型”的思路，后来也成为深度学习发展的重要路线。</p></div>
            <div><span>03</span><h3>计算机视觉进入深度学习时代</h3><p>AlexNet 在 ImageNet 上取得的结果，让整个计算机视觉领域开始快速转向深度神经网络。随后几年，VGG、GoogLeNet、ResNet 等模型不断出现，图像分类、目标检测、人脸识别、图像分割等任务也陆续采用深度学习方法。它影响的不只是一个比赛。从研究论文到真实产品，深度神经网络逐渐成为计算机视觉的主流技术基础。</p></div>
          </div>
          <div className={styles.sourcePanel}><div><p className={styles.sectionEyebrow}>继续阅读</p><h3>回到论文，看作者如何描述实验</h3><p>ImageNet Classification with Deep Convolutional Neural Networks · NeurIPS 2012</p></div><a href={alexnet.sourceUrl} target="_blank" rel="noopener noreferrer">论文原文 <ExternalLink size={16} aria-hidden="true" /></a></div>
        </section>
        <div className={styles.detailEnd}><Link href="/ai-papers"><ArrowLeft size={17} aria-hidden="true" /> 返回全部论文</Link><span>下一篇图解正在制作中</span></div>
      </main>
      <footer className={styles.siteFooter}><span>© {new Date().getFullYear()} jiaxuan · 人工智能论文图解</span><Link href="/ai-papers">论文目录 <ArrowRight size={15} aria-hidden="true" /></Link></footer>
    </div>
  );
}
