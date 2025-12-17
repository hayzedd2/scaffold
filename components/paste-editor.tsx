"use client";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { IconClipboardFilled } from "@tabler/icons-react";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { useCodeContextStore } from "@/lib/store/useCodeContextStore";
import { Button } from "./ui/button";
import { useEffect } from "react";
import { toast } from "sonner";

export const PasteEditor = () => {
  const { updateFileContent, selectedFileId } = useCodeContextStore();
  const handlePasteClick = async () => {
    try {
      if (!selectedFileId) return;
      const text = await navigator.clipboard.readText();
      updateFileContent(selectedFileId, text);
    } catch {
      toast.warning("Unable to access clipboard. Please check browser permissions.");
    }
  };
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "v") {
        handlePasteClick();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Empty className="flex-1 h-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconClipboardFilled />
        </EmptyMedia>
        <EmptyTitle>Paste code</EmptyTitle>
        <EmptyDescription>
        Paste your copied code with <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <span>+</span>
            <Kbd>V</Kbd> or use the paste button.
          </KbdGroup>
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={handlePasteClick}>
          Paste code
        </Button>
      </EmptyContent>
    </Empty>
  );
};
