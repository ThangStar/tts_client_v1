'use client'

import { Navbar, NavbarBrand, NavbarContent, Button, Avatar, Badge } from "@nextui-org/react"
import { ShoppingCart, LogOut } from 'lucide-react'
import Link from "next/link"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar maxWidth="full" className="border-b">
        <NavbarBrand>
          <Link href="/" className="font-bold text-xl text-primary">AIVoice</Link>
        </NavbarBrand>
        <NavbarContent justify="end" className="gap-4">
          <Badge content="0" color="primary" size="sm">
            <Button isIconOnly variant="light">
              <ShoppingCart className="w-5 h-5" />
            </Button>
          </Badge>
          <Avatar 
            src="https://i.pravatar.cc/150?img=3" 
            size="sm"
            className="cursor-pointer"
          />
          <Button 
            variant="light" 
            color="danger" 
            startContent={<LogOut className="w-4 h-4" />}
          >
            Đăng xuất
          </Button>
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  )
} 