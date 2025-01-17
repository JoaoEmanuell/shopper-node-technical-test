import { LastMeasureUUIDContext } from "@/contexts/lastMeasureUUIDContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { confirmSchema } from "@/schemas/confirmZodSchema";
import { z } from "zod";
import { GetAlert } from "../ui/getAlert";
import { LastMeasureValueContext } from "@/contexts/lastMeasureValueContext";
import { axios } from "@/lib/axios";

export const HomeConfirmSession = () => {
  const [lastMeasureUUIDContext, setLastMeasureUUIDContext] = useContext(
    LastMeasureUUIDContext
  );
  const [lastMeasureValueContext, setLastMeasureValueContext] = useContext(
    LastMeasureValueContext
  );

  const [measureUUID, setMeasureUUID] = useState(lastMeasureUUIDContext);
  const [measureValue, setMeasureValue] = useState(lastMeasureValueContext);

  const [alert, setAlert] = useState<JSX.Element | null>(null);

  const confirmButtonClick = async () => {
    setAlert(null);
    const data = {
      measure_uuid: measureUUID,
      confirmed_value: Math.abs(parseInt(measureValue as unknown as string)),
    };

    try {
      confirmSchema.parse(data);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const firstError = err.issues[0];
        setAlert(<GetAlert description={firstError.message} title="Erro" />);
        return;
      }
    }

    const response = await axios.patch("confirm", JSON.stringify(data));
    if (response.status === 200) {
      setAlert(
        <GetAlert
          title="Informação"
          description="Medição confirmada com sucesso!"
          variant="success"
        ></GetAlert>
      );
    } else if (
      response.status === 400 ||
      response.status === 409 ||
      response.status === 404
    ) {
      const json = JSON.parse(response.data);
      setAlert(
        <GetAlert
          title="Error"
          description={json["error_description"]}
        ></GetAlert>
      );
    } else {
      setAlert(
        <GetAlert title="Error" description="Erro desconhecido!"></GetAlert>
      );
    }
  };

  return (
    <div className="space-y-4">
      <div>{alert}</div>
      <div className="space-y-2">
        <Label htmlFor="inputMeasureUUID">Id da medição: </Label>
        <Input
          id="inputMeasureUUID"
          type="text"
          onChange={(event) => {
            setMeasureUUID(event.target.value);
          }}
          defaultValue={lastMeasureUUIDContext}
          placeholder="Id da medição"
          minLength={0}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="inputMeasureValue">Valor da medição: </Label>
        <Input
          id="inputMeasureValue"
          type="number"
          min={0}
          onChange={(event) => {
            setMeasureValue(event.target.value as unknown as number);
          }}
          defaultValue={lastMeasureValueContext}
          placeholder="Valor da medição"
        />
      </div>
      <Button onClick={confirmButtonClick}>Confirmar medição</Button>
    </div>
  );
};
