'use client'

import Layout from "@/app/components/layout/layout"
import {
  Button,
  Avatar,
  Input,
  Card,
  CardBody,
  Textarea,
  useDisclosure,
  Checkbox,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react"
import { Clock, ChevronDown } from 'lucide-react'
import React, { useEffect, useState } from "react"
import VoiceSelectionModal from '../components/VoiceSelectionModal'
import PunctuationSettingsModal from '../components/PunctuationSettingsModal'
import { useDispatch } from "react-redux"
import VoiceHistoryList from "../components/VoiceHistoryList"
import { VoiceHistoryAction } from "../redux/slices/voiceHistories.slice"
import toast from "react-hot-toast"
import { Actor } from "../types/actor.type"
import { KEY_LOCAL } from "@/constants/constants"

export default function Page() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isPunctuationOpen, onOpen: onPunctuationOpen, onClose: onPunctuationClose } = useDisclosure();
  
  // Danh sách tùy chọn tốc độ phát
  const speedOptions = [
    { value: 0.25, label: "0.25x", description: "Rất chậm" },
    { value: 0.5, label: "0.5x", description: "Chậm" },
    { value: 0.75, label: "0.75x", description: "Hơi chậm" },
    { value: 1, label: "1x", description: "Bình thường" },
    { value: 1.05, label: "1.05x", description: "Hơi nhanh" },
    { value: 1.1, label: "1.1x", description: "Nhanh" },
    { value: 1.15, label: "1.15x", description: "Rất nhanh" }
  ];
  
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [selectedVoice, setSelectedVoice] = useState<Actor>({
    id: 1,
    name: "HN - Ngọc Huyền",
    code: "hn_female_ngochuyen_full_48k-fhg",
    gender: "female",
    type: "PREMIUM",
    description: "Giọng nữ nổi bật nhất của Vbee, chất giọng truyền cảm, rõ ràng, phù hợp với các nội dung review phim, giải trí, quảng cáo.",
    avatar: "https://vbee-studio-data.s3.ap-southeast-1.amazonaws.com/images/voices/round/ngoc-huyen.png",
    is_premium: true,
    sample_audio: "https://vbee.s3.ap-southeast-1.amazonaws.com/audios/demo/vbee/hn_female_ngochuyen_fast_news_48k-thg.mp3",
    language: {
      id: 1,
      name: "Tiếng Việt",
      code: "vi-VN"
    },
    category: {
      id: 1,
      name: "Review",
      code: "review"
    }
  },);

  // const voiceHistories = useSelector((state: any) => state.voiceHistories.value.voiceHistories);

  const handleVoiceSelect = (voice: Actor) => {
    setSelectedVoice(voice);
    onClose();
  };

  const dispatch = useDispatch<any>();
  const { tts, verifyKey } = VoiceHistoryAction
  const [text, setText] = useState("")
  const [isFocused, setIsFocused] = useState(false);


  const handleTTS = (e: any) => {
    e.preventDefault();

    // Kiểm tra key đã được xác minh chưa
    if (!isVerify) {
      toast.error("Vui lòng xác minh key trước khi sử dụng")
      return
    }

    const error = handleValidateText(text);
    if (error) {
      toast.error(error)
      return
    }

    console.log("text", text);
    console.log("playbackSpeed", playbackSpeed);
    console.log("selectedVoice", selectedVoice.code);
    console.log("punctuation", getPunctuationString(punctuationSettings));
    
    dispatch(tts({
      content: text, 
      speech: playbackSpeed,
      voice: selectedVoice.code || "hn_female_ngochuyen_full_48k-fhg",
      punctuation: getPunctuationString(punctuationSettings)
    }))
  }

  const handleValidateText = (value: string): string | null => {

    if (!value || value.trim() === '') {
      return "Vui lòng nhập nội dung";
    }
    if (value.length < 10) {
      return "Nội dung phải có ít nhất 10 ký tự";
    }
    if (value.length > 50000) {
      return "Nội dung không được vượt quá 50000 ký tự";
    }
    return null;
  }

  const [key, setKey] = useState("")
  const [punctuationSettings, setPunctuationSettings] = useState({
    period: 0.45,
    semicolon: 0.3,
    comma: 0.25,
    paragraph: 0.6
  })

  useEffect(() => {
    const local_key = localStorage.getItem(KEY_LOCAL)
    if (local_key != null) {
      setKey(local_key)
    }

  }, [])

  const [isVerify, setIsVerify] = useState(false)
  const handleVerifyKey = async () => {
    if (key.trim() === "") {
      toast.error("Vui lòng nhập key")
      return
    }
    // call api verify key
    try {
      const res = await dispatch(verifyKey({
        key: key
      })).unwrap()

      // Nếu xác minh thành công, set isVerify = true
      if (res) {
        setIsVerify(true)
        console.log("Xác minh key thành công:", res)
      }
    } catch (error) {
      // Nếu xác minh thất bại, set isVerify = false
      setIsVerify(false)
      console.log("Xác minh key thất bại:", error)
    }
  }

  // Function để tạo chuỗi punctuation theo format yêu cầu
  const getPunctuationString = (settings: any) => {
    return `${Math.round(settings.period * 100) / 100},${Math.round(settings.comma * 100) / 100},${Math.round(settings.semicolon * 100) / 100},${Math.round(settings.paragraph * 100) / 100}`
  }

  const handlePunctuationSave = (settings: any) => {
    setPunctuationSettings(settings)
    
    // Format punctuation settings thành chuỗi theo thứ tự: dấu chấm, phẩy, chấm phẩy, giữa các đoạn
    const punctuationString = getPunctuationString(settings)
    console.log("Punctuation settings:", punctuationString)
    
    toast.success("Đã lưu thiết lập dấu câu")
  }

  return (
    <Layout>
      <div className="flex-1 p-1 lg:p-3 bg-gradient-to-br from-blue-50/50 to-primary/5">
        <Card className="mb-6 shadow-lg transition-shadow">
          <CardBody className="p-4 lg:p-6">
            {/* Voice Controls */}
            <form action="" onSubmit={handleTTS}>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
                <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                  <div
                    className="flex items-center gap-2 hover:bg-primary/5 p-2 rounded-lg cursor-pointer transition-colors group"
                    onClick={onOpen}
                  >
                    <Avatar
                      src={selectedVoice.avatar}
                      size="sm"
                      className="border-2 border-primary group-hover:scale-110 transition-transform"
                    />
                    <span className="font-medium">{selectedVoice.name}</span>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button
                          endContent={<ChevronDown className="w-4 h-4" />}
                          variant="light"
                          size="sm"
                          className="font-medium"
                        >
                          {speedOptions.find(option => option.value === playbackSpeed)?.label || "1x"}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Tốc độ phát"
                        onAction={(key) => setPlaybackSpeed(parseFloat(key as string))}
                        selectedKeys={[playbackSpeed.toString()]}
                      >
                        {speedOptions.map((option) => (
                          <DropdownItem key={option.value.toString()}>
                            <div className="flex flex-col">
                              <span className="font-medium">{option.label}</span>
                              <span className="text-xs text-default-500">{option.description}</span>
                            </div>
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                  <div className="hidden lg:block h-5 w-[1px] bg-default-200" />
                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={onPunctuationOpen}
                      variant="flat"
                      size="sm"
                      className="bg-white shadow-sm hover:shadow transition-shadow"
                    >
                      Thiết lập dấu câu
                    </Button>
                    <Button variant="flat" size="sm" className="bg-white shadow-sm hover:shadow">wav</Button>
                    <Button variant="flat" size="sm" className="bg-white shadow-sm hover:shadow">320 kbps</Button>
                    <Input
                      value={key}
                      onChange={(e) => setKey(e.target.value)}
                      className="w-76"
                      placeholder="Nhập key"
                      color={isVerify ? "success" : "default"}
                    />
                    <Button
                      className={`shadow-sm hover:shadow transition-shadow ${isVerify
                          ? 'bg-green-600 text-white'
                          : 'bg-blue-600 text-white'
                        }`}
                      onClick={handleVerifyKey}
                    >
                      {isVerify ? '✓ Đã xác minh' : 'Xác minh key'}
                    </Button>

                    {/* button href to https://www.facebook.com/profile.php?id=61578970415613 */}
                    <a
                      className="shadow-sm hover:shadow transition-shadow bg-warning text-white p-2 rounded-lg"
                      target="_blank"
                      href="https://www.facebook.com/profile.php?id=61578970415613"
                    >
                      Liên hệ hỗ trợ
                    </a>

                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    type="submit"
                    className="font-medium bg-gradient-to-tr from-primary to-primary-600 text-white shadow-lg 
                    hover:shadow-primary/30 hover:opacity-90 active:opacity-80 transition-all duration-300
                    px-6 py-2 rounded-xl border border-primary-200/50"
                  >
                    Chuyển đổi
                  </Button>
                </div>
              </div>
              {/* Text Input */}
              <div className="mb-6">
                <Textarea
                  placeholder="Nhập hoặc copy và dán văn bản vào đây để chuyển thành giọng nói..."
                  minRows={15}
                  maxRows={20}
                  validate={(value) => {
                    if (!isFocused) return null;
                    return handleValidateText(value);
                  }}
                  size="lg"
                  variant="bordered"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  classNames={{
                    input: "focus:border-primary resize-y",
                    innerWrapper: "focus-within:border-primary",
                    inputWrapper: "hover:border-primary-300 focus-within:border-primary"
                  }}
                  className="w-full mb-1"
                  style={{ resize: 'vertical' }}
                />
                <div className="flex justify-end">
                  <span className={`text-sm ${text.length > 50000 ? 'text-danger' : 'text-default-400'}`}>
                    {text.length}/50000
                  </span>
                </div>
              </div>
            </form>

            {/* Text Normalization Checkbox */}
            <div className="flex items-center gap-2">
              <Checkbox defaultSelected>
                Chuẩn hóa văn bản
              </Checkbox>
            </div>
          </CardBody>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardBody>
            {/* Bottom Controls */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <Button
                startContent={<ChevronDown className="w-4 h-4" />}
                variant="flat"
                className="bg-white shadow-sm hover:shadow transition-shadow w-full lg:w-auto"
              >
                Danh sách yêu cầu
              </Button>
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2 w-full lg:w-auto">
                <Button variant="flat" className="bg-white shadow-sm hover:shadow" endContent={<ChevronDown className="w-4 h-4" />}>
                  Trạng thái
                </Button>
                <Button variant="flat" className="bg-white shadow-sm hover:shadow" endContent={<Clock className="w-4 h-4" />}>
                  Bắt đầu - Kết thúc
                </Button>
              </div>
            </div>

            {/* Download Warning */}
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3.586l-.293-.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 10.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-amber-800 mb-1">
                    Lưu ý quan trọng
                  </h4>
                  <p className="text-sm text-amber-700 leading-relaxed">
                    <strong>Link tải xuống sẽ tự động hết hạn sau vài phút.</strong>
                    Vui lòng tải xuống ngay khi chuyển đổi xong để tránh mất file audio.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 bg-white h-[350px] -mx-3 p-2">
              <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                  <VoiceHistoryList
                  />
                </div>
              </div>
            </div>
            {/* Voice Selection Modal */}
            <VoiceSelectionModal
              isOpen={isOpen}
              onClose={onClose}
              onVoiceSelect={handleVoiceSelect}
            />
            
            {/* Punctuation Settings Modal */}
            <PunctuationSettingsModal
              isOpen={isPunctuationOpen}
              onClose={onPunctuationClose}
              onSave={handlePunctuationSave}
            />
          </CardBody>
        </Card>
      </div >
    </Layout >
  )
}

