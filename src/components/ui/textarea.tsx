import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ```
  /**
   * Renders a textarea component with customizable styling and functionality.
   * @param {Object} props - The component props.
   * @param {string} [props.className] - Additional CSS class names to apply to the textarea.
   * @param {React.Ref} ref - The ref to be forwarded to the textarea element.
   * @returns {JSX.Element} A styled textarea element with forwarded props and ref.
   */
  ```
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
