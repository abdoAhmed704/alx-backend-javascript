const fs = require('fs');

const countStudents = (dataPath) => {
    if (!fs.existsSync(dataPath)) {
        throw new Error('Cannot load the database');
    }
    if (!fs.statSync(dataPath).isFile()) {
        throw new Error('Cannot load the database');
    }

    const newStudents = fs.readFileSync(dataPath, 'utf-8')
        .toString('utf-8')
        .trim()
        .split('\n')
    const printOutPut = {}
    let count = 0;
    for (const line of newStudents.slice(1)) {
        count++;
        const studentRecord = line.split(',');
        let field = studentRecord[3];
        const studentName = studentRecord[0];
        if (!printOutPut.hasOwnProperty(field)) {
            printOutPut[field] = [studentName]
        }
        else {
            printOutPut[field] = [...printOutPut[field], studentName]
        }
    }

    console.log("Number of students: ", count);
    for (const [key, value] of Object.entries(printOutPut)) {
        console.log(`Number of students in ${key}: ${value.length}. List: ${value.join(', ')}`);
    }
}

module.exports = countStudents;
