"use client";

import { Asset } from "@/entities/Assets";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { areaSchema } from "../validationSchema";
import createArea from "./actions/createArea";

export type AreaFormData = z.infer<typeof areaSchema>;

const AreaForm = ({
  area,
  onSucces,
  isFormVisible,
}: {
  area?: Asset;
  onSucces?: () => void;
  isFormVisible?: boolean;
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
    const response = await createArea(data.name, area?.id!);
    if (response?.error) {
      toast.error(response.error);
    } else {
      toast.success("Area added");
      reset();
      if (onSucces) onSucces();
    }
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
        />
        {errors.name && <p className="input__error">{errors.name.message}</p>}
      </div>
      {area && (
        <div className="input__group">
          <label htmlFor="parent" className="input__label">
            Parent Area
          </label>
          <input
            id="parent"
            type="text"
            className="input input--disabled"
            disabled
            value={area.name || ""}
          />
        </div>
      )}
      <div className="mt-10 flex justify-end w-full">
        <button className="btn btn--primary w-24" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default AreaForm;
