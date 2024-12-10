'use client'

import { auth_register_params_dto } from "@/app/api/auth.api"
import { Modal, ModalContent, ModalBody, Button, Input } from "@nextui-org/react"
import { Mail, Lock, User } from "lucide-react"
import { useForm } from "react-hook-form"

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

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalBody className="px-8 pb-8">
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-2xl font-bold">Đăng ký</h1>
            <p className="text-default-500">Tạo tài khoản để sử dụng dịch vụ của chúng tôi</p>
            
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
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email không đúng định dạng' } 
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
                    pattern: { value: /^(?=.*[a-zA-Z])(?=.*\d).+$/, message: 'Mật khẩu phải có ít nhất một chữ cái và một số' }
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