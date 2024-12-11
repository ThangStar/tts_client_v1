'use client'

import { Button } from "@nextui-org/react"
import { AudioWaveform } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useCallback, useEffect } from 'react'
import LoginDialog from '@/components/LoginDialog'
import RegisterDialog from '@/components/RegisterDialog'
import { useDispatch, useSelector } from "react-redux"
import { AuthenticateAction } from "@/app/redux/slices/auth.slice"
import { auth_register_params_dto } from "@/app/api/auth.api"
import { RootState } from "@/app/redux/store"

export default function Navbar() {
    const router = useRouter()
    const pathname = usePathname()
    const { redirectTo } = useSelector((state: RootState) => state.authenticate)
    const [showLoginDialog, setShowLoginDialog] = useState(false)
    const [showRegisterDialog, setShowRegisterDialog] = useState(false)
    const dispatch = useDispatch<any>()

    useEffect(() => {
        if (redirectTo) {
            router.push(redirectTo)
        }
    }, [redirectTo, router])

    const handleTryFreeClick = useCallback(() => {
        const token = localStorage.getItem('token_aivoice')
        if (!token) {
            setShowLoginDialog(true)
            return
        }
        router.push('/text-to-speech')
    }, [router])

    const switchToRegister = useCallback(() => {
        setShowLoginDialog(false)
        setShowRegisterDialog(true)
    }, [])

    const switchToLogin = useCallback(() => {
        setShowRegisterDialog(false)
        setShowLoginDialog(true)
    }, [])

    const handleLogin = useCallback(async (email: string, password: string) => {
        try {
            dispatch(AuthenticateAction.login({ email, password }))
        } catch (error) {
        }
    }, [dispatch])

    const handleRegister = useCallback(async (params: auth_register_params_dto) => {
        try {
            dispatch(AuthenticateAction.register(params))
        } catch (error) {
        }
    }, [dispatch])

    return (
        <>
            <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/text-to-speech" prefetch className="flex items-center gap-2">
                            <AudioWaveform width={32} height={32} className="text-primary"/>
                            <span className="font-bold text-primary">AIVoice</span>
                        </Link>

                        <div className="hidden md:flex items-center space-x-8">
                            <a
                                href="/text-to-speech"
                                className={`hover:text-primary ${pathname === '/text-to-speech' ? 'text-primary' : ''}`}
                            >
                                Text to Speech
                            </a>

                            <a
                                href="/api-endpoint"
                                className={`hover:text-primary ${pathname === '/api' ? 'text-primary' : ''}`}
                            >
                                AIVoice API
                            </a>
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
                           
                            <Button color="warning" onClick={handleTryFreeClick}>
                                Dùng thử miễn phí
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            <LoginDialog
                isOpen={showLoginDialog}
                onClose={() => setShowLoginDialog(false)}
                onLogin={handleLogin}
                onSwitchToRegister={switchToRegister}
            />

            <RegisterDialog
                isOpen={showRegisterDialog}
                onClose={() => setShowRegisterDialog(false)}
                onRegister={handleRegister}
                onSwitchToLogin={switchToLogin}
            />
        </>
    )
}