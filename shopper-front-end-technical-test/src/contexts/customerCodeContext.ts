import { contextStringType } from "@/utils/types";
import { createContext } from "react";

export const CustomerCodeContext = createContext<contextStringType | null>(
  null
);
