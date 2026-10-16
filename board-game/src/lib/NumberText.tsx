export function NumberText({ text, compact = false, weight, soften = true }: { text: string; compact?: boolean; weight?: 'normal' | 'medium' | 'semibold' | 'extrabold'; soften?: boolean }) {
  const weightClass = weight === 'normal' ? 'font-normal' : weight === 'medium' ? 'font-medium' : weight === 'semibold' ? 'font-semibold' : weight === 'extrabold' ? 'font-extrabold' : ''
  return <>{text.split(/(\d+)/).map((part, index) => index % 2 === 1
    ? <span key={index} className={`font-number lining-nums tabular-nums ${soften ? 'opacity-[0.88]' : ''} ${weightClass} ${compact ? 'text-[0.9em]' : ''}`}>{part}</span>
    : part)}</>
}
