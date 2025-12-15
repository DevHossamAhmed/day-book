export interface Member {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  joining_date?: Date;
  salary_amount?: number;
  designation?: string | null;
  role?: string | null;
  additional_info?: string | null;
  created_at?: string;
  updated_at?: string;
}

