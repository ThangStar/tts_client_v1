import { formatVND } from "@/lib/utils"
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react"
import { Copy } from "lucide-react"
import Image from "next/image"

interface BankTransferDialogProps {
    isOpen: boolean
    onClose: () => void
    amount: number
    orderId: string
    accountName: string
    addInfo: string
    onConfirmPayment: ()=>void
}


export default function BankTransferDialog({ isOpen, onClose, amount, orderId, onConfirmPayment}: BankTransferDialogProps) {
    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text)
    }

    // useEffect(() => {
    //     setQRCodeBase64(null)
    //     const params: params_dto = {
    //         accountNo: 113366668888,
    //         accountName: accountName,
    //         acqId: 970415,
    //         amount: amount,
    //         addInfo: addInfo,
    //         format: "text",
    //         template: "compact"
    //     }
    //     axios.get("https://api.vietqr.io/image/970416-14929061-MSvzHbf.jpg?accountName=NONG%20VAN%20THANG&amount=1919000&addInfo=100T1"
    //     ).then(res => {
    //         console.log(res.data);
    //         setQRCodeBase64(res.data.data.qrDataURL)
    //     })
    //     return () => {
    //         setQRCodeBase64(null)
    //     }
    // }, [])

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalContent>
                <ModalHeader>
                    <h3 className="text-xl font-bold">Chuyển khoản ngân hàng</h3>
                </ModalHeader>
                <ModalBody>
                    <div className="flex justify-center mb-4">
                        <div className="relative w-48 h-48">
                            <Image
                                src={`/images/qr.jpg`}
                                alt="QR Code"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-default-600">Ngân hàng:</span>
                            <span className="font-medium">NGÂN HÀNG TMCP Á CHÂU</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-default-600">Chủ tài khoản:</span>
                            <div className="flex items-center gap-2">
                                <span className="font-medium">NONG VAN THANG</span>
                                <Button
                                    isIconOnly
                                    variant="light"
                                    size="sm"
                                    onClick={() => handleCopy("NONG VAN THANG")}
                                >
                                    <Copy className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-default-600">Số tài khoản:</span>
                            <div className="flex items-center gap-2">
                                <span className="font-medium">14929061</span>
                                <Button
                                    isIconOnly
                                    variant="light"
                                    size="sm"
                                    onClick={() => handleCopy("14929061")}
                                >
                                    <Copy className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-default-600">Số tiền cần chuyển:</span>
                            <div className="flex items-center gap-2">
                                <span className="font-medium">{formatVND(amount)}</span>
                                <Button
                                    isIconOnly
                                    variant="light"
                                    size="sm"
                                    onClick={() => handleCopy(formatVND(amount))}
                                >
                                    <Copy className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-default-600">Nội dung chuyển khoản:</span>
                            <div className="flex items-center gap-2">
                                <span className="font-medium">{orderId}</span>
                                <Button
                                    isIconOnly
                                    variant="light"
                                    size="sm"
                                    onClick={() => handleCopy(orderId)}
                                >
                                    <Copy className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="bg-warning-50 p-4 rounded-lg">
                            <div className="flex items-start gap-2">
                                <span className="text-warning">⚠️</span>
                                <p className="text-sm text-warning-600">
                                    Để được ghi nhận thanh toán tự động, vui lòng kiểm tra chính xác nội dung chuyển khoản và số tiền cần chuyển.
                                </p>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button variant="light" onPress={onClose}>
                        Hủy thanh toán
                    </Button>
                    <Button
                    onClick={onConfirmPayment}
                        color="primary"
                        target="_blank"
                    >
                        Tôi đã chuyển khoản
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
} 