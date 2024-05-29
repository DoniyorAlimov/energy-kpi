"use client";

import { Asset } from "@/entities/Assets";
import useDisclosure from "@/hooks/useDisclosure";
import { FiPlusCircle } from "react-icons/fi";
import { toast } from "react-toastify";
import Modal from "../components/Modal";
import AreaForm, { AreaFormData } from "./AreaForm";
import createArea from "./actions/createArea";

const AreaCreateButton = ({ area }: { area?: Asset }) => {
  const { isOpen, handleClose, handleOpen } = useDisclosure();

  const onHandleSubmit = async (data: AreaFormData) => {
    const response = await createArea(data.name, area?.id!);
    if (response?.error) {
      toast.error(response.error);
    } else {
      toast.success("Area added");
      handleClose();
    }
  };

  return (
    <>
      {area && (
        <FiPlusCircle className="list-view__icon" onClick={handleOpen} />
      )}
      {!area && (
        <div className="btn btn--outline btn--xs mx-4" onClick={handleOpen}>
          Create Area
        </div>
      )}
      <Modal
        renderTriggerButton={null}
        header="Add area"
        isOpen={isOpen}
        onClose={handleClose}
        content={
          <AreaForm
            area={area}
            isFormVisible={isOpen}
            onHandleSubmit={onHandleSubmit}
          />
        }
      />
    </>
  );
};

export default AreaCreateButton;
