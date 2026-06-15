import { createClient } from '@/lib/supabase/server'

export default async function MarketPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('nickname')
    .eq('id', user!.id)
    .single()

  return (
    <div className="fade-in">
      {/* 환영 배너 */}
      <div className="rounded-3xl p-6 mb-6 text-white"
        style={{ background: 'linear-gradient(135deg, #FF3B5C, #FF8FAB)' }}>
        <p className="text-sm font-medium opacity-90 mb-1">안녕하세요! 👋</p>
        <h2 className="text-2xl font-black mb-1">
          {profile?.nickname ?? '딸기유저'}님
        </h2>
        <p className="text-sm opacity-80">오늘도 달콤한 거래 하세요 🍓</p>
      </div>

      {/* 바로가기 카드 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {[
          { icon: '📦', label: '내 상품', desc: '등록한 상품 보기' },
          { icon: '❤️', label: '찜 목록', desc: '관심 상품 보기' },
          { icon: '💬', label: '채팅', desc: '거래 메시지' },
          { icon: '⭐', label: '거래 후기', desc: '받은 리뷰 보기' },
        ].map(item => (
          <button
            key={item.label}
            className="card text-left transition-all hover:shadow-lg"
            style={{ padding: '20px', cursor: 'pointer' }}
          >
            <div className="text-2xl mb-2">{item.icon}</div>
            <div className="font-bold text-sm" style={{ color: '#2D1B1B' }}>{item.label}</div>
            <div className="text-xs mt-1" style={{ color: '#8B7B7B' }}>{item.desc}</div>
          </button>
        ))}
      </div>

      {/* 상품 목록 (더미) */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-black text-lg" style={{ color: '#2D1B1B' }}>
          🍓 최근 올라온 상품
        </h3>
        <span className="text-xs" style={{ color: '#FF3B5C' }}>전체보기 →</span>
      </div>

      <div className="card text-center py-12" style={{ color: '#8B7B7B' }}>
        <div className="text-5xl mb-4">🛒</div>
        <p className="font-bold mb-1" style={{ color: '#2D1B1B' }}>아직 등록된 상품이 없어요</p>
        <p className="text-sm">첫 번째 상품을 올려보세요!</p>
        <button
          className="mt-4 px-6 py-3 rounded-full text-sm font-bold text-white"
          style={{ background: 'linear-gradient(135deg, #FF3B5C, #FF8FAB)' }}
        >
          + 상품 등록하기
        </button>
      </div>
    </div>
  )
}
