"use client";

import { Asset } from "@/entities/Assets";
import useDisclosure from "@/hooks/useDisclosure";
import { FiPlusCircle } from "react-icons/fi";
import Modal from "../components/Modal";
import AreaForm from "./AreaForm";

const AreaCreateButton = ({ area }: { area?: Asset }) => {
  const { isOpen, handleClose, handleOpen } = useDisclosure();

  return (
    <>
      {area && (
        <FiPlusCircle className="list-view__icon" onClick={handleOpen} />
      )}
      {!area && (
        <div
          className="btn btn--outline btn--xs mx-4"
          onClick={handleOpen}
        >
          Create Area
        </div>
      )}
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
