import { TreeNode } from "@/type";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateId = (type: string): string => 
  `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const downloadFile = (content: string, filename: string) => {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export const retrieveIdFromUrl = (url: string): string | null => {
  try {
    const { pathname } = new URL(url);
    const id = pathname.split("/").filter(Boolean).pop();
    return id ?? null;
  } catch {
    return null;
  }
};


type FileEntry = {
  path: string;
  name: string;
  content: string;
};

export const getAllFiles = (
  children: TreeNode[], 
  parentPath: string = ""
): FileEntry[] => {
  const files: FileEntry[] = [];
  
  children.forEach((child) => {
    const currentPath = parentPath 
      ? `${parentPath}/${child.name}` 
      : child.name;
    
    if (child.type === "file") {
      files.push({
        path: currentPath,
        name: child.name,
        content: child.content
      });
    }
    
    if (child.type === "folder" && child.children) {
      files.push(...getAllFiles(child.children, currentPath));
    }
  });
  
  return files;
};


export const generateScaffoldLink = (id: string): string => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  return `${baseUrl}/scaffold/${id}/`;
};
