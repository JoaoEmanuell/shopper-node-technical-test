"use client";

import { useContext, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "./ui/navigation-menu";
import { HomeInitSession } from "./homeSessions/init";
import { HomeUploadSession } from "./homeSessions/upload";
import { CustomerCodeContext } from "@/contexts/customerCodeContext";

export const HomeComponent = () => {
  const [activeTab, setActiveTab] = useState("init");
  return (
    <div>
      <h1 className="text-xl mt-4 mx-2">Dashboard de medição</h1>
      <header className="py-4 pl-2 flex items-center justify-between select-none">
        <div className="flex gap-4 mr-4">
          <NavigationMenu>
            <NavigationMenuList className="space-x-4">
              <NavigationMenuItem
                onClick={() => {
                  setActiveTab("init");
                }}
                className={`cursor-pointer text-primary-foreground p-2 rounded-sm hover:bg-primary transition-all ${
                  activeTab === "init" ? "bg-primary" : "bg-blue-400"
                }`}
              >
                Inicio
              </NavigationMenuItem>
              <NavigationMenuItem
                onClick={() => {
                  setActiveTab("upload");
                }}
                className={`cursor-pointer text-primary-foreground p-2 rounded-sm hover:bg-primary transition-all ${
                  activeTab === "upload" ? "bg-primary" : "bg-blue-400"
                }`}
              >
                Nova medição
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>
      <main className="flex-1 bg-background p-8">
        {activeTab === "init" && (
          <div className="bg-card text-card-foreground rounded-lg p-6 shadow-md overflow-x-auto">
            <HomeInitSession />
          </div>
        )}
        {activeTab === "upload" && (
          <div className="bg-card text-card-foreground rounded-lg p-6 shadow-md overflow-x-auto">
            <HomeUploadSession />
          </div>
        )}
      </main>
    </div>
  );
};
