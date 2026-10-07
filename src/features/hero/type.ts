export interface TerminalLine{
  prefix: string;
  text: string;
  delay: number;
  dimmed?: boolean;
}

export interface TerminalLineRowProps {
  line: TerminalLine;
  visible: boolean;
  visibleCharCount: number;
  showCursor: boolean;
  isLastLine: boolean;
  isFullyTyped: boolean;
}

export const TERMINAL_LINES: TerminalLine[] = [
  { prefix: "$", text: "npm run dev", delay: 0 },
  { prefix: ">", text: "next dev - ready on http://localhost:3000", delay: 1200, dimmed: true },
  { prefix: "$", text: "git commit -m 'build: ship portfolio'", delay: 3800 },
  { prefix: ">", text: "[main abc123] 1 file changed, 200 insertions(+)", delay: 6300, dimmed: true },
  { prefix: " $", text: "curl -I http://rongsokheng.com", delay: 9000 },
  { prefix: ">", text: "HTTP/2 200", delay: 11000 },
]