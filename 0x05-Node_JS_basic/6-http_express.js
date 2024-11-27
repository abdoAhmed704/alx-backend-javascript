const express = require('express');

const app = express();

// Define a route
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Start the server
const PORT = 1245;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
