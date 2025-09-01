'use client'

import { Button, Radio, RadioGroup } from "@nextui-org/react"
import { ArrowLeft} from "lucide-react"
import Link from "next/link"
import { useState, Suspense} from "react"
import BankTransferDialog from "../components/payment/BankTransferDialog"
import { useSearchParams } from "next/navigation"
import { formatVND } from "@/lib/utils"
import { useSelector } from "react-redux"

const paymentMethods = [
    {
        id: "qrcode",
        name: "Chuyển khoản ngân hàng (QR)",
        highlighted: true,
        selected: true,
        logo: "/images/vietqr.png",
    }
]

// const plans = [
//     {
//         name: "Tiêu chuẩn",
//         price: 199000,
//         period: "month",
//         type: 2,
//         features: [
//             { text: "Số lượng ký tự 300.000", enabled: true },
//             { text: "Ngôn ngữ Tiếng Việt", enabled: true },
//             { text: "Nghe thử 500 ký tự / lần", enabled: true },
//             { text: "Ký tự tối đa / chuyển đổi 20.000", enabled: true },
//             { text: "Lượt tải xuống Không giới hạn", enabled: true },
//         ],
//         buttonText: "Chọn gói",
//         popular: false,
//     },
//     {
//         name: "Chuyên nghiệp",
//         price: 399000,
//         period: "month",
//         type: 3,
//         features: [
//             { text: "Số lượng ký tự 600.000", enabled: true },
//             { text: "Ngôn ngữ Tiếng Việt & Tiếng nước ngoài", enabled: true },
//             { text: "Nghe thử 1.000 ký tự / lần", enabled: true },
//             { text: "Ký tự tối đa / chuyển đổi 50.000", enabled: true },
//             { text: "Lượt tải xuống Không giới hạn", enabled: true },
//             { text: "Số thiết bị đồng thời 3 thiết bị", enabled: true },
//         ],
//         buttonText: "MUA NGAY",
//         popular: true,
//     },
//     {
//         name: "Đặc biệt",
//         price: 799000,
//         period: "month",
//         type: 4,
//         features: [
//             { text: "Số lượng ký tự 1.300.000", enabled: true },
//             { text: "Ngôn ngữ Tiếng Việt & Tiếng nước ngoài", enabled: true },
//             { text: "Nghe thử 1.500 ký tự / lần", enabled: true },
//             { text: "Ký tự tối đa / chuyển đổi 100.000", enabled: true },
//             { text: "Lượt tải xuống Không giới hạn", enabled: true },
//             { text: "Số thiết bị đồng thời 5 thiết bị", enabled: true },
//         ],
//         buttonText: "Chọn gói",
//         popular: false,
//     },
// ];

const data_price = [
    {
        type: 2,
        price: 90000,
        name: "Tiêu chuẩn",
    },
    {
        type: 3,
        price: 170000,
        name: "Chuyên nghiệp",
    },
    {
        type: 4,
        price: 250000,
        name: "Đặc biệt",
    }
]
function PaymentPageContent() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false) // Dialog thành công
    const searchParams = useSearchParams()
    const period = searchParams.get('period')
    const type = searchParams.get('type')
    const data = type == "2" ? data_price[0] : type == "3" ? data_price[1] : data_price[2]
    const defaultPaymentMethod = paymentMethods.find(method => method.selected)?.id || paymentMethods[0].id
    const user = useSelector((state: any) => state.authenticate.value.user)

    // Hàm tạo key ngẫu nhiên
    const generateRandomKey = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 8; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    };

    const [keyBuy, setKeyBuy] = useState(generateRandomKey())

    // Xử lý khi nhấn "Tôi đã chuyển khoản"
    const handlePaymentConfirm = () => {

        // Giả lập loading 2s
        setTimeout(() => {
            setIsDialogOpen(false); // Đóng dialog thanh toán
            setIsSuccessDialogOpen(true); // Mở dialog thành công
        }, 2000);
    };

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
                            <Radio value="standard">{data.name}</Radio>
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
                                        <span className="font-medium">{method.name}</span>
                                    </div>
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
                            <div className="font-medium">{user?.display_name}</div>
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

                            <div className="pt-3 border-t border-default-200">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm text-default-600">Mã đơn hàng</label>
                                    <Button
                                        size="sm"
                                        variant="light"
                                        onClick={() => setKeyBuy(generateRandomKey())}
                                        className="text-xs"
                                    >
                                        Tạo mới
                                    </Button>
                                </div>
                                <div className="bg-white p-3 rounded-lg border border-default-200">
                                    <code className="text-lg font-mono font-bold text-primary">
                                        {keyBuy}
                                    </code>
                                </div>
                            </div>
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

                    <p className="text-sm text-default-500">
                        Bằng việc đồng ý thanh toán, Quý Khách hàng xác nhận đã đọc, hiểu và đồng ý với{" "}
                        <Link href="/terms" className="text-primary">
                            Chính sách thanh toán
                        </Link>{" "}
                        dịch vụ AIVoice.
                    </p>
                </div>
            </div>

            {/* Dialog Chuyển khoản */}
            <BankTransferDialog
                accountName={"USR12P" + period + "T" + type || "BUY"}
                addInfo={data?.name || "BUY"}
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                amount={data?.price || 0}
                orderId={keyBuy}
                onConfirmPayment={handlePaymentConfirm} // Truyền hàm xử lý vào dialog
            />

            {/* Dialog Thành công */}
            {isSuccessDialogOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm w-full mx-4">
                        <h3 className="text-lg font-semibold mb-4">🕓 Giao dịch đang được xử lý!</h3>
                        <p className="text-sm text-default-600 mb-4">
                            Key của bạn là: <strong>{keyBuy}
                                </strong>. <br/>Sẽ được cộng ký tự sau khi xử lý xong.
                        </p>
                        <p className="text-sm text-default-600 mb-4">
                            Nhớ lưu key vào nhé!
                        </p>
                        <Button
                            color="primary"
                            className="w-full"
                            onClick={() => setIsSuccessDialogOpen(false)}
                        >
                            Đóng
                        </Button>
                    </div>
                </div>
            )}
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