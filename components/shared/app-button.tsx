import * as React from "react"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type AppButtonProps = Omit<React.ComponentProps<typeof Button>, "variant" | "size"> & {
  variant?:
    | "primary"
    | "secondary"
    | "ghost"
    | "destructive"
    | "outline"
    | "link"
  size?: "md" | "sm"
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  loading?: boolean
}

const variantMap: Record<
  NonNullable<AppButtonProps["variant"]>,
  React.ComponentProps<typeof Button>["variant"]
> = {
  primary: "default",
  secondary: "secondary",
  ghost: "ghost",
  destructive: "destructive",
  outline: "outline",
  link: "link",
}

export function AppButton({
  className,
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  loading,
  children,
  ...props
}: AppButtonProps) {
  return (
    <Button
      variant={variantMap[variant]}
      size={size === "sm" ? "sm" : "default"}
      className={cn(
        "focus-ring rounded-[10px] text-sm focus-visible:ring-0 focus-visible:ring-offset-0 transition-transform active:translate-y-[1px]",
        size === "sm" ? "h-9 px-3" : "h-10 px-4",
        className
      )}
      disabled={props.disabled || loading}
      {...props}
    >
      {loading ? <Loader2 className="size-4 animate-spin" /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </Button>
  )
}
