'use client'

import { Button, Radio, RadioGroup } from "@nextui-org/react"
import { ArrowLeft, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, Suspense } from "react"
import BankTransferDialog from "../components/payment/BankTransferDialog"
import { useSearchParams } from "next/navigation"
import { formatVND } from "@/lib/utils"

const paymentMethods = [
    {
        id: "qrcode",
        name: "QR CODE",
        highlighted: true,
        selected: true,
        logo: "/images/vietqr.png",
    }
]

const plans = [
    {
        name: "Tiêu chuẩn",
        price: 199000,
        period: "month",
        type: 2,
        features: [
            { text: "Số lượng ký tự 300.000", enabled: true },
            { text: "Ngôn ngữ Tiếng Việt", enabled: true },
            { text: "Nghe thử 500 ký tự / lần", enabled: true },
            { text: "Ký tự tối đa / chuyển đổi 20.000", enabled: true },
            { text: "Lượt tải xuống Không giới hạn", enabled: true },
        ],
        buttonText: "Chọn gói",
        popular: false,
    },
    {
        name: "Chuyên nghiệp",
        price: 399000,
        period: "month",
        type: 3,
        features: [
            { text: "Số lượng ký tự 600.000", enabled: true },
            { text: "Ngôn ngữ Tiếng Việt & Tiếng nước ngoài", enabled: true },
            { text: "Nghe thử 1.000 ký tự / lần", enabled: true },
            { text: "Ký tự tối đa / chuyển đổi 50.000", enabled: true },
            { text: "Lượt tải xuống Không giới hạn", enabled: true },
            { text: "Số thiết bị đồng thời 3 thiết bị", enabled: true },
        ],
        buttonText: "MUA NGAY",
        popular: true,
    },
    {
        name: "Đặc biệt",
        price: 799000,
        period: "month",
        type: 4,
        features: [
            { text: "Số lượng ký tự 1.300.000", enabled: true },
            { text: "Ngôn ngữ Tiếng Việt & Tiếng nước ngoài", enabled: true },
            { text: "Nghe thử 1.500 ký tự / lần", enabled: true },
            { text: "Ký tự tối đa / chuyển đổi 100.000", enabled: true },
            { text: "Lượt tải xuống Không giới hạn", enabled: true },
            { text: "Số thiết bị đồng thời 5 thiết bị", enabled: true },
        ],
        buttonText: "Chọn gói",
        popular: false,
    },
];

function PaymentPageContent() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const searchParams = useSearchParams()
    const period = searchParams.get('period')
    const type = searchParams.get('type')
    const data = plans.find(plan => plan.period === period && plan.type === Number(type))
    const defaultPaymentMethod = paymentMethods.find(method => method.selected)?.id || paymentMethods[0].id

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="flex items-center gap-2 mb-6">
                <Link href="/pricing">
                    <Button
                        variant="light"
                        startContent={<ArrowLeft className="w-4 h-4" />}
                    >
                        Về bảng giá
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold text-center flex-1">Thanh toán Chữ thành lời</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="flex items-center gap-2">
                        <div className="bg-warning/10 p-2 rounded-lg">
                            <span className="text-xl">⚡</span>
                        </div>
                        <RadioGroup
                            defaultValue="standard"
                            orientation="horizontal"
                        >
                            <Radio value="standard">Tiêu chuẩn</Radio>
                        </RadioGroup>
                    </div>

                    <RadioGroup
                        label="Chọn phương thức thanh toán"
                        className="gap-3"
                        defaultValue={defaultPaymentMethod}
                    >
                        {paymentMethods.map((method) => (
                            <Radio
                                key={method.id}
                                value={method.id}
                                className={`border rounded-xl p-3 ${method.highlighted ? "border-warning bg-warning/5" : "border-default-200"
                                    }`}
                            >
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center gap-3">
                                        {method.logo ? (
                                            <span className="text-2xl">{method.logo}</span>
                                        ) : (
                                            <div className="w-8 h-8 relative">
                                                <Image
                                                    src={method.logo!}
                                                    alt={method.name}
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                        )}
                                        <span>{method.name}</span>
                                    </div>
                                    {method.name && (
                                        <span className="text-sm text-default-500">{method.name}</span>
                                    )}
                                </div>
                            </Radio>
                        ))}
                    </RadioGroup>
                </div>

                <div className="bg-default-50 p-6 rounded-2xl space-y-6">
                    <h2 className="text-xl font-semibold">Thông tin đơn hàng</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="text-sm text-default-600">Người mua hàng</label>
                            <div className="font-medium">Star Tháng</div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Sản phẩm</span>
                                <span>{data?.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Giá gói</span>
                                <span>{formatVND(data?.price || 0)}</span>
                            </div>
                        </div>

                        <div>
                            <Button
                                endContent={<ChevronDown className="w-4 h-4" />}
                                variant="light"
                                className="w-full justify-between"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-xl">🎁</span>
                                    <span>Thêm mã khuyến mãi</span>
                                </div>
                            </Button>
                        </div>

                        <div className="flex justify-between font-medium text-lg pt-4 border-t">
                            <span>Tổng</span>
                            <span>{formatVND(data?.price || 0)}</span>
                        </div>
                    </div>

                    <Button
                        color="primary"
                        className="w-full"
                        size="lg"
                        onClick={() => setIsDialogOpen(true)}
                    >
                        Đồng ý thanh toán
                    </Button>

                    <BankTransferDialog
                        accountName={"USR12P" + period + "T" + type || "BUY"}
                        addInfo={data?.name || "BUY"}
                        isOpen={isDialogOpen}
                        onClose={() => setIsDialogOpen(false)}
                        amount={data?.price || 0}
                        orderId="VB115313"
                    />

                    <p className="text-sm text-default-500">
                        Bằng việc đồng ý thanh toán, Quý Khách hàng xác nhận đã đọc, hiểu và đồng ý với{" "}
                        <Link href="/terms" className="text-primary">
                            Chính sách thanh toán
                        </Link>{" "}
                        dịch vụ AIVoice.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default function PaymentPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaymentPageContent />
        </Suspense>
    )
} 