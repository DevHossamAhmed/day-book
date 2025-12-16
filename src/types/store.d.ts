export interface Store {
  id: number;
  name: string;
  sales_person_id?: number | null;
  sales_person_fullname?: string | null;
  default_currency?: string | null;
  description?: string | null;
  added_by_fullname?: string | null;
  created_at: string; // ISO date string
  updated_at?: string | null; // ISO date string
}
