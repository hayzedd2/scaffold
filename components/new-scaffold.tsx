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

export const NewScaffold = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [isRetrieving, setIsRetrieving] = useState(false);
  const setScaffold = useCodeContextStore((s) => s.setScaffold);
  const router = useRouter();
  return (
    <div className="flex gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"outline"} className="cursor-pointer">
            New scaffold
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Scaffold</DialogTitle>
            <DialogDescription>Give your scaffold a name.</DialogDescription>
          </DialogHeader>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
          <DialogFooter>
            <Button
              onClick={() => {
                if (name.trim().length == 0) {
                  toast.error("Name cannot be empty");
                  return;
                }
                setScaffold({
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
              disabled={isRetrieving}
              onClick={async () => {
                try {
                  if (url.trim().length == 0) {
                    toast.error("Url cannot be empty");
                    return;
                  }
                  const id = retrieveIdFromUrl(url);
                  if (!id) {
                    toast.error("Invalid URL");
                    return;
                  }
                  setIsRetrieving(true);
                  const scaffold = await scaffoldService.retrieveScaffold(id);
                  setIsRetrieving(false);
                  setScaffold({
                    name: scaffold.name,
                    children: scaffold.children,
                  });
                  router.push(`/${id}`);
                } catch (error) {
                  setIsRetrieving(false);
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
  );
};
