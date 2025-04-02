"use client";

import { useRouter } from "next/navigation";
import Modal from "./Modal";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect } from "react";
import useAuthModal from "@/hooks/useAuthModal";

export default function AuthModal() {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { onClose, isOpen } = useAuthModal();

  function onChange(open: boolean) {
    if (!open) onClose();
  }

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      title="Welcome back"
      description="Login to your account"
    >
      <Auth
        supabaseClient={supabaseClient}
        magicLink
        providers={["google"]}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#6b21a8",
                brandAccent: "#7e22ce",
                anchorTextColor: "#64748b",
                inputText: "#9333ea",
                inputBorder: "#475569",
                inputPlaceholder: "#334155",
              },
            },
          },
        }}
      />
    </Modal>
  );
}
