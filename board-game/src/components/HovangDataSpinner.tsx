const spokes = Array.from({ length: 12 }, (_, index) => index)

export function HovangDataSpinner({
  className = '',
}: {
  className?: string
}) {
  return (
    <span
      aria-hidden="true"
      className={`inline-grid size-12 shrink-0 place-items-center ${className}`}
    >
      <svg
        viewBox="0 0 88 88"
        className="size-full animate-spin text-[#c99b58]"
        style={{ animationDuration: '1.2s' }}
      >
        {spokes.map(index => (
          <rect
            key={index}
            x="41"
            y="7"
            width="6"
            height="18"
            rx="3"
            fill="currentColor"
            opacity={0.24 + index * 0.065}
            transform={`rotate(${index * 30} 44 44)`}
          />
        ))}
      </svg>
    </span>
  )
}