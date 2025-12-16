"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { CodeEditor } from "@/components/code-editor";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useCodeContextStore } from "@/lib/store/useCodeContextStore";
import { EmptyEditor } from "./empty-editor";
import { Header } from "./header";
import { findNode } from "@/lib/nodes";
import { IScaffold } from "@/type";
import { useEffect, useState } from "react";
import { LoadingScaffold } from "./loading-scaffold";

export const App = ({ scaffold,isAuthor, id }: { scaffold?: IScaffold,isAuthor?:boolean, id?: string }) => {
  const setProject = useCodeContextStore((state) => state.setScaffold);
  const selectedFile = useCodeContextStore((state) => {
    if (!state.selectedFileId) return null;
    const node = findNode(state.scaffold.children, state.selectedFileId);
    return node?.type === "file" ? node : null;
  });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHydrated(true);
    if (scaffold) {
      setProject(scaffold);
    }
  }, [scaffold]);

  if (!hydrated) return <LoadingScaffold />;
  

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="min-h-screen flex flex-col ">
          <Header isAuthor={isAuthor} id={id}/>
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
