import { Table, Chip, Button, TableColumn, TableRow, TableCell, TableBody, TableHeader, Pagination } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CheckCircle2, Clock, Download, Trash2, Play, Pause } from 'lucide-react';
import { tts_response_dto } from "../api/tts.api";
import { VoiceHistoryAction } from "../redux/slices/voiceHistories.slice";
import Image from "next/image";

export default function VoiceHistoryList({ searchContent }: { searchContent: string, rowsPerPage: number }) {
    const voiceHistories = useSelector((state: { voiceHistories: any }) => state.voiceHistories.value.voiceHistories);
    const [currentPage, setCurrentPage] = useState(1);
    const [playingId, setPlayingId] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const columns = [
        { name: "#", uid: "index" },
        { name: "Giọng đọc", uid: "voice" },
        { name: "Nội dung", uid: "metadata", width: "300px" },
        { name: "Ngày tạo", uid: "date" },
        { name: "Trạng thái", uid: "status" },
        { name: "Hành động", uid: "actions" }
    ];

    const handlePlay = (url: string, id: string) => {
        if (!audioRef.current) {
            audioRef.current = new Audio();
        }

        if (playingId === id) {
            // Pause current audio
            audioRef.current.pause();
            setPlayingId(null);
        } else {
            // If another audio is playing, pause it first
            if (audioRef.current.src) {
                audioRef.current.pause();
            }

            // Play new audio
            audioRef.current.src = url;
            audioRef.current.play();
            setPlayingId(id);

            // Add ended event listener
            audioRef.current.onended = () => {
                setPlayingId(null);
            };
        }
    };

    const handleDownload = async (url: string, filename?: string) => {
        try {
            // Fetch the audio file
            const response = await fetch(url);
            const blob = await response.blob();

            // Create a temporary link element
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);

            // Set the download filename
            link.download = filename || 'audio.mp3';

            // Append to body, click and remove
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clean up the URL object
            window.URL.revokeObjectURL(link.href);
        } catch (error) {
            console.error('Download failed:', error);
        }
    };

    const renderCell = (item: tts_response_dto, columnKey: any, rowIndex: any) => {
        switch (columnKey) {
            case "index":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm">{rowIndex + 1}</p>
                    </div>
                );
            case "voice":
                return (
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                            <Image
                                src={item.voice?.avatar || '/default-avatar.png'}
                                alt="avatar"
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                                
                            />
                        </div>
                        <p className="text-bold text-sm">{item.voice?.name}</p>
                    </div>
                );
            case "metadata":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm whitespace-pre-wrap text-ellipsis line-clamp-3 break-words">
                            {item.metadata?.prompt.trim()}
                        </p>
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
                                    onClick={() => handlePlay(item.url || '', item.id || "")}
                                >
                                    {playingId === item.id ?
                                        <Pause className="w-4 h-4" /> :
                                        <Play className="w-4 h-4" />
                                    }
                                </Button>
                                <Button
                                    isIconOnly
                                    size="sm"
                                    variant="light"
                                    onClick={() => handleDownload(
                                        item.url || '',
                                        `audio_${item.id || new Date().getTime()}.mp3`
                                    )}
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

    const dispatch = useDispatch<any>();
    const { history } = VoiceHistoryAction
    useEffect(() => {
        dispatch(history({
            limit: 5,
            page: currentPage,
            search: searchContent
        }));
    }, [dispatch, history, currentPage, searchContent]);

    const pages = voiceHistories.data.meta?.totalPages || 1;
    console.log(voiceHistories.data.meta);
    
    const items = voiceHistories.data.items;

    // Reset currentPage về 1 khi searchContent thay đổi
    useEffect(() => {
        setCurrentPage(1);
    }, [searchContent]);

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
                    {items.map((item: any, index: number) => (
                        <TableRow key={index}>
                            {(columnKey) => (
                                <TableCell>{renderCell(item, columnKey, ((currentPage - 1) * 5) + index)}</TableCell>
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
                    page={currentPage}
                    total={pages}
                    onChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
}; 