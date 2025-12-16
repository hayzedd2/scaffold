"use client";

import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useState } from "react";

export const CopyLink = ({ link }: { link: string }) => {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <>
      {copied ? (
        <IconCheck className="size-4 shrink-0 " />
      ) : (
        <IconCopy
          className="size-4 cursor-pointer shrink-0"
          onClick={copyToClipboard}
        />
      )}
    </>
  );
};
