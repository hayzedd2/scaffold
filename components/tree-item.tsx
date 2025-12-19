"use client";
import { useCodeContextStore } from "@/lib/store/useCodeContextStore";
import { TreeNode } from "@/type";
import {
  EllipsisIcon,
  FileIcon,
  Folder,
  FolderIcon,
  FolderOpen,
  TrashIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteModal } from "./delete-modal";
import { IconFile, IconPencil, IconTrash } from "@tabler/icons-react";

interface PendingNode {
  type: "file" | "folder";
  parentId: string | null;
}

export const TreeItem = ({ node }: { node: TreeNode }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isRenaming, setIsRenaming] = useState(false);
  const [hoveredFile, setHoveredFile] = useState<string | null>(null);
  const [hoveredFolder, setHoveredFolder] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [pendingChild, setPendingChild] = useState<PendingNode | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const pendingInputRef = useRef<HTMLInputElement>(null);

  const { selectFile, selectedFileId, rename, deleteNode, addFile, addFolder } =
    useCodeContextStore();
  const isSelected = node.type === "file" && node.id === selectedFileId;

  // Auto-focus when entering rename mode
  useEffect(() => {
    if (isRenaming && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isRenaming]);

  // Auto-focus pending input
  useEffect(() => {
    if (pendingChild && pendingInputRef.current) {
      pendingInputRef.current.focus();
    }
  }, [pendingChild]);

  const handlePendingSubmit = (value: string) => {
    const trimmedValue = value.trim();
    const root = node.type === "folder" ? node.id : null;
    if (trimmedValue && pendingChild) {
      if (pendingChild.type === "file") {
        addFile(root, trimmedValue);
      } else if (pendingChild.type === "folder") {
        addFolder(root, trimmedValue);
      }
    }
    setPendingChild(null);
  };

  const handleRenameSubmit = (value: string) => {
    const trimmedValue = value.trim();
    if (trimmedValue && trimmedValue !== node.name) {
      rename(node.id, trimmedValue);
    }
    setIsRenaming(false);
  };

  const renderPendingInput = () => {
    if (!pendingChild) return null;

    return (
      <div className="w-full flex items-center justify-between px-2 my-1 py-1.5 text-xs rounded-md bg-accent">
        <div className="flex items-center gap-1 flex-1 min-w-0">
          {pendingChild.type === "file" ? (
            <IconFile size={16} className="shrink-0 text-muted-foreground" />
          ) : (
            <FolderIcon size={16} className="shrink-0 text-muted-foreground" />
          )}
          <input
            ref={pendingInputRef}
            className="flex-1 min-w-0 outline-none bg-transparent font-medium"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handlePendingSubmit(e.currentTarget.value);
              } else if (e.key === "Escape") {
                setPendingChild(null);
              }
            }}
            onBlur={(e) => handlePendingSubmit(e.target.value)}
          />
        </div>
      </div>
    );
  };

  if (node.type === "file") {
    return (
      <button
        onMouseEnter={() => setHoveredFile(node.id)}
        onMouseLeave={() => setHoveredFile(null)}
        onClick={() => selectFile(node.id)}
        onDoubleClick={() => setIsRenaming(true)}
        className={`w-full flex items-center justify-between px-2 py-1.5 text-xs rounded-md hover:bg-code-header-bg transition-colors ${
          isSelected ? "bg-accent" : ""
        }`}
      >
        <div className="flex items-center gap-1 flex-1 min-w-0">
          <IconFile size={16} className="shrink-0" />
          {isRenaming ? (
            <input
              ref={inputRef}
              className="flex-1 min-w-0 outline-none bg-transparent font-medium"
              defaultValue={node.name}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRenameSubmit(e.currentTarget.value);
                } else if (e.key === "Escape") {
                  setIsRenaming(false);
                }
              }}
              onBlur={(e) => handleRenameSubmit(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span className="truncate font-medium min-w-0">{node.name}</span>
          )}
        </div>

        <TrashIcon
          onClick={(e) => {
            e.stopPropagation();
            deleteNode(node.id);
          }}
          style={{
            opacity: hoveredFile === node.id ? 1 : 0,
          }}
          className="size-3 shrink-0 text-red-500 cursor-pointer transition-all"
        />
      </button>
    );
  }


  return (
    <div>
      <div className="relative group">
        <button
          onMouseEnter={() => setHoveredFolder(node.id)}
          onMouseLeave={() => setHoveredFolder(null)}
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-accent transition-colors"
        >
          <svg
            className={`shrink-0 transition-transform ${isOpen ? "rotate-90" : ""}`}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <g id="right_small_fill" fill="none" fillRule="evenodd">
              <path d="M24 0v24H0V0h24ZM12.594 23.258l-.012.002-.071.035-.02.004-.014-.004-.071-.036c-.01-.003-.019 0-.024.006l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.016-.018Zm.264-.113-.014.002-.184.093-.01.01-.003.011.018.43.005.012.008.008.201.092c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.003-.011.018-.43-.003-.012-.01-.01-.184-.092Z" />
              <path
                fill="#8a8875"
                d="M14.536 12.707a1 1 0 0 0 0-1.414l-2.829-2.829A1 1 0 0 0 10 9.172v5.656a1 1 0 0 0 1.707.708l2.829-2.829Z"
              />
            </g>
          </svg>

          {isOpen ? (
            <FolderOpen className="h-4 w-4 shrink-0" />
          ) : (
            <Folder className="h-4 w-4 shrink-0" />
          )}

          {isRenaming ? (
            <input
              ref={inputRef}
              className="flex-1 min-w-0 outline-none bg-transparent font-medium text-sm"
              defaultValue={node.name}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRenameSubmit(e.currentTarget.value);
                } else if (e.key === "Escape") {
                  setIsRenaming(false);
                }
                e.stopPropagation();
              }}
              onBlur={(e) => handleRenameSubmit(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span className="truncate font-medium min-w-0 text-sm">
              {node.name}
            </span>
          )}

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <EllipsisIcon
                onClick={(e) => e.stopPropagation()}
                style={{
                  opacity: hoveredFolder === node.id ? 1 : 0,
                }}
                className="size-3 shrink-0 text-fg1 absolute right-1 cursor-pointer transition-all"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-50">
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(true);
                    setPendingChild({ type: "file", parentId: node.id });
                  }}
                >
                  <FileIcon />
                  New File
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(true);
                    setPendingChild({ type: "folder", parentId: node.id });
                  }}
                >
                  <FolderIcon />
                  New Folder
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsRenaming(true);
                  }}
                >
                  <IconPencil />
                  Rename Folder
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDeleteModalOpen(true);
                  }}
                >
                  <IconTrash />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            type="folder"
            onDelete={() => deleteNode(node.id)}
          />
        </button>
      </div>

      {isOpen && (
        <div className="ml-4 border-l border-border pl-2 ">
          {node.children.map((child) => (
            <TreeItem key={child.id} node={child} />
          ))}
          {renderPendingInput()}
        </div>
      )}
    </div>
  );
};
