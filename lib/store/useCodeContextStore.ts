import { FileNode, FolderNode, IScaffold } from "@/type";
import { create } from "zustand";
import { generateId } from "../utils";
import { deleteNode, findNode, updateNode } from "../nodes";

interface CodeContextState {
  scaffold: IScaffold;
  selectedFileId: string | null;
  setScaffold: (scaffold: IScaffold) => void;
  setScaffoldName: (name: string) => void;
  addFile: (parentId: string | null, fileName?: string) => void;
  addFolder: (parentId: string | null, folderName?: string) => void;
  rename: (nodeId: string, newName: string) => void;
  updateFileContent: (fileId: string, content: string) => void;
  deleteNode: (nodeId: string) => void;
  selectFile: (fileId: string | null) => void;
  getSelectedFile: () => FileNode | null;
  exportScaffold: () => string;
  importScaffold: (jsonString: string) => boolean;
  reset: () => void;
}

export const useCodeContextStore = create<CodeContextState>((set, get) => ({
  scaffold: {
    name: "untitled",
    children:[]
  },
  selectedFileId: null,
  setScaffold: (scaffold: IScaffold) => set({ scaffold }),
  setScaffoldName: (name: string) =>
    set((state) => ({
      scaffold: { ...state.scaffold, name },
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
          scaffold: {
            ...state.scaffold,
            children: [...state.scaffold.children, newFile],
          },
        };
      }

      // Add to specific folder
      const updatedChildren = updateNode(
        state.scaffold.children,
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
        scaffold: { ...state.scaffold, children: updatedChildren },
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
          scaffold: {
            ...state.scaffold,
            children: [...state.scaffold.children, newFolder],
          },
        };
      }

      // Add to specific folder
      const updatedChildren = updateNode(
        state.scaffold.children,
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
        scaffold: { ...state.scaffold, children: updatedChildren },
      };
    }),

  // Rename file or folder
  rename: (nodeId: string, newName: string) =>
    set((state) => {
      const updatedChildren = updateNode(
          state.scaffold.children,
        nodeId,
        (node) => ({
          ...node,
          name: newName,
        }),
      );

      return {
        scaffold: { ...state.scaffold, children: updatedChildren },
      };
    }),

  // Update file content
  updateFileContent: (fileId: string, content: string) =>
    set((state) => {
      const updatedChildren = updateNode(
        state.scaffold.children,
        fileId,
        (node) => {
          if (node.type === "file") {
            return { ...node, content };
          }
          return node;
        },
      );

      return {
        scaffold: { ...state.scaffold, children: updatedChildren },
      };
    }),

  // Delete file or folder
  deleteNode: (nodeId: string) =>
    set((state) => ({
      scaffold: {
        ...state.scaffold,
        children: deleteNode(state.scaffold.children, nodeId),
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
    const node = findNode(state.scaffold.children, state.selectedFileId);
    return node?.type === "file" ? node : null;
  },

  exportScaffold: (): string => {
    const state = get();
    return JSON.stringify(state.scaffold, null, 2);
  },

  importScaffold: (jsonString: string): boolean => {
    try {
      const scaffold = JSON.parse(jsonString) as IScaffold;
      set({ scaffold, selectedFileId: null });
      return true;
    } catch (error) {
      console.error("Failed to import scaffold:", error);
      return false;
    }
  },
  reset: () =>
    set({
      scaffold: { name: "untitled", children: [] },
      selectedFileId: null,
    }),
}));
