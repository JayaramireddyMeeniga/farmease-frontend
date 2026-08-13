import * as React from "react";
import { cn } from "../../lib/utils";

const Input = React.forwardRef(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          // Base
          "w-full text-sm p-3 rounded-sm border bg-white",

          // Border styles
          error
            ? "border-red-500 focus-visible:ring-red-500"
            : "border-gray-300 focus-visible:ring-green-500",

          // Focus styles
          "focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-2",

          // Shadow & transition
          "shadow-sm transition-all duration-200",

          // Placeholder
          "placeholder:text-gray-400",

          // Disabled
          "disabled:opacity-50 disabled:cursor-not-allowed",

          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
