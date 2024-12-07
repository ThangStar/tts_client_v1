'use client'

import { Button, Card, CardBody, Input } from "@nextui-org/react"
import { Mail, Lock } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
      <Card className="w-full max-w-md">
        <CardBody className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-primary mb-2">Đăng nhập AIVoice</h1>
            <p className="text-default-500">Chào mừng bạn quay trở lại</p>
          </div>

          <form className="space-y-4">
            <Input
              label="Email"
              placeholder="Nhập email của bạn"
              startContent={<Mail className="w-4 h-4 text-default-400" />}
            />
            <Input
              label="Mật khẩu"
              type="password"
              placeholder="Nhập mật khẩu"
              startContent={<Lock className="w-4 h-4 text-default-400" />}
            />
            
            <Button color="primary" className="w-full">
              Đăng nhập
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-default-500">Chưa có tài khoản? </span>
            <Link href="/register" className="text-primary font-medium">
              Đăng ký ngay
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  )
} 