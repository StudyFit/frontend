const isStudent = (userRole) => userRole === "학생";

export const getId = (userRole, elt) =>
  isStudent(userRole) ? elt.teacherId : elt.studentId;

export const getName = (userRole, elt) =>
  isStudent(userRole) ? elt.teacherName : elt.studentName;

export const getThemeColor = (userRole, elt) =>
  isStudent(userRole) ? elt.teacherThemeColor : elt.studentThemeColor;

export const getStatus = (userRole, elt) =>
  isStudent(userRole) ? elt.connectionStatus : elt.friendStatus;
