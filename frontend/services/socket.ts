import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    let rawUrl = process.env.NEXT_PUBLIC_SOCKET_URL || process.env.NEXT_PUBLIC_API_URL;
    if (!rawUrl) {
      console.warn('Socket URL missing. Falling back to local development defaults.');
      rawUrl = 'http://localhost:5000';
    }
    const cleanUrl = rawUrl.replace(/\/$/, '');
    
    socket = io(cleanUrl, {
      transports: ['websocket'],
      autoConnect: true,
      reconnection: true,
      reconnectionDelay: 1000,
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
