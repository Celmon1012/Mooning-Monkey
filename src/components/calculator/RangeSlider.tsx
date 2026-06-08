interface RangeSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  formatMin?: string;
  formatMax?: string;
}

export function RangeSlider({
  label,
  value,
  min,
  max,
  onChange,
  formatMin,
  formatMax,
}: RangeSliderProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <span className="font-body text-sm font-medium text-white/80">{label}</span>
        <span className="font-display text-sm font-semibold tabular-nums text-cyan-glow">
          {value.toLocaleString('en-US')}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-cyan-glow"
      />
      <div className="flex justify-between text-[11px] text-white/35">
        <span>{formatMin ?? min.toLocaleString('en-US')}</span>
        <span>{formatMax ?? max.toLocaleString('en-US')}</span>
      </div>
    </div>
  );
}
