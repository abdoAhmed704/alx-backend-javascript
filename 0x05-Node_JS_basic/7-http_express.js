const express = require('express');
const fs = require('fs');

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

const app = express();

// Define a route
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (request, response) => {
  countStudents(process.argv[2].toString()).then((output) => {
    response.send(['This is the list of our students', output.slice(0, -1)].join('\n'));
  }).catch(() => {
    response.send('This is the list of our students\nCannot load the database');
  });
});
// Start the server
const PORT = 1245;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

module.exports = app;
