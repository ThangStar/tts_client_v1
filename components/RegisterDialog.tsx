'use client'

import { Modal, ModalContent, ModalHeader, ModalBody, Button, Input } from "@nextui-org/react"
import { Mail, Lock, User } from "lucide-react"
import Image from "next/image"

export default function RegisterDialog({ isOpen, onClose, onRegister, onSwitchToLogin }: {
  isOpen: boolean
  onClose: () => void
  onRegister: (email: string, password: string) => void
  onSwitchToLogin: () => void
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalBody className="px-8 pb-8">
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-2xl font-bold">Đăng ký</h1>
            <p className="text-default-500">Tạo tài khoản để sử dụng dịch vụ của chúng tôi</p>
            
            <div className="w-full space-y-4">
              <Input
                label="Họ tên"
                placeholder="Nhập họ tên của bạn"
                startContent={<User className="w-4 h-4 text-default-400" />}
              />
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
              
              <Button 
                color="primary" 
                className="w-full"
                size="lg"
                onClick={() => onRegister('email', 'password')}
              >
                Đăng ký
              </Button>
            </div>

            <p className="text-center text-default-500">
              Đã có tài khoản? {" "}
              <Button 
                variant="light" 
                className="text-primary p-0"
                onClick={onSwitchToLogin}
              >
                Đăng nhập ngay
              </Button>
            </p>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
} 