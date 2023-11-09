import { Box, Modal } from "@mui/material";
import React, { ReactNode } from "react";
import "./ContactModal.css";

interface ContactModalProps {
  openModal: boolean;
  modalType: string;
  children: ReactNode;
  handleClose?(): void;
}
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

const ContactModal = ({
  children,
  openModal,
  modalType,
  handleClose,
}: ContactModalProps) => {
  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="modal-container">
          <p className="modal-header">
            {modalType === "add"
              ? "Добавить контакт"
              : modalType === "edit"
              ? "Редактировать контакт"
              : "Удалить контакт?"}
          </p>
          {children}
        </div>
      </Box>
    </Modal>
  );
};

export default ContactModal;
