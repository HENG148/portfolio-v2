"use client"

import { useEffect, useState } from "react";

interface TerminalLine {
  prefix: string;
  text: string;
  delay: number;
  dimmed?: boolean;
}

interface TerminalLineRowProps {
  line: TerminalLine;
  visibleCharCount: number;
  showCursor: boolean;
  isLastLine: boolean;
  isFullyTyped: boolean;
}

const TERMINAL_LINES: TerminalLine[] = [
  { prefix: "$", text: "npm run dev", delay: 0 },
  { prefix: ">", text: "next dev - ready on http://localhost:3000", delay: 1200, dimmed: true },
  { prefix: "$", text: "git commit -m 'build: ship portfolio'", delay: 3800 },
  { prefix: ">", text: "[main abc123] 1 file changed, 200 insertions(+)", delay: 6300, dimmed: true },
  { prefix: " $", text: "curl -I http://rongsokheng.com", delay: 9000 },
  { prefix: ">", text: "HTTP/2 200", delay: 11000},
];

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
  visibleCharCount,
  showCursor,
  isLastLine,
  isFullyTyped
}: TerminalLineRowProps) {
  return (
    <div className={`flex items-center gap-2 font-mono text-sm leading-8 ${line.dimmed ? "opacity-50" : ""}`}>
      <span className="text-neutral-500 select-none">{line.prefix}</span>
      <span className="text-neutral-200">{line.text.slice(0, visibleCharCount)}</span>

      {isLastLine && isFullyTyped && (
        <span className={`inline-block w-2 h-4 bg-neutral-200 align-middle transition-opacity duration-100 ${showCursor ? "opacity-100" : "opacity-0"}`} />
      )}
    </div>
  )
}

export default function WindowTerminal() {
  const [cycleKey, setCycleKey] = useState(0);
  const [visibleLine, setVisibleLine] = useState<Set<number>>(new Set());
  const [typeCharCount, setTypeCharCount] = useState<Record<number, number>>({});
  const [showCursor, setShowCursor] = useState<boolean>(true);

  useEffect(() => {
    setVisibleLine(new Set())
    setTypeCharCount({})
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    TERMINAL_LINES.forEach((line, i) => {
      const timeout = setTimeout(() => {
        setVisibleLine((prev) => new Set([...prev, i]))

        let charCount = 0;
        const interval = setInterval(() => {
          charCount += 1;
          setTypeCharCount((prev) => ({ ...prev, [i]: charCount }));
          if (charCount >= line.text.length) clearInterval(interval);
        }, TYPING_SPEED_MS);
        timeouts.push(timeout);
      }, line.delay);
      timeouts.push(timeout);
    })

    const loopTimeout = setTimeout(() => {
      setCycleKey((prev) => prev + 1);
    }, LOOP_RESTART_MS);
    timeouts.push(loopTimeout);
    return () => timeouts.forEach(clearTimeout);
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