"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { push } = useRouter();

  const currentPage = Number(searchParams.get("page") || "1");

  const createPageURL = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-4">
      <button
        onClick={() => push(createPageURL(currentPage - 1))}
        disabled={currentPage <= 1}
        className="  bg-purple-500 text-white text-sm px-2 py-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 ease-in-out hover:bg-purple-600  font-semibold border-none outline-none"
      >
        Previous
      </button>
      <span className="text-sm font-semibold">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => push(createPageURL(currentPage + 1))}
        disabled={currentPage >= totalPages}
        className="  bg-purple-500 text-white text-sm px-2 py-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 ease-in-out hover:bg-purple-600  font-semibold border-none outline-none"
      >
        Next
      </button>
    </div>
  );
}
