'use client'

import { Modal, ModalContent, ModalHeader, ModalBody, Button, Input } from "@nextui-org/react"
import { Mail, Lock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function LoginDialog({ isOpen, onClose, onLogin, onSwitchToRegister }: {
  isOpen: boolean
  onClose: () => void
  onLogin: (email: string, password: string) => void
  onSwitchToRegister: () => void
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
        </ModalHeader>
        <ModalBody className="px-8 pb-8">
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-2xl font-bold">Đăng nhập</h1>
            <p className="text-default-500">Đăng nhập để sử dụng dịch vụ của chúng tôi</p>
            
            <div className="w-full space-y-4">
              <Input
                label="Email"
                placeholder="Nhập email của bạn"
                startContent={<Mail className="w-4 h-4 text-default-400" />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Mật khẩu"
                type="password"
                placeholder="Nhập mật khẩu"
                startContent={<Lock className="w-4 h-4 text-default-400" />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              
              <Button 
                color="primary" 
                className="w-full"
                size="lg"
                onClick={() => onLogin(email, password)}
              >
                Đăng nhập
              </Button>
            </div>

            <p className="text-center text-default-500">
              Chưa có tài khoản? {" "}
              <Button 
                variant="light" 
                className="text-primary p-0"
                onClick={onSwitchToRegister}
              >
                Đăng ký ngay
              </Button>
            </p>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
} 