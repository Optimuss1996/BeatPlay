import useAuthModal from "@/hooks/useAuthModal";
import Button from "./Button";
import useIsOpenSidebar from "@/hooks/useIsOpenSidebar";

export default function LoginNotice() {
  const authModal = useAuthModal();
  const isSidebarOpen = useIsOpenSidebar();
  function handleClick() {
    authModal.onOpen();
    isSidebarOpen.onClose();
  }

  return (
    <div className="p-2 bg-purple-500 rounded-md flex flex-col gap-y-4 justify-center items-center w-4/5 mx-auto mt-8">
      <p className=" font-semibold text-lg text-white">Login for more access</p>
      <Button
        onClick={handleClick}
        className="bg-purple-800  text-white font-semibold rounded-md w-1/2 mx-auto p-1"
      >
        Login
      </Button>
    </div>
  );
}
