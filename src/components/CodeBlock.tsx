"use client";

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export default function CodeBlock({ code, language = "python", title }: CodeBlockProps) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      {title && (
        <div style={{
          background: 'rgba(0, 212, 255, 0.1)',
          padding: '0.5rem 1rem',
          borderRadius: '12px 12px 0 0',
          borderBottom: '1px solid var(--border)',
          fontSize: '0.9rem',
          color: 'var(--highlight)',
          fontWeight: 600
        }}>
          📄 {title}
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          borderRadius: title ? '0 0 12px 12px' : '12px',
          fontSize: '0.9rem',
          lineHeight: 1.6
        }}
        showLineNumbers
        wrapLines
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
