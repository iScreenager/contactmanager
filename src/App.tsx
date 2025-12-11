import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "./store";
import {
  addContact,
  updateContact,
  deleteContact,
  deleteMultipleContacts,
} from "./store/contactsSlice";
import type { Contact, ContactFormData } from "./types/contact";
import Header from "./components/Header/Header";

import ContactModal from "./components/ContactModal/ContactModal";
import DeleteModal from "./components/DeleteModal/DeleteModal";
import { SAMPLE_CONTACTS } from "./data/sampleContacts";
import "./App.css";
import ContactTable from "./components/ContactTable/ContactTable";
import SearchBar from "./components/SearchBar/SearchBar";

export default function App() {
  const dispatch = useDispatch();
  const selectedContactIds = useSelector(
    (state: RootState) => state.contacts.selectedIds
  );

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactToEdit, setContactToEdit] = useState<Contact | null>(null);
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    if (!loaded.current) {
      loaded.current = true;
      SAMPLE_CONTACTS.forEach((contact) => {
        dispatch(addContact(contact));
      });
    }
  }, [dispatch]);

  function handleAddContact() {
    setContactToEdit(null);
    setIsContactModalOpen(true);
  }

  function handleEditContact(contact: Contact) {
    setContactToEdit(contact);
    setIsContactModalOpen(true);
  }

  function handleCloseContactModal() {
    setIsContactModalOpen(false);
    setContactToEdit(null);
  }

  function handleSaveContact(formData: ContactFormData, existingId?: string) {
    if (existingId) {
      dispatch(updateContact({ ...formData, id: existingId }));
    } else {
      const newContact: Contact = {
        ...formData,
        id: Date.now().toString(),
      };
      dispatch(addContact(newContact));
    }
    handleCloseContactModal();
  }

  function handleDeleteContact(contact: Contact) {
    setContactToDelete(contact);
  }

  function handleConfirmDelete() {
    if (contactToDelete) {
      dispatch(deleteContact(contactToDelete.id));
      setContactToDelete(null);
    }
  }

  function handleBulkDelete() {
    setIsBulkDeleteModalOpen(true);
  }

  function handleConfirmBulkDelete() {
    dispatch(deleteMultipleContacts(selectedContactIds));
    setIsBulkDeleteModalOpen(false);
  }

  return (
    <div className="app">
      <Header />

      <main className="main">
        <h1 className="title">Contact Manager</h1>

        <div className="container">
          <div className="toolbar">
            <SearchBar />

            <div className="toolbar-actions">
              {selectedContactIds.length > 0 && (
                <button className="btn-add btn-bulk" onClick={handleBulkDelete}>
                  Bulk Delete ({selectedContactIds.length})
                </button>
              )}
              <button className="btn-add" onClick={handleAddContact}>
                Add Contact
              </button>
            </div>
          </div>

          <ContactTable
            onEdit={handleEditContact}
            onDelete={handleDeleteContact}
          />
        </div>
      </main>

      {isContactModalOpen && (
        <ContactModal
          contact={contactToEdit}
          onSave={handleSaveContact}
          onClose={handleCloseContactModal}
        />
      )}

      {contactToDelete && (
        <DeleteModal
          count={1}
          onConfirm={handleConfirmDelete}
          onCancel={() => setContactToDelete(null)}
        />
      )}

      {isBulkDeleteModalOpen && (
        <DeleteModal
          count={selectedContactIds.length}
          onConfirm={handleConfirmBulkDelete}
          onCancel={() => setIsBulkDeleteModalOpen(false)}
        />
      )}
    </div>
  );
}
