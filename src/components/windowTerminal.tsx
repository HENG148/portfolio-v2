"use client"

import { useEffect, useState } from "react";
import { TERMINAL_LINES, TerminalLineRowProps } from "../features/hero/type";

const TYPING_SPEED_MS = 45;
const CURSOR_BLINK_MS = 530;

const LAST_LINE = TERMINAL_LINES[TERMINAL_LINES.length - 1];
const LOOP_RESTART_MS = LAST_LINE.delay + LAST_LINE.text.length * TYPING_SPEED_MS + 2000;

function TrafficLights() {
  return (
    <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
      <span className="w-3 h-3 rounded-full bg-white/20" />
      <span className="w-3 h-3 rounded-full bg-white/20" />
      <span className="w-3 h-3 rounded-full bg-white/20" />
    </div>
  )
}

function TerminalLineRow({
  line,
  visible,
  visibleCharCount,
  showCursor,
  isLastLine,
  isFullyTyped,
}: TerminalLineRowProps) {
  return (
    <div
      className={`flex items-start gap-2 font-mono text-sm leading-8 ${
        line.dimmed ? "opacity-50" : ""
      } ${visible ? "" : "invisible"}`}
    >
      <span className="text-neutral-500 select-none">{line.prefix}</span>

      <span className="relative min-w-0 flex-1 break-all">
        {/* invisible copy of the full line: reserves the final (wrapped) height */}
        <span className="invisible" aria-hidden>{line.text}</span>

        {/* typed text overlays the reserved space */}
        <span className="absolute inset-0 text-neutral-200">
          {line.text.slice(0, visibleCharCount)}
          {isLastLine && isFullyTyped && (
            <span
              className={`ml-0.5 inline-block h-4 w-2 bg-neutral-200 align-middle transition-opacity duration-100 ${
                showCursor ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </span>
      </span>
    </div>
  )
}


export default function WindowTerminal() {
  const [cycleKey, setCycleKey] = useState(0);
  const [visibleLine, setVisibleLine] = useState<Set<number>>(new Set());
  const [typeCharCount, setTypeCharCount] = useState<Record<number, number>>({});
  const [showCursor, setShowCursor] = useState<boolean>(true);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const intervals: ReturnType<typeof setInterval>[] = [];

    TERMINAL_LINES.forEach((line, i) => {
      const timeout = setTimeout(() => {
        setVisibleLine((prev) => new Set([...prev, i]));

        let charCount = 0;
        const interval = setInterval(() => {
          charCount += 1;
          setTypeCharCount((prev) => ({ ...prev, [i]: charCount }));
          if (charCount >= line.text.length) clearInterval(interval);
        }, TYPING_SPEED_MS);
        intervals.push(interval);
      }, line.delay);
      timeouts.push(timeout);
    });

    const loopTimeout = setTimeout(() => {
      setVisibleLine(new Set());
      setTypeCharCount({});
      setCycleKey((prev) => prev + 1);
    }, LOOP_RESTART_MS);
    timeouts.push(loopTimeout);

    return () => {
      timeouts.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
  }, [cycleKey]);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor((prev) => !prev), CURSOR_BLINK_MS);
    return () => clearInterval(interval);
  }, []);

  const lastVisibleIndex = visibleLine.size > 0 ? Math.max(...Array.from(visibleLine)) : -1;

  return (
    <div className="w-full max-w-full rounded-xl border border-white/10 bg-[#161616] shadow-2xl overflow-hidden">
      <TrafficLights />

      <div className="px-5 py-5 min-h-30 w-full space-y-0.5">
        {TERMINAL_LINES.map((line, idx) => {
          if (!visibleLine.has(idx)) return null;

          const charCount = typeCharCount[idx] ?? 0;
          const isLastLine = idx === lastVisibleIndex;
          const isFullyTyped = charCount >= line.text.length;

          return (
            <TerminalLineRow
              key={idx}
              line={line}
              visible={visibleLine.has(idx)}
              visibleCharCount={charCount}
              showCursor={showCursor}
              isLastLine={isLastLine}
              isFullyTyped={isFullyTyped}
            />
          )
        })}
      </div>
    </div>
  )
}