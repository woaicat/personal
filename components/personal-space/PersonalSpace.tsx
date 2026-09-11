"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const frames = [
  {
    src: "/personal-space/night-room-frame-01.png",
    alt: "夜晚卧室场景，女孩和猫在床上休息"
  },
  {
    src: "/personal-space/night-room-frame-02.png",
    alt: "夜晚卧室场景，窗外星光变得更明亮"
  },
  {
    src: "/personal-space/night-room-frame-03.png",
    alt: "夜晚卧室场景，墙上的藤蔓和星光出现轻微变化"
  },
  {
    src: "/personal-space/night-room-frame-04.png",
    alt: "夜晚卧室场景，藤蔓回到循环中的下一帧"
  }
] as const;

const scenes = [
  { id: "night", name: "夜深了", frames },
  { id: "work", name: "一起工作吧", frames },
  { id: "cat", name: "和小猫玩耍", frames }
] as const;

const FAST_FRAME_DURATION = 560;

export default function PersonalSpace() {
  const [activeFrame, setActiveFrame] = useState(0);
  const [activeSceneId, setActiveSceneId] = useState<(typeof scenes)[number]["id"]>("night");
  const activeScene = scenes.find((scene) => scene.id === activeSceneId) ?? scenes[0];

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setActiveFrame((current) => (current + 1) % activeScene.frames.length);
    }, FAST_FRAME_DURATION);

    return () => window.clearInterval(timerId);
  }, [activeScene.frames.length]);

  const handleSceneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveSceneId(event.target.value as (typeof scenes)[number]["id"]);
    setActiveFrame(0);
  };

  return (
    <main className="personal-space-page">
      <div className="personal-space-glow personal-space-glow-one" />
      <div className="personal-space-glow personal-space-glow-two" />

      <div className="personal-space-shell">
        <header className="personal-space-header">
          <Link className="personal-space-brand" href="/" aria-label="返回 JiaXuan GAO 个人作品集首页">
            个人空间
          </Link>

          <div className="personal-space-scene-switcher">
            <span className="personal-space-scene-label">场景</span>
            <select
              className="personal-space-scene-select"
              value={activeScene.id}
              onChange={handleSceneChange}
              aria-label="切换场景"
            >
              {scenes.map((scene) => (
                <option key={scene.id} value={scene.id}>
                  {scene.name}
                </option>
              ))}
            </select>
          </div>
        </header>

        <section className="personal-space-stage-area" aria-label={`${activeScene.name}动态场景`}>
          <div className="personal-space-stage">
            {activeScene.frames.map((frame, index) => {
              const isActive = index === activeFrame;

              return (
                <Image
                  key={frame.src}
                  className="personal-space-frame"
                  src={frame.src}
                  alt={isActive ? frame.alt : ""}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 820px) 88vw, 720px"
                  style={{ opacity: isActive ? 1 : 0 }}
                  aria-hidden={!isActive}
                />
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
