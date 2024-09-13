import { CircleAlert } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "./alert";

interface GetAlertProps {
  title: string;
  description: string;
}

export const GetAlert = (props: GetAlertProps) => {
  return (
    <Alert variant="destructive">
      <CircleAlert className="h-4 w-4" color="red" />
      <AlertTitle>{props.title}</AlertTitle>
      <AlertDescription>{props.description}</AlertDescription>
    </Alert>
  );
};
