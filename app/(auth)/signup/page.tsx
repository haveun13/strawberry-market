'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import StrawberryCharacter from '@/components/StrawberryCharacter'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [nickname, setNickname] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않아요!')
      return
    }

    if (password.length < 6) {
      setError('비밀번호는 6자리 이상이어야 해요!')
      return
    }

    if (nickname.trim().length < 2) {
      setError('닉네임은 2자리 이상으로 입력해주세요!')
      return
    }

    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { nickname: nickname.trim() },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      if (error.message.includes('already registered')) {
        setError('이미 사용 중인 이메일이에요!')
      } else {
        setError('회원가입 중 오류가 발생했어요. 다시 시도해주세요.')
      }
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4"
        style={{ background: 'linear-gradient(135deg, #FFF0F3 0%, #FFF8F0 50%, #F0FFF4 100%)' }}>
        <div className="w-full max-w-md fade-in">
          <div className="card text-center">
            <div className="strawberry-wiggle flex justify-center mb-4">
              <StrawberryCharacter size={100} />
            </div>
            <h2 className="text-2xl font-black mb-3" style={{ color: '#FF3B5C' }}>
              가입 완료! 🎉
            </h2>
            <p className="text-sm mb-2" style={{ color: '#2D1B1B' }}>
              <strong>{email}</strong>로 인증 메일을 보냈어요.
            </p>
            <p className="text-sm mb-6" style={{ color: '#8B7B7B' }}>
              메일함을 확인하고 인증 링크를 클릭해주세요! 🍓
            </p>
            <div className="success-msg mb-6">
              ✅ 이메일 인증 후 로그인이 가능해요
            </div>
            <Link href="/login">
              <button className="btn-strawberry">로그인하러 가기</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: 'linear-gradient(135deg, #FFF0F3 0%, #FFF8F0 50%, #F0FFF4 100%)' }}>

      <div className="fixed top-10 left-10 text-6xl opacity-20 select-none">🍓</div>
      <div className="fixed top-20 right-16 text-4xl opacity-15 select-none">🍓</div>
      <div className="fixed bottom-16 left-20 text-5xl opacity-15 select-none">🍓</div>
      <div className="fixed bottom-10 right-10 text-7xl opacity-10 select-none">🍓</div>

      <div className="w-full max-w-md fade-in">
        <div className="card">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <StrawberryCharacter size={80} />
            </div>
            <h1 className="text-2xl font-black mb-1" style={{ color: '#FF3B5C' }}>
              딸기마켓 가입하기
            </h1>
            <p className="text-sm" style={{ color: '#8B7B7B' }}>
              함께해요, 달콤한 거래! 🍓
            </p>
          </div>

          {error && (
            <div className="error-msg mb-4">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="label">닉네임</label>
              <input
                type="text"
                className="input-field"
                placeholder="딸기러버 (2자 이상)"
                value={nickname}
                onChange={e => setNickname(e.target.value)}
                required
                maxLength={20}
              />
            </div>

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
              <label className="label">비밀번호 (6자 이상)</label>
              <input
                type="password"
                className="input-field"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>

            <div>
              <label className="label">비밀번호 확인</label>
              <input
                type="password"
                className="input-field"
                placeholder="비밀번호를 다시 입력하세요"
                value={passwordConfirm}
                onChange={e => setPasswordConfirm(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="btn-strawberry"
                disabled={loading}
              >
                {loading ? '가입 중...' : '🍓 회원가입'}
              </button>
            </div>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: '#FFD6E0' }} />
            <span className="text-xs" style={{ color: '#8B7B7B' }}>이미 계정이 있나요?</span>
            <div className="flex-1 h-px" style={{ background: '#FFD6E0' }} />
          </div>

          <Link href="/login">
            <button className="btn-outline">
              로그인하기
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
