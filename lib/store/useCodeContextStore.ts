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
      
    ]
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
