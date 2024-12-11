'use client'

import Layout from "@/app/components/layout/layout"
import { Button, Chip, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { Copy } from "lucide-react"
import { useState } from "react"

const statusColorMap: Record<string, "primary" | "default" | "secondary" | "success" | "warning" | "danger"> = {
    pending: "warning",
    success: "success",
    failed: "danger",
}

const columns = [
    { name: "MÃ GIAO DỊCH", uid: "id" },
    { name: "THỜI GIAN", uid: "time" },
    { name: "GÓI DỊCH VỤ", uid: "plan" },
    { name: "SỐ TIỀN", uid: "amount" },
    { name: "TRẠNG THÁI", uid: "status" },
    { name: "THAO TÁC", uid: "actions" },
]

const mockData = [
    {
        id: "VB115313",
        time: "2024-03-15 14:30:00",
        plan: "Chuyên nghiệp - 1 tháng",
        amount: 399000,
        status: "success"
    },
    {
        id: "VB115314",
        time: "2024-03-14 09:15:00",
        plan: "Tiêu chuẩn - 1 tháng",
        amount: 199000,
        status: "pending"
    },
    // Thêm dữ liệu mẫu khác...
]

export default function PaymentHistoryPage() {
    const [page, setPage] = useState(1)
    const rowsPerPage = 10
    const pages = Math.ceil(mockData.length / rowsPerPage)

    const formatVND = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price)
    }

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text)
    }

    const items = mockData.slice((page - 1) * rowsPerPage, page * rowsPerPage)

    const renderCell = (item: any, columnKey: string) => {
        switch (columnKey) {
            case "id":
                return (
                    <div className="flex items-center gap-2">
                        <span>{item.id}</span>
                        <Button
                            isIconOnly
                            variant="light"
                            size="sm"
                            onClick={() => handleCopy(item.id)}
                        >
                            <Copy className="w-4 h-4" />
                        </Button>
                    </div>
                )
            case "time":
                return formatDateTime(item.time)
            case "amount":
                return formatVND(item.amount)
            case "status":
                return (
                    <Chip
                        color={statusColorMap[item.status as keyof typeof statusColorMap]}
                        size="sm"
                        variant="flat"
                    >
                        {item.status === "success" ? "Thành công" :
                            item.status === "pending" ? "Đang xử lý" : "Thất bại"}
                    </Chip>
                )
            case "actions":
                return (
                    <div className="flex gap-2">
                        <Button size="sm" variant="bordered">
                            Chi tiết
                        </Button>
                    </div>
                )
            default:
                return item[columnKey]
        }
    }

    return (
        <Layout>
            <div className="flex-1 p-1 lg:p-3 bg-gradient-to-br from-blue-50/50 to-primary/5 space-y-4 h-[calc(100vh-70px)]">
                <h1 className="text-2xl font-bold">Lịch sử thanh toán</h1>

                <Table
                    aria-label="Payment history table"
                    bottomContent={
                        pages > 1 ? (
                            <div className="flex justify-center">
                                <Pagination
                                    total={pages}
                                    page={page}
                                    onChange={setPage}
                                />
                            </div>
                        ) : null
                    }
                >
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn key={column.uid}>
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={items}>
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => (
                                    <TableCell>
                                        {renderCell(item, columnKey as string)}
                                    </TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </Layout>
    )
}
