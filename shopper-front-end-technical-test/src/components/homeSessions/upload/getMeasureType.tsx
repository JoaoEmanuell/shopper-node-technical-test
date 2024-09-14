import { GetSelect } from "@/components/ui/getSelect";
import { Label } from "@/components/ui/label";
import { measureTypeSchema } from "@/schemas/measureTypeSchema";

interface GetMeasureTypeProps {
  setMeasureType: (value: string) => void;
}

export const GetMeasureType = (props: GetMeasureTypeProps) => {
  return (
    <div>
      <Label htmlFor="">Selecione o tipo da medição</Label>
      <div className="mt-4">
        <GetSelect
          itens={measureTypeSchema}
          onValueChange={props.setMeasureType}
          placeholder="Tipo da medição"
        />
      </div>
    </div>
  );
};
