import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Header from '@/components/Header'

export default async function MarketLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('nickname, avatar_url')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFF8F0' }}>
      <Header nickname={profile?.nickname ?? '딸기유저'} />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
        {children}
      </main>
    </div>
  )
}
