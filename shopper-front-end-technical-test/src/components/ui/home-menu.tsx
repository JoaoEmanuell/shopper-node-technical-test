import { TouchContext } from "@/contexts/touchContext";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
} from "./menubar";
import { useContext } from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "./navigation-menu";
import { CurrentTabContext } from "@/contexts/currentTabContext";

export const CreateHomeMenu = () => {
  const useTouch = () => useContext(TouchContext);
  const [currentTabContext, setCurrentTabContext] =
    useContext(CurrentTabContext);

  const getNavigatorClassName = (currentTab: string) => {
    return `cursor-pointer text-primary-foreground p-2 rounded-sm hover:bg-primary transition-all ${
      currentTabContext === currentTab ? "bg-primary" : "bg-blue-400"
    }`;
  };

  let isTouch = true;

  isTouch = useTouch();

  return isTouch ? (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Menu</MenubarTrigger>
        <MenubarContent>
          <MenubarItem
            onClick={() => {
              setCurrentTabContext("init");
            }}
            className={getNavigatorClassName("init")}
          >
            Inicio
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem
            onClick={() => {
              setCurrentTabContext("upload");
            }}
            className={getNavigatorClassName("upload")}
          >
            Nova medição
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem
            onClick={() => {
              setCurrentTabContext("confirm");
            }}
            className={getNavigatorClassName("confirm")}
          >
            Confirmar medição
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem
            onClick={() => {
              setCurrentTabContext("list");
            }}
            className={getNavigatorClassName("list")}
          >
            Listar medições
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ) : (
    <NavigationMenu>
      <NavigationMenuList className="space-x-4">
        <NavigationMenuItem
          onClick={() => {
            setCurrentTabContext("init");
          }}
          className={getNavigatorClassName("init")}
        >
          Inicio
        </NavigationMenuItem>
        <NavigationMenuItem
          onClick={() => {
            setCurrentTabContext("upload");
          }}
          className={getNavigatorClassName("upload")}
        >
          Nova medição
        </NavigationMenuItem>
        <NavigationMenuItem
          onClick={() => {
            setCurrentTabContext("confirm");
          }}
          className={getNavigatorClassName("confirm")}
        >
          Confirmar medição
        </NavigationMenuItem>
        <NavigationMenuItem
          onClick={() => {
            setCurrentTabContext("list");
          }}
          className={getNavigatorClassName("list")}
        >
          Listar medições
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
