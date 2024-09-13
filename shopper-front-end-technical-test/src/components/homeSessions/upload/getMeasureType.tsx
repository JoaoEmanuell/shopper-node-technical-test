import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface GetMeasureTypeProps {
  setMeasureType: (value: string) => void;
}

export const GetMeasureType = (props: GetMeasureTypeProps) => {
  return (
    <div>
      <Label htmlFor="">Selecione o tipo da medição</Label>
      <div className="mt-4">
        <Select
          onValueChange={(value) => {
            props.setMeasureType(value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tipo da medição" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="water">Água</SelectItem>
            <SelectItem value="gas">Gás</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
