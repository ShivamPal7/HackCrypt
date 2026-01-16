import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { cn } from "../../lib/utils";

interface ButtonProps extends React.ComponentProps<typeof TouchableOpacity> {
    variant?: "primary" | "secondary" | "ghost" | "link";
    size?: "default" | "sm" | "lg";
    isLoading?: boolean;
    className?: string;
    textClassName?: string;
    children: React.ReactNode;
}

export function Button({
    variant = "primary",
    size = "default",
    isLoading = false,
    className,
    textClassName,
    children,
    disabled,
    ...props
}: ButtonProps) {
    const baseStyles = "flex-row items-center justify-center rounded-xl";

    const variants = {
        primary: "bg-primary active:opacity-90",
        secondary: "bg-secondary",
        ghost: "bg-transparent",
        link: "bg-transparent",
    };

    const sizes = {
        default: "h-14 px-4",
        sm: "h-10 px-3",
        lg: "h-16 px-8",
    };

    const textBaseStyles = "font-inter-semibold text-base";

    const textVariants = {
        primary: "text-primary-foreground",
        secondary: "text-secondary-foreground",
        ghost: "text-primary",
        link: "text-primary",
    };

    return (
        <TouchableOpacity
            className={cn(
                baseStyles,
                variants[variant],
                sizes[size],
                (disabled || isLoading) && "opacity-50",
                className
            )}
            disabled={disabled || isLoading}
            activeOpacity={0.8}
            {...props}
        >
            {isLoading ? (
                <ActivityIndicator color={variant === "primary" ? "#0B0F14" : "#6CFFC4"} />
            ) : (
                <Text className={cn(textBaseStyles, textVariants[variant], textClassName)}>
                    {children}
                </Text>
            )}
        </TouchableOpacity>
    );
}
