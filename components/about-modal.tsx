"use client";

import { IconBrandGithub, IconInfoCircle } from "@tabler/icons-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { XIcon } from "lucide-react";

export const AboutModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant={"secondary"}
        size={"icon-sm"}
        onClick={() => setIsOpen(true)}
      >
        <IconInfoCircle />
      </Button>
      {isOpen && (
        <div
          className="min-h-screen fixed left-0 z-20 backdrop-blur-sm inset-0 w-full flex items-center justify-center animate-in fade-in duration-300"
          onClick={() => setIsOpen(false)}
        >
          <div
            data-state={isOpen ? "open" : "closed"}
            className="

              transition-transform  ease-out
              animate-in bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50  w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] grid gap-3 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg
            "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-4">
              <h5 className="flex items-center justify-between text-sm font-semibold border-b pb-2">
                <span>About Scaffold</span>
                <XIcon
                  className="cursor-pointer size-4 hover:text-red-500 transition-colors"
                  onClick={() => setIsOpen(false)}
                />
              </h5>

              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  <strong>Scaffold</strong> is a simple tool for quickly sharing
                  code samples and project templates with proper context.
                </p>
                <p>
                  Create a file tree, add your code snippets, and share a link.
                  Perfect for code reviews, bug reports, or sharing
                  boilerplates.
                </p>

                <p>
                  Built for developers who need to share{" "}
                  <strong>code context</strong> quickly·
                </p>

                <div className="flex items-baseline justify-between">
                  <div className="pt-4 text-xs text-gray-500">
                    !Made with 🤬 by{" "}
                    <a
                      href="https://alhameen.xyz"
                      className="font-bold underline hover:underline"
                    >
                      Alhameen
                    </a>
                  </div>
                  <a className="w-8" href="https://github.com/hayzedd2/scaffold" target="_blank">
                    {" "}
                    <IconBrandGithub className="text-muted-foreground cursor-pointer size-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
