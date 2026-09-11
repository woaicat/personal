"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const frames = [
  {
    src: "/personal-space/scene-01.png",
    alt: "夜晚卧室场景，女孩和猫在床上休息"
  },
  {
    src: "/personal-space/scene-02.png",
    alt: "夜晚卧室场景，窗外星光变得更明亮"
  },
  {
    src: "/personal-space/scene-03.png",
    alt: "夜晚卧室场景，墙上的藤蔓和星光出现轻微变化"
  },
  {
    src: "/personal-space/scene-04.png",
    alt: "夜晚卧室场景，藤蔓回到循环中的下一帧"
  }
] as const;

const speedOptions = [
  { label: "慢", value: 0.7 },
  { label: "标准", value: 1 },
  { label: "快", value: 1.35 }
] as const;

const BASE_FRAME_DURATION = 760;

export default function PersonalSpace() {
  const [activeFrame, setActiveFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState<(typeof speedOptions)[number]["value"]>(1);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [motionPreferenceReady, setMotionPreferenceReady] = useState(false);
  const [motionOverride, setMotionOverride] = useState(false);
  const isAnimationPlaying =
    motionPreferenceReady && isPlaying && (!prefersReducedMotion || motionOverride);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    setMotionPreferenceReady(true);
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (!isAnimationPlaying) {
      return;
    }

    const timerId = window.setInterval(() => {
      setActiveFrame((current) => (current + 1) % frames.length);
    }, BASE_FRAME_DURATION / speed);

    return () => window.clearInterval(timerId);
  }, [isAnimationPlaying, speed]);

  const activeFrameLabel = useMemo(() => String(activeFrame + 1).padStart(2, "0"), [activeFrame]);

  return (
    <main className="personal-space-page">
      <div className="personal-space-glow personal-space-glow-one" />
      <div className="personal-space-glow personal-space-glow-two" />

      <div className="personal-space-shell">
        <header className="personal-space-header">
          <Link className="personal-space-brand" href="/" aria-label="返回 JiaXuan GAO 个人作品集首页">
            JiaXuan GAO
          </Link>
          <span className="personal-space-header-note">PERSONAL SPACE / 01</span>
        </header>

        <section className="personal-space-hero" aria-labelledby="personal-space-title">
          <div className="personal-space-intro">
            <p className="personal-space-eyebrow">A SMALL LOOP FOR A QUIET NIGHT</p>
            <h1 id="personal-space-title">给自己留一间安静的房间。</h1>
            <p className="personal-space-description">
              这里先用四张画面组成一个很轻的循环。没有复杂的拆层，也不追求一直变化，只让窗外的星光、墙上的藤蔓和房间里的呼吸感慢慢动起来。
            </p>
            <div className="personal-space-status" aria-live="polite">
              <span className={`personal-space-status-dot${isPlaying ? " is-playing" : ""}`} aria-hidden="true" />
              {prefersReducedMotion && !motionOverride
                ? "已按系统设置暂停动效"
                : isAnimationPlaying
                  ? "四帧循环播放中"
                  : "已暂停在当前画面"}
            </div>
          </div>

          <div className="personal-space-stage-wrap">
            <div className="personal-space-stage" aria-label={`个人空间动态场景，第 ${activeFrameLabel} 帧，共 ${frames.length} 帧`}>
              {frames.map((frame, index) => {
                const isActive = index === activeFrame;

                return (
                  <Image
                    key={frame.src}
                    className="personal-space-frame"
                    src={frame.src}
                    alt={isActive ? frame.alt : ""}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 900px) 92vw, 620px"
                    style={{ opacity: isActive ? 1 : 0 }}
                    aria-hidden={!isActive}
                  />
                );
              })}
              <div className="personal-space-frame-count" aria-hidden="true">
                FRAME {activeFrameLabel} / {String(frames.length).padStart(2, "0")}
              </div>
            </div>

            <div className="personal-space-controls" aria-label="动态场景控制">
              <button
                className="personal-space-play"
                type="button"
                onClick={() => {
                  if (isAnimationPlaying) {
                    setIsPlaying(false);
                    return;
                  }

                  setMotionOverride(true);
                  setIsPlaying(true);
                }}
                aria-label={isAnimationPlaying ? "暂停动画" : "播放动画"}
              >
                <span aria-hidden="true">{isAnimationPlaying ? "Ⅱ" : "▶"}</span>
                {isAnimationPlaying ? "暂停" : "播放"}
              </button>

              <div className="personal-space-speed" role="group" aria-label="播放速度">
                {speedOptions.map((option) => (
                  <button
                    key={option.label}
                    className={speed === option.value ? "is-active" : ""}
                    type="button"
                    onClick={() => setSpeed(option.value)}
                    aria-pressed={speed === option.value}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <div className="personal-space-dots" aria-label="选择画面">
                {frames.map((frame, index) => (
                  <button
                    key={frame.src}
                    className={index === activeFrame ? "is-active" : ""}
                    type="button"
                    onClick={() => setActiveFrame(index)}
                    aria-label={`显示第 ${index + 1} 帧`}
                    aria-pressed={index === activeFrame}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="personal-space-footer">
          <span>FOUR FRAMES / ONE SMALL MOMENT</span>
          <span>made for the space between work and rest</span>
        </footer>
      </div>
    </main>
  );
}
