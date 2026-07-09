import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type Database = {
  public: {
    Tables: {
      payment_links: {
        Row: {
          id: number;
          url: string;
          status: string | null;
          customer_name: string | null;
          customer_email: string | null;
          customer_phone: string | null;
          assigned_at: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: number;
          url: string;
          status?: string | null;
          customer_name?: string | null;
          customer_email?: string | null;
          customer_phone?: string | null;
          assigned_at?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: number;
          url?: string;
          status?: string | null;
          customer_name?: string | null;
          customer_email?: string | null;
          customer_phone?: string | null;
          assigned_at?: string | null;
          created_at?: string | null;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

let client: SupabaseClient<Database> | null = null;

export function getSupabaseAdmin() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !supabaseSecretKey) {
    throw new Error("Supabase environment variables are missing.");
  }

  if (!client) {
    client = createClient<Database>(supabaseUrl, supabaseSecretKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return client;
}
