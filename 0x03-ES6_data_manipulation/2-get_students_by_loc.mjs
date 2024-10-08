import getListStudents from "./0-get_list_students.mjs";

function getStudentsByLocation(students, location) {
    let std = []
    students.filter((student) => {
        student.location === location;
        return student;
    });
    
};

const students = getListStudents();

console.log(getStudentsByLocation(students, 'San Francisco'));
