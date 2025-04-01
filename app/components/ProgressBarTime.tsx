import { formatDuration } from "@/utilities/commonFunction";
import * as RadixSlider from "@radix-ui/react-slider";

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

export default function ProgressBar({
  currentTime,
  duration,
  onSeek,
}: ProgressBarProps) {
  function handleChange(newValue: number[]) {
    onSeek(newValue[0]);
  }

  return (
    <div className=" flex justify-center items-center gap-x-3">
      <p className=" text-sm text-text-slate-500 dark:text-slate-300">
        {formatDuration(Math.floor(currentTime))}
      </p>
      <RadixSlider.Root
        value={[currentTime]}
        onValueChange={handleChange}
        max={duration}
        step={1}
        aria-label="Song Progress"
        className="relative flex items-center select-none touch-none w-full h-2"
      >
        <RadixSlider.Track className="relative bg-neutral-300 dark:bg-neutral-700 rounded-full h-[3px] grow cursor-pointer">
          <RadixSlider.Range className="absolute rounded-full h-full bg-purple-600"></RadixSlider.Range>
        </RadixSlider.Track>
      </RadixSlider.Root>
      <p className=" text-sm text-text-slate-500 dark:text-slate-300">
        {formatDuration(duration)}
      </p>
    </div>
  );
}
