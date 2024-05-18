'use client';
import clsx from "clsx";
import React, { useState } from "react";
import { FieldErrors,FieldValues,UseFormRegister } from "react-hook-form";
import { RiEyeCloseLine } from "react-icons/ri";
import { RiEyeLine } from "react-icons/ri";

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
    <div className="w-full">
        <label htmlFor={id} className="block text-sm font-medium text-red-900"> {/*Clicking on the label will focus on the associated input field.*/}
          {label}
        </label>
        <div className="mt-1">
          <input id={id} type={type} autoComplete={id} disabled={disabled}
          {...register(id, { required })}
          className={clsx(
            `form-input block
             w-full
            rounded-md 
            border-0 py-1.5 text-red-950 shadow-sm ring-1 
            ring-inset ring-stone-300 placeholder:text-stone-400 
            focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6
            `,
            errors[id] && "focus:ring-red-500" ,
            disabled && "opacity-50 cursor-not-allowed"
          )}
          /> 
        </div>
    </div>
  )
}

export default Input