export interface FileNode {
  id: string;
  name: string;
  type: "file";
  content: string;
}

export interface FolderNode {
  id: string;
  name: string;
  type: "folder";
  children: TreeNode[];
}

export type TreeNode = FileNode | FolderNode;

export interface IScaffold {
  name: string;
  children: TreeNode[];
}

export type supportedCopyMethods = "llm" | "markdown" | "json" | "fileTree";
