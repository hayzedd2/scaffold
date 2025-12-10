"use client";

import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import { EditorControls } from "./ui/editor-controls";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { useCodeContextStore } from "@/lib/store/useCodeContextStore";

export const CodeEditor = ({
  code,
  language = "typescript",
  fileName = "",
  className = "",
  showLineNumbers = false,
}: {
  code: string;
  language?: string;
  fileName?: string;
  className?: string;
  showLineNumbers?: boolean;
}) => {
  const [html, setHtml] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { updateFileContent, selectedFileId } = useCodeContextStore();

  useEffect(() => {
    const highlight = async () => {
      setIsLoading(true);
      try {
        const highlightedHtml = await codeToHtml(code, {
          lang: fileName.split(".").pop() ?? "plaintext",
          theme: "github-light-default",
          transformers: showLineNumbers
            ? [
                {
                  line(node, line) {
                    node.properties["data-line"] = line;
                  },
                },
              ]
            : [],
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
    <div className="bg-code-header-bg rounded-lg p-1">
      <div className="code-header px-3 h-9 flex items-center justify-between">
        <span className="font-semibold text-xs text-fg1">{fileName}</span>
        <EditorControls code={code} />
      </div>
      {isLoading ? (
        <div className="  bg-white text-sm text-fg1 py-4 flex items-center justify-center">
          <Loader2Icon className="animate-spin size-4" />
        </div>
      ) : (
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
      )}
    </div>
  );
};
