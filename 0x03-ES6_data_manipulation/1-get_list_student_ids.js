export default function getListStudentIds(student_array) {
    if (Array.isArray(student_array))
        return student_array.map((e) => e.id);
    return [];
};
