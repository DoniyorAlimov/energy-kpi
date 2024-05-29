import useDisclosure from "@/hooks/useDisclosure";
import React from "react";
import { FiPlusCircle } from "react-icons/fi";
import Modal from "../components/Modal";
import { Asset } from "@/entities/Assets";
import AreaForm from "./AreaForm";

const AreaCreateButton = ({ area }: { area: Asset }) => {
  const { isOpen, handleClose, handleOpen } = useDisclosure();

  return (
    <>
      <FiPlusCircle className="list-view__icon" onClick={handleOpen} />
      <Modal
        renderTriggerButton={null}
        header="Add area"
        isOpen={isOpen}
        onClose={handleClose}
        content={
          <AreaForm area={area} isFormVisible={isOpen} onSucces={handleClose} />
        }
      />
    </>
  );
};

export default AreaCreateButton;
