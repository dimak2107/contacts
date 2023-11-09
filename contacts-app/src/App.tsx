import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ContactModal from "./components/modal/ContactModal";
import ContactForm from "./components/contact-form/ContactForm";

interface Contact {
  name: string;
  phone: string;
  id: number;
}

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState<string>("");
  // const [itemId, setItemId] = useState<number | undefined>();
  // const [nameToEdit, setNameToEdit] = useState<string>();
  // const [phoneToEdit, setPhoneToEdit] = useState<string>();
  const [contact, setContact] = useState<Contact | undefined>();

  const modalTypes = {
    add: "add",
    delete: "delete",
    edit: "edit",
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/contact")
      .then((res) => {
        setContacts(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const createContact = (name: string, phone: string) => {
    axios
      .post("http://localhost:8080/api/contact", { name: name, phone: phone })
      .then((data) => {
        setContacts((prevState) => [...prevState, data.data]);
        console.log(data.data);
      });
  };

  const deleteContactById = (itemId: number) => {
    axios.delete(`http://localhost:8080/api/contact/${itemId}`).then((data) => {
      setContacts((prevState) =>
        prevState.filter((item) => item.id !== itemId)
      );
      console.log(data.data);
    });
  };

  const editContactById = (itemId: number, name: string, phone: string) => {
    axios
      .put(`http://localhost:8080/api/contact`, {
        id: itemId,
        name,
        phone,
      })
      .then((data) => {
        setContacts((prevState) =>
          prevState.map((item) => {
            return item.id !== itemId ? item : data.data;
          })
        );
        console.log(data.data);
      });
  };

  const handleClose = () => setOpenModal(false);
  const handleSubmit = (payload: { name: string; phone: string }) => {
    if (modalType === "add") {
      createContact(payload.name, payload.phone);
      handleClose();
      return;
    }
    if (modalType === "edit") {
      contact?.id && editContactById(contact.id, payload.name, payload.phone);
      handleClose();
      return;
    }
    if (modalType === "delete") {
      contact?.id && deleteContactById(contact.id);
      handleClose();
      return;
    }
    return;
  };

  console.log(contacts);
  console.log(modalType);
  return (
    <div className="container">
      <ContactModal
        openModal={openModal}
        modalType={modalType}
        handleClose={handleClose}
      >
        <ContactForm
          initialContact={contact}
          modalType={modalType}
          onSubmit={handleSubmit}
          onClose={handleClose}
        />
      </ContactModal>
      <div className="header">
        <h1>MyContacts</h1>
        <Button
          onClick={() => {
            setOpenModal(true),
              setModalType(modalTypes.add),
              setContact(undefined);
          }}
        >
          <AddIcon className="icon" />
        </Button>
      </div>
      <ul className="list">
        {contacts
          .slice()
          .sort((a, b) => b.id - a.id)
          .map((item) => {
            return (
              <li key={item.id} className="list-item">
                <div className="list-item_content">
                  <PersonIcon />
                  <div className="content-text">
                    <h3>{item.name}</h3>
                    <p>{item.phone}</p>
                  </div>
                </div>

                <div className="content-buttons">
                  <Button
                    onClick={() => {
                      setOpenModal(true);
                      setModalType(modalTypes.edit);
                      setContact(item);
                    }}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    onClick={() => {
                      setOpenModal(true);
                      setModalType(modalTypes.delete);
                      setContact(item);
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default App;
