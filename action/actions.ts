// "use server";
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";

// interface FormDataType {
//   image: string;
//   title: string;
//   Singer: string;
//   song: string;
// }

// export async function uploadSong(formData: FormData) {
//   const supabase = createServerComponentClient({
//     cookies: cookies,
//   });

//   console.log(formData);

//   const { data: sessionData, error: sessionError } =
//     await supabase.auth.getSession();
//   console.log(sessionData);
//   if (sessionError) {
//     console.log(sessionError.message);
//   }
// }
