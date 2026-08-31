"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, Sparkles, X, type LucideIcon } from "lucide-react";
import styles from "./agent-course.module.css";

export type LessonChoiceFeedback = {
  icon?: "alert" | "check" | "sparkles" | "x";
  tone?: string;
  label: string;
  text: string;
};

const feedbackIcons: Record<NonNullable<LessonChoiceFeedback["icon"]>, LucideIcon> = {
  alert: AlertTriangle,
  check: CheckCircle2,
  sparkles: Sparkles,
  x: X
};

type LessonChoiceQuestionProps = {
  ariaLabel: string;
  options: string[];
  correctIndex: number;
  feedback: LessonChoiceFeedback[];
  compact?: boolean;
};

export default function LessonChoiceQuestion({
  ariaLabel,
  options,
  correctIndex,
  feedback,
  compact = false
}: LessonChoiceQuestionProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const hasAnswered = selectedIndex !== null;

  return (
    <div className={compact ? styles.lessonExerciseInteraction : undefined}>
      <div className={styles.lessonChoiceList} role="group" aria-label={ariaLabel}>
        {options.map((option, index) => {
          const isCorrect = index === correctIndex;
          const isSelected = index === selectedIndex;
          const stateClass = hasAnswered
            ? isCorrect
              ? styles.lessonChoiceCorrect
              : isSelected
                ? styles.lessonChoiceIncorrect
                : styles.lessonChoiceNeutral
            : "";

          return (
            <button
              className={`${styles.lessonChoiceOption} ${stateClass}`}
              type="button"
              aria-pressed={isSelected}
              key={option}
              onClick={() => setSelectedIndex(index)}
            >
              <strong>{String.fromCharCode(65 + index)}.</strong>
              <span>{option}</span>
              {hasAnswered && isCorrect ? <CheckCircle2 aria-label="正确选项" size={17} strokeWidth={2} /> : null}
              {hasAnswered && isSelected && !isCorrect ? <X aria-label="错误选项" size={17} strokeWidth={2} /> : null}
            </button>
          );
        })}
      </div>

      {hasAnswered ? (
        <div className={`${styles.lessonChoiceFeedback} ${compact ? styles.lessonExerciseFeedback : ""}`}>
          <p
            className={selectedIndex === correctIndex ? styles.lessonChoiceResultCorrect : styles.lessonChoiceResultIncorrect}
            role="status"
          >
            {selectedIndex === correctIndex
              ? "回答正确"
              : `回答错误，正确选项是 ${String.fromCharCode(65 + correctIndex)}`}
          </p>
          {feedback.map(({ icon, tone, label, text }) => {
            const Icon = icon ? feedbackIcons[icon] : undefined;

            return (
              <p className={tone ? styles[tone] : undefined} key={label}>
              {Icon ? <Icon aria-hidden="true" size={16} strokeWidth={1.9} /> : null}
              <strong>{label}：</strong>{text}
              </p>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
