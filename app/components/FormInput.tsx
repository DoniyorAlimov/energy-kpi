import React from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

const FormInput = <T extends FieldValues>({
  label,
  name,
  placeholder,
  disabled = false,
  defaultValue = "",
  error,
  register,
}: {
  label: string;
  placeholder?: string;
  disabled?: boolean;
  defaultValue?: string;
  error?: string;
  name: Path<T>;
  register?: UseFormRegister<T>;
}) => {
  return (
    <div className="input__group">
      <label htmlFor={name} className="input__label">
        {label}
      </label>
      <input
        id={name}
        type="text"
        className="input"
        placeholder={placeholder}
        disabled={disabled}
        defaultValue={defaultValue}
        {...(register ? register(name) : {})}
      />
      {error && <p className="input__error">{error}</p>}
    </div>
  );
};

export default FormInput;
