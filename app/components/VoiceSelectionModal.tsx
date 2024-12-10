'use client'

import { useEffect, useState } from "react"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  Avatar,
  Checkbox,
  CheckboxGroup,
  Pagination,
  Chip
} from "@nextui-org/react"
import { Search, PlayCircle, Settings, Filter } from 'lucide-react'
import { useDispatch, useSelector } from "react-redux"
import { ActorAction } from "../redux/slices/actor.slice"
import { Actor, ActorGender, ActorLanguage, ActorType } from "../types/actor.type"
import { voice_list_response_dto } from "../api/tts.api"

// Định nghĩa types


type FilterState = {
  gender: string[]
  type: string[]
  languageCode: string[]
  category_code: string
}

export default function VoiceSelectionModal({
  isOpen,
  onClose,
  onVoiceSelect
}: {
  isOpen: boolean
  onClose: () => void
  onVoiceSelect: (voice: Actor) => void
}) {
  // States
  const [searchQuery, setSearchQuery] = useState("")
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState<FilterState>({
    gender: [ActorGender.FEMALE, ActorGender.MALE],
    type: [ActorType.STANDARD, ActorType.PREMIUM],
    languageCode: [ActorLanguage.VI, ActorLanguage.EN],
    category_code: ""
  })
  const [showFilters, setShowFilters] = useState(false)

  const dispatch = useDispatch<any>()
  const { actors: { items, meta } }: { actors: voice_list_response_dto } = useSelector((state: any) => state.actor.value)
  const actorAction = ActorAction
  useEffect(() => {
    dispatch(actorAction.listActor({
      search: searchQuery,
      limit: 5,
      page: page,
      category_code: filters.category_code,
      language_code: filters.languageCode.join(','),
      type: convertTypeToNumber(filters.type),
      gender: convertGenderToNumber(filters.gender),
    }))
  }, [searchQuery, page, filters, dispatch, actorAction])

  // Reset filters
  const resetFilters = () => {
    setFilters({
      gender: [ActorGender.FEMALE, ActorGender.MALE],
      type: [ActorType.STANDARD, ActorType.PREMIUM],
      languageCode: [ActorLanguage.VI, ActorLanguage.EN],
      category_code: ""
    })
    setSearchQuery("")
    setPage(1)
  }

  // Thêm helper function để convert giá trị
  const convertTypeToNumber = (types: string[]): number | undefined => {
    if (types.length === 0 || types.length === 2) return undefined
    return types.includes(ActorType.STANDARD) ? 0 : 1
  }

  const convertGenderToNumber = (genders: string[]): number | undefined => {
    if (genders.length === 0 || genders.length === 2) return undefined
    return genders.includes(ActorGender.MALE) ? 1 : 0
  }

  // Sửa lại các hàm handle change để đảm bảo luôn có ít nhất 1 giá trị được chọn
  const handleGenderChange = (values: string[]) => {
    // Không cho phép bỏ chọn tất cả
    if (values.length === 0) return
    setFilters({ ...filters, gender: values })
    setPage(1)
  }

  const handleTypeChange = (values: string[]) => {
    // Không cho phép bỏ chọn tất cả
    if (values.length === 0) return
    setFilters({ ...filters, type: values })
    setPage(1)
  }

  const handleLanguageChange = (values: string[]) => {
    // Không cho phép bỏ chọn tất cả
    if (values.length === 0) return
    setFilters({ ...filters, languageCode: values })
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
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Chọn giọng đọc</h2>
            <Button
              isIconOnly
              variant="light"
              className="lg:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4" />
            </Button>
          </div>
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
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            <div className={`${showFilters ? 'flex' : 'hidden'} lg:flex flex-wrap lg:flex-col lg:w-48 gap-4 lg:gap-6`}>
              <div className="w-full lg:w-auto">
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

              <div className="flex flex-wrap lg:flex-col gap-4 lg:gap-6">
                <div className="min-w-[200px] flex-grow lg:min-w-0 lg:flex-grow-0">
                  <h3 className="font-semibold mb-2 text-sm">Giới tính</h3>
                  <CheckboxGroup
                    value={filters.gender}
                    onValueChange={handleGenderChange}
                    orientation="horizontal"
                    className="gap-3"
                  >
                    <Checkbox value={ActorGender.FEMALE}>Nữ</Checkbox>
                    <Checkbox value={ActorGender.MALE}>Nam</Checkbox>
                  </CheckboxGroup>
                </div>

                <div className="min-w-[200px] flex-grow lg:min-w-0 lg:flex-grow-0">
                  <h3 className="font-semibold mb-2 text-sm">Loại giọng</h3>
                  <CheckboxGroup
                    value={filters.type}
                    onValueChange={handleTypeChange}
                    orientation="horizontal"
                    className="gap-3"
                  >
                    <Checkbox value={ActorType.STANDARD}>Tiêu chuẩn</Checkbox>
                    <Checkbox value={ActorType.PREMIUM}>Cao cấp</Checkbox>
                  </CheckboxGroup>
                </div>

                <div className="min-w-[200px] flex-grow lg:min-w-0 lg:flex-grow-0">
                  <h3 className="font-semibold mb-2 text-sm">Ngôn ngữ</h3>
                  <CheckboxGroup
                    value={filters.languageCode}
                    onValueChange={handleLanguageChange}
                    orientation="horizontal"
                    className="gap-3"
                  >
                    <Checkbox value={ActorLanguage.VI}>Tiếng Việt</Checkbox>
                  </CheckboxGroup>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-2">
              {items.length === 0 ? (
                <div className="text-center py-8 text-default-500">
                  Không tìm thấy giọng đọc phù hợp
                </div>
              ) : (
                items.map((actor: Actor) => (
                  <div
                    key={actor.id}
                    className="p-4 border rounded-lg hover:bg-default-100 cursor-pointer transition-colors"
                    onClick={() => onVoiceSelect(actor)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={actor.avatar}
                          size="sm"
                          className={actor.type === ActorType.PREMIUM ? 'border-2 border-warning' : ''}
                        />
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            {actor.name}
                            {actor.type === ActorType.PREMIUM && (
                              <Chip size="sm" color="warning" variant="flat">Premium</Chip>
                            )}
                          </div>
                          <div className="text-sm text-default-500">{actor.type}</div>
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
            total={meta.totalPages}
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