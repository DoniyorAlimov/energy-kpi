"use client";

import { Asset } from "@/entities/Assets";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormInput from "../components/FormInput";
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
      <FormInput<AreaFormData>
        label="Area name"
        placeholder="Name"
        defaultValue={area.name}
        name="name"
        register={register}
      />

      <div className="mt-10 flex justify-end w-full">
        <button className="btn btn--primary w-24" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default EditAreaForm;
