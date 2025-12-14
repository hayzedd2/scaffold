"use client";
import { scaffoldService } from "@/lib/service/scaffold-service";
import { Button } from "./ui/button";
import { useCodeContextStore } from "@/lib/store/useCodeContextStore";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { IconSelector } from "@tabler/icons-react";

export const Header = () => {
  const { setProjectName, project } = useCodeContextStore();
  const [isPublishing, setIsPublishing] = useState(false);
  const searchParams = useSearchParams()
  return (
    <div className="flex px-4 py-3 items-center justify-between">
      <input
        className="capitalize outline-none"
        onChange={(e) => setProjectName(e.target.value)}
        value={searchParams.get("name") || project.name}
      />

      <div className="flex items-center gap-2">
        <Button variant={"outline"} className="cursor-pointer">Copy<IconSelector/></Button>
        <Button
          disabled={isPublishing}
          onClick={async () => {
            try{
              if(!project.name) {
                toast.error("Scaffold name is required");
                return
              };
              if(project.children.length === 0) {
                toast.error("File tree cannot be empty");
                return
              };
              setIsPublishing(true);
              await scaffoldService.createScaffold(
                project.name,
                project.children,
              );
              setIsPublishing(false);
            }catch(error){
              toast.error("Failed to publish scaffold");
              setIsPublishing(false)
            }
          }}
          className="cursor-pointer"
          size={"sm"}
        >
          {isPublishing && <Loader2Icon className="animate-spin" />}
          {isPublishing ? "Publishing" : "Publish"}
        </Button>
      </div>
    </div>
  );
};
