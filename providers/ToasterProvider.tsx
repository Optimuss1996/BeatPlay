"use Client";

import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  return (
    <Toaster
      toastOptions={{
        style: {
          color: "#fff",
          background: "#7e22ce",
        },
      }}
    />
  );
}
