import React, { InputHTMLAttributes } from "react";
import style from "./style.module.scss";
import cn from "classnames";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  classNames?: string;
}

const Input: React.FC<InputProps> = ({ placeholder = "Search", classNames, ...props }) => {
  return <input {...props} className={cn(style.input, classNames)} placeholder={placeholder} />;
};

export default Input;
