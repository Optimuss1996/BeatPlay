import * as RadixSlider from "@radix-ui/react-slider";

interface SliderProps {
  value?: number;
  onChange: (value: number) => void;
}

export default function Slider({ value = 1, onChange }: SliderProps) {
  function handleChange(newValue: number[]) {
    onChange?.(newValue[0]);
  }
  return (
    <RadixSlider.Root
      defaultValue={[1]}
      value={[value]}
      onValueChange={handleChange}
      max={1}
      step={0.1}
      aria-label="Volume"
      className="relative flex items-center select-none touch-none w-full h-10"
    >
      <RadixSlider.Track className=" relative bg-neutral-600 rounded-full h-[3px] grow">
        <RadixSlider.Range className=" absolute rounded-full h-full bg-white"></RadixSlider.Range>
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
}
