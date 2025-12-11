import './DeleteModal.css';
import deleteModalIcon from '../../assets/deleteModalIcon.png';
import crossIcon from '../../assets/crossIcon.png';

interface Props {
  count: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteModal({ count, onConfirm, onCancel }: Props) {
  const isBulkDelete = count > 1;
  const title = isBulkDelete ? `Delete Contact(${count})` : 'Delete Contact';
  const message = isBulkDelete
    ? `Are you sure you want to delete all ${count} contacts?`
    : 'Are you sure you want to delete this contact?';

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="delete-modal" onClick={e => e.stopPropagation()}>
        <div className="delete-header">
          <img className="delete-icon" src={deleteModalIcon} alt="Delete" />
          <h3>{title}</h3>
          <button className="close-btn" onClick={onCancel}>
            <img src={crossIcon} alt="Close" />
          </button>
        </div>
        
        <p>
          {message}
          <br />
          This action cannot be undone.
        </p>
        
        <div className="delete-actions">
          <button className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-delete" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
