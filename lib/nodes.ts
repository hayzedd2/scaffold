import { TreeNode } from "@/type";

export const findNode = (nodes: TreeNode[], targetId: string): TreeNode | null => {
  for (const node of nodes) {
    if (node.id === targetId) return node;
    if (node.type === 'folder' && node.children) {
      const found = findNode(node.children, targetId);
      if (found) return found;
    }
  }
  return null;
};

export const updateNode = (
  nodes: TreeNode[], 
  targetId: string, 
  updateFn: (node: TreeNode) => TreeNode
): TreeNode[] => {
  return nodes.map(node => {
    if (node.id === targetId) {
      return updateFn(node);
    }
    if (node.type === 'folder' && node.children) {
      return {
        ...node,
        children: updateNode(node.children, targetId, updateFn)
      };
    }
    return node;
  });
};

export const deleteNode = (nodes: TreeNode[], targetId: string): TreeNode[] => {
  return nodes.filter(node => {
    if (node.id === targetId) return false;
    return true;
  }).map(node => {
    if (node.type === 'folder') {
      return {
        ...node,
        children: deleteNode(node.children, targetId)
      };
    }
    return node;
  });
};