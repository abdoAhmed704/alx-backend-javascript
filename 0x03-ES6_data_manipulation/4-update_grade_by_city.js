export default function updateStudentGradeByCity(srudents, city, newGrages) {
  return srudents
    .filter((student) => student.location === city)
    .map((student) => {
      const newStudent = student;
      const grade = newGrages.find((grade) => grade.studentId === student.id);
      newStudent.grade = grade ? grade.grade : 'N/A';
      return newStudent;
    });
}
