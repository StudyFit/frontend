const isStudent = (userRole) => userRole === "학생";

export const getName = (userRole, elt) =>
  isStudent(userRole) ? elt.teacherName : elt.studentName;

export const getThemeColor = (userRole, elt) =>
  isStudent(userRole) ? elt.teacherThemeColor : elt.studentThemeColor;
