"use client";
import { scaffoldService } from "@/lib/service/scaffold-service";
import { Button } from "./ui/button";
import { useCodeContextStore } from "@/lib/store/useCodeContextStore";
import { useEffect, useState } from "react";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { CopyScaffoldButton } from "./copy-scaffold-button";
import { useRouter } from "next/navigation";

export const Header = ({ isAuthor,id }: { isAuthor?: boolean,id?:string }) => {
  const { setScaffoldName, scaffold } = useCodeContextStore();
  const [isPublishing, setIsPublishing] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    setScaffoldName(searchParams.get("name") || scaffold.name);
  }, [searchParams]);
  return (
    <div className="flex px-4 py-3 items-center justify-between">
      <input
        className="outline-none"
        onChange={(e) => setScaffoldName(e.target.value)}
        value={scaffold.name}
      />

      <div className="flex items-center gap-2">
        <CopyScaffoldButton />
        {isAuthor ? (
          <Button
            disabled={isPublishing}
            onClick={async () => {
              try {
                if (!scaffold.name) {
                  toast.error("Scaffold name is required");
                  return;
                }
                if (scaffold.children.length === 0) {
                  toast.error("File tree cannot be empty");
                  return;
                }
                setIsPublishing(true);
                const result = await scaffoldService.createScaffold(
                  scaffold.name,
                  scaffold.children,
                );
                setIsPublishing(false);
                router.push(`/scaffold/${result.id}/success`);
              } catch(err) {
                console.error(err);
                toast.error("Failed to publish scaffold");
                setIsPublishing(false);
              }
            }}
            className="cursor-pointer"
            size={"sm"}
          >
            {isPublishing && <Loader2Icon className="animate-spin" />}
            {isPublishing ? "Publishing" : "Publish"}
          </Button>
        ) : (
          <Button
            className="cursor-pointer"
            onClick={() => router.push(`/scaffold/new?id=${id}&remix=true`)}
          >
            Remix scaffold
          </Button>
        )}
      </div>
    </div>
  );
};
