import React from "react";


export const useModal = (isOpen:boolean) => {
    const [open, setOpen] = React.useState(isOpen);

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);
    
    return {
        open,
        handleOpen,
        handleClose
    };
}