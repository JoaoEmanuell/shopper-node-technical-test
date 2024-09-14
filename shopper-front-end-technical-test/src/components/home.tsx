"use client";

import { useContext, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "./ui/navigation-menu";
import { HomeInitSession } from "./homeSessions/init";
import { HomeUploadSession } from "./homeSessions/upload";
import { HomeConfirmSession } from "./homeSessions/confirm";
import { HomeListSession } from "./homeSessions/list";
import { CurrentTabContext } from "@/contexts/currentTabContext";

export const HomeComponent = () => {
  const [currentTabContext, setCurrentTabContext] =
    useContext(CurrentTabContext);

  return (
    <div>
      <h1 className="text-xl mt-4 mx-2">Dashboard de medição</h1>
      <header className="py-4 pl-2 flex items-center justify-between select-none">
        <div className="flex gap-4 mr-4">
          <NavigationMenu>
            <NavigationMenuList className="space-x-4">
              <NavigationMenuItem
                onClick={() => {
                  setCurrentTabContext("init");
                }}
                className={`cursor-pointer text-primary-foreground p-2 rounded-sm hover:bg-primary transition-all ${
                  currentTabContext === "init" ? "bg-primary" : "bg-blue-400"
                }`}
              >
                Inicio
              </NavigationMenuItem>
              <NavigationMenuItem
                onClick={() => {
                  setCurrentTabContext("upload");
                }}
                className={`cursor-pointer text-primary-foreground p-2 rounded-sm hover:bg-primary transition-all ${
                  currentTabContext === "upload" ? "bg-primary" : "bg-blue-400"
                }`}
              >
                Nova medição
              </NavigationMenuItem>
              <NavigationMenuItem
                onClick={() => {
                  setCurrentTabContext("confirm");
                }}
                className={`cursor-pointer text-primary-foreground p-2 rounded-sm hover:bg-primary transition-all ${
                  currentTabContext === "confirm" ? "bg-primary" : "bg-blue-400"
                }`}
              >
                Confirmar medição
              </NavigationMenuItem>
              <NavigationMenuItem
                onClick={() => {
                  setCurrentTabContext("list");
                }}
                className={`cursor-pointer text-primary-foreground p-2 rounded-sm hover:bg-primary transition-all ${
                  currentTabContext === "list" ? "bg-primary" : "bg-blue-400"
                }`}
              >
                Listar medições
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
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
