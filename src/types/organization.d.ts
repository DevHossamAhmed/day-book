export interface Organization {
    id: number;
    name: string;
    email: string;
    address?: string | null;
    cr_number: string;
    tax_configuration: string;
    default_currency?: string | null;
    financial_year_period?: string | null;
    timezone?: string | null;
    created_at: string;
    updated_at?: string | null;
}