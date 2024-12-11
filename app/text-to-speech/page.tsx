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
} from "@nextui-org/react"
import { Search, Clock, ChevronDown } from 'lucide-react'
import React, { useState } from "react"
import VoiceSelectionModal from '../components/VoiceSelectionModal'
import { useDispatch } from "react-redux"
import VoiceHistoryList from "../components/VoiceHistoryList"
import { VoiceHistoryAction } from "../redux/slices/voiceHistories.slice"
import toast from "react-hot-toast"
import { Actor } from "../types/actor.type"
import { tts_params_dto } from "../api/tts.api"
import { omit } from "lodash"

export default function Page() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedVoice, setSelectedVoice] = useState<Actor>({
    id: 1,
    name: "HN - Ngọc Huyền",
    code: "hn_ngochuyen",
    gender: "FEMALE",
    type: "PREMIUM",
    language: {
      id: 1,
      name: "Tiếng Việt",
      code: "VN",
    }
  });

  // const voiceHistories = useSelector((state: any) => state.voiceHistories.value.voiceHistories);

  const handleVoiceSelect = (voice: Actor) => {
    setSelectedVoice(voice);
    console.log(voice);
    onClose();
  };

  const dispatch = useDispatch<any>();
  const { tts, ttsPending,history } = VoiceHistoryAction
  const [text, setText] = useState("")
  const [isFocused, setIsFocused] = useState(false);


  const handleTTS = (e: any) => {
    e.preventDefault();
    const error = handleValidateText(text);
    if (error) {
      toast.error(error)
      return
    }
    toast.success("Đã thêm vào danh sách yêu cầu...")
    const params: tts_params_dto & { actor: Actor } = {
      prompt: text,
      code: selectedVoice.code || "",
      actor: selectedVoice,
    }
    console.log(params);
    dispatch(ttsPending(params))
    dispatch(tts(omit(params, 'actor')))
  }

  const handleValidateText = (value: string): string | null => {

    if (!value || value.trim() === '') {
      return "Vui lòng nhập nội dung nội dung";
    }
    if (value.length < 40) {
      return "Nội dung phải có ít nhất 40 ký tự";
    }
    if (value.length > 200) {
      return "Nội dung không được vượt quá 200 ký tự";
    }
    return null;
  }
  const [search, setSearch] = useState("")
  const handleSearch = (e: any) => {
    setSearch(e.target.value)
    dispatch(history({
      page: 1,
      limit: 5,
      search: e.target.value
    }))

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
                    <Button
                      endContent={<ChevronDown className="w-4 h-4" />}
                      variant="light"
                      size="sm"
                      className="font-medium"
                    >
                      1x
                    </Button>
                  </div>
                  <div className="hidden lg:block h-5 w-[1px] bg-default-200" />
                  <div className="flex flex-wrap gap-2">
                    <Button
                      endContent={<ChevronDown className="w-4 h-4" />}
                      variant="flat"
                      size="sm"
                      className="bg-white shadow-sm hover:shadow transition-shadow"
                    >
                      Tải tệp lên
                    </Button>
                    <Button variant="flat" size="sm" className="bg-white shadow-sm hover:shadow">wav</Button>
                    <Button variant="flat" size="sm" className="bg-white shadow-sm hover:shadow">320 kbps</Button>
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
                  minRows={8}
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
                    input: "focus:border-primary",
                    innerWrapper: "focus-within:border-primary",
                    inputWrapper: "hover:border-primary-300 focus-within:border-primary"
                  }}
                  className="w-full mb-1"
                />
                <div className="flex justify-end">
                  <span className={`text-sm ${text.length > 200 ? 'text-danger' : 'text-default-400'}`}>
                    {text.length}/200
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
                <Input
                  placeholder="Tìm kiếm theo nội dung"
                  startContent={<Search className="text-default-400 w-4 h-4" />}
                  size="sm"
                  value={search}
                  className="w-full lg:w-64"
                  variant="bordered"
                  classNames={{
                    input: "focus:border-primary",
                    innerWrapper: "focus-within:border-primary",
                    inputWrapper: "hover:border-primary-300 focus-within:border-primary"
                  }}
                  onChange={handleSearch}
                />
                <Button variant="flat" className="bg-white shadow-sm hover:shadow" endContent={<ChevronDown className="w-4 h-4" />}>
                  Trạng thái
                </Button>
                <Button variant="flat" className="bg-white shadow-sm hover:shadow" endContent={<Clock className="w-4 h-4" />}>
                  Bắt đầu - Kết thúc
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-4 bg-white h-[350px] -mx-3 p-2">
              <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                  <VoiceHistoryList 
                    searchContent={search}
                    key={search}
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
          </CardBody>
        </Card>
      </div >
    </Layout >
  )
}

