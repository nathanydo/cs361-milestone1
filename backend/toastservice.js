const express = require('express');
const cors = require('cors');
const app = express();
const port = 8001;


app.use(express.json());
app.use(cors());

let clients = [];

app.get("/", (req, res) => {
    res.json({data: "Notification services working"});
});

app.post('/show-toast', (req, res) => {

    console.log("Notification microservice is working")
    const { message, type} = req.body;
    clients.forEach(client => client.res.write(`data: ${JSON.stringify({message, type})}\n\n`));
    res.sendStatus(200);
});

app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const clientId = Date.now();
    const newClient = {
        id: clientId,
        res
    };

    clients.push(newClient);

    req.on('close', () => {
        clients = clients.filter(client => client.id !== clientId);
    });
})

app.listen(port, () => {
    console.log(`Toast notification service runnning at http://localhost:${port}`);
})