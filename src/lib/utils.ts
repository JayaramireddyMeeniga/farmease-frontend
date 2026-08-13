import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getUserId = (): number | null => {
  const id = localStorage.getItem("userId");
  return id ? Number(id) : null;
};
