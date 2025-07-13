/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export const useModal = (isOpen: boolean, object: any = null) => {
  const [modal, setModal] = React.useState({ open: isOpen, data: object });

  const handleOpen = () => setModal((prev) => ({ ...prev, open: true }));

  const handleClose = () => setModal((prev) => ({ ...prev, open: false }));

  const setData = (data: any) => setModal((prev) => ({ ...prev, data }));

  return {
    open: modal.open,
    handleOpen,
    handleClose,
    data: modal.data,
    setData,
  };
};
