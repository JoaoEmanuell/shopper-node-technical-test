import { contextStringType } from "@/utils/types";
import { createContext } from "react";

export const LastMeasureUUIDContext = createContext<contextStringType | null>(
  null
);
