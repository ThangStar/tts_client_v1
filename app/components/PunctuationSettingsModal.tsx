'use client'

import { useState } from "react"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input
} from "@nextui-org/react"
import { Minus, Plus } from 'lucide-react'

type PunctuationSettings = {
  period: number // Dấu chấm
  semicolon: number // Dấu chấm phẩy
  comma: number // Dấu phẩy
  paragraph: number // Giữa các đoạn
}

type PunctuationSettingsModalProps = {
  isOpen: boolean
  onClose: () => void
  onSave: (settings: PunctuationSettings) => void
}

export default function PunctuationSettingsModal({
  isOpen,
  onClose,
  onSave
}: PunctuationSettingsModalProps) {
  const [settings, setSettings] = useState<PunctuationSettings>({
    period: 0.45,
    semicolon: 0.3,
    comma: 0.25,
    paragraph: 0.6
  })

  const handleIncrement = (key: keyof PunctuationSettings) => {
    setSettings(prev => ({
      ...prev,
      [key]: Math.min(10, Math.round((prev[key] + 0.1) * 100) / 100)
    }))
  }

  const handleDecrement = (key: keyof PunctuationSettings) => {
    setSettings(prev => ({
      ...prev,
      [key]: Math.max(0.1, Math.round((prev[key] - 0.1) * 100) / 100)
    }))
  }

  const handleInputChange = (key: keyof PunctuationSettings, value: string) => {
    const numValue = parseFloat(value)
    if (!isNaN(numValue)) {
      setSettings(prev => ({
        ...prev,
        [key]: Math.min(10, Math.max(0.1, Math.round(numValue * 100) / 100))
      }))
    }
  }

  const handleSave = () => {
    onSave(settings)
    onClose()
  }

  const handleSetDefault = () => {
    setSettings({
      period: 0.45,
      semicolon: 0.3,
      comma: 0.25,
      paragraph: 0.6
    })
  }

  const punctuationItems = [
    {
      key: 'period' as keyof PunctuationSettings,
      label: 'Dấu chấm',
      icon: '•',
      value: settings.period
    },
    {
      key: 'semicolon' as keyof PunctuationSettings,
      label: 'Dấu chấm phẩy',
      icon: ';',
      value: settings.semicolon
    },
    {
      key: 'comma' as keyof PunctuationSettings,
      label: 'Dấu phẩy',
      icon: ',',
      value: settings.comma
    },
    {
      key: 'paragraph' as keyof PunctuationSettings,
      label: 'Giữa các đoạn',
      icon: '≡',
      value: settings.paragraph
    }
  ]

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      placement="center"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h2 className="text-lg font-bold">Thiết lập dấu câu</h2>
        </ModalHeader>
        <ModalBody className="gap-6">
          <div className="grid grid-cols-2 gap-6">
            {punctuationItems.map((item) => (
              <div key={item.key} className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  {item.label}
                </label>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium">
                    {item.icon}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      onClick={() => handleDecrement(item.key)}
                      disabled={item.value <= 0.1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <Input
                      value={item.value.toFixed(2)}
                      onChange={(e) => handleInputChange(item.key, e.target.value)}
                      size="sm"
                      className="w-20 text-center"
                      endContent="s"
                    />
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      onClick={() => handleIncrement(item.key)}
                      disabled={item.value >= 10}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ModalBody>
        <ModalFooter className="justify-end gap-2">
          <Button
            variant="bordered"
            onClick={handleSetDefault}
            className="border-gray-300"
          >
            Đặt mặc định
          </Button>
          <Button
            color="warning"
            onClick={handleSave}
            className="bg-warning text-white"
          >
            Lưu
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
