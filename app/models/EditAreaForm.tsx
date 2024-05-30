"use client";

import { Asset } from "@/entities/Assets";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { areaSchema } from "../validationSchema";
import { AreaFormData } from "./CreateAreaForm";

const EditAreaForm = ({
  area,
  isFormVisible,
  onHandleSubmit,
}: {
  area: Asset;
  isFormVisible?: boolean;
  onHandleSubmit: (dataa: AreaFormData) => void;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AreaFormData>({
    resolver: zodResolver(areaSchema),
  });

  const onSubmit = async (data: AreaFormData) => {
    onHandleSubmit(data);
  };

  useEffect(() => {
    if (!isFormVisible) reset();
  }, [isFormVisible, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input__group">
        <label htmlFor="name" className="input__label">
          Area Name
        </label>
        <input
          id="name"
          type="text"
          className="input"
          placeholder="Area name"
          {...register("name")}
          defaultValue={area.name}
        />
        {errors.name && <p className="input__error">{errors.name.message}</p>}
      </div>

      <div className="mt-10 flex justify-end w-full">
        <button className="btn btn--primary w-24" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default EditAreaForm;
