/* eslint-disable @next/next/no-img-element */
"use client";

import { useContext, useState } from "react";

import { CustomerCodeContext } from "@/contexts/customerCodeContext";
import { Button } from "../ui/button";
import { GetCustomerCode } from "./upload/getCustomerCode";
import { GetDate } from "./upload/getDate";
import { GetMeasureType } from "./upload/getMeasureType";
import { GetPhoto } from "./upload/getPhoto";
import { z } from "zod";
import { GetAlert } from "../ui/getAlert";
import { uploadSchema } from "@/schemas/uploadZodSchema";
import { LastMeasureUUIDContext } from "@/contexts/lastMeasureUUIDContext";
import { LastMeasureValueContext } from "@/contexts/lastMeasureValueContext";
import { CurrentTabContext } from "@/contexts/currentTabContext";
import { Anchor } from "../ui/anchor";
import { axios } from "@/lib/axios";

type apiMeasureDataType = {
  image_url: string;
  measure_value: number;
  measure_uuid: string;
};

export const HomeUploadSession = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [step, setStep] = useState(0);
  const [customerCode, setCustomerCode] = useContext(CustomerCodeContext);
  const [lastMeasureUUIDContext, setLastMeasureUUIDContext] = useContext(
    LastMeasureUUIDContext
  );
  const [lastMeasureValueContext, setLastMeasureValueContext] = useContext(
    LastMeasureValueContext
  );
  const [currentTabContext, setCurrentTabContext] =
    useContext(CurrentTabContext);

  const [measureType, setMeasureType] = useState("");
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [alert, setAlert] = useState<JSX.Element | null>(null);
  const [apiMeasureData, setApiMeasureData] =
    useState<apiMeasureDataType | null>(null);
  const [nextButtonDisable, setNextButtonDisable] = useState(false);

  const stepsHashMap = {
    customer_code: 0,
    date: 1,
    measure_type: 2,
    image: 3,
    sendToApi: 4,
    end: 5,
  };

  const sendPhotoToApi = async () => {
    const data = {
      customer_code: customerCode,
      measure_datetime: date,
      measure_type: measureType,
      image: imageBase64,
    };

    try {
      uploadSchema.parse(data);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const firstError = err.issues[0];
        setAlert(<GetAlert description={firstError.message} title="Erro" />);
        const path = firstError.path[0] as
          | "customer_code"
          | "date"
          | "measure_type"
          | "image";
        setStep(stepsHashMap[path]);
        return;
      }
    }

    setNextButtonDisable(true);

    const response = await axios.post("upload", JSON.stringify(data));

    if (response.status === 200) {
      const json = JSON.parse(response.data);
      setApiMeasureData(json as apiMeasureDataType);
      setLastMeasureUUIDContext(json["measure_uuid"]);
      setLastMeasureValueContext(json["measure_value"]);
      setStep(5); // end
    } else if (response.status === 400 || response.status === 409) {
      const json = JSON.parse(response.data);
      setAlert(
        <GetAlert title="Erro" description={json["error_description"]} />
      );
      setStep(3); // upload
    } else {
      setAlert(<GetAlert title="Erro" description="Erro desconhecido" />);
    }

    setNextButtonDisable(false);
  };

  const nextButton = async () => {
    const newStep = step + 1;
    setStep(newStep);
    if (newStep === 4) {
      await sendPhotoToApi();
    }
    if (newStep !== 4) setAlert(null); // reset alert
  };

  const previousButton = () => {
    const previous = step - 1;
    if (previous === 4) {
      setStep(3); // image
      return;
    }
    setStep(previous);
  };

  return (
    <div>
      <div>{alert}</div>
      <div className={`${step === 0 ? "" : "hidden"}`}>
        <GetCustomerCode />
      </div>
      <div className={`${step === 1 ? "" : "hidden"}`}>
        <GetDate date={date} setDate={setDate} />
      </div>
      <div className={`${step === 2 ? "" : "hidden"}`}>
        <GetMeasureType setMeasureType={setMeasureType} />
      </div>
      <div className={`${step === 3 ? "" : "hidden"}`}>
        <GetPhoto setImageBase64={setImageBase64} />
      </div>
      <div className={`${step === 4 ? "" : "hidden"}`}>
        <p>Analisando foto, aguarde um pouco...</p>
      </div>
      <div className={`${step === 5 ? "" : "hidden"}`}>
        {apiMeasureData && (
          <div className="space-y-4">
            <p>Foto analisada com sucesso!</p>
            <img
              src={apiMeasureData.image_url}
              alt="Imagem do medidor salva na api"
            />
            <p>Valor da medição: {apiMeasureData.measure_value}</p>
            <p>Id da medição: {apiMeasureData.measure_uuid}</p>
            <p>
              Você pode confirmar a medição{" "}
              <Anchor
                href="#"
                className="text-primary underline-offset-4 hover:underline"
                onClick={() => {
                  setCurrentTabContext("confirm");
                }}
                variant="blue"
              >
                clicando aqui
              </Anchor>
            </p>
          </div>
        )}
      </div>
      <div className="mt-4">
        <Button
          variant="secondary"
          className={`${step !== 0 ? "mr-4" : "hidden"}`}
          onClick={() => {
            previousButton();
          }}
        >
          Anterior
        </Button>
        <Button
          className={`${step !== 0 ? "" : ""}`}
          onClick={() => {
            nextButton();
          }}
          disabled={nextButtonDisable || step === 5}
        >
          Próximo
        </Button>
      </div>
    </div>
  );
};
