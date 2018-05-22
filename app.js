const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

var port = process.env.PORT || 3000;
var publicDir = `${__dirname}/public`;

app
   	.get('/', (req, res) => {
   		res.sendFile(`${publicDir}/client.html`);
   	})
   	.get('/streaming', (req, res) => {
   		res.sendFile(`${publicDir}/server.html`);
   	});

http.listen(port, () => {
	console.log("Servidor escuchando en el puerto: " + port);
});

io.on('connection', (socket) => {
	socket.on('streaming', (image) => {
		io.emit('play stream', image);
	});
});