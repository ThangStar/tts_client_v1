import io from 'socket.io-client';

class SocketManager {
    private socket: any = null;
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 5;
    private reconnectDelay = 1000; // 1 second

    // Socket events
    public static readonly EVENTS = {
        // TTS related events
        TTS_OBSER: 'enqueue_tts_result',
        CONNECT: 'connect',
        DISCONNECT: 'disconnect',
        ENQUEUE_TTS: 'enqueue_tts'
    };

    constructor() {
        this.initializeSocket();
    }

    private initializeSocket(): void {
        // Get server URL from environment or use default
        const serverUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';

        this.socket = io(serverUrl, {
            transports: ['websocket', 'polling'],
            autoConnect: false,
            reconnection: true,
            reconnectionAttempts: this.maxReconnectAttempts,
            reconnectionDelay: this.reconnectDelay,
            timeout: 20000,
            forceNew: true
        });

        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        if (!this.socket) return;

        // Connection events
        this.socket.on(SocketManager.EVENTS.CONNECT, () => {
            console.log('Socket connected');
            this.reconnectAttempts = 0;
            this.authenticate();
        });

        this.socket.on(SocketManager.EVENTS.DISCONNECT, (reason: string) => {
            console.log('Socket disconnected:', reason);
            if (reason === 'io server disconnect') {
                // Server disconnected, try to reconnect
                this.socket?.connect();
            }
        });
    }

    private handleReconnection(): void {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            console.log(`Reconnection attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts}`);

            setTimeout(() => {
                if (this.socket) {
                    this.socket.connect();
                }
            }, this.reconnectDelay * this.reconnectAttempts);
        } else {
            console.error('Max reconnection attempts reached');
        }
    }

    private authenticate(): void {
        // Get auth token from localStorage or context
        const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');

        if (token && this.socket) {
            this.socket.emit('authenticate', { token });
        }
    }

    // Public methods
    public connect(): void {
        if (this.socket && !this.socket.connected) {
            this.socket.connect();
        }
    }

    public disconnect(): void {
        if (this.socket) {
            this.socket.disconnect();
        }
    }

    public emit(event: string, data?: any): void {
        if (this.socket && this.socket.connected) {
            this.socket.emit(event, data);
        } else {
            console.warn('Socket not connected, cannot emit event:', event);
        }
    }

    public on(event: string, callback: (data: any) => void): void {
        if (this.socket) {
            this.socket.on(event, callback);
        }
    }

    public off(event: string, callback?: (data: any) => void): void {
        if (this.socket) {
            if (callback) {
                this.socket.off(event, callback);
            } else {
                this.socket.off(event);
            }
        }
    }

    public isConnected(): boolean {
        return this.socket?.connected || false;
    }

    public getSocketId(): string | undefined {
        return this.socket?.id;
    }

    // TTS specific methods
    public startTTS(prompt: string, voiceCode: string): void {
        this.emit('start_tts', {
            prompt,
            voice_code: voiceCode,
            timestamp: Date.now()
        });
    }

    public cancelTTS(ttsId: string): void {
        this.emit('cancel_tts', {
            tts_id: ttsId,
            timestamp: Date.now()
        });
    }

    public getTTSStatus(ttsId: string): void {
        this.emit('get_tts_status', {
            tts_id: ttsId
        });
    }
}

// Create singleton instance
const socketManager = new SocketManager();

// Export the singleton instance and class
export default socketManager;
export { SocketManager };
