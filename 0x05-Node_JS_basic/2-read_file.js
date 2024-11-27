const fs = require('fs');

const countStudents = (dataPath) => {
  try {
    if (!fs.existsSync(dataPath)) {
      throw new Error('Cannot load the database');
    }
    const data = fs.readFileSync(dataPath, 'utf-8').trim();

    const lines = data.split('\n').filter(line => line.trim()); // Filter out empty lines
    if (lines.length <= 1) {
      throw new Error('Cannot load the database'); // No students
    }

    const students = {};
    let totalStudents = 0;

    for (const line of lines.slice(1)) { // Skip header line
      const studentRecord = line.split(',').map(item => item.trim());
      if (studentRecord.length < 4) continue; // Skip invalid lines

      const [name, , , field] = studentRecord;
      if (!name || !field) continue; // Skip if name or field is missing

      totalStudents++;
      if (!students[field]) {
        students[field] = [];
      }
      students[field].push(name);
    }

    console.log(`Number of students: ${totalStudents}`);
    for (const [field, names] of Object.entries(students)) {
      console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
    }
  } catch (err) {
    throw new Error('Cannot load the database');
  }
};

module.exports = countStudents;
