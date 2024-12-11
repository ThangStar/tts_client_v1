'use client'

import { auth_register_params_dto } from "@/app/api/auth.api"
import { Modal, ModalContent, ModalBody, Button, Input } from "@nextui-org/react"
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react"
import { useForm } from "react-hook-form"
import { useState } from 'react'

type RegisterInput = {
  name: string
  email: string
  password: string
}

export default function RegisterDialog({ isOpen, onClose, onRegister, onSwitchToLogin }: {
  isOpen: boolean
  onClose: () => void
  onRegister: (params: auth_register_params_dto) => void
  onSwitchToLogin: () => void
}) {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInput>()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalBody className="px-8 pb-8">
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-2xl font-bold">Đăng ký</h1>
            <p className="text-default-500">Tạo tài khoản để sử dụng dịch vụ của chúng tôi</p>
            <div className="w-full p-4 bg-blue-50 rounded-lg border border-blue-200 flex items-start gap-3">
              <Mail className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <p className="text-blue-800 font-medium">Yêu cầu về email</p>
                <p className="text-blue-600 text-sm">
                  Hiện tại, chúng tôi chỉ hỗ trợ đăng ký bằng tài khoản Gmail (@gmail.com) để đảm bảo tính minh bạch cho người dùng.
                </p>
              </div>
            </div>

            <form className="w-full" onSubmit={handleSubmit((data) => onRegister({
              displayName: data.name,
              email: data.email,
              password: data.password
            }))}>
              <div className="space-y-4">
                <Input
                  {...register('name', { required: 'Họ tên là bắt buộc' })}
                  label="Họ tên"
                  placeholder="Nhập họ tên của bạn"
                  startContent={<User className="w-4 h-4 text-default-400" />}
                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                <Input
                  {...register('email', {
                    required: 'Email là bắt buộc',
                    pattern: { 
                      value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                      message: 'Vui lòng sử dụng địa chỉ Gmail' 
                    }
                  })}
                  label="Email"
                  placeholder="Nhập email của bạn"
                  startContent={<Mail className="w-4 h-4 text-default-400" />}
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                <Input
                  {...register('password', {
                    required: 'Mật khẩu là bắt buộc',
                    minLength: { value: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự' },
                    pattern: { value: /^(?=.*[a-zA-Z])(?=.*\d).+$/, message: 'Mật khẩu phải có ít nhất một chữ cái và một số' },
                    maxLength: { value: 30, message: 'Mật khẩu không được quá 30 ký tự' }
                  })}
                  label="Mật khẩu"
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Nhập mật khẩu"
                  startContent={<Lock className="w-4 h-4 text-default-400" />}
                  endContent={
                    <Button
                      isIconOnly
                      variant="light"
                      size="sm"
                      className="focus:outline-none"
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                      {isPasswordVisible ?
                        <EyeOff className="w-4 h-4 text-default-400" /> :
                        <Eye className="w-4 h-4 text-default-400" />
                      }
                    </Button>
                  }
                />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                <Button
                  color="primary"
                  className="w-full"
                  size="lg"
                  type="submit"
                >
                  Đăng ký
                </Button>
              </div>
            </form>

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