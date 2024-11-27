const http = require('http');

const PORT = 1245;
const HOST = 'localhost';

const server = http.createServer((req, res) => {
  // Set the response header
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // Send the response body
  res.end('Hello Holberton School!');
});

// Start the server on a specified port
server.listen(PORT, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});
