import { AnchorHTMLAttributes, PropsWithChildren } from "react";

interface anchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "blue";
}

export const Anchor = (props: PropsWithChildren<anchorProps>) => {
  const variants = {
    blue: "text-primary underline-offset-4 hover:underline cursor-pointer",
  };
  const variant = props.variant ? variants[props.variant] : variants.blue
  return (
    <a {...props} className={variant}>
      {props.children}
    </a>
  );
};
