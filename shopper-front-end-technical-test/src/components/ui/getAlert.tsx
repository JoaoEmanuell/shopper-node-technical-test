import { CircleAlert } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "./alert";

interface GetAlertProps {
  title: string;
  description: string;
  variant?: "default" | "destructive" | "success";
}

export const GetAlert = (props: GetAlertProps) => {
  const variant = props.variant || "destructive";
  const circleAlertColorHashMap = {
    default: "gray",
    destructive: "red",
    success: "green",
  };
  return (
    <Alert variant={variant}>
      <CircleAlert
        className="h-4 w-4"
        color={circleAlertColorHashMap[variant]}
      />
      <AlertTitle>{props.title}</AlertTitle>
      <AlertDescription>{props.description}</AlertDescription>
    </Alert>
  );
};
