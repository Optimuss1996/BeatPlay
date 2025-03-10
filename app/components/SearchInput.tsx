"use client";

import UseDebounce from "@/hooks/useDebounce";
import queryString from "query-string";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "./Input";

export default function SearchInput() {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const debounceValue = UseDebounce<string>(value, 500);

  useEffect(() => {
    if (debounceValue !== "") {
      const query = {
        title: debounceValue,
      };

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
    <div className="px-5 mb-5">
      <Input
        placeholder="what do you want to listen music ?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
