"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function uploadSong(formData) {
  const supabase = createServerComponentClient(  {
    cookies: cookies,
  });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();
  console.log(sessionData);
  if (sessionError) {
    console.log(sessionError.message);
  }
}
