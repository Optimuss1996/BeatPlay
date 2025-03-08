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
  //
  //
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
      title=" Welcome back"
      description="Login to your account"
    >
      <Auth
        theme="dark"
        magicLink
        providers={["github", "google"]}
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#a855f7",
                brandAccent: "#071a0e",
              },
            },
          },
        }}
      />
    </Modal>
  );
}
