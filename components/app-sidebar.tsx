"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TreeItem } from "./tree-item";
import { useCodeContextStore } from "@/lib/store/useCodeContextStore";
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const project = useCodeContextStore((s) => s.project);
  return (
    <Sidebar {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Changes</SidebarGroupLabel>
          <SidebarGroupContent>
            {project.children.length == 0 ? (
              <div className="flex-1 overflow-auto p-2">
                <p>No files found</p>
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
