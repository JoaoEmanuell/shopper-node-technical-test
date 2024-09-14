/* eslint-disable @next/next/no-img-element */
"use client";

import { ImageCarousel } from "@/components/ui/imageCarousel";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useRef, useState } from "react";

interface GetPhotoProps {
  setImageBase64: (image: string) => void;
}

export const GetPhoto = (props: GetPhotoProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const examplesMetersImage = [
    {
      src: "/images/hidrometro-1.jpg",
      alt: "Hidrômetro",
    },
    {
      src: "/images/hidrometro-2.jpg",
      alt: "Hidrômetro",
    },
    {
      src: "/images/medidor-de-gas-1.jpg",
      alt: "Medidor de gás",
    },
    {
      src: "/images/medidor-gas-2.jpg",
      alt: "Medidor de gás",
    },
  ];

  const cameraButtonClick = () => {
    fileInputRef.current!.click();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    // props.setSelectedFile(file);
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result); // Define a URL da imagem no estado
        props.setImageBase64(
          (reader.result as string).replace("data:image/jpeg;base64,", "") // remove the expression to make a real base 64
        );
      };
      reader.readAsDataURL(file); // Lê o arquivo como URL de dados
    } else {
      setPreviewUrl(null); // Limpa a pré-visualização se não for uma imagem
    }
  };
  return (
    <div>
      <p className="text-justify">
        Agora chegou a hora de tirar a foto, veja os exemplos abaixo de
        medidores para ter uma ideia, quando estiver pronto clique em
        &quot;Tirar foto&quot;, será solicitado permissão ao navegador, conceda
        e tire a foto do medidor.
      </p>
      <div className="flex justify-center items-center mt-4">
        <ImageCarousel images={examplesMetersImage} />
      </div>
      <div>
        <Button className="mt-4" onClick={cameraButtonClick}>
          <div className="flex justify-between space-x-2 items-center align-middle">
            <Camera />
            <span>Tirar foto</span>
            <input
              type="file"
              name=""
              id=""
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
        </Button>
      </div>
      <div className="mt-4">
        {previewUrl ? (
          <div className="w-96 max-w-xl">
            <p>Prévia:</p>
            <img
              src={previewUrl}
              alt="Prévia"
              className="relative h-[20rem] rounded"
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
