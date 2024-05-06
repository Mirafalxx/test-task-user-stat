import React, { ButtonHTMLAttributes } from "react";
import cn from "classnames";
import style from "./style.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  classNames?: string;
}
const Button: React.FC<ButtonProps> = ({ children, classNames, ...props }) => {
  return (
    <button {...props} className={cn(style.button, classNames)}>
      {children}
    </button>
  );
};

export default Button;
