import React from "react";

const FormSubmit = ({ label }: { label: string }) => {
  return (
    <button className="btn btn--primary" type="submit">
      {label}
    </button>
  );
};

export default FormSubmit;
