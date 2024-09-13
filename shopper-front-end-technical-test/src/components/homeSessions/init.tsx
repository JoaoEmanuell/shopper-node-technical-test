import { CustomerCodeContext } from "@/contexts/customerCodeContext";
import { useContext } from "react";

export const HomeInitSession = () => {
  const [customerCode, setCustomerCode] = useContext(CustomerCodeContext);
  return (
    <div>
      <p className="mx-4">
        Seja bem vindo ao Dashboard de medição,{" "}
        {customerCode !== "" ? `${customerCode}!` : ""}
      </p>
      <p className="mx-4">Use o menu acima para navegar entre as ações.</p>
    </div>
  );
};
