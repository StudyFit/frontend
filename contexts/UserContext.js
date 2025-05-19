import { createContext, useState, useContext } from "react";

const UserContext = createContext();
const student = "학생";
const teacher = "선생님";

export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(student); // "student" 또는 "teacher"

  return (
    <UserContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
