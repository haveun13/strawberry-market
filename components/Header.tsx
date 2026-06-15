'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import StrawberryCharacter from './StrawberryCharacter'

interface Props {
  nickname: string
}

export default function Header({ nickname }: Props) {
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 shadow-sm"
      style={{ background: 'white', borderBottom: '2px solid #FFD6E0' }}>
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* 로고 */}
        <div className="flex items-center gap-2">
          <StrawberryCharacter size={36} />
          <span className="text-xl font-black" style={{ color: '#FF3B5C' }}>
            딸기마켓
          </span>
        </div>

        {/* 우측: 유저 + 로그아웃 */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
              style={{ background: 'linear-gradient(135deg, #FF3B5C, #FF8FAB)' }}>
              {nickname.charAt(0)}
            </div>
            <span className="text-sm font-semibold hidden sm:block" style={{ color: '#2D1B1B' }}>
              {nickname}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="text-sm font-semibold px-4 py-2 rounded-full transition-all"
            style={{
              background: '#FFE8EC',
              color: '#FF3B5C',
              border: '1.5px solid #FFD6E0',
            }}
            onMouseEnter={e => {
              (e.target as HTMLButtonElement).style.background = '#FF3B5C';
              (e.target as HTMLButtonElement).style.color = 'white';
            }}
            onMouseLeave={e => {
              (e.target as HTMLButtonElement).style.background = '#FFE8EC';
              (e.target as HTMLButtonElement).style.color = '#FF3B5C';
            }}
          >
            로그아웃
          </button>
        </div>
      </div>
    </header>
  )
}
