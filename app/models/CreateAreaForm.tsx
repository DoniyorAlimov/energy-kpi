"use client";

import { Asset } from "@/entities/Assets";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormInput from "../components/FormInput";
import FormSubmit from "../components/FormSubmit";
import { AreaFormData } from "../formData";
import { areaSchema } from "../validationSchema";

const CreateAreaForm = ({
  area,
  isFormVisible,
  isPending = false,
  onHandleSubmit,
}: {
  area?: Asset;
  isFormVisible?: boolean;
  isPending?: boolean;
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
        name="name"
        register={register}
        error={errors.name?.message!}
      />
      {area && (
        <FormInput
          label="Parent Area"
          name="parent"
          disabled={true}
          defaultValue={area.name}
        />
      )}
      <div className="mt-10 flex justify-end">
        <FormSubmit label="Create" disabled={isPending} />
      </div>
    </form>
  );
};

export default CreateAreaForm;
