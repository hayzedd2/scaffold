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
    name: "E-commerce demo",
    children: [
      {
        id: "folder-1735000001-abc123",
        name: "src",
        type: "folder",
        children: [
          {
            id: "folder-1735000002-def456",
            name: "components",
            type: "folder",
            children: [
              {
                id: "file-1735000003-ghi789",
                name: "Header.tsx",
                type: "file",
                content:
                  "import React from 'react'\n\nexport default function Header() {\n  return <header>My Store</header>\n}",
              },
              {
                id: "file-1735000004-jkl012",
                name: "ProductCard.tsx",
                type: "file",
                content:
                  'interface Props {\n  title: string\n  price: number\n}\n\nexport default function ProductCard({ title, price }: Props) {\n  return (\n    <div className="card">\n      <h3>{title}</h3>\n      <p>${price}</p>\n    </div>\n  )\n}',
              },
              {
                id: "file-1735000005-mno345",
                name: "Button.tsx",
                type: "file",
                content: "",
              },
            ],
          },
          {
            id: "folder-1735000006-pqr678",
            name: "pages",
            type: "folder",
            children: [
              {
                id: "file-1735000007-stu901",
                name: "index.tsx",
                type: "file",
                content:
                  "import Header from '@/components/Header'\n\nexport default function Home() {\n  return (\n    <main>\n      <Header />\n      <h1>Welcome</h1>\n    </main>\n  )\n}",
              },
              {
                id: "file-1735000008-vwx234",
                name: "products.tsx",
                type: "file",
                content: "",
              },
            ],
          },
          {
            id: "folder-1735000009-yza567",
            name: "lib",
            type: "folder",
            children: [
              {
                id: "file-1735000010-bcd890",
                name: "db.ts",
                type: "file",
                content:
                  "import { neon } from '@neondatabase/serverless'\n\nexport const sql = neon(process.env.DATABASE_URL!)",
              },
              {
                id: "file-1735000011-efg123",
                name: "utils.ts",
                type: "file",
                content:
                  "export function formatPrice(cents: number) {\n  return `$${(cents / 100).toFixed(2)}`\n}",
              },
            ],
          },
          {
            id: "folder-1735000012-hij456",
            name: "styles",
            type: "folder",
            children: [
              {
                id: "file-1735000013-klm789",
                name: "globals.css",
                type: "file",
                content:
                  "* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: system-ui, sans-serif;\n}",
              },
            ],
          },
        ],
      },
      {
        id: "folder-1735000014-nop012",
        name: "public",
        type: "folder",
        children: [
          {
            id: "file-1735000015-qrs345",
            name: "logo.svg",
            type: "file",
            content: "",
          },
          {
            id: "file-1735000016-tuv678",
            name: "favicon.ico",
            type: "file",
            content: "",
          },
        ],
      },
      {
        id: "file-1735000017-wxy901",
        name: "package.json",
        type: "file",
        content:
          '{\n  "name": "ecommerce-app",\n  "version": "1.0.0",\n  "dependencies": {\n    "react": "^18.2.0",\n    "next": "^14.0.0"\n  }\n}',
      },
      {
        id: "file-1735000018-zab234",
        name: "tsconfig.json",
        type: "file",
        content:
          '{\n  "compilerOptions": {\n    "target": "ES2020",\n    "lib": ["ES2020", "DOM"],\n    "jsx": "react-jsx",\n    "module": "ESNext",\n    "moduleResolution": "bundler"\n  }\n}',
      },
      {
        id: "file-1735000019-cde567",
        name: "README.md",
        type: "file",
        content:
          "# Ecommerce App\n\nA modern ecommerce application built with Next.js.\n\n## Getting Started\n\n```bash\nnpm install\nnpm run dev\n```",
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
