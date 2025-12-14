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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

export const TreeItem = ({ node }: { node: TreeNode }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isReadOnly, setIsReadOnly] = useState<string | null>(null);
  const [isReadOnlyFolder, setIsReadOnlyFolder] = useState<string | null>(null);
  const [hoveredFile, setHoveredFile] = useState<string | null>(null);
  const [hoveredFolder, setHoveredFolder] = useState<string | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { selectFile, selectedFileId, rename, deleteNode, addFile, addFolder } =
    useCodeContextStore();
  const isSelected = node.type === "file" && node.id === selectedFileId;

  if (node.type == "file") {
    return (
      <button
        onMouseEnter={() => setHoveredFile(node.id)}
        onMouseLeave={() => setHoveredFile(null)}
        onClick={() => selectFile(node.id)}
        onDoubleClick={() => setIsReadOnly(node.id)}
        onBlur={() => setIsReadOnly(null)}
        className={`w-full flex items-center justify-between px-2 py-1.5 text-xs rounded-md hover:bg-code-header-bg transition-colors ${
          isSelected ? "bg-accent" : ""
        }`}
      >
        <div className="flex items-center gap-1  flex-1 min-w-0">
          <IconFile size={16} className="shrink-0" />
          <input
            readOnly={isReadOnly !== node.id}
            className={`
              truncate font-medium  min-w-0 outline-none 
              ${isReadOnly === node.id ? "cursor-text bg-transparent" : "cursor-default  bg-transparent"}
            `}
            value={node.name}
            onChange={(e) => rename(node.id, e.target.value)}
          />
        </div>

        <TrashIcon
          onClick={(e) => {
            e.stopPropagation();
            deleteNode(node.id);
          }}
          style={{
            opacity: hoveredFile == node.id ? 1 : 0,
          }}
          className="size-3 shrink-0 text-red-500  cursor-pointer transition-all"
        />
      </button>
    );
  }
  return (
    <div>
      <div className="relative group">
        {" "}
        <button
          onMouseEnter={() => setHoveredFolder(node.id)}
          onMouseLeave={() => setHoveredFolder(null)}
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-accent transition-colors"
        >
          <svg
            className={` shrink-0  transition-transform ${isOpen ? "rotate-90" : ""}`}
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
            <FolderOpen className="h-4 w-4 shrink-0  " />
          ) : (
            <Folder className="h-4 w-4 shrink-0 " />
          )}
          <input
            ref={inputRef}
            readOnly={isReadOnlyFolder !== node.id}
            className={`
              truncate font-medium min-w-0 outline-none text-sm
              ${isReadOnlyFolder === node.id ? "cursor-text bg-transparent" : "pointer-events-none select-none  bg-transparent"}
            `}
            value={node.name}
            onChange={(e) => rename(node.id, e.target.value)}
            onBlur={() => setIsReadOnlyFolder(null)}
          />

          <>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <EllipsisIcon
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  style={{
                    opacity: hoveredFolder == node.id ? 1 : 0,
                  }}
                  className="size-3 shrink-0 text-fg1 absolute right-1 cursor-pointer transition-all"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-50">
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      addFile(node.id);
                    }}
                  >
                    <FileIcon />
                    New File
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      addFolder(node.id);
                    }}
                  >
                    <FolderIcon />
                    New Folder
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsReadOnlyFolder(node.id);
                      inputRef.current?.focus();
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
          </>
        </button>
      </div>
      {isOpen && node.children.length > 0 && (
        <div className="ml-4 border-l border-border pl-2 mt-1">
          {node.children.map((child) => (
            <TreeItem key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};
