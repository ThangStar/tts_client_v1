'use client'

import { Button } from "@nextui-org/react"
import { Menu, X, History, Mic2, Crown, FolderOpenDot } from 'lucide-react'
import { useState, MouseEvent } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { VoiceState } from "../redux/slices/voiceHistories.slice"

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const router = useRouter()

    // const { user }: AuthenticateState = useSelector((state: any) => {
    //     return state.authenticate.value
    // })

    const { keyState }: VoiceState = useSelector((state: any) => {
        return state.voiceHistories.value
    })

    const menuItems = [
        {
            group: "Menu",
            items: [
                { icon: <History className="w-4 h-4" />, label: "Lịch sử", href: "/history", isPro: false },
                { icon: <Mic2 className="w-4 h-4" />, label: "AIVoice API", href: "/api-endpoint", isPro: false },
                // { icon: <CreditCard className="w-4 h-4" />, label: "Thanh toán", href: "/payment/history", isPro: false },
            ]
        }
    ]

    const handleNewProject = () => {
        // Clear all input data
        // Redirect to text-to-speech page
        window.location.href = '/text-to-speech';
    }

    const handleNavigate = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, href: string) => {
        e.preventDefault()
        router.push(href)
    }

    // const handleLogout = () => {
    //     document.cookie = "jwt_voice=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    //     window.location.href = '/';
    // }

    return (
        <>
            {/* Mobile Menu Button */}
            <Button
                isIconOnly
                variant="light"
                className="lg:hidden fixed top-4 right-4 z-50"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>

            {/* Sidebar */}
            <div className={`
        fixed top-0 lg:static 
        w-[280px] lg:w-60
        h-screen 
        transition-all duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        border-r bg-white/50 backdrop-blur-xl
        z-40
        overflow-y-auto
        scrollbar-hide
      `}>
                {/* New Project Button */}
                <div className="p-4">
                    <Button
                        startContent={<FolderOpenDot className="w-4 h-4" />}
                        color="primary"
                        className="w-full font-medium shadow-lg hover:shadow-primary/25 transition-shadow"
                        size="lg"
                        onClick={handleNewProject}
                    >
                        Dự án của tôi
                    </Button>
                </div>

                {/* Menu Items */}
                <div className="px-3 py-2">
                    {menuItems.map((group, idx) => (
                        <div key={idx} className="mb-6">
                            <p className="text-xs font-semibold text-default-500 px-3 mb-2 uppercase tracking-wider">
                                {group.group}
                            </p>
                            {group.items.map((item, itemIdx) => (
                                <Button
                                    key={itemIdx}
                                    onClick={(e) => handleNavigate(e, item.href)}
                                    startContent={item.icon}
                                    variant="light"
                                    className={`w-full justify-start font-normal mb-1 h-12
                      ${item.isPro ? 'bg-gradient-to-r from-primary/10 to-warning/10 text-warning' : ''}
                      ${pathname === item.href ? 'bg-primary/10 text-primary' : ''}
                    `}
                                    endContent={item.isPro &&
                                        <span className="text-[10px] font-semibold bg-warning/20 text-warning px-2 py-0.5 rounded-full">
                                            PRO
                                        </span>
                                    }
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Pro Card */}
                <div className="px-4 mb-2">
                    <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-warning/10">
                        <div className="flex items-center gap-2 mb-2">
                            <Crown className="w-4 h-4 text-warning" />
                            <p className="text-base font-semibold text-warning">Mua Thêm Ký Tự</p>
                        </div>
                        <p className="text-xs text-default-600 mb-3">
                            Nâng cấp tài khoản để có thêm nhiều tính năng hơn
                        </p>
                        <Link href="/pricing">
                            <Button
                                className="w-full bg-warning text-white font-medium h-9 text-sm"
                            >
                                Bảng giá
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Usage Card - Compact version */}
                <div className="px-4 mb-4">
                    <div className="p-3 rounded-lg bg-default-50">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-xs text-default-600">Số ký tự còn lại:</p>
                        </div>
                        <p className="text-sm font-bold">
                            {keyState.remaining_chars?.toLocaleString('vi-VN') || '0'} ký tự
                        </p>
                    </div>
                </div>

                {/* Bottom Section */}
                {/* <div className="absolute bottom-0 lg:bottom-16 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-default-100">
                        <div className="flex items-center gap-3">
                            <Image 
                                src={`/images/avatar_default.jpg`} 
                                alt="User avatar" 
                                width={40}
                                height={40}
                                className="rounded-full object-cover"
                            />
                            <div>
                                <p className="text-sm font-medium truncate text-ellipsis w-24">{user?.display_name || "Tên người dùng"}</p>
                                <p className="text-xs text-default-500 truncate text-ellipsis w-24">{user?.email || "user@example.com"}</p>
                            </div>
                        </div>
                        <Button
                            isIconOnly
                            variant="light"
                            className="text-default-500 hover:text-danger"
                            onClick={handleLogout}
                        >
                            <LogOut className="w-4 h-4" />
                        </Button>
                    </div>
                </div> */}
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden z-30"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    )
} 