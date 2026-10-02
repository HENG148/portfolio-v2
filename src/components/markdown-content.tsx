import ReactMarkdown from "react-markdown";

export default function MarkdownContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => (
          <p className="mb-4 leading-relaxed text-muted-foreground last:mb-0">{children}</p>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-foreground">{children}</strong>
        ),
        em: ({ children }) => <em className="italic">{children}</em>,
        h1: ({ children }) => (
          <h2 className="mb-3 mt-8 text-2xl font-bold text-foreground">{children}</h2>
        ),
        h2: ({ children }) => (
          <h2 className="mb-3 mt-8 text-xl font-bold text-foreground">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="mb-2 mt-6 text-lg font-semibold text-foreground">{children}</h3>
        ),
        ul: ({ children }) => (
          <ul className="mb-4 list-disc space-y-1.5 pl-5 text-muted-foreground">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-4 list-decimal space-y-1.5 pl-5 text-muted-foreground">{children}</ol>
        ),
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-4 hover:opacity-80"
          >
            {children}
          </a>
        ),
        code: ({ children }) => (
          <code className="rounded bg-muted px-1.5 py-0.5 text-[13px] text-foreground">
            {children}
          </code>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}