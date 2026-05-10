import Link from "next/link";

export function BrandMark({
  compact = false,
  inverse = false
}: {
  compact?: boolean;
  inverse?: boolean;
}) {
  const textColor = inverse ? "text-white" : "text-ink";
  const subColor = inverse ? "text-white/48" : "text-neutral-500";
  const markBorder = inverse ? "border-white/25" : "border-ink/15";
  const markFill = inverse ? "bg-white text-ink" : "bg-ink text-white";

  return (
    <Link href="/" className="group inline-flex items-center gap-3">
      <span
        className={`relative grid size-10 place-items-center overflow-hidden rounded-full border ${markBorder} ${markFill}`}
        aria-hidden="true"
      >
        <span className="absolute h-px w-7 rotate-45 bg-current opacity-45" />
        <span className="absolute h-px w-7 -rotate-45 bg-current opacity-45" />
        <span className="font-heading text-sm font-bold tracking-normal">W</span>
      </span>
      {!compact ? (
        <span className="leading-none">
          <span className={`block font-heading text-xl font-bold tracking-normal ${textColor}`}>
            Wheelbros
          </span>
          <span className={`mt-1 block text-[10px] font-bold uppercase tracking-[0.22em] ${subColor}`}>
            Mobility studio
          </span>
        </span>
      ) : null}
    </Link>
  );
}
