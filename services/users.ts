"use server";
import { createClient } from "@/services/utils/supabase/server";

export async function getUserByUUID(user_uuid: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("users").select("*").eq("user_uuid", user_uuid);
  return { data, error };
}

export async function getUserByEmail(email: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("users").select("*").eq("email", email);
  return { data, error };
}

export async function updateUserFullName(user_id: string, full_name: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("users").update({ full_name }).eq("id", user_id);
  return { data, error };
}

export async function deleteUserAccount(user_id: string) {
  const supabase = await createClient();
  console.log("Deleting user account:", user_id);
  const { data, error } = await supabase.auth.admin.deleteUser(user_id);
  console.log("User account deleted:", data, error);
  return { error };
}
