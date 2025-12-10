import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateId = (type: string): string => 
  `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
