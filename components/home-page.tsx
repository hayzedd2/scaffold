import { NewScaffold } from "./new-scaffold";

export const HomePage = () => {
 
  return (
    <section className="min-h-[100dvh] flex items-center justify-center flex-col px-4">
      <div>
        <h1 className="text-[1.5rem]">Scaffold</h1>
        <ul className="mb-4">
          <li className="flex items-center gap-1.5">
            <span className="bg-muted-foreground shrink-0 size-1.5"></span>
            <span className="text-muted-foreground text-sm">
              {" "}
              Fastest way to share minimal, contextual code examples.
            </span>
          </li>
          <li className="flex items-center gap-1.5">
            <span className="bg-muted-foreground shrink-0 size-1.5"></span>
            <span className="text-muted-foreground text-sm">
              Create a file tree, create the relevant files.
            </span>
          </li>
          <li className="flex items-center gap-1.5">
            <span className="bg-muted-foreground shrink-0 size-1.5"></span>
            <span className="text-muted-foreground text-sm">
              {" "}
              Get a shareable link.
            </span>
          </li>
         
        </ul>
        <NewScaffold/>
      </div>
    </section>
  );
};
