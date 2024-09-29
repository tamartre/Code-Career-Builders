const express = require('express');

const app = express();

app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');

    setInterval(() => {
        const currentTime = new Date().toLocaleTimeString();
        res.write(`data: ${currentTime}\n\n`);
    }, 1000);
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});