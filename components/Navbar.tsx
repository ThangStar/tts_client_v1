'use client'

import { Button } from "@nextui-org/react"
import { AudioWaveform } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
    const pathname = usePathname()

    return (
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center gap-2">
                        <AudioWaveform width={32} height={32} className="text-primary"/>
                        <span className="font-bold text-primary">AIVoice</span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/text-to-speech"
                            className={`hover:text-primary ${pathname === '/text-to-speech' ? 'text-primary' : ''}`}
                        >
                            Text to Speech
                        </Link>

                        <Link
                            href="/api-endpoint"
                            className={`hover:text-primary ${pathname === '/api' ? 'text-primary' : ''}`}
                        >
                            AIVoice API
                        </Link>
                        <div className="relative group">
                            <button className="hover:text-primary flex items-center">
                                Liên hệ
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                            <Image src="/images/vi-flag.png" alt="Vietnamese" width={20} height={20} />
                            <span>VI</span>
                        </div>
                        <Button variant="light">Đăng nhập</Button>
                        <Button color="warning">Dùng thử miễn phí</Button>
                    </div>
                </div>
            </div>
        </nav>
    )
}