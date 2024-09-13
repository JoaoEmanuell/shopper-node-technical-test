import { z } from "zod";

export const confirmSchema = z.object({
  measure_uuid: z
    .string({
      message: "Id deve ser um texto",
    })
    .uuid("Id inválido"),
  confirmed_value: z.number({
    message: "Valor confirmado deve ser um número",
  }),
});
