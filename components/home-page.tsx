"use client";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { scaffoldService } from "@/lib/service/scaffold-service";
import { useCodeContextStore } from "@/lib/store/useCodeContextStore";
import { retrieveIdFromUrl } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const HomePage = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [isRetrieving, setIsRetrieving] = useState(false);
  const setProject = useCodeContextStore((s) => s.setProject);
  const router = useRouter();
  return (
    <section className="min-h-[100dvh] flex items-center justify-center flex-col px-4">
      <div>
        <h1 className="text-[1.5rem]">Scaffold</h1>
        <ul>
          <li className="flex items-center gap-1.5">
            <span className="bg-muted-foreground size-1.5"></span>
            <span className="text-muted-foreground text-sm">
              {" "}
              Fastest way to share minimal, contextual code examples.
            </span>
          </li>
          <li className="flex items-center gap-1.5">
            <span className="bg-muted-foreground size-1.5"></span>
            <span className="text-muted-foreground text-sm">
              Create a file tree, create the relevant files.
            </span>
          </li>
          <li className="flex items-center gap-1.5">
            <span className="bg-muted-foreground size-1.5"></span>
            <span className="text-muted-foreground text-sm">
              {" "}
              Get a shareable link.
            </span>
          </li>
          <li className="flex items-center gap-1.5">
            <span className="bg-muted-foreground size-1.5"></span>
            <span className="text-muted-foreground text-sm">
              Includes an LLM-ready export bonus.
            </span>
          </li>
        </ul>
        <div className="flex gap-2 mt-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"outline"} className="cursor-pointer">
                New scaffold
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>New Scaffold</DialogTitle>
                <DialogDescription>
                  Give your scaffold a name.
                </DialogDescription>
              </DialogHeader>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
              <DialogFooter>
                <Button
                  onClick={() => {
                    if (name.trim().length == 0) {
                      toast.error("Name cannot be empty");
                      return;
                    }
                    setProject({
                      name,
                      children: [],
                    });
                    router.push(`/new?name=${name}`);
                  }}
                >
                  Create
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="cursor-pointer ">Import scaffold</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Import Scaffold</DialogTitle>
                <DialogDescription>Paste a scaffold URL</DialogDescription>
              </DialogHeader>
              <Input value={url} onChange={(e) => setUrl(e.target.value)} />
              <DialogFooter>
                <Button
                  disabled={false}
                  onClick={async () => {
                    try {
                      setIsRetrieving(true);
                      if (url.trim().length == 0) {
                        toast.error("Url cannot be empty");
                        return;
                      }
                      const id = retrieveIdFromUrl(url);
                      if (!id) {
                        toast.error("Invalid URL");
                        return;
                      }

                      const scaffold =
                        await scaffoldService.retrieveScaffold(id);
                      setIsRetrieving(false);
                      setProject({
                        name: scaffold.name,
                        children: scaffold.children,
                      });
                      router.push(`/${id}`);
                    } catch (error) {
                      console.error(error);
                      toast.error("Failed to import scaffold");
                    }
                  }}
                >
                  {isRetrieving && <Loader2Icon className="animate-spin" />}
                  {isRetrieving ? "Importing..." : "Import"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};
