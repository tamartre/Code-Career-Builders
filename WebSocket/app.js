const express = require('express');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

let users = [];



const server = app.listen(port, () => {
    console.log(`Server running. Start Browsing on http://localhost:${port}/home.html`);
});

const wss = new WebSocket.Server({ server });

function broadcastUserUpdate() {
    const userData = JSON.stringify({ users });

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(userData);
        }
    });
}

wss.on('connection', (ws) => {
    console.log('New client connected');
    ws.on('message', (message) => {
        try {
            const { name, initials } = JSON.parse(message);
            users.push({ name, initials });
            broadcastUserUpdate();
            ws.send(JSON.stringify({ redirect: 'users.html' }));
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});