"use client";
import { Button } from "./ui/button";
import { useCodeContextStore } from "@/lib/store/useCodeContextStore";

export const Header = ({ projectname }: { projectname: string }) => {
  const { setProjectName } = useCodeContextStore();
  return (
    <div className="flex px-4 py-3 items-center justify-between">
    
        <input
          className="capitalize outline-none"
          onChange={(e) => setProjectName(e.target.value)}
          value={projectname}
        />
       
      <div>
        <Button className="cursor-pointer" size={"sm"}>
          Publish
        </Button>
      </div>
    </div>
  );
};
