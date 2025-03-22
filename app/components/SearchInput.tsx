"use client";

import UseDebounce from "@/hooks/useDebounce";
import queryString from "query-string";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "./Input";
import { IoSearchOutline } from "react-icons/io5";

export default function SearchInput() {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const debounceValue = UseDebounce<string>(value, 500);

  useEffect(() => {
    if (debounceValue !== "") {
      const query = {
        title: debounceValue,
      };
      // router.push(`/search?q=${encodeURIComponent(query)}`);
      // Create a full URL with query parameters
      const url = queryString.stringifyUrl({
        url: "./search", // Make sure this URL is correct in the context of the app
        query: query,
      });

      // Update the URL in the browser without reloading the page
      router.push(url);
    }
  }, [debounceValue]);

  return (
    <div className=" relative ">
      <IoSearchOutline
        size={22}
        className=" absolute left-5 top-4  text-slate-700 dark:text-slate-200"
      />
      <Input
        placeholder="artists, tracks, albums..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className=" text-lg pl-12 bg-purple-200"
      />
    </div>
  );
}
