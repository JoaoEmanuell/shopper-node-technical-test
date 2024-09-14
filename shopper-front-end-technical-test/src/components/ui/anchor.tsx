import { AnchorHTMLAttributes, PropsWithChildren } from "react";

interface anchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant: "blue";
}

export const Anchor = (props: PropsWithChildren<anchorProps>) => {
  const variants = {
    blue: "text-primary underline-offset-4 hover:underline cursor-pointer",
  };
  return (
    <a {...props} className={variants[props.variant]}>
      {props.children}
    </a>
  );
};
