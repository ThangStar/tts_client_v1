import { Table, Chip, Button, TableColumn, TableRow, TableCell, TableBody, TableHeader, Pagination, Spinner } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CheckCircle2, Clock, Download,  Play, Pause } from 'lucide-react';
import { history_list_response_dto, tts_dto} from "../api/tts.api";
import { VoiceHistoryAction } from "../redux/slices/voiceHistories.slice";
import { HARDCODED_VOICES } from "@/constants/constants";

export default function VoiceHistoryList() {
    const voiceHistories: history_list_response_dto = useSelector((state: { voiceHistories: any }) => state.voiceHistories.value.voiceHistories);
    const [currentPage, setCurrentPage] = useState(1);
    const [playingId, setPlayingId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
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
        console.log("handle download..", url);
        
        if (!url) {
            console.error('URL is empty');
            return;
        }

        // Check if URL is relative and construct full URL if needed
        let fullUrl = url;
        if (url.startsWith('/') || !url.startsWith('http')) {
            const baseUrl = process.env.NEXT_PUBLIC_API_URL || window.location.origin;
            fullUrl = `${baseUrl}${url.startsWith('/') ? url : `/${url}`}`;
            console.log('Constructed full URL:', fullUrl);
        }

        try {

            // Method 1: Try direct download first
            try {
                const link = document.createElement('a');
                link.href = fullUrl;
                link.download = filename || 'audio.mp3';
                link.target = '_blank';
                
                // Append to body, click and remove
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                console.log('Direct download attempted with URL:', fullUrl);
                return;
            } catch (directError) {
                console.log('Direct download failed, trying fetch method:', directError);
            }

            // Method 2: Fetch and create blob (for CORS issues)
            const response = await fetch(fullUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'audio/*',
                },
                mode: 'cors'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const blob = await response.blob();
            console.log('Blob created:', blob.size, 'bytes');

            // Create a temporary link element
            const link = document.createElement('a');
            const objectUrl = window.URL.createObjectURL(blob);
            link.href = objectUrl;

            // Set the download filename
            link.download = filename || 'audio.mp3';

            // Append to body, click and remove
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clean up the URL object
            window.URL.revokeObjectURL(objectUrl);
            
            console.log('Download completed successfully');
        } catch (error) {
            console.error('Download failed:', error);
            
            // Fallback: Try to open in new tab
            try {
                window.open(fullUrl, '_blank');
                console.log('Opened audio in new tab as fallback with URL:', fullUrl);
            } catch (fallbackError) {
                console.error('Fallback also failed:', fallbackError);
            }
        }
    };

    const renderCell = (item: tts_dto, columnKey: any, rowIndex: any) => {
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
                        <p className="text-bold text-sm">{HARDCODED_VOICES.find(voice => voice.code === item.voice)?.name || "HN - Ngọc Huyền"}</p>
                    </div>
                );
            case "metadata":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm whitespace-pre-wrap text-ellipsis line-clamp-3 break-words">
                            {item.content?.trim()}
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
                        color={item.status != "done" ? "warning" : "success"}
                        size="sm"
                        variant="flat"
                        startContent={item.status != "done" ?
                            <Clock className="w-3 h-3" /> :
                            <CheckCircle2 className="w-3 h-3" />
                        }
                    >
                        {item.status == "done" ? "Hoàn tất" : "Đang xử lý"}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="flex items-center gap-2">
                        {item.status != "processing" && (
                            <>
                                <Button
                                    isIconOnly
                                    size="sm"
                                    variant="light"
                                    onClick={() => handlePlay(item.url || '', `${item.id}` || "0")}
                                >
                                    {playingId === `${item.id}` ?
                                        <Pause className="w-4 h-4" /> :
                                        <Play className="w-4 h-4" />
                                    }
                                </Button>
                                <Button
                                    isIconOnly
                                    size="sm"
                                    variant="light"
                                    onClick={() => {
                                        console.log('Download button clicked for item:', item);
                                        console.log('Item URL:', item.url);
                                        handleDownload(
                                            item.url || '',
                                            `audio_${item.id || new Date().getTime()}.mp3`
                                        );
                                    }}
                                >
                                    <Download className="w-4 h-4" />
                                </Button>
                            </>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    const dispatch = useDispatch<any>();
    const { history } = VoiceHistoryAction

    const pages = voiceHistories.pagination?.pages;
    const items = voiceHistories.items;
    
    // // Reset currentPage về 1 khi searchContent thay đổi
    // useEffect(() => {
    //     setCurrentPage(1);
    // }, [searchContent]);

    // Fetch data khi currentPage hoặc searchContent thay đổi
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                await dispatch(history({
                    page: currentPage
                }));
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchData();
    }, [currentPage, dispatch]);

    return (
        <div className="flex flex-col h-[600px]">
            {isLoading && (
                <div className="flex items-center justify-center h-full">
                    <Spinner label="Đang tải..." />
                </div>
            )}
            {!isLoading && (
                <>
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
                            {(items || []).map((item: any, index: number) => (
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
                            total={pages || 1}
                            onChange={(page) => setCurrentPage(page)}
                        />
                    </div>
                </>
            )}
        </div>
    );
}; 