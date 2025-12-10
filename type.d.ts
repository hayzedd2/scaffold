export interface FileNode {
  id: string;
  name: string;
  type: 'file';
  content: string;
}

export interface FolderNode {
  id: string;
  name: string;
  type: 'folder';
  children: TreeNode[];
}

export type TreeNode = FileNode | FolderNode;

export interface Project {
  name: string;
  children: TreeNode[];
}