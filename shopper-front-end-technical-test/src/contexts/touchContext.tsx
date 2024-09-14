"use client";

import { createContext, useState, useEffect } from "react";

export const TouchContext = createContext<boolean | undefined>(undefined);

export const TouchProvider = (props: React.PropsWithChildren) => {
  const [isTouch, setTouch] = useState<boolean>();

  useEffect(() => {
    setTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  return <TouchContext.Provider value={isTouch} {...props} />;
};
