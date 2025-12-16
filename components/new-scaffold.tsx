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
import { CreateScaffold } from "./create-scaffold";

export const NewScaffold = () => {
  const [url, setUrl] = useState("");
  const [isRetrieving, setIsRetrieving] = useState(false);
  const setScaffold = useCodeContextStore((s) => s.setScaffold);
  const router = useRouter();
  return (
    <div className="flex gap-2">
      <CreateScaffold />
      <Dialog>
        <DialogTrigger asChild>
          <Button className="cursor-pointer ">Import scaffold</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                if (url.trim().length == 0) {
                  toast.error("Link cannot be empty");
                  return;
                }
                const id = retrieveIdFromUrl(url);
                if (!id) {
                  toast.error("Invalid link");
                  return;
                }
                setIsRetrieving(true);
                const scaffold = await scaffoldService.retrieveScaffold(id);
                setIsRetrieving(false);
                setScaffold({
                  name: scaffold.name,
                  children: scaffold.children,
                });
                router.push(`/scaffold/${id}`);
              } catch {
                setIsRetrieving(false);
                toast.error("Failed to import scaffold");
              }
            }}
            className="flex flex-col gap-4"
          >
            <DialogHeader>
              <DialogTitle>Import Scaffold</DialogTitle>
              <DialogDescription>Paste a scaffold Link</DialogDescription>
            </DialogHeader>
            <Input
              value={url}
              disabled={isRetrieving}
              onChange={(e) => setUrl(e.target.value)}
            />
            <DialogFooter>
              <Button
                type="submit"
                disabled={isRetrieving}
              >
                {isRetrieving && <Loader2Icon className="animate-spin" />}
                {isRetrieving ? "Importing..." : "Import"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
