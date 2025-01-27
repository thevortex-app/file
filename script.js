document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
        document.getElementById('result').innerText = `File Size: ${fileSizeMB} MB`;

        // Prepare data to be sent via POST
        const formData = new FormData();
        formData.append('fileSize', fileSizeMB);

        // Send data using fetch API
        fetch('https://example.com/api/upload', { // Replace with your actual API endpoint
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
});
