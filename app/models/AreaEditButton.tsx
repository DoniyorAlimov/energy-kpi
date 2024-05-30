"use client";

import { Asset } from "@/entities/Assets";
import useDisclosure from "@/hooks/useDisclosure";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { toast } from "react-toastify";
import Modal from "../components/Modal";
import { AreaFormData } from "../formData";
import EditAreaForm from "./EditAreaForm";
import updateArea from "./actions/updateArea";

const AreaEditButton = ({ area }: { area: Asset }) => {
  const { isOpen, handleClose, handleOpen } = useDisclosure();
  const [isPending, setIsPending] = useState(false);

  const onHandleSubmit = async (data: AreaFormData) => {
    setIsPending(true);
    const response = await updateArea(area.id, data.name);
    if (response?.error) {
      toast.error(response.error);
    } else {
      toast.success("Area updated");
      handleClose();
    }
    setIsPending(false);
  };

  return (
    <>
      <CiEdit className="list-view__icon" onClick={handleOpen} />

      <Modal
        renderTriggerButton={null}
        header="Edit area"
        isOpen={isOpen}
        onClose={handleClose}
        content={
          <EditAreaForm
            area={area}
            isFormVisible={isOpen}
            onHandleSubmit={onHandleSubmit}
            isPending={isPending}
          />
        }
      />
    </>
  );
};

export default AreaEditButton;
