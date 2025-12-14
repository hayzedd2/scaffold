"use client";
import { useCodeContextStore } from "@/lib/store/useCodeContextStore";
import { BrushCleaningIcon, CheckIcon } from "lucide-react";

import { useState } from "react";
import { toast } from "sonner";
import { IconCopy, IconDownload } from "@tabler/icons-react";
import { downloadFile } from "@/lib/utils";

export const EditorControls = ({ code }: { code: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  const { updateFileContent, selectedFileId, getSelectedFile } =
    useCodeContextStore();
  const selectedFile = getSelectedFile();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    toast.success("Code copied to clipboard!");
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="controls flex items-center gap-2">
      <BrushCleaningIcon
        className="size-4 text-fg1 cursor-pointer shake-icon"
        onClick={() => {
          if (selectedFileId) updateFileContent(selectedFileId, "");
          toast.success("File cleared!");
        }}
      />

      {isCopied ? (
        <CheckIcon className="w-4 h-4 text-fg1 " />
      ) : (
        <IconCopy
          className="size-4 text-fg1 cursor-pointer"
          onClick={handleCopy}
        />
      )}

      <IconDownload
        className="size-4 text-fg1 cursor-pointer"
        onClick={() => {
          if (selectedFile) {
            downloadFile(selectedFile.content, selectedFile.name);
          }
        }}
      />
    </div>
  );
};
