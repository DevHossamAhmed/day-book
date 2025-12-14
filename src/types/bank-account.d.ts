export interface BankAccount {
  id: number;
  name: string;
  account_number: string;
  iban?: string | null;
  note?: string | null;
  added_by_fullname?: string | null;
  created_at: string; // ISO date string
  updated_at?: string; // ISO date string
}
