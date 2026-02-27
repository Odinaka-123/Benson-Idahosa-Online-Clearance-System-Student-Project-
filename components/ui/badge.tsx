import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-xl border-l-4 p-5 shadow-md transition-all duration-200 ease-in-out [&>svg~*]:pl-10 [&>svg+div]:translate-y-[-2px] [&>svg]:absolute [&>svg]:left-5 [&>svg]:top-5 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default:
          "border-blue-500 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100",
        destructive:
          "border-red-500 bg-red-50 text-red-900 dark:bg-red-900/20 dark:text-red-100 [&>svg]:text-red-500",
        success:
          "border-green-500 bg-green-50 text-green-900 dark:bg-green-900/20 dark:text-green-100 [&>svg]:text-green-500",
        warning:
          "border-yellow-500 bg-yellow-50 text-yellow-900 dark:bg-yellow-900/20 dark:text-yellow-100 [&>svg]:text-yellow-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className, "hover:shadow-lg")}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      "mb-1 text-base font-semibold leading-tight tracking-wide",
      className
    )}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-sm text-gray-700 dark:text-gray-300 [&_p]:leading-relaxed",
      className
    )}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
