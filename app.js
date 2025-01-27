document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
        document.getElementById('fileSize').textContent = `File size: ${fileSizeMB} MB`;

        // Připojení k websocket serveru
        const ws = new WebSocket('wss://localhost');
        ws.onopen = function() {
            console.log('WebSocket is connected');
            // Posílání dat na server
            ws.send(JSON.stringify({ fileSize: fileSizeMB }));
        };

        ws.onmessage = function(event) {
            const data = JSON.parse(event.data);
            console.log('Received from server:', data);
        };

        ws.onerror = function(error) {
            console.error('WebSocket error:', error);
        };

        ws.onclose = function() {
            console.log('WebSocket is closed');
        };
    }
});
