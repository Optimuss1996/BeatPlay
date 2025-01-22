import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import Button from "./Button";

interface HeaderPropType {
  children: React.ReactNode;
  className?: string;
}

export default function Header({ children, className }: HeaderPropType) {
  return (
    <div
      className={twMerge(
        `h-fit bg-gradient-to-b from-emerald-800  p-6`,
        className
      )}
    >
      <div className="w-full flex justify-between items-center mb-4">
        {/* this div for larger than md screen display  */}
        <div className=" hidden md:flex items-center gap-x-2 ">
          <button className=" flex justify-center items-center bg-black rounded-full hover:opacity-70 transition">
            <RxCaretLeft size={26} />
          </button>
          <button className=" flex justify-center items-center bg-black rounded-full hover:opacity-70 transition">
            <RxCaretRight size={26} />
          </button>
        </div>

        {/* this div for smaller than md screen display  */}
        <div className="md:hidden flex items-center gap-x-2 ">
          <button className=" bg-white rounded-full flex justify-center items-center  p-2 transition hover:opacity-70">
            <HiHome size={20} className=" text-black " />
          </button>
          <button className="md:hidden bg-white rounded-full flex justify-center items-center  p-2 transition hover:opacity-70">
            <BiSearch size={20} className=" text-black " />
          </button>
        </div>

        <div className=" flex justify-between items-center gap-x-4">
          <>
            <div>
              <Button className=" text-neutral-300 bg-transparent font-medium">
                Sign up
              </Button>
            </div>
            <div>
              <Button className=" bg-white px-6 py-2">Login</Button>
            </div>
          </>
        </div>
      </div>
      {children}
    </div>
  );
}
