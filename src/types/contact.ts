export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  state: string;
  pincode: string;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  state: string;
  pincode: string;
}

