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
import { useCodeContextStore } from "@/lib/store/useCodeContextStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const CreateScaffold = () => {
  const [name, setName] = useState("");
  const setScaffold = useCodeContextStore((s) => s.setScaffold);
  const router = useRouter();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="cursor-pointer">
          New scaffold
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (name.trim().length == 0) {
              toast.error("Name cannot be empty");
              return;
            }
            setScaffold({
              name,
              children: [],
            });
            router.push(`/scaffold/new?name=${name}`);
          }}
          className="flex flex-col gap-4"
        >
          <DialogHeader>
            <DialogTitle>New Scaffold</DialogTitle>
            <DialogDescription>Give your scaffold a name.</DialogDescription>
          </DialogHeader>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
          <DialogFooter>
            <Button type="submit">
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
