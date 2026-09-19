import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Country = {
  id: string;
  name: string;
  code: string;
  flag_emoji: string;
  region: string;
  is_destination: boolean;
};

export type VisaType = {
  id: string;
  country_id: string;
  name: string;
  category: string;
  description: string;
  processing_time: string;
  fee: number;
  documentChecklist: string[];
  requirements: string;
};

export type Application = {
  id: string;
  applicant_name: string;
  email: string;
  phone: string;
  date_of_birth: string | null;
  nationality: string;
  passport_number: string;
  destination_country_id: string;
  visa_type_id: string;
  status: string;
  notes: string;
  created_at: string;
};
