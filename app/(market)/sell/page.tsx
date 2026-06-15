'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

const CATEGORIES = ['디지털/가전', '패션/의류', '도서', '스포츠/레저', '생활/가구', '뷰티/미용', '식물', '기타']
const CONDITIONS = ['새상품', '거의새것', '보통', '나쁨']

export default function SellPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [condition, setCondition] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!category) { setError('카테고리를 선택해주세요!'); return }
    if (!condition) { setError('상품 상태를 선택해주세요!'); return }
    if (Number(price) <= 0) { setError('가격을 올바르게 입력해주세요!'); return }

    setLoading(true)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) { router.push('/login'); return }

    const { error: insertError } = await supabase.from('products').insert({
      seller_id: user.id,
      title: title.trim(),
      description: description.trim(),
      price: Number(price),
      category,
      condition,
    })

    if (insertError) {
      setError('등록 중 오류가 발생했어요. 다시 시도해주세요.')
      setLoading(false)
      return
    }

    router.push('/market')
    router.refresh()
  }

  return (
    <div className="fade-in pb-10">
      {/* 상단 헤더 */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/market">
          <button
            className="w-9 h-9 rounded-full flex items-center justify-center text-lg transition-all"
            style={{ background: '#FFE8EC', color: '#FF3B5C' }}
          >
            ←
          </button>
        </Link>
        <h1 className="text-xl font-black" style={{ color: '#2D1B1B' }}>판매글 작성</h1>
      </div>

      {error && (
        <div className="error-msg mb-4">⚠️ {error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* 제목 */}
        <div>
          <label className="label">제목 <span style={{ color: '#FF3B5C' }}>*</span></label>
          <input
            type="text"
            className="input-field"
            placeholder="예) 아이패드 에어 5세대 팔아요"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            maxLength={50}
          />
          <p className="text-xs mt-1 text-right" style={{ color: '#8B7B7B' }}>{title.length}/50</p>
        </div>

        {/* 카테고리 */}
        <div>
          <label className="label">카테고리 <span style={{ color: '#FF3B5C' }}>*</span></label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
                style={{
                  background: category === cat ? '#FF3B5C' : '#F5EFEF',
                  color: category === cat ? 'white' : '#2D1B1B',
                  border: category === cat ? '2px solid #FF3B5C' : '2px solid transparent',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 상품 상태 */}
        <div>
          <label className="label">상품 상태 <span style={{ color: '#FF3B5C' }}>*</span></label>
          <div className="flex gap-2">
            {CONDITIONS.map(cond => (
              <button
                key={cond}
                type="button"
                onClick={() => setCondition(cond)}
                className="flex-1 py-3 rounded-2xl text-sm font-semibold transition-all"
                style={{
                  background: condition === cond ? '#FF3B5C' : '#F5EFEF',
                  color: condition === cond ? 'white' : '#2D1B1B',
                  border: condition === cond ? '2px solid #FF3B5C' : '2px solid transparent',
                }}
              >
                {cond}
              </button>
            ))}
          </div>
        </div>

        {/* 가격 */}
        <div>
          <label className="label">가격 <span style={{ color: '#FF3B5C' }}>*</span></label>
          <div className="relative">
            <input
              type="number"
              className="input-field"
              placeholder="0"
              value={price}
              onChange={e => setPrice(e.target.value)}
              required
              min={0}
              style={{ paddingRight: '48px' }}
            />
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-sm"
              style={{ color: '#8B7B7B' }}
            >
              원
            </span>
          </div>
          {price && (
            <p className="text-xs mt-1" style={{ color: '#FF3B5C' }}>
              {Number(price).toLocaleString()}원
            </p>
          )}
        </div>

        {/* 설명 */}
        <div>
          <label className="label">상품 설명 <span style={{ color: '#FF3B5C' }}>*</span></label>
          <textarea
            className="input-field"
            placeholder="상품 상태, 구매 시기, 하자 여부 등을 자세히 적어주세요."
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            rows={5}
            maxLength={500}
            style={{ resize: 'none' }}
          />
          <p className="text-xs mt-1 text-right" style={{ color: '#8B7B7B' }}>{description.length}/500</p>
        </div>

        {/* 등록 버튼 */}
        <button
          type="submit"
          className="btn-strawberry"
          disabled={loading}
        >
          {loading ? '등록 중...' : '🍓 판매글 등록하기'}
        </button>

      </form>
    </div>
  )
}
