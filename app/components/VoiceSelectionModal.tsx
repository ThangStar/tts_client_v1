'use client'

import { useState } from "react"
import {
  Modal, 
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  Avatar,
  Radio,
  RadioGroup,
  Pagination,
  Chip
} from "@nextui-org/react"
import { Search, PlayCircle, Settings } from 'lucide-react'

// Định nghĩa types
type Voice = {
  id: string
  name: string
  avatar: string
  type: string
  gender: 'male' | 'female'
  language: string
  quality: 'standard' | 'premium'
  category: string
}

type FilterState = {
  gender: string
  quality: string
  language: string
}

export default function VoiceSelectionModal({ 
  isOpen, 
  onClose,
  onVoiceSelect
}: { 
  isOpen: boolean
  onClose: () => void
  onVoiceSelect: (voice: Voice) => void
}) {
  // States
  const [searchQuery, setSearchQuery] = useState("")
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState<FilterState>({
    gender: "",
    quality: "",
    language: ""
  })

  // Mock data cho voices
  const voices: Voice[] = [
    {
      id: "1",
      name: "HN - Ngọc Huyền",
      avatar: "https://i.pravatar.cc/150?img=44",
      type: "Tổng đài",
      gender: "female",
      language: "vi-VN",
      quality: "premium",
      category: "business"
    },
    {
      id: "2",
      name: "SG - Thanh Tùng",
      avatar: "https://i.pravatar.cc/150?img=68",
      type: "Đọc truyện",
      gender: "male",
      language: "vi-VN",
      quality: "standard",
      category: "story"
    },
    {
      id: "3",
      name: "HN - Mai Anh",
      avatar: "https://i.pravatar.cc/150?img=45",
      type: "Podcast",
      gender: "female",
      language: "vi-VN",
      quality: "premium",
      category: "podcast"
    },
    // Thêm nhiều voices khác...
  ]

  // Filter functions
  const filteredVoices = voices.filter(voice => {
    const matchesSearch = voice.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGender = !filters.gender || voice.gender === filters.gender
    const matchesQuality = !filters.quality || voice.quality === filters.quality
    const matchesLanguage = !filters.language || voice.language === filters.language
    return matchesSearch && matchesGender && matchesQuality && matchesLanguage
  })

  // Pagination
  const itemsPerPage = 5
  const totalPages = Math.ceil(filteredVoices.length / itemsPerPage)
  const currentPageVoices = filteredVoices.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  // Reset filters
  const resetFilters = () => {
    setFilters({
      gender: "",
      quality: "",
      language: ""
    })
    setSearchQuery("")
    setPage(1)
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="2xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h2 className="text-lg font-bold">Chọn giọng đọc</h2>
          <Input
            placeholder="Tìm kiếm giọng đọc..."
            startContent={<Search className="text-default-400 w-4 h-4" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="sm"
            variant="bordered"
          />
        </ModalHeader>
        <ModalBody className="gap-6">
          <div className="flex gap-8">
            {/* Left Filters */}
            <div className="w-48 space-y-6">
              <div>
                <h3 className="font-semibold mb-2 text-sm">Bộ lọc</h3>
                <Button 
                  variant="flat" 
                  size="sm" 
                  className="w-full justify-start bg-default-100"
                  startContent={<Settings className="w-4 h-4" />}
                  onClick={resetFilters}
                >
                  Đặt lại bộ lọc
                </Button>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2 text-sm">Giới tính</h3>
                <RadioGroup
                  value={filters.gender}
                  onValueChange={(value) => setFilters({...filters, gender: value})}
                >
                  <Radio value="female">Nữ</Radio>
                  <Radio value="male">Nam</Radio>
                </RadioGroup>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-sm">Loại giọng</h3>
                <RadioGroup
                  value={filters.quality}
                  onValueChange={(value) => setFilters({...filters, quality: value})}
                >
                  <Radio value="standard">Tiêu chuẩn</Radio>
                  <Radio value="premium">Cao cấp</Radio>
                </RadioGroup>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-sm">Ngôn ngữ</h3>
                <RadioGroup
                  value={filters.language}
                  onValueChange={(value) => setFilters({...filters, language: value})}
                >
                  <Radio value="vi-VN">Tiếng Việt</Radio>
                  <Radio value="en-US">Tiếng Anh (Mỹ)</Radio>
                  <Radio value="en-GB">Tiếng Anh (Anh)</Radio>
                  <Radio value="en-IN">Tiếng Anh (Ấn)</Radio>
                </RadioGroup>
              </div>
            </div>

            {/* Right Voice List */}
            <div className="flex-1 space-y-2">
              {currentPageVoices.length === 0 ? (
                <div className="text-center py-8 text-default-500">
                  Không tìm thấy giọng đọc phù hợp
                </div>
              ) : (
                currentPageVoices.map((voice) => (
                  <div 
                    key={voice.id}
                    className="p-4 border rounded-lg hover:bg-default-100 cursor-pointer transition-colors"
                    onClick={() => onVoiceSelect(voice)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar 
                          src={voice.avatar} 
                          size="sm"
                          className={voice.quality === 'premium' ? 'border-2 border-warning' : ''}
                        />
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            {voice.name}
                            {voice.quality === 'premium' && (
                              <Chip size="sm" color="warning" variant="flat">Premium</Chip>
                            )}
                          </div>
                          <div className="text-sm text-default-500">{voice.type}</div>
                        </div>
                      </div>
                      <Button isIconOnly variant="light">
                        <PlayCircle className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="justify-center">
          <Pagination
            total={totalPages}
            page={page}
            onChange={setPage}
            showControls
            className="overflow-visible"
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
} 