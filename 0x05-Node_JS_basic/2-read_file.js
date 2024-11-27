const fs = require('fs');

/**
 * Counts the students in a CSV data file.
 * @param {String} dataPath The path to the CSV data file.
 */
const countStudents = (dataPath) => {
  if (!fs.existsSync(dataPath)) {
    throw new Error('Cannot load the database');
  }

  const fileLines = fs.readFileSync(dataPath, 'utf-8').trim().split('\n');
  const studentGroups = {};
  const dbFieldNames = fileLines[0].split(',');
  const studentPropNames = dbFieldNames.slice(0, dbFieldNames.length - 1);

  fileLines.slice(1).forEach((line) => {
    const studentRecord = line.split(',');
    const studentPropValues = studentRecord.slice(0, studentRecord.length - 1);
    const field = studentRecord[studentRecord.length - 1];

    if (!Object.keys(studentGroups).includes(field)) {
      studentGroups[field] = [];
    }

    const studentEntries = studentPropNames
      .map((propName, idx) => [propName, studentPropValues[idx]]);
    studentGroups[field].push(Object.fromEntries(studentEntries));
  });

  const totalStudents = Object.values(studentGroups)
    .reduce((acc, group) => acc + group.length, 0);

  // Replacing console.log with a logging function (if needed)
  console.info(`Number of students: ${totalStudents}`);
  Object.entries(studentGroups).forEach(([field, group]) => {
    const studentNames = group.map((student) => student.firstname).join(', ');
    console.info(`Number of students in ${field}: ${group.length}. List: ${studentNames}`);
  });
};

module.exports = countStudents;
