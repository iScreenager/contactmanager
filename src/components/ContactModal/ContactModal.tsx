import { useState } from "react";
import type { Contact, ContactFormData } from "../../types/contact";
import { INDIAN_STATES } from "../../data/states";
import crossIcon from "../../assets/crossIcon.png";
import "./ContactModal.css";

interface Props {
  contact?: Contact | null;
  onSave: (data: ContactFormData, id?: string) => void;
  onClose: () => void;
}

const emptyForm: ContactFormData = {
  name: "",
  phone: "",
  email: "",
  addressLine1: "",
  addressLine2: "",
  state: "",
  pincode: "",
};

export default function ContactModal({ contact, onSave, onClose }: Props) {
  const [formData, setFormData] = useState<ContactFormData>(() => {
    if (!contact) return emptyForm;
    return {
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      addressLine1: contact.addressLine1,
      addressLine2: contact.addressLine2 || "",
      state: contact.state,
      pincode: contact.pincode,
    };
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isEditMode = Boolean(contact);

  const isFormEmpty =
    !formData.name.trim() &&
    !formData.phone.trim() &&
    !formData.email.trim() &&
    !formData.addressLine1.trim() &&
    !formData.state &&
    !formData.pincode.trim();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email.";
    }

    if (formData.phone.trim() && !/^\d+$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Only digits allowed.";
    }

    if (!formData.addressLine1.trim()) {
      newErrors.addressLine1 = "Address is required.";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSave(formData, contact?.id);
    }
  }

  function handleChange(field: keyof ContactFormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function selectState(state: string) {
    handleChange("state", state);
    setIsDropdownOpen(false);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isEditMode ? "Edit Contact" : "Add Contact"}</h2>
          <button className="close-btn" onClick={onClose}>
            <img src={crossIcon} alt="Close" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>
                Name<span className="required">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={errors.name ? "error" : ""}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label>Contact No.</label>
              <input
                type="text"
                placeholder="Enter contact no."
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className={errors.phone ? "error" : ""}
              />
              {errors.phone && (
                <span className="error-text">{errors.phone}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                Email<span className="required">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={errors.email ? "error" : ""}
              />
              {errors.email && (
                <span className="error-text">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label>
                Address Line 1<span className="required">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter address"
                value={formData.addressLine1}
                onChange={(e) => handleChange("addressLine1", e.target.value)}
                className={errors.addressLine1 ? "error" : ""}
              />
              {errors.addressLine1 && (
                <span className="error-text">{errors.addressLine1}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Address Line 2 (Optional)</label>
              <input
                type="text"
                placeholder="Enter address"
                value={formData.addressLine2}
                onChange={(e) => handleChange("addressLine2", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>State</label>
              <div className="dropdown">
                <div
                  className={`dropdown-trigger ${errors.state ? "error" : ""} ${isDropdownOpen ? "open" : ""}`}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <span className={formData.state ? "" : "placeholder"}>
                    {formData.state || "Enter State"}
                  </span>
                  <svg
                    className="dropdown-arrow"
                    viewBox="0 0 20 20"
                    fill="none">
                    <path
                      d="M5 7.5L10 12.5L15 7.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    {INDIAN_STATES.map((s) => (
                      <div
                        key={s}
                        className={`dropdown-item ${formData.state === s ? "selected" : ""}`}
                        onClick={() => selectState(s)}>
                        {s}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {errors.state && (
                <span className="error-text">{errors.state}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                Pincode<span className="required">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter pincode"
                value={formData.pincode}
                onChange={(e) => handleChange("pincode", e.target.value)}
                className={errors.pincode ? "error" : ""}
              />
              {errors.pincode && (
                <span className="error-text">{errors.pincode}</span>
              )}
            </div>
            <div className="form-group" />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={!isEditMode && isFormEmpty}>
              {isEditMode ? "Save Changes" : "Add Contact"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
