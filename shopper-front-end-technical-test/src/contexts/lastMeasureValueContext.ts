import { createContext, Dispatch, SetStateAction } from "react";

export const LastMeasureValueContext = createContext<
  [number, Dispatch<SetStateAction<number>>] | null
>(null);
