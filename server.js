const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        console.log('Received file size:', data.fileSize, 'MB');
        // Odeslání potvrzení zpět klientovi
        ws.send(JSON.stringify({ status: 'File size received' }));
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

console.log('WebSocket server is running on ws://localhost:8080');
