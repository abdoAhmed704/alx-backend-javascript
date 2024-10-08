export default function getListStudentIds(student_array) {
    const ids = []
    if (Array.isArray(student_array))
        return student_array.map((e) => ids.push(e.id));
    return ids;
};
