
export interface FileMeta {
  highlightedLines?: number[];
}

export interface FileNode {
  id: string;
  name: string;
  type: "file";
  content: string;
  fileMeta?:FileMeta
  
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
