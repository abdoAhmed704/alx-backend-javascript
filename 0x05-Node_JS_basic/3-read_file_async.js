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

        console.log(`Number of students: ${totalStudents}`);
        Object.entries(students).forEach(([field, names]) => {
          console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
        });
      } catch (err) {
        reject(new Error('Cannot load the database'));
      }
      resolve(true);
    }
  });
});

module.exports = countStudents;
