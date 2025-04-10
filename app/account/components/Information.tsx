// "use client";

// import { useUser } from "@/hooks/useUser";
// import Image from "next/image";
// import { RxAvatar } from "react-icons/rx";

// export default function Information() {
//   const { user, userDetails, isLoading } = useUser();
//   if (isLoading) return <div>Loading...</div>;
//   if (!user || !userDetails) return <div>Not logged in</div>;
//   return (
//     <section className=" flex flex-col min-h-screen w-11/12 mt-8 border-2 rounded-md mx-auto  border-gray-400 dark:border-gray-700 border-opacity-75 bg-purple-200/70  dark:bg-slate-800">
//       <h1 className=" text-2xl md:text-4xl font-bold font-ClashGrotesk text-start p-4 text-gray-800 dark:text-gray-200 border-b-2 border-gray-400 dark:border-gray-700">
//         Account Information
//       </h1>
//       <div className="mt-4 flex flex-col gap-y-2 items-center justify-center gap-4">
//         <Image
//           src={userDetails.avatar_url || RxAvatar}
//           alt="Avatar"
//           width={64}
//           height={64}
//           className="rounded-full border bg-purple-300 dark:bg-slate-700 border-gray-400 dark:border-gray-700 p-1"
//         />
//         <div>
//           <p className="font-semibold">Name: {userDetails.full_name}</p>
//           <p>Email: {user.email}</p>
//         </div>
//       </div>
//     </section>
//   );
// }
