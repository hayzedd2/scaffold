import { TreeNode } from "@/type";
import { getAllFiles } from "./utils";


export const copyScaffold = {
  llm: (scaffold: { name: string; children: TreeNode[] }) => {
    const files = getAllFiles(scaffold.children);
    
    let output = `Project: ${scaffold.name}\n\n`;
    output += `File Structure:\n`;
    output += files.map(f => `- ${f.path}`).join('\n');
    output += `\n\n`;
    
    files.forEach(file => {
      if (file.content.trim()) {
        output += `=== ${file.path} ===\n`;
        output += `${file.content}\n\n`;
      }
    });
    
    navigator.clipboard.writeText(output);
    return output;
  },


  markdown: (scaffold: { name: string; children: TreeNode[] }) => {
    const files = getAllFiles(scaffold.children);
    
    let output = `# ${scaffold.name}\n\n`;
    output += `## File Structure\n\n`;
    output += files.map(f => `- \`${f.path}\``).join('\n');
    output += `\n\n`;
    
    files.forEach(file => {
      if (file.content.trim()) {
        const ext = file.name.split('.').pop() || '';
        const language = ext === 'tsx' || ext === 'ts' ? 'typescript' 
                       : ext === 'jsx' || ext === 'js' ? 'javascript'
                       : ext === 'json' ? 'json'
                       : ext === 'css' ? 'css'
                       : '';
        
        output += `## ${file.path}\n\n`;
        output += `\`\`\`${language}\n${file.content}\n\`\`\`\n\n`;
      }
    });
    
    navigator.clipboard.writeText(output);
    return output;
  },

 
  fileTree: (scaffold: { name: string; children: TreeNode[] }) => {
    const buildTree = (nodes: TreeNode[], prefix: string = '', isLast: boolean = true): string => {
      let output = '';
      
      nodes.forEach((node, index) => {
        const isLastItem = index === nodes.length - 1;
        const connector = isLastItem ? '└── ' : '├── ';
        const extension = node.type === 'folder' ? '/' : '';
        
        output += `${prefix}${connector}${node.name}${extension}\n`;
        
        if (node.type === 'folder' && node.children) {
          const newPrefix = prefix + (isLastItem ? '    ' : '│   ');
          output += buildTree(node.children, newPrefix, isLastItem);
        }
      });
      
      return output;
    };
    
    const output = `${scaffold.name}/\n${buildTree(scaffold.children)}`;
    navigator.clipboard.writeText(output);
    return output;
  },

  json: (scaffold: { name: string; children: TreeNode[] }) => {
    const output = JSON.stringify(scaffold, null, 2);
    navigator.clipboard.writeText(output);
    return output;
  }
};