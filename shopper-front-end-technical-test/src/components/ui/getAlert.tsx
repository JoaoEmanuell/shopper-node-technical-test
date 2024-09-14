"use state";

import { CircleAlert, TriangleAlert } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "./alert";
import { useEffect, useState } from "react";

interface GetAlertProps {
  title: string;
  description: string;
  variant?: "default" | "destructive" | "success" | "warning";
}

export const GetAlert = (props: GetAlertProps) => {
  const [icon, setIcon] = useState<JSX.Element | undefined>();
  const variant = props.variant || "destructive";
  const circleAlertColorHashMap = {
    default: "gray",
    destructive: "red",
    success: "green",
    warning: "yellow",
  };
  const constructIcon = () => {
    if (props.variant === "warning") {
      setIcon(<TriangleAlert className="h-4 w-4" color="yellow" />);
    } else {
      setIcon(
        <CircleAlert
          className="h-4 w-4"
          color={circleAlertColorHashMap[variant]}
        />
      );
    }
  };

  useEffect(() => {
    constructIcon();
  }, []);

  return (
    <Alert variant={variant}>
      {icon}
      <AlertTitle>{props.title}</AlertTitle>
      <AlertDescription>{props.description}</AlertDescription>
    </Alert>
  );
};
