import { Label } from "@/components/ui/label";

interface GetDateProps {
  date: Date;
  setDate: (date: Date) => void;
}

export const GetDate = (props: GetDateProps) => {
  return (
    <div>
      <Label htmlFor="date">Agora, selecione a data da medição</Label>
      <div className="mt-4">
        <input
          type="date"
          id="date"
          defaultValue={props.date?.toLocaleDateString("en-CA")}
          onChange={(input) => {
            props.setDate(new Date(input.target.value));
          }}
        />
      </div>
    </div>
  );
};
