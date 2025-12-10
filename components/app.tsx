"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { CodeEditor } from "@/components/code-editor";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useCodeContextStore } from "@/lib/store/useCodeContextStore";
import { EmptyEditor } from "./empty-editor";

export const App = () => {
  const { getSelectedFile } = useCodeContextStore();
  const selectedFile = getSelectedFile();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="p-4">
        {selectedFile ? (
          <CodeEditor
            code={selectedFile.content}
            fileName={selectedFile.name}
          />
        ) : (
          <EmptyEditor />
        )}
      </SidebarInset>
    </SidebarProvider>
  );
};
