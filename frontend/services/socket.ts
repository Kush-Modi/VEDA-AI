import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    const rawUrl = process.env.NEXT_PUBLIC_SOCKET_URL || process.env.NEXT_PUBLIC_API_URL;
    if (!rawUrl) {
      console.warn('Socket URL missing. Please set NEXT_PUBLIC_SOCKET_URL.');
    }
    const cleanUrl = rawUrl ? rawUrl.replace(/\/$/, '') : '';
    
    socket = io(cleanUrl, {
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      console.log('Connected to websocket');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from websocket');
    });
  }
  return socket;
};
