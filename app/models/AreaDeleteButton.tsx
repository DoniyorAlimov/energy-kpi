"use client";

import useDisclosure from "@/hooks/useDisclosure";
import React, { useState } from "react";
import { CiTrash } from "react-icons/ci";
import Modal from "../components/Modal";
import classNames from "classnames";
import deleteArea from "./actions/deleteArea";
import { toast } from "react-toastify";

const AreaDeleteButton = ({ areaId }: { areaId: number }) => {
  const { isOpen, handleClose, handleOpen } = useDisclosure();
  const [isPending, setIsPending] = useState(false);

  const handleDelete = async () => {
    setIsPending(true);
    const response = await deleteArea(areaId);
    if (response?.error) {
      toast.error(response.error);
    } else {
      toast.success("Area was removed");
      handleClose();
    }
    setIsPending(false);
  };

  return (
    <>
      <CiTrash className="list-view__icon" onClick={handleOpen} />

      <Modal
        renderTriggerButton={null}
        header="Delete Area"
        isOpen={isOpen}
        onClose={handleClose}
        content={
          <>
            <div className="font-normal">
              Are you shour to delete this area?
            </div>
            <div className="mt-3 flex justify-end">
              <div
                className={classNames({
                  "btn btn--accent": true,
                  "btn--disabled": isPending,
                })}
                onClick={handleDelete}
              >
                Delete
              </div>
            </div>
          </>
        }
      />
    </>
  );
};

export default AreaDeleteButton;
