'use client'

import { AudioWaveform } from 'lucide-react'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="h-16 px-4 border-b bg-white/50 backdrop-blur-xl">
      <div className="h-full flex items-center justify-between relative">
        <Link href="/text-to-speech" passHref className="flex items-center gap-2">
          <AudioWaveform width={32} height={32} className="text-primary" />
          <span className="font-bold text-primary">AIVoice</span>
        </Link>
        
        
      </div>
    </nav>
  )
} 