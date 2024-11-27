const fs = require('fs');

const countStudents = (dataPath) => {
  // Check if the file exists and is valid
  if (!fs.existsSync(dataPath)) {
    throw new Error('Cannot load the database');
  }
  if (!fs.statSync(dataPath).isFile()) {
    throw new Error('Cannot load the database');
  }

  // Read and process the file
  const fileLines = fs.readFileSync(dataPath, 'utf-8').toString().trim().split('\n');

  // Extract header and rows
  const header = fileLines[0].split(',');
  const rows = fileLines.slice(1).filter((line) => line.trim() !== ''); // Ignore empty lines

  // Ensure the "firstname" field exists dynamically
  const firstnameIndex = header.indexOf('firstname');
  const fieldIndex = header.indexOf('field');

  if (firstnameIndex === -1 || fieldIndex === -1) {
    throw new Error('Invalid file format: Missing required columns');
  }

  // Group students by field
  const studentGroups = {};
  for (const row of rows) {
    const studentRecord = row.split(',');
    const firstname = studentRecord[firstnameIndex];
    const field = studentRecord[fieldIndex];

    if (!studentGroups[field]) {
      studentGroups[field] = [];
    }
    studentGroups[field].push(firstname);
  }

  // Output total students
  const totalStudents = rows.length;
  console.log(`Number of students: ${totalStudents}`);

  // Output students grouped by field
  for (const [field, students] of Object.entries(studentGroups)) {
    console.log(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
  }
};

module.exports = countStudents;

