// /lib/utils.tsx

import clsx from "clsx";
import type { ClassValue } from "clsx"; // type-only import prevents runtime import
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}
