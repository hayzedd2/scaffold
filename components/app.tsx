"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { CodeEditor } from "@/components/code-editor";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useCodeContextStore } from "@/lib/store/useCodeContextStore";
import { EmptyEditor } from "./empty-editor";
import { Header } from "./header";
import { findNode } from "@/lib/nodes";

export const App = () => {
  const selectedFile = useCodeContextStore((state) => {
    if (!state.selectedFileId) return null;
  
    const node = findNode(
      state.project.children,
      state.selectedFileId
    );
  
    return node?.type === "file" ? node : null;
  });


  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="min-h-screen flex flex-col ">
          <Header /> 
          <div className="p-2 flex-1 ">
            {selectedFile ? (
              <CodeEditor
                code={selectedFile.content}
                fileName={selectedFile.name}
                highlightedLineNumbers={[6, 21, 9]}
                showLineNumbers
              />
            ) : (
              <EmptyEditor />
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
