import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./enviroment";

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Faltan las variables de Supabase.");
}

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


