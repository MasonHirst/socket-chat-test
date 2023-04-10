const { WebSocketServer, WebSocket } = require('ws')

const wss = new WebSocketServer({ port: 3005 });

wss.on('connection', function connection(ws) {
  ws.send('Welcome!')
  ws.on('error', console.error);


  ws.on('message', function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
});