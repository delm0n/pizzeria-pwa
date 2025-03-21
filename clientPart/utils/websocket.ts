let socket: WebSocket | null = null;

export function getWebSocket(): WebSocket {
    if (!socket) {
        // Инициализация WebSocket, если он еще не создан
        socket = new WebSocket("ws://127.0.0.1:7890/OrderStatusWebsocket");

        socket.onclose = () => {
            socket = null; // Сбрасываем ссылку на WebSocket при закрытии
        };
    }

    return socket;
}