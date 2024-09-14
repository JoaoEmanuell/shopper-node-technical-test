import { createContext } from "react";

export const CurrentTabContext = createContext<
  "init" | "upload" | "confirm" | "list"
>("init");
