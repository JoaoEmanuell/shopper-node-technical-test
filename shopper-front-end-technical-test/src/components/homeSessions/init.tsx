import { CurrentTabContext } from "@/contexts/currentTabContext";
import { CustomerCodeContext } from "@/contexts/customerCodeContext";
import { Anchor } from "@/components/ui/anchor";
import { useContext } from "react";

export const HomeInitSession = () => {
  const [customerCode, setCustomerCode] = useContext(CustomerCodeContext);
  const [currentTabContext, setCurrentTabContext] =
    useContext(CurrentTabContext);

  return (
    <div className="space-y-4">
      <p className="text-center text-lg">
        Seja bem vindo ao Dashboard de medição
        {customerCode !== "" ? `, ${customerCode}!` : "!"}
      </p>
      <p className="text-justify">
        Nessa aplicação você pode usar inteligência artificial para verificar o
        valor de medidores de forma automática, sem a necessidade de digitar os
        valores deles, pois a IA irá cuidar disso para você.
        <br />
        Para começar, acesse o botão de &quot;nova medição&quot;, clicando no
        menu ou{" "}
        <Anchor
          onClick={() => {
            setCurrentTabContext("upload");
          }}
        >
          aqui
        </Anchor>
        <br />
        Além disso, você pode{" "}
        <Anchor
          onClick={() => {
            setCurrentTabContext("list");
          }}
        >
          listar as medições
        </Anchor>{" "}
        ou ainda{" "}
        <Anchor
          onClick={() => {
            setCurrentTabContext("confirm");
          }}
        >
          confirmar
        </Anchor>{" "}
        uma medição já feita!
      </p>
    </div>
  );
};
