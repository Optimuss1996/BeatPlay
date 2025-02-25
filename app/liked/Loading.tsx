import Box from "../components/Box";
import { ScaleLoader } from "react-spinners";
export default function Error() {
  return (
    <Box className=" flex justify-center items-center h-full w-full">
      <ScaleLoader color=" #22c55e" />
    </Box>
  );
}
