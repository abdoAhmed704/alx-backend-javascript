const fs = require('fs');

const countStudents = (dataPath) => {
  try {
    if (!fs.existsSync(dataPath)) {
      throw new Error('Cannot load the database');
    }
    const data = fs.readFileSync(dataPath, 'utf-8').trim();

    const lines = data.split('\n').filter((line) => line.trim()); // Filter out empty lines
    if (lines.length <= 1) {
      throw new Error('Cannot load the database');
    }

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
    throw new Error('Cannot load the database');
  }
};

module.exports = countStudents;
