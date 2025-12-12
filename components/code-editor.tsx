"use client";

import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import { EditorControls } from "./editor-controls";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { useCodeContextStore } from "@/lib/store/useCodeContextStore";

import { IconFile } from "@tabler/icons-react";

export const CodeEditor = ({
  code,
  language = "typescript",
  fileName = "",
  className = "",
  showLineNumbers = false,
  highlightedLineNumbers,
}: {
  code: string;
  language?: string;
  fileName?: string;
  className?: string;
  showLineNumbers?: boolean;
  highlightedLineNumbers: number[];
}) => {
  const [html, setHtml] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { updateFileContent, selectedFileId } = useCodeContextStore();
  const extension =
    fileName.split(".")[fileName.split(".").length - 1] ?? "plaintext";

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
                if (highlightedLineNumbers.includes(line)) {
                  const classNames = node.properties.class
                    ? `${node.properties.class} highlighted-line`
                    : "highlighted-line";
                  node.properties.class = classNames;
                }
              },
            },
          ],
        });
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
  }, [code, language, showLineNumbers]);

  return (
    <div className="bg-sidebar rounded-lg p-1">
      <div className="code-header px-4 pt-3 pb-5 flex items-center justify-between">
        <span className="font-semibold text-xs text-fg1 flex items-center gap-1">
          <IconFile size={16} />
          {fileName}
        </span>
        <EditorControls code={code} />
      </div>
      {isLoading ? (
        <div className="  bg-sidebar text-sm text-fg1 py-4 flex items-center justify-center">
          <Loader2Icon className="animate-spin size-4" />
        </div>
      ) : (
        <div className="relative">
          <div
            dangerouslySetInnerHTML={{
              __html: html,
            }}
            onPaste={(e) => {
              toast.success("file updated");
              if (selectedFileId)
                updateFileContent(
                  selectedFileId,
                  e.clipboardData.getData("text/plain"),
                );
            }}
            className={`shiki-container ${className}`}
          />
          <style jsx>{`
            .shiki-container :global(.highlighted-line) {
              background-color:#0f2f57;
              display: inline-block;
              width: 100%;
              border-left: 3px solid #52a8ff;
            }

            .shiki-container :global(code) {
              counter-reset: line;
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
  );
};
