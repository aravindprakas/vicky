import * as React from "react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

type Direction = "up" | "left" | "right" | "fade";

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: Direction;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
  duration?: number;
}

const hiddenMap: Record<Direction, string> = {
  up: "opacity-0 translate-y-8",
  left: "opacity-0 -translate-x-8",
  right: "opacity-0 translate-x-8",
  fade: "opacity-0",
};

export function Reveal({
  direction = "up",
  delay = 0,
  duration = 700,
  as: Tag = "div",
  className,
  style,
  children,
  ...rest
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const Comp = Tag as any;
  return (
    <Comp
      ref={ref}
      className={cn(
        "will-change-transform transition-all ease-out motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100",
        inView ? "opacity-100 translate-x-0 translate-y-0" : hiddenMap[direction],
        className,
      )}
      style={{ transitionDuration: `${duration}ms`, transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
