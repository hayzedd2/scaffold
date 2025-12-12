import { Button } from "./ui/button";

export const HomePage = () => {
  return (
    <section className="min-h-[100dvh] flex items-center justify-center flex-col px-4">
   <div>
     <h1 className="text-[1.5rem]">Scaffold</h1>
     <ul>
       <li className="flex items-center gap-1.5">
         <span className="bg-muted-foreground size-1.5"></span>
         <span className="text-muted-foreground text-sm"> Fastest way to share minimal, contextual code examples.</span>
       </li>
       <li className="flex items-center gap-1.5">
         <span className="bg-muted-foreground size-1.5"></span>
         <span className="text-muted-foreground text-sm">Create a file
         tree, create the relevant files.</span>
       </li>
       <li className="flex items-center gap-1.5">
         <span className="bg-muted-foreground size-1.5"></span>
         <span className="text-muted-foreground text-sm"> get a single shareable link.</span>
       </li>
       <li className="flex items-center gap-1.5">
         <span className="bg-muted-foreground size-1.5"></span>
         <span className="text-muted-foreground text-sm">Includes an LLM-ready export bonus.</span>
       </li>
     </ul>
     <div className="flex gap-2 mt-4">
       <Button variant={"outline"} className="cursor-pointer">
         New scaffold
       </Button>
       <Button className="cursor-pointer ">Import scaffold</Button>
     </div>
   </div>
    </section>
  );
};
