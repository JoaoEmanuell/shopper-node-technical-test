import { contextStringType } from "@/utils/types";
import { createContext } from "react";

export const LastMeasureTypeContext = createContext<contextStringType | null>(
  null
);
