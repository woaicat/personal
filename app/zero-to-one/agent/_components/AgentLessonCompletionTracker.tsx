"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { markLessonCompleted } from "../_content/progress";

interface AgentLessonCompletionTrackerProps {
  lessonId: string;
  children: ReactNode;
}

export default function AgentLessonCompletionTracker({ lessonId, children }: AgentLessonCompletionTrackerProps) {
  useEffect(() => {
    markLessonCompleted(lessonId);
  }, [lessonId]);

  return <>{children}</>;
}
