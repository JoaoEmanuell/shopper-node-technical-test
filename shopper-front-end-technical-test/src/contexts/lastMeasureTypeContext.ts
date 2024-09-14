import { createContext } from "react";

export const LastMeasureTypeContext = createContext<"water" | "gas" | "">("");
