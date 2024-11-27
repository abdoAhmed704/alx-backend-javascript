const fs = require('fs');

const countStudents = (dataPath) => {
    try {
        if (!fs.existsSync(dataPath)) {
            throw new Error('Cannot load the database');
        }

        const data = fs.readFileSync(dataPath, 'utf-8').trim();

        // Split lines and filter out empty ones
        const lines = data.split('\n').filter(line => line.trim());
        if (lines.length <= 1) {
            throw new Error('Cannot load the database'); // Only the header exists
        }

        const students = {};
        let totalStudents = 0;

        // Process student data
        for (const line of lines.slice(1)) { // Skip the header
            const studentRecord = line.split(',');
            if (studentRecord.length < 4) continue; // Skip invalid lines

            const [name, , , field] = studentRecord.map(item => item.trim());
            if (!name || !field) continue; // Skip if name or field is missing

            totalStudents++;
            if (!students[field]) {
                students[field] = [];
            }
            students[field].push(name);
        }

        // Log the total number of students
        console.log(`Number of students: ${totalStudents}`);
        for (const [field, names] of Object.entries(students)) {
            console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
        }
    } catch (error) {
        throw new Error('Cannot load the database'); // Ensure consistent error message
    }
};

module.exports = countStudents;

