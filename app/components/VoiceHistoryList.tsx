import { Table, Chip, Button, TableColumn, TableRow, TableCell, TableBody, TableHeader, Pagination } from "@nextui-org/react";
import React from 'react';
import { useSelector } from 'react-redux';
import { CheckCircle2, Clock, Download, Trash2, Play } from 'lucide-react';

const VoiceHistoryList = ({ rowsPerPage = 5 }: { rowsPerPage?: number }) => {
    const voiceHistories = useSelector((state: { voiceHistories: any }) => state.voiceHistories.value.voiceHistories);
    const [page, setPage] = React.useState(1);

    const pages = Math.ceil(voiceHistories.length / rowsPerPage);
    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return voiceHistories.slice(start, end);
    }, [page, voiceHistories]);

    const columns = [
        { name: "#", uid: "index" },
        { name: "Giọng đọc", uid: "name" },
        { name: "Nội dung", uid: "content" },
        { name: "Ngày tạo", uid: "date" },
        { name: "Trạng thái", uid: "status" },
        { name: "Hành động", uid: "actions" }
    ];

    const renderCell = (item, columnKey, rowIndex) => {
        switch (columnKey) {
            case "index":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm">{rowIndex + 1}</p>
                    </div>
                );
            case "name":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm">{item.voice.name}</p>
                    </div>
                );
            case "content":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm">{item.voice.content}</p>
                    </div>
                );
            case "date":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm">
                            {new Date().toLocaleString('vi-VN', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit'
                            })}
                        </p>
                    </div>
                );
            case "status":
                return (
                    <Chip
                        className="capitalize"
                        color={item.progress ? "warning" : "success"}
                        size="sm"
                        variant="flat"
                        startContent={item.progress ? 
                            <Clock className="w-3 h-3" /> : 
                            <CheckCircle2 className="w-3 h-3" />
                        }
                    >
                        {item.progress ? "Đang xử lý" : "Hoàn thành"}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="flex items-center gap-2">
                        {!item.progress && (
                            <>
                                <Button 
                                    isIconOnly 
                                    size="sm" 
                                    variant="light"
                                    onClick={() => console.log('Play clicked')}
                                >
                                    <Play className="w-4 h-4" />
                                </Button>
                                <Button 
                                    isIconOnly 
                                    size="sm" 
                                    variant="light"
                                    onClick={() => console.log('Download clicked')}
                                >
                                    <Download className="w-4 h-4" />
                                </Button>
                                <Button 
                                    isIconOnly 
                                    size="sm" 
                                    variant="light"
                                    onClick={() => console.log('Delete clicked')}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </>
                        )}
                        {item.progress && (
                            <Button 
                                isIconOnly 
                                size="sm" 
                                variant="light" 
                                color="danger"
                                onClick={() => console.log('Delete clicked')}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col h-[600px]">
            <Table
                aria-label="Voice History Table"
                classNames={{
                    wrapper: "flex-grow shadow-none",
                    base: "overflow-hidden h-full",
                    table: "min-w-full",
                    th: "bg-transparent border-b border-divider sticky top-0 bg-white whitespace-nowrap",
                    td: "border-none whitespace-nowrap",
                    tr: "border-none hover:bg-gray-50",
                    tbody: "overflow-y-auto",
                }}
            >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn 
                            key={column.uid}
                            align={column.uid === "actions" ? "center" : "start"}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={items}>
                    {items.map((item, index) => (
                        <TableRow key={index}>
                            {(columnKey) => (
                                <TableCell>{renderCell(item, columnKey, ((page - 1) * rowsPerPage) + index)}</TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="py-2 px-2 flex justify-center sticky bottom-0 bg-white">
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={(page) => setPage(page)}
                />
            </div>
        </div>
    );
};

export default VoiceHistoryList; 