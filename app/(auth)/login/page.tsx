'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import StrawberryCharacter from '@/components/StrawberryCharacter'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('이메일 또는 비밀번호가 올바르지 않아요 🍓')
      setLoading(false)
      return
    }

    router.push('/market')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: 'linear-gradient(135deg, #FFF0F3 0%, #FFF8F0 50%, #F0FFF4 100%)' }}>

      {/* 배경 딸기 장식 */}
      <div className="fixed top-10 left-10 text-6xl opacity-20 select-none">🍓</div>
      <div className="fixed top-20 right-16 text-4xl opacity-15 select-none">🍓</div>
      <div className="fixed bottom-16 left-20 text-5xl opacity-15 select-none">🍓</div>
      <div className="fixed bottom-10 right-10 text-7xl opacity-10 select-none">🍓</div>

      <div className="w-full max-w-md fade-in">
        <div className="card">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <div className="strawberry-bounce flex justify-center mb-4">
              <StrawberryCharacter size={100} />
            </div>
            <h1 className="text-3xl font-black mb-2" style={{ color: '#FF3B5C' }}>
              딸기마켓
            </h1>
            <p className="text-sm" style={{ color: '#8B7B7B' }}>
              달콤한 중고거래 🍓
            </p>
          </div>

          {/* 에러 메시지 */}
          {error && (
            <div className="error-msg mb-4">
              ⚠️ {error}
            </div>
          )}

          {/* 로그인 폼 */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="label">이메일</label>
              <input
                type="email"
                className="input-field"
                placeholder="strawberry@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label className="label">비밀번호</label>
              <input
                type="password"
                className="input-field"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="btn-strawberry"
                disabled={loading}
              >
                {loading ? '로그인 중...' : '🍓 로그인'}
              </button>
            </div>
          </form>

          {/* 구분선 */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: '#FFD6E0' }} />
            <span className="text-xs" style={{ color: '#8B7B7B' }}>또는</span>
            <div className="flex-1 h-px" style={{ background: '#FFD6E0' }} />
          </div>

          {/* 회원가입 링크 */}
          <Link href="/signup">
            <button className="btn-outline">
              회원가입하기
            </button>
          </Link>

          <p className="text-center text-xs mt-4" style={{ color: '#8B7B7B' }}>
            딸기마켓에 오신 것을 환영해요! 🍓
          </p>
        </div>
      </div>
    </div>
  )
}
