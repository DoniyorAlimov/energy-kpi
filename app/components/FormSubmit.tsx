import classNames from "classnames";
import React from "react";

const FormSubmit = ({
  label,
  disabled = false,
}: {
  label: string;
  disabled?: boolean;
}) => {
  return (
    <button
      className={classNames({
        "btn btn--primary": true,
        "btn--disabled": disabled,
      })}
      type="submit"
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default FormSubmit;
