import * as React from "react";
import { cn } from "@utils/classname";
import { Label } from "./label";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  message?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, message, ...props }, ref) => {
    return (
      <div>
        {label && <Label>{label}</Label>}
        <input
          type={type}
          className={cn(
            "mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {message && <p className="text-muted text-sm">{message}</p>}
        {error && <p className="text-red-600 text-xs">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
