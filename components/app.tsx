"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { CodeEditor } from "@/components/code-editor";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useCodeContextStore } from "@/lib/store/useCodeContextStore";
import { EmptyEditor } from "./empty-editor";
import { Header } from "./header";

export const App = () => {
  const { getSelectedFile, project } = useCodeContextStore();
  const selectedFile = getSelectedFile();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="min-h-screen flex flex-col ">
          <Header projectname={project.name} />
          <div className="p-2 flex-1 ">
            {selectedFile ? (
              <CodeEditor
                code={selectedFile.content}
                fileName={selectedFile.name}
                highlightedLineNumbers={[20, 21, 22, 23, 24, 25, 26, 27, 28]}
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
