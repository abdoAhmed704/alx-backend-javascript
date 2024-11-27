const http = require('http');

const PORT = 1245;
const HOST = 'localhost';

const app = http.createServer((req, res) => {
  // Set the response header
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // Send the response body
  res.end('Hello Holberton School!');
});

// Start the server on a specified port
app.listen(PORT, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});

module.exports = app;
