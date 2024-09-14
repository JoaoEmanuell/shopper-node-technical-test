import { contextStringType } from "@/utils/types";
import { createContext } from "react";

export const CurrentTabContext = createContext<contextStringType | null>(null);
