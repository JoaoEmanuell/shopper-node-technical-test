import { z } from "zod";

export const uploadSchema = z.object({
  customer_code: z
    .string({
      message: "Código do cliente deve ser um texto",
    })
    .min(1, "Código do cliente não pode estar vazio"),
  measure_datetime: z.date({
    message: "Data inválida",
  }),
  measure_type: z.enum(["water", "gas"], {
    message: "TIpo de medição inválida",
  }),
  image: z
    .string({
      message: "Imagem inválida",
    })
    .base64("Imagem inválida"),
});
