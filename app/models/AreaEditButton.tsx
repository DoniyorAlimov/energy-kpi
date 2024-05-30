"use client";

import { Asset } from "@/entities/Assets";
import useDisclosure from "@/hooks/useDisclosure";
import { CiEdit } from "react-icons/ci";
import { toast } from "react-toastify";
import Modal from "../components/Modal";
import { AreaFormData } from "./CreateAreaForm";
import EditAreaForm from "./EditAreaForm";
import updateArea from "./actions/updateArea";

const AreaEditButton = ({ area }: { area: Asset }) => {
  const { isOpen, handleClose, handleOpen } = useDisclosure();

  const onHandleSubmit = async (data: AreaFormData) => {
    const response = await updateArea(area.id, data.name);
    if (response?.error) {
      toast.error(response.error);
    } else {
      toast.success("Area updated");
      handleClose();
    }
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
          />
        }
      />
    </>
  );
};

export default AreaEditButton;
