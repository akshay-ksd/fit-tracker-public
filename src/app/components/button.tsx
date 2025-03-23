import React from "react";
import { LucideIcon, icons } from "lucide-react";
import Ripples from 'react-ripples'

interface ButtonProps {
    shape?: "circle" | "square";
    size?: "small" | "medium" | "large";
    icon?: keyof typeof icons;
    color?: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
    shape = "square",
    size = "medium",
    icon,
    color = "transparent",
    onClick
}) => {
    const sizeClasses = {
        small: "w-8 h-8 text-sm",
        medium: "w-12 h-12 text-base",
        large: "w-16 h-16 text-lg",
    };

    const shapeClasses = {
        circle: "rounded-full",
        square: "rounded-md",
    };

    // Ensure icon is a valid key before using it
    const IconComponent: LucideIcon | null = icon && icons[icon] ? icons[icon] : null;

    return (
        <Ripples
            // className="inline-block"
            placeholder=""
            onPointerEnterCapture={() => { }}
            onPointerLeaveCapture={() => { }}
        >
            <button
                className={`flex items-center justify-center border border-gray-300 
      ${sizeClasses[size]} ${shapeClasses[shape]}`}
                style={{ backgroundColor: color }}
                onClick={onClick}
            >
                {IconComponent && <IconComponent size={20} />}
            </button>
        </Ripples>
    );
};

export default Button;
