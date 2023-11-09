import { Button, TextField } from "@mui/material";
import React, { FormEventHandler, useState } from "react";

interface ContactData {
  name: string;
  phone: string;
}

interface ContactFormProps {
  initialContact?: ContactData;
  modalType?: string;

  onSubmit?(payload: ContactData): void;
  onClose?(): void;
}

const ContactForm = (props: ContactFormProps) => {
  const [name, setName] = useState(props.initialContact?.name ?? "");
  const [phone, setPhone] = useState(props.initialContact?.phone ?? "");

  const handleClose = () => {
    props.onClose && props.onClose();
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    props.onSubmit && props.onSubmit({ name, phone });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="modal-inputs">
        {props.modalType !== "delete" && (
          <>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Phone"
              variant="outlined"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </>
        )}
      </div>
      <div className="modal-buttons">
        {props.modalType === "add" ? (
          <Button variant="contained" type="submit">
            Добавить
          </Button>
        ) : props.modalType === "edit" ? (
          <Button variant="contained" type="submit">
            Сохранить
          </Button>
        ) : (
          <Button variant="contained" type="submit">
            Удалить
          </Button>
        )}
        <Button variant="contained" onClick={handleClose}>
          Отмена
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
