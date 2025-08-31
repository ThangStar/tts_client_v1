'use client'

import { Button, Card, CardBody } from "@nextui-org/react"
import { ArrowRight, Mic2, Headphones, CheckCircle, Play, Heart, Sparkles, Video } from 'lucide-react'
import Navbar from "@/components/Navbar"
import { useState, useCallback } from 'react'
import { useDispatch } from "react-redux"
import dynamic from 'next/dynamic'
import { AuthenticateAction } from "./redux/slices/auth.slice"
import { auth_register_params_dto } from "./api/auth.api"
import s1Animation from '../public/animationes/s1.json'
import s2Animation from '../public/animationes/s2.json'
import s3Animation from '../public/animationes/s3.json'
import s4Animation from '../public/animationes/s4.json'
import Image from "next/image"

// Dynamically import components that might use document
const LoginDialog = dynamic(() => import('@/components/LoginDialog'), { ssr: false })
const RegisterDialog = dynamic(() => import('@/components/RegisterDialog'), { ssr: false })
const VoiceSelectionModal = dynamic(() => import('./components/VoiceSelectionModal'), { ssr: false })
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })
export default function HomePage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [showRegisterDialog, setShowRegisterDialog] = useState(false)
  const [showVoiceModal, setShowVoiceModal] = useState(false)

  const handleActionClick = useCallback(() => {
    // const token = localStorage.getItem('token_aivoice')
    // if (!token) {
    //   setShowLoginDialog(true)
    //   return
    // }
    window.location.href = '/text-to-speech'
  }, [])

  const switchToRegister = useCallback(() => {
    setShowLoginDialog(false)
    setShowRegisterDialog(true)
  }, [])

  const switchToLogin = useCallback(() => {
    setShowRegisterDialog(false)
    setShowLoginDialog(true)
  }, [])
  const dispatch = useDispatch<any>()
  const authAction = AuthenticateAction
  const handleLogin = useCallback(async (email: string, password: string) => {
    try {
      // Implement login logic here
      // setShowLoginDialog(false)
      dispatch(authAction.login({ email, password }))
    } catch (error) {
      console.error('Login failed:', error)
    }
  }, [authAction, dispatch])

  const handleRegister = useCallback(async (params: auth_register_params_dto) => {
    try {
      // Implement register logic here
      // setShowRegisterDialog(false)
      // setShowLoginDialog(true) // Show login after successful registration

      dispatch(authAction.register(params))
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }, [authAction, dispatch])

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-16">
        {/* Thêm thông báo khuyến mãi */}
        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-b border-yellow-200">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-center gap-2 text-default-600">
              <Sparkles className="w-5 h-5 text-yellow-600" />
              <p className="text-sm md:text-base">
                🎁 <span className="font-semibold">Ưu đãi đặc biệt:</span> Nhận ngay 10 lượt dùng thử miễn phí khi đăng ký tài khoản mới!
                <Button
                  className="ml-3 text-sm"
                  color="warning"
                  variant="flat"
                  size="sm"
                  onClick={() => setShowRegisterDialog(true)}
                >
                  Đăng ký ngay
                </Button>
              </p>
            </div>
          </div>
        </div>

        {/* Hero Section - Cập nhật nội dung */}
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 py-28 lg:py-36">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                <h1 className="text-4xl lg:text-5xl font-bold mb-8 text-primary">
                  Biến văn bản thành giọng nói tự nhiên với AI Voice
                </h1>
                <p className="text-xl text-default-600 mb-10">
                  Công nghệ AI tiên tiến giúp tạo ra giọng đọc chân thực, tự nhiên như người thật. 
                  Hỗ trợ đa dạng giọng đọc 3 miền Bắc - Trung - Nam cùng nhiều ngôn ngữ khác.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    color="primary"
                    endContent={<ArrowRight />}
                    className="text-base sm:text-lg px-6 sm:px-8 py-6 w-full sm:w-auto"
                    onClick={handleActionClick}
                  >
                    Dùng thử miễn phí
                  </Button>
                  <Button
                    size="lg"
                    variant="bordered"
                    endContent={<Headphones />}
                    className="text-base sm:text-lg px-6 sm:px-8 py-6 w-full sm:w-auto"
                    onClick={() => setShowVoiceModal(true)}
                  >
                    Nghe thử giọng đọc
                  </Button>
                </div>
              </div>
              <div className="relative group">
                <video
                  src="/videos/intro.mp4"
                  poster="/images/intro-thumbnail.jpg"
                  className="w-full rounded-xl "
                  width={600}
                  height={400}
                  controls={isPlaying}
                  preload="metadata"
                />

                {!isPlaying && (
                  <>
                    <div
                      onClick={() => setIsPlaying(true)}
                      className="absolute inset-0 cursor-pointer bg-black/10 hover:bg-black/20 transition-colors duration-300 rounded-xl"
                    />

                    <button
                      onClick={() => setIsPlaying(true)}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                       group-hover:scale-110 transition-transform duration-300 pointer-events-none"
                    >
                      <div className="relative">
                        <div className="absolute -inset-4 bg-white/30 rounded-full blur-md" />
                        <div className="relative bg-white w-16 h-16 rounded-full flex items-center justify-center
                                      hover:bg-primary/10 transition-colors duration-300">
                          <Play className="w-8 h-8 text-primary fill-primary" />
                        </div>
                      </div>
                    </button>

                    <div className="absolute bottom-4 right-4 bg-black/60 px-2 py-1 rounded text-white text-sm">
                      2:30
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>


        {/* Interface Introduction */}
        <div className="py-20 border-b">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Giao diện đơn giản, dễ sử dụng
              </h2>
              <p className="text-lg text-gray-600">
                Chỉ với vài thao tác đơn giản, bạn có thể tạo ra những audio chất lượng cao.
                Giao diện thân thiện, trực quan giúp việc chuyển đổi văn bản thành giọng nói trở nên dễ dàng hơn bao giờ hết.
              </p>
            </div>
            <div className="relative">
              <div className="flex items-center">
                <Image src="/images/s1.png" alt="AI Voice Interface" width={1200} height={675} className="rounded-xl  mx-auto" />
              </div>
              {/* Optional: Add gradient overlay at the bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Tính năng nổi bật</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="transition-transform hover:scale-105">
                <CardBody className="text-center p-6">
                  <div className="rounded-full bg-primary/10 p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Mic2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Đa dạng giọng nói và ngôn ngữ</h3>
                  <p className="text-default-500">
                    Hỗ trợ nhiều giọng đọc từ các vùng miền và đa dạng ngôn ngữ khác nhau
                  </p>
                </CardBody>
              </Card>

              <Card className="transition-transform hover:scale-105">
                <CardBody className="text-center p-6">
                  <div className="rounded-full bg-primary/10 p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Heart className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Cảm xúc chân thật</h3>
                  <p className="text-default-500">
                    Giọng đọc thể hiện cảm xúc tự nhiên, phù hợp với từng nội dung
                  </p>
                </CardBody>
              </Card>

              <Card className="transition-transform hover:scale-105">
                <CardBody className="text-center p-6">
                  <div className="rounded-full bg-primary/10 p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Chất lượng giọng nói tự nhiên</h3>
                  <p className="text-default-500">
                    Âm thanh rõ ràng, trong trẻo và tự nhiên như người thật
                  </p>
                </CardBody>
              </Card>

              <Card className="transition-transform hover:scale-105">
                <CardBody className="text-center p-6">
                  <div className="rounded-full bg-primary/10 p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Video className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Đa dạng ứng dụng</h3>
                  <p className="text-default-500">
                    Dễ dàng tạo video quảng cáo, review phim, broadcast, video giảng dạy sinh động
                  </p>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>

        {/* Use Cases with Images */}
        <div className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Ứng dụng đa dạng</h2>

            {/* Đa dạng giọng nói */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
              <div className="flex items-center">
                <Lottie
                  animationData={s1Animation}
                  className="w-[500px] h-[400px]"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4">Đa dạng giọng nói và ngôn ngữ</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Cung cấp đa dạng giọng đọc từ nhiều vùng miền khác nhau, phù hợp với mọi nhu cầu sử dụng.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-primary mr-2" />
                    Hỗ trợ nhiều giọng nam nữ từ 3 miền
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-primary mr-2" />
                    Đa dạng độ tuổi và phong cách giọng đọc
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-primary mr-2" />
                    Hỗ trợ nhiều ngôn ngữ khác nhau
                  </li>
                </ul>
              </div>
            </div>

            {/* Cảm xúc chân thật */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
              <div className="flex flex-col justify-center order-2 md:order-1">
                <h3 className="text-2xl font-bold mb-4">Cảm xúc chân thật</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Giọng đọc thể hiện cảm xúc tự nhiên, mang đến trải nghiệm chân thực cho người nghe.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-primary mr-2" />
                    Điều chỉnh cảm xúc theo nội dung
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-primary mr-2" />
                    Thể hiện được các sắc thái tình cảm
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-primary mr-2" />
                    Giọng đọc sinh động và cuốn hút
                  </li>
                </ul>
              </div>
              <div className="flex items-center order-1 md:order-2">
                <Lottie
                  animationData={s2Animation}
                  className="w-[500px] h-[400px]"
                />
              </div>
            </div>

            {/* Chất lượng giọng nói */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
              <div className="flex items-center">
                <Lottie
                  animationData={s4Animation}
                  className="w-[500px] h-[400px]"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4">Chất lượng giọng nói tự nhiên</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Âm thanh rõ ràng, trong trẻo và tự nhiên như người thật.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-primary mr-2" />
                    Chất lượng âm thanh HD
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-primary mr-2" />
                    Giọng nói mượt mà, không bị ngắt quang
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-primary mr-2" />
                    Phát âm chuẩn xác và tự nhiên
                  </li>
                </ul>
              </div>
            </div>

            {/* Đa dạng ứng dụng */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="flex flex-col justify-center order-2 md:order-1">
                <h3 className="text-2xl font-bold mb-4">Đa dạng ứng dụng</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Dễ dàng tạo nội dung đa phương tiện với nhiều mục đích sử dụng khác nhau.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-primary mr-2" />
                    Tạo video quảng cáo chuyên nghiệp
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-primary mr-2" />
                    Sản xuất video review sản phẩm
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-primary mr-2" />
                    Xây dựng nội dung giảng dạy trực tuyến
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-primary mr-2" />
                    Tạo podcast và nội dung broadcast
                  </li>
                </ul>
              </div>
              <div className="flex items-center order-1 md:order-2">
                <Lottie
                  animationData={s3Animation}
                  className="w-[500px] h-[400px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Khách hàng nói gì về chúng tôi</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Add testimonial cards */}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-primary py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-8">
              Bắt đầu sử dụng AI Voice ngay hôm nay
            </h2>
            <Button
              size="lg"
              color="warning"
              endContent={<ArrowRight />}
              className="text-lg"
              onClick={handleActionClick}
            >
              Dùng thử miễn phí
            </Button>
          </div>
        </div>
      </div>

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

      <VoiceSelectionModal
        isTry
        onVoiceSelect={() => { }}
        isOpen={showVoiceModal}
        onClose={() => setShowVoiceModal(false)}
      />
    </>
  )
}

