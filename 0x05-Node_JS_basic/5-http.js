const http = require('http');
const fs = require('fs');

const PORT = 1245;
const HOST = 'localhost';

const countStudents = (dataPath) => new Promise((resolve, reject) => {
  fs.readFile(dataPath, 'utf-8', (error, data) => {
    if (error) {
      reject(new Error('Cannot load the database'));
    }
    if (data) {
      const lines = data.trim().split('\n').filter((line) => line.trim());
      if (lines.length <= 1) {
        reject(new Error('Cannot load the database'));
      }
      let output = '';
      try {
        const students = {};
        let totalStudents = 0;

        lines.slice(1).forEach((line) => { // Skip header line
          const studentRecord = line.split(',').map((item) => item.trim());
          if (studentRecord.length < 4) {
            return;
          }

          const [name, , , field] = studentRecord;
          if (!name || !field) {
            return;
          }

          totalStudents += 1;
          if (!students[field]) {
            students[field] = [];
          }
          students[field].push(name);
        });

        output += `Number of students: ${totalStudents}\n`;
        Object.entries(students).forEach(([field, names]) => {
          output += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`;
        });
      } catch (err) {
        reject(new Error('Cannot load the database'));
      }
      resolve(output);
    }
  });
});

const app = http.createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  if (request.url === '/') {
    response.write('Hello Holberton School!');
    response.end();
  } else if (request.url === '/students') {
    response.write('This is the list of our students\n');
    countStudents(process.argv[2].toString()).then((output) => {
      const outString = output.slice(0, -1);
      response.end(outString);
    }).catch(() => {
      response.statusCode = 404;
      response.end('Cannot load the database');
    });
  }
});

// Start the server on a specified port
app.listen(PORT, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});

module.exports = app;
