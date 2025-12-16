"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { IconSelector } from "@tabler/icons-react";
import {
  BotIcon,
  FileCodeCornerIcon,
  FolderTreeIcon,
  LucideProps,
} from "lucide-react";
import { copyScaffold } from "@/lib/copy-scaffold";
import { useCodeContextStore } from "@/lib/store/useCodeContextStore";
import { supportedCopyMethods } from "@/type";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { toast } from "sonner";

interface IcopyMethodTypes {
  key: supportedCopyMethods;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  label: string;
  description: string;
}
export const CopyScaffoldButton = () => {
  const scaffold = useCodeContextStore((s) => s.scaffold);
  const copyMethodTypes: IcopyMethodTypes[] = [
    {
      key: "llm",
      icon: BotIcon,
      label: "Copy for LLM",
      description: "Optimized format for ChatGPT/Claude",
    },
    {
      key: "markdown",
      icon: FileCodeCornerIcon,
      label: "Copy as Markdown",
      description: "Documentation with code blocks",
    },
    {
      key: "fileTree",
      icon: FolderTreeIcon,
      label: "Copy as Tree",
      description: " Visual ASCII tree structure",
    },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} className="cursor-pointer">
          Copy Scaffold
          <IconSelector />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {copyMethodTypes.map((type, i) => {
          return (
            <React.Fragment key={type.key}>
              <DropdownMenuItem
                onClick={() => {
                  const { name, children } = scaffold;
                  copyScaffold[type.key]({
                    name,
                    children,
                  });
                  toast.success(`Copied to clipboard`);
                }}
                className="cursor-pointer items-start"
              >
                <type.icon />
                <div>
                  <h4>{type.label}</h4>
                  <p className="text-muted-foreground text-xs">
                    {type.description}
                  </p>
                </div>
              </DropdownMenuItem>
              {i !== copyMethodTypes.length - 1 && <DropdownMenuSeparator />}
            </React.Fragment>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
