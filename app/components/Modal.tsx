import useAuthModal from "@/hooks/useAuthModal";
import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";
import { twMerge } from "tailwind-merge";

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}
export default function Modal({
  isOpen,
  onChange,
  title,
  description,
  children,
  className,
}: ModalProps) {
  const { onClose } = useAuthModal();

  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="
             bg-purple-200/40
             backdrop-blur-sm
             fixed
             inset-0
             "
        />
        <Dialog.Content
          className={twMerge(
            `
               fixed
               drop-shadow-md
               border
               border-purple-800
               top-[50%]
               left-[50%]
               max-h-full
               h-full
               md:h-auto
               md:max-h-[85vh]
               w-full
               md:w-[90vw]
               md:max-w-[450px]
               translate-x-[-50%]
               translate-y-[-50%]
               rounded-md
               bg-purple-300
               p-[25px]
               focus:outline-none z-50 `,
            className
          )}
        >
          <Dialog.Title
            className="
          text-xl
          text-center
          font-bold
          mb-4
          "
          >
            {title}
          </Dialog.Title>
          <Dialog.Description
            className="
               mb-5
               text-sm
               leading-normal
               text-center
          "
          >
            {description}
            <Dialog.Close asChild>
              <button
                onClick={onClose}
                className="
               text-black
               hover:border-b-2
                 absolute
                 top-[10px]
                 right-[10px]
                 inline-flex
                 h-[25px]
                 w-[25px]
                 appearance-none
                 items-center
                 justify-center
                 rounded-full
                 focus:outline-none

              "
              >
                <IoMdClose />
              </button>
            </Dialog.Close>
          </Dialog.Description>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
