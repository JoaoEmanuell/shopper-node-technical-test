import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./select";

type selectItemType = {
  text: string;
  value: string;
};

interface GetSelectProps {
  itens: selectItemType[];
  placeholder: string;
  onValueChange: (value: string) => void;
}

export const GetSelect = (props: GetSelectProps) => {
  return (
    <Select onValueChange={props.onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={props.placeholder} />
      </SelectTrigger>
      <SelectContent>
        {props.itens.map((item, index) => {
          return (
            <SelectItem value={item.value} key={index + item.text}>
              {item.text}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
