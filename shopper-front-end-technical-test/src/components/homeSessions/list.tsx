"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { CustomerCodeContext } from "@/contexts/customerCodeContext";
import { useContext, useState } from "react";
import { measureTypeSchema } from "@/schemas/measureTypeSchema";
import { GetSelect } from "../ui/getSelect";
import { axios } from "@/lib/axios";
import { GetAlert } from "../ui/getAlert";
import { DataTable } from "../ui/dataTable";
import { ListDataTableColumnsSchema } from "@/schemas/listDataTableSchema";
import { LastMeasureTypeContext } from "@/contexts/lastMeasureTypeContext";

export type measureApiType = {
  measure_uuid: string;
  measure_datetime: string;
  measure_type: "water" | "gas";
  has_confirmed: boolean;
  image_url: string;
};

const measureTypeHashmap = {
  water: "Água",
  gas: "Gás",
};

export const HomeListSession = () => {
  const [customerCode, setCustomerCode] = useContext(CustomerCodeContext);
  const [measureType, setMeasureType] = useContext(LastMeasureTypeContext);
  const [measures, setMeasures] = useState<measureApiType[] | null>(null);
  const [alert, setAlert] = useState<JSX.Element | null>(null);

  const getMeasures = async () => {
    setAlert(null); // reset alert
    if (measureType === "") {
      setAlert(
        <GetAlert
          title="Alerta"
          description="Selecione o tipo de medição"
          variant="warning"
        ></GetAlert>
      );
      return;
    }
    const response = await axios.get(
      `${customerCode}/list?measure_type=${measureType}`
    );
    if (response.status === 200) {
      const data = JSON.parse(response.data);
      setMeasures(data.measures);
    } else if (response.status === 400 || response.status === 404) {
      const data = JSON.parse(response.data);
      setAlert(<GetAlert title="Erro" description={data.error_description} />);
    } else {
      setAlert(<GetAlert title="Erro" description="Erro desconhecido" />);
    }
  };

  return (
    <div className="space-y-4">
      <div>{alert}</div>
      <div className="space-y-4">
        <Label htmlFor="customerCodeInput">Código do cliente</Label>
        <Input
          type="text"
          id="customerCodeInput"
          placeholder="Código do cliente"
          defaultValue={customerCode}
          onChange={(event) => {
            setCustomerCode(event.target.value);
          }}
        />
        <GetSelect
          itens={measureTypeSchema}
          onValueChange={setMeasureType}
          placeholder={
            measureType
              ? measureTypeHashmap[measureType as "water" | "gas"]
              : "Tipo da medição"
          }
        />
        <Button onClick={getMeasures}>Listar medições</Button>
      </div>
      <div>
        {measures && (
          <DataTable columns={ListDataTableColumnsSchema()} data={measures} />
        )}
      </div>
    </div>
  );
};
