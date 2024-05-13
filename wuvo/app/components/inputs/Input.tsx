'use client';
import clsx from "clsx";
import React from "react";
import { FieldErrors,FieldValues,UseFormRegister } from "react-hook-form";


//interface for input. to specify what is reqired for this object:
interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?:boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?:boolean;
}

const Input: React.FC<InputProps> = ({
    label,
    id,
    type,
    required,
    register,
    errors,
    disabled
}) => {
  return (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-red-900">
          {label}
        </label>
    </div>
  )
}

export default Input