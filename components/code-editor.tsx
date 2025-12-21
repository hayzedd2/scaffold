"use client";

import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import { EditorControls } from "./editor-controls";
import { Loader2Icon } from "lucide-react";
import { useCodeContextStore } from "@/lib/store/useCodeContextStore";
import { IconFile } from "@tabler/icons-react";
import { PasteEditor } from "./paste-editor";

export const CodeEditor = ({
  code,
  language = "typescript",
  fileName = "",
  className = "",
  showLineNumbers = false,
  highlightedLines,
}: {
  code: string;
  language?: string;
  fileName?: string;
  className?: string;
  showLineNumbers?: boolean;
  highlightedLines: number[];
}) => {
  const [html, setHtml] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { updateFileMeta, selectedFileId, getSelectedFile } =
    useCodeContextStore();

  const extension =
    fileName.split(".")[fileName.split(".").length - 1] ?? "plaintext";

  const handleClick = (e: React.MouseEvent) => {
    if (!selectedFileId) return;
    const target = e.target as HTMLElement;
    const lineElement = target.closest(".line[data-line]") as HTMLElement;

    if (lineElement) {
      const lineNumber = parseInt(
        lineElement.getAttribute("data-line") || "0",
        10,
      );
    

      // Toggle line in highlightedLines array
      const newHighlightedLines = highlightedLines.includes(lineNumber)
        ? highlightedLines.filter((n) => n !== lineNumber)
        : [...highlightedLines, lineNumber].sort((a, b) => a - b);
      console.log("newHighlightedLines", newHighlightedLines);

      updateFileMeta(selectedFileId, { highlightedLines: newHighlightedLines });
      console.log(getSelectedFile());
    }
  };

  useEffect(() => {
    const highlight = async () => {
      setIsLoading(true);
      try {
        const highlightedHtml = await codeToHtml(code, {
          lang: extension,
          theme: "github-dark-default",
          transformers: [
            {
              line(node, line) {
                if (showLineNumbers) {
                  node.properties["data-line"] = line;
                }
                // Add highlight class for specified lines
                if (highlightedLines.includes(line)) {
                  const classNames = node.properties.class
                    ? `${node.properties.class} highlighted-line`
                    : "highlighted-line";
                  node.properties.class = classNames;
                }
              },
            },
          ],
        });
        console.log(highlightedHtml)
        setHtml(highlightedHtml);
      } catch (error) {
        console.error("Syntax highlighting error:", error);
        // Fallback to plain text
        setHtml(`<pre><code>${code}</code></pre>`);
      } finally {
        setIsLoading(false);
      }
    };

    highlight();
  }, [code, language, showLineNumbers, highlightedLines, extension]);

  return (
    <>
      {code.trim().length == 0 ? (
        <PasteEditor />
      ) : (
        <div className="bg-sidebar rounded-lg p-1">
          <div className="code-header px-4 pt-3 pb-5 flex items-center justify-between">
            <span className="font-semibold text-xs text-fg1 flex items-center gap-1">
              <IconFile size={16} />
              {fileName}
            </span>
            <EditorControls code={code} />
          </div>
          {isLoading ? (
            <div className="bg-sidebar text-sm text-fg1 py-4 flex items-center justify-center">
              <Loader2Icon className="animate-spin size-4" />
            </div>
          ) : (
            <div className="relative max-w-full"> 
              <div
                onClick={handleClick}
                dangerouslySetInnerHTML={{
                  __html: html,
                }}
                className={`shiki-container ${className}`}
              />
              <style jsx>{`
                .shiki-container :global(pre) {
                  margin: 0;
                }
                
                .shiki-container :global(.line) {
                  border-left: 3px solid transparent;
                  display: inline-block;
                }
                
                .shiki-container :global(.highlighted-line) {
                  background-color: #0f2f57;
                  display: inline-block;
                  min-width: 100%;
                  border-left: 3px solid #52a8ff;
                }
                
                .shiki-container :global(code) {
                  counter-reset: line;
                  cursor: default;
                }
                
                .shiki-container :global(code .line[data-line]::before) {
                  counter-increment: line;
                  content: counter(line);
                  display: inline-block;
                  width: 2rem;
                  margin-right: 1rem;
                  text-align: right;
                  color: #999;
                  user-select: none;
                }
              `}</style>
            </div>
          )}
        </div>
      )}
    </>
  );
};
