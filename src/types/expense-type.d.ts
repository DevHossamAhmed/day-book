export interface ExpenseType {
  id: number;
  name: string;
  added_by_fullname?: string | null;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

export interface ExpenseTypeIdNameList {
  id: number;
  name: string;
}
