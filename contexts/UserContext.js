import api from "@/api";
import { createContext, useState, useContext } from "react";

const UserContext = createContext();

const student = "학생";
const teacher = "선생님";

export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(teacher); // "학생" 또는 "선생님"
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부

  // 로그인 처리 함수
  const login = async (id, pw) => {
    try {
      const response = await api.post(`/api/auth/login`, {
        loginId: id,
        password: pw,
      });
      console.log(JSON.stringify(response.data, null, 2));
      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken; // 토큰 저장 로직 필요!
      const role = response.data.role == "STUDENT" ? student : teacher;
      setUserRole(role);
      setIsLoggedIn(true);
      return true;
    } catch (e) {
      console.error(e.code);
      return false;
    }
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
