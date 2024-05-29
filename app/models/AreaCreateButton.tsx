import useDisclosure from "@/hooks/useDisclosure";
import React from "react";
import { FiPlusCircle } from "react-icons/fi";
import Modal from "../components/Modal";

const AreaCreateButton = () => {
  const { isOpen, handleClose, handleOpen } = useDisclosure();

  return (
    <>
      <FiPlusCircle
        className="list-view__icon"
        onClick={handleOpen}
      />
      <Modal
        renderTriggerButton={null}
        header="Add area"
        isOpen={isOpen}
        onClose={handleClose}
        content={<></>}
      />
    </>
  );
};

export default AreaCreateButton;
