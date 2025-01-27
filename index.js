const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pro zpracování nahraných souborů
app.use(fileUpload());

// Statické soubory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint pro nahrání souboru a výpočet velikosti
app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // Získání nahraného souboru
    const uploadedFile = req.files.file;
    const fileSizeMB = (uploadedFile.size / (1024 * 1024)).toFixed(2);

    // Odpověď s velikostí souboru v MB
    res.json({ fileSizeMB });
});

// Spuštění serveru
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
