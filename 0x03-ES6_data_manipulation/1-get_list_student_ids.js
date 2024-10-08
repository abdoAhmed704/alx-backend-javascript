export default function getListStudentIds(listStudent) {
  const keys = [];
  if (!Array.isArray(listStudent)) return keys;
  listStudent.map((student) => keys.push(student.id));
  return keys;
}
