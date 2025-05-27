import { createContext, useState, useContext } from "react";

const UserContext = createContext();

const student = "학생";
const teacher = "선생님";

export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(teacher); // "학생" 또는 "선생님"
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부

  // 로그인 처리 함수
  const login = (role = teacher) => {
    setUserRole(role);
    setIsLoggedIn(true);
  };

  // 로그아웃 처리 함수
  const logout = () => {
    setUserRole(null);
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider
      value={{
        userRole,
        setUserRole,
        isLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
