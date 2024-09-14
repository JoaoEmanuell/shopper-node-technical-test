"use client";

import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import { cn } from "@/lib/utils";
import {
  PopoverContent,
  PopoverContentProps,
  PopoverProps,
  PopoverTriggerProps,
} from "@radix-ui/react-popover";
import { Popover, PopoverTrigger } from "./popover";
import { TouchContext } from "@/contexts/touchContext";

const useTouch = () => React.useContext(TouchContext);

const HoverCard = (props: HoverCardPrimitive.HoverCardProps & PopoverProps) => {
  const isTouch = useTouch();
  return isTouch ? (
    <Popover {...props} />
  ) : (
    <HoverCardPrimitive.Root {...props} />
  );
};

const HoverCardTrigger = (
  props: HoverCardPrimitive.HoverCardTriggerProps & PopoverTriggerProps
) => {
  const isTouch = useTouch();
  return isTouch ? (
    <PopoverTrigger {...props} />
  ) : (
    <HoverCardPrimitive.Trigger {...props} />
  );
};

const HoverCardContent = (
  props: HoverCardPrimitive.HoverCardContentProps & PopoverContentProps
) => {
  const isTouch = useTouch();
  const ref = props.itemRef;
  const align = "center";
  const sideOffset = 4;
  const className = cn(
    "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
    props.className
  );

  return isTouch ? (
    <PopoverContent {...props} className={className} />
  ) : (
    <HoverCardPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={className}
      {...props}
    />
  );
};

HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };
