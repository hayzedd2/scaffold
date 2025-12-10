import { FileNode, FolderNode, Project } from "@/type";
import { create } from "zustand";
import { generateId } from "../utils";
import { deleteNode, findNode, updateNode } from "../nodes";

interface CodeContextState {
  project: Project;
  selectedFileId: string | null;
  setProject: (project: Project) => void;
  setProjectName: (name: string) => void;
  addFile: (parentId: string | null, fileName?: string) => void;
  addFolder: (parentId: string | null, folderName?: string) => void;
  rename: (nodeId: string, newName: string) => void;
  updateFileContent: (fileId: string, content: string) => void;
  deleteNode: (nodeId: string) => void;
  selectFile: (fileId: string | null) => void;
  getSelectedFile: () => FileNode | null;
  exportProject: () => string;
  importProject: (jsonString: string) => boolean;
  reset: () => void;
}

export const useCodeContextStore = create<CodeContextState>((set, get) => ({
  project: {
    name: "my-project",
    children: [
      {
        id: "file-1",
        name: "README.md",
        type: "file",
        content: "# My Project\n\nWelcome to CodeContext!",
      },
      {
        id: "folder-1",
        name: "src",
        type: "folder",
        children: [
          {
            id: "file-2",
            name: "index.ts",
            type: "file",
            content: 'console.log("Hello World");',
          },
          {
            id: "folder-2",
            name: "components",
            type: "folder",
            children: [
              {
                id: "file-3",
                name: "Button.tsx",
                type: "file",
                content:
                  "export const Button = () => <button>Click me</button>;",
              },
              {
                id: "file-4",
                name: "Card.tsx",
                type: "file",
                content: `import {
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
`,
              },
            ],
          },
          {
            id: "folder-3",
            name: "utils",
            type: "folder",
            children: [
              {
                id: "file-5",
                name: "helpers.ts",
                type: "file",
                content:
                  "export const formatDate = (date: Date) => date.toISOString();",
              },
            ],
          },
        ],
      },
      {
        id: "folder-4",
        name: "public",
        type: "folder",
        children: [
          {
            id: "file-6",
            name: "favicon.ico",
            type: "file",
            content: "",
          },
        ],
      },
      {
        id: "file-7",
        name: "package.json",
        type: "file",
        content: '{\n  "name": "my-project",\n  "version": "1.0.0"\n}',
      },
    ],
  },
  selectedFileId: null,
  /*
   * Set the project from json/url
   */
  setProject: (project: Project) => set({ project }),
  /*
  Update/set project name
 */
  setProjectName: (name: string) =>
    set((state) => ({
      project: { ...state.project, name },
    })),
  addFile: (parentId: string | null, fileName: string = "untitled.txt") =>
    set((state) => {
      const newFile: FileNode = {
        id: generateId("file"),
        name: fileName,
        type: "file",
        content: "",
      };

      if (!parentId) {
        // Add to root
        return {
          project: {
            ...state.project,
            children: [...state.project.children, newFile],
          },
        };
      }

      // Add to specific folder
      const updatedChildren = updateNode(
        state.project.children,
        parentId,
        (node) => {
          if (node.type === "folder") {
            return {
              ...node,
              children: [...node.children, newFile],
            };
          }
          return node;
        },
      );

      return {
        project: { ...state.project, children: updatedChildren },
      };
    }),
  // Add folder to a folder (parentId = null means root)
  addFolder: (parentId: string | null, folderName: string = "new-folder") =>
    set((state) => {
      const newFolder: FolderNode = {
        id: generateId("folder"),
        name: folderName,
        type: "folder",
        children: [],
      };

      if (!parentId) {
        // Add to root
        return {
          project: {
            ...state.project,
            children: [...state.project.children, newFolder],
          },
        };
      }

      // Add to specific folder
      const updatedChildren = updateNode(
        state.project.children,
        parentId,
        (node) => {
          if (node.type === "folder") {
            return {
              ...node,
              children: [...node.children, newFolder],
            };
          }
          return node;
        },
      );

      return {
        project: { ...state.project, children: updatedChildren },
      };
    }),

  // Rename file or folder
  rename: (nodeId: string, newName: string) =>
    set((state) => {
      const updatedChildren = updateNode(
        state.project.children,
        nodeId,
        (node) => ({
          ...node,
          name: newName,
        }),
      );

      return {
        project: { ...state.project, children: updatedChildren },
      };
    }),

  // Update file content
  updateFileContent: (fileId: string, content: string) =>
    set((state) => {
      const updatedChildren = updateNode(
        state.project.children,
        fileId,
        (node) => {
          if (node.type === "file") {
            return { ...node, content };
          }
          return node;
        },
      );

      return {
        project: { ...state.project, children: updatedChildren },
      };
    }),

  // Delete file or folder
  deleteNode: (nodeId: string) =>
    set((state) => ({
      project: {
        ...state.project,
        children: deleteNode(state.project.children, nodeId),
      },
      selectedFileId:
        state.selectedFileId === nodeId ? null : state.selectedFileId,
    })),

  // Select a file (for viewing)
  selectFile: (fileId: string | null) => set({ selectedFileId: fileId }),

  // Get selected file content
  getSelectedFile: (): FileNode | null => {
    const state = get();
    if (!state.selectedFileId) return null;
    const node = findNode(state.project.children, state.selectedFileId);
    return node?.type === "file" ? node : null;
  },

  // Export project as JSON (for sharing)
  exportProject: (): string => {
    const state = get();
    return JSON.stringify(state.project, null, 2);
  },

  // Import project from JSON
  importProject: (jsonString: string): boolean => {
    try {
      const project = JSON.parse(jsonString) as Project;
      set({ project, selectedFileId: null });
      return true;
    } catch (error) {
      console.error("Failed to import project:", error);
      return false;
    }
  },

  // Reset to empty project
  reset: () =>
    set({
      project: { name: "my-project", children: [] },
      selectedFileId: null,
    }),
}));
