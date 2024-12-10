'use client'

import { Modal, ModalContent, ModalHeader, ModalBody, Button, Input } from "@nextui-org/react"
import { Mail, Lock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"

type LoginInput = {
  email: string
  password: string
}
export default function LoginDialog({ isOpen, onClose, onLogin, onSwitchToRegister }: {
  isOpen: boolean
  onClose: () => void
  onLogin: (email: string, password: string) => void
  onSwitchToRegister: () => void
}) {

  const { register, handleSubmit, formState: { errors }, getValues } = useForm<LoginInput>()
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
        </ModalHeader>
        <ModalBody className="px-8 pb-8">
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-2xl font-bold">Đăng nhập</h1>
            <p className="text-default-500">Đăng nhập để sử dụng dịch vụ của chúng tôi</p>

            <form className="w-full" onSubmit={handleSubmit((data) => onLogin(data.email, data.password))}>
              <div className=" space-y-4" >
                <Input
                  {...register('email', { required: 'Email là bắt buộc', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email không đúng định dạng' }, maxLength: { value: 255, message: 'Email không được quá 255 ký tự' } })}
                  label="Email"
                  placeholder="Nhập email của bạn"
                  startContent={<Mail className="w-4 h-4 text-default-400" />}
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                <Input
                  {...register('password', {
                    required: 'Mật khẩu là bắt buộc', minLength: { value: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự' },
                    pattern: { value: /^(?=.*[a-zA-Z])(?=.*\d).+$/, message: 'Mật khẩu phải có ít nhất một chữ cái và một số' },
                    maxLength: { value: 30, message: 'Mật khẩu không được quá 30 ký tự' }
                  })}
                  label="Mật khẩu"
                  type="password"
                  placeholder="Nhập mật khẩu"
                  startContent={<Lock className="w-4 h-4 text-default-400" />}
                />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                <Button
                  color="primary"
                  className="w-full"
                  size="lg"
                  type="submit"
                >
                  Đăng nhập
                </Button>
              </div>
            </form>

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
    </Modal >
  )
} 