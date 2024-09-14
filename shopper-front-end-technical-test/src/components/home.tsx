"use client";

import { useContext } from "react";
import { HomeInitSession } from "./homeSessions/init";
import { HomeUploadSession } from "./homeSessions/upload";
import { HomeConfirmSession } from "./homeSessions/confirm";
import { HomeListSession } from "./homeSessions/list";
import { CurrentTabContext } from "@/contexts/currentTabContext";
import { CreateHomeMenu } from "./ui/home-menu";

export const HomeComponent = () => {
  const [currentTabContext, setCurrentTabContext] =
    useContext(CurrentTabContext);

  return (
    <div>
      <h1 className="text-xl mt-4 mx-2">Dashboard de medição</h1>
      <header className="py-4 pl-2 flex items-center justify-between select-none">
        <CreateHomeMenu />
      </header>
      <main className="flex-1 bg-background p-8">
        {currentTabContext === "init" && (
          <div className="bg-card text-card-foreground rounded-lg p-6 shadow-md overflow-x-auto">
            <HomeInitSession />
          </div>
        )}
        {currentTabContext === "upload" && (
          <div className="bg-card text-card-foreground rounded-lg p-6 shadow-md overflow-x-auto">
            <HomeUploadSession />
          </div>
        )}
        {currentTabContext === "confirm" && (
          <div className="bg-card text-card-foreground rounded-lg p-6 shadow-md overflow-x-auto">
            <HomeConfirmSession />
          </div>
        )}
        {currentTabContext === "list" && (
          <div className="bg-card text-card-foreground rounded-lg p-6 shadow-md overflow-x-auto">
            <HomeListSession />
          </div>
        )}
      </main>
    </div>
  );
};
