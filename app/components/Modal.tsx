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
             bg-slate-700/40
             dark:bg-slate-600/60 
             fixed
             inset-0
             z-50
             "
        />
        <Dialog.Content
          className={twMerge(
            `
               fixed
               drop-shadow-xl
               top-[50%]
               left-[50%]
               max-h-full
               h-full
               md:h-auto
               w-full
               md:w-[90vw]
               md:max-w-[450px]
               translate-x-[-50%]
               translate-y-[-50%]
               rounded-md
               border-none
               outline-none
               bg-purple-200
               dark:bg-slate-900
               p-[25px]
               focus:outline-none 
               z-50 `,
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
               text-white
               hover:opacity-65
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
                 bg-purple-600
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
