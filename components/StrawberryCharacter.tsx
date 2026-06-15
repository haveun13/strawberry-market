'use client'

interface Props {
  size?: number
  className?: string
}

export default function StrawberryCharacter({ size = 120, className = '' }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 잎사귀 */}
      <ellipse cx="45" cy="22" rx="12" ry="7" fill="#4CAF50" transform="rotate(-30 45 22)" />
      <ellipse cx="60" cy="16" rx="12" ry="7" fill="#66BB6A" transform="rotate(0 60 16)" />
      <ellipse cx="75" cy="22" rx="12" ry="7" fill="#4CAF50" transform="rotate(30 75 22)" />
      <ellipse cx="55" cy="18" rx="8" ry="5" fill="#81C784" transform="rotate(-15 55 18)" />
      <ellipse cx="65" cy="18" rx="8" ry="5" fill="#81C784" transform="rotate(15 65 18)" />

      {/* 딸기 몸통 */}
      <path
        d="M25 45 Q20 70 60 100 Q100 70 95 45 Q80 25 60 28 Q40 25 25 45Z"
        fill="#FF3B5C"
      />
      {/* 딸기 밝은 부분 */}
      <path
        d="M35 42 Q30 60 55 82 Q42 60 40 42Z"
        fill="#FF6B88"
        opacity="0.5"
      />

      {/* 씨앗들 */}
      <ellipse cx="50" cy="55" rx="3" ry="4" fill="#FFD6E0" transform="rotate(-10 50 55)" />
      <ellipse cx="65" cy="50" rx="3" ry="4" fill="#FFD6E0" transform="rotate(5 65 50)" />
      <ellipse cx="75" cy="62" rx="3" ry="4" fill="#FFD6E0" transform="rotate(15 75 62)" />
      <ellipse cx="55" cy="70" rx="3" ry="4" fill="#FFD6E0" transform="rotate(-5 55 70)" />
      <ellipse cx="70" cy="75" rx="3" ry="4" fill="#FFD6E0" transform="rotate(10 70 75)" />
      <ellipse cx="45" cy="68" rx="2.5" ry="3.5" fill="#FFD6E0" transform="rotate(-15 45 68)" />
      <ellipse cx="62" cy="85" rx="2.5" ry="3.5" fill="#FFD6E0" />

      {/* 눈 */}
      <ellipse cx="50" cy="58" rx="5" ry="6" fill="#2D1B1B" />
      <ellipse cx="70" cy="58" rx="5" ry="6" fill="#2D1B1B" />
      <ellipse cx="52" cy="56" rx="2" ry="2.5" fill="white" />
      <ellipse cx="72" cy="56" rx="2" ry="2.5" fill="white" />

      {/* 볼터치 */}
      <ellipse cx="42" cy="66" rx="7" ry="4" fill="#FF8FAB" opacity="0.5" />
      <ellipse cx="78" cy="66" rx="7" ry="4" fill="#FF8FAB" opacity="0.5" />

      {/* 입 */}
      <path d="M53 73 Q60 79 67 73" stroke="#2D1B1B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}
