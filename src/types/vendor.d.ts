export interface Vendor {
  id: number;
  name: string;
  contact_person?: string | null;
  phone?: string | null;
  email: string;
  address?: string | null;
  note?: string | null;

  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}