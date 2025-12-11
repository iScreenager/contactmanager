import { useSelector, useDispatch } from "react-redux";
import "./ContactTable.css";
import type { RootState } from "../../store";
import {
  clearAllSelections,
  selectAllContacts,
  toggleContactSelection,
} from "../../store/contactsSlice";
import type { Contact } from "../../types/contact";
import editIcon from "../../assets/editIcon.png";
import deleteActionIcon from "../../assets/deleteActionIcon.png";

interface Props {
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
}

export default function ContactTable({ onEdit, onDelete }: Props) {
  const dispatch = useDispatch();
  const allContacts = useSelector((state: RootState) => state.contacts.list);
  const searchQuery = useSelector(
    (state: RootState) => state.contacts.searchQuery
  );
  const selectedIds = useSelector(
    (state: RootState) => state.contacts.selectedIds
  );

  const filteredContacts = allContacts.filter((contact) => {
    const query = searchQuery.toLowerCase();
    return (
      contact.name.toLowerCase().includes(query) ||
      contact.email.toLowerCase().includes(query)
    );
  });

  const areAllSelected =
    filteredContacts.length > 0 &&
    filteredContacts.every((contact) => selectedIds.includes(contact.id));

  function handleSelectAll() {
    if (areAllSelected) {
      dispatch(clearAllSelections());
    } else {
      const allVisibleIds = filteredContacts.map((contact) => contact.id);
      dispatch(selectAllContacts(allVisibleIds));
    }
  }

  function handleRowSelect(contactId: string) {
    dispatch(toggleContactSelection(contactId));
  }

  function formatAddress(contact: Contact): string {
    const parts = [
      contact.addressLine1,
      contact.addressLine2,
      contact.state,
      contact.pincode,
    ];

    return parts.join(", ");
  }

  return (
    <div className="table-wrapper">
      <table className="contact-table">
        <thead>
          <tr>
            <th className="col-check">
              <input
                type="checkbox"
                checked={areAllSelected}
                onChange={handleSelectAll}
              />
            </th>
            <th className="col-name">Name</th>
            <th className="col-contact">Contact</th>
            <th className="col-email">Email</th>
            <th className="col-address">Address</th>
            <th className="col-action">Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredContacts.map((contact) => (
            <tr key={contact.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(contact.id)}
                  onChange={() => handleRowSelect(contact.id)}
                />
              </td>
              <td>{contact.name}</td>
              <td>{contact.phone}</td>
              <td>{contact.email}</td>
              <td>{formatAddress(contact)}</td>
              <td className="actions">
                <button
                  className="btn-icon edit"
                  onClick={() => onEdit(contact)}>
                  <span className="background-icon">
                    <img src={editIcon} />
                  </span>

                  <span>Edit</span>
                </button>
                <button
                  className="btn-icon delete"
                  onClick={() => onDelete(contact)}>
                  <span className="background-icon">
                    <img src={deleteActionIcon} />
                  </span>

                  <span>Delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
