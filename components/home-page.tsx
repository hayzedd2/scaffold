import { IconBrandGithub } from "@tabler/icons-react";
import { NewScaffold } from "./new-scaffold";

export const HomePage = () => {
  return (
    <section className="min-h-[100dvh]  px-4">
      <div className="max-w-[600px] pt-40 md:pt-50 mx-auto">
        <h1 className="mb-10 text-4xl md:text-5xl">Scaffold</h1>
        <div className="space-y-3  text-sm text-muted-foreground">
          <p>
            <strong>Scaffold</strong> is a simple tool for quickly sharing code
            samples and project templates with proper context.
          </p>
          <p>
            Create a file tree, add your code snippets, and share a link.
            Perfect for code reviews, bug reports, or sharing boilerplates.
          </p>

          <p>
            Built for developers who need to share <strong>code context</strong>{" "}
            quickly·
          </p>
          <NewScaffold />
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
            <a href="https://github.com/hayzedd2/scaffold" target="_blank">
              {" "}
              <IconBrandGithub className="text-muted-foreground cursor-pointer size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
