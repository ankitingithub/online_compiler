import { useEffect, useState } from "react";



const WS_URL = "ws://localhost:8080";
export const useSocket = () => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const ws = new WebSocket(WS_URL);

        ws.onopen = () => {
            setSocket(ws);
            console.log("Connected to backend");
        }

        ws.onclose = () => {
            setSocket(null);
            console.log("disconnected from backend");
        }

        return () => {
            ws.close();
        }
    }, []);
    return socket;
};