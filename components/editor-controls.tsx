"use client";
import { useCodeContextStore } from "@/lib/store/useCodeContextStore";
import { BrushCleaningIcon, CheckIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useState } from "react";
import { toast } from "sonner";
import { IconCopy, IconDownload } from "@tabler/icons-react";

export const EditorControls = ({ code }: { code: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  const { updateFileContent, selectedFileId } = useCodeContextStore();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    toast.success("Code copied to clipboard!");
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="controls flex items-center gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
         <div>
           <BrushCleaningIcon
             className="size-4 text-fg1 cursor-pointer shake-icon"
             onClick={() => {
               if (selectedFileId) updateFileContent(selectedFileId, "");
               toast.success("File cleared!");
             }}
           />
         </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Clear file</p>
        </TooltipContent>
      </Tooltip>

      {isCopied ? (
        <CheckIcon className="w-4 h-4 text-fg1 " />
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>
            <IconCopy
              className="size-4 text-fg1 cursor-pointer"
              onClick={handleCopy}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Copy code</p>
          </TooltipContent>
        </Tooltip>
       
      )}
      <Tooltip>
        <TooltipTrigger asChild>
          <IconDownload
            className="size-4 text-fg1 cursor-pointer"
            onClick={() => {
              // if (selectedFileId) updateFileContent(selectedFileId, "");
              // toast.success("File cleared!");
            }}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>Download file</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
