"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TreeItem } from "./tree-item";
import { useCodeContextStore } from "@/lib/store/useCodeContextStore";
import { Logo } from "./logo";
import { FilePlusCorner, FolderPlusIcon } from "lucide-react";
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {project, addFile, addFolder} = useCodeContextStore();
  return (
    <Sidebar {...props}>
      <SidebarContent>
        <SidebarHeader className="flex w-full justify-between items-center">
          <Logo />
          <SidebarTrigger />
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel className="justify-between items-center">
            Files{" "}
            <div className="flex items-center gap-2">
              <FilePlusCorner size={16} onClick={() => addFile(null) } className="cursor-pointer" />
              <FolderPlusIcon size={16} onClick={() => addFolder(null)} className="cursor-pointer" />
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {project.children.length == 0 ? (
              <div className="flex-1 overflow-auto p-2">
                <p className="text-sm">No files found</p>
              </div>
            ) : (
              <div className="flex-1 overflow-auto p-2">
                {project.children.map((node) => (
                  <TreeItem key={node.id} node={node} />
                ))}
              </div>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
