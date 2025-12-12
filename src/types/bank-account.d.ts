export interface BankAccount {
  id: number;
  name: string;
  account_number: string;
  iban: string;
  notes: string;
  added_by_fullname: string;
  created_at: Date;
}
