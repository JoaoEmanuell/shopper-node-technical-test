/* eslint-disable @next/next/no-img-element */
import { measureApiType } from "@/components/homeSessions/list";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CurrentTabContext } from "@/contexts/currentTabContext";
import { LastMeasureUUIDContext } from "@/contexts/lastMeasureUUIDContext";
import { LastMeasureValueContext } from "@/contexts/lastMeasureValueContext";
import { useContext } from "react";
import { Anchor } from "@/components/ui/anchor";

export const ListDataTableColumnsSchema = () => {
  const [lastMeasureUUIDContext, setLastMeasureUUIDContext] = useContext(
    LastMeasureUUIDContext
  );

  const [currentTabContext, setCurrentTabContext] =
    useContext(CurrentTabContext);

  return [
    {
      accessorKey: "measure_uuid",
      header: "Id",
      cell: ({ row }) => {
        const id = row.getValue("measure_uuid") as string;
        return (
          <Anchor
            variant="blue"
            onClick={() => {
              setLastMeasureUUIDContext(id);
              setCurrentTabContext("confirm");
            }}
          >
            {id}
          </Anchor>
        );
      },
    },
    {
      accessorKey: "measure_datetime",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Data
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const formatDate = new Date(row.getValue("measure_datetime"));
        return <p>{formatDate.toLocaleDateString()}</p>;
      },
    },
    {
      accessorKey: "has_confirmed",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Confirmada
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const color = {
          Confirmada: "text-green-500",
          "Não confirmada": "text-red-500",
        };
        const confirmed = row.getValue("has_confirmed") as boolean;
        const confirmedString = confirmed ? "Confirmada" : "Não confirmada";
        return (
          <p
            className={`text-center ${color[confirmedString]} cursor-pointer hover:underline`}
            onClick={() => {
              setLastMeasureUUIDContext(row.getValue("measure_uuid"));
              setCurrentTabContext("confirm");
            }}
          >
            {confirmedString}
          </p>
        );
      },
    },
    {
      accessorKey: "image_url",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Imagem
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <a href={row.getValue("image_url")} target="_blank">
            <img
              src={row.getValue("image_url")}
              alt="Imagem do medidor salva na api"
              className="object-scale-down w-36 h-36 hover:scale-110 transition-all"
            />
          </a>
        );
      },
    },
  ] as ColumnDef<measureApiType>[];
};
