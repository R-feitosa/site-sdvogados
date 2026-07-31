import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-light shadow-sm hover:shadow-md",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Glass Variants
        glass: "bg-[hsl(0_0%_100%_/_0.08)] backdrop-blur-xl border border-[hsl(0_0%_100%_/_0.15)] text-foreground hover:bg-[hsl(0_0%_100%_/_0.15)] hover:border-[hsl(0_0%_100%_/_0.25)] shadow-lg",
        glassAccent: "bg-[hsl(0_0%_100%_/_0.08)] backdrop-blur-xl border border-accent/30 text-foreground hover:bg-[hsl(0_0%_100%_/_0.12)] hover:border-accent/50 shadow-lg",
        hero: "bg-[hsl(0_0%_100%_/_0.08)] backdrop-blur-xl border border-[hsl(0_0%_100%_/_0.15)] text-foreground hover:bg-[hsl(0_0%_100%_/_0.15)] hover:border-[hsl(0_0%_100%_/_0.25)] shadow-lg",
        heroOutline: "bg-transparent text-foreground border-2 border-foreground/30 hover:bg-foreground/10 hover:border-foreground/50 backdrop-blur-sm",
        gold: "bg-accent text-accent-foreground hover:bg-accent/90 shadow-md hover:shadow-lg font-semibold",
        whatsapp: "bg-[#25D366] text-white hover:bg-[#20BA5C] shadow-md hover:shadow-lg font-medium",
        premium: "bg-gradient-to-r from-primary to-primary-light text-primary-foreground shadow-lg hover:shadow-xl hover:-translate-y-0.5 border border-accent/20",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-full px-3",
        lg: "h-12 rounded-full px-8 text-base",
        xl: "h-14 rounded-full px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
