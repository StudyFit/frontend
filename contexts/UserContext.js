import { apiPublic } from "@/api";
import { createContext, useState, useContext, useEffect } from "react";
import { getAuthData, removeAuthData, saveAuthData } from "./AuthSecureStore";

const UserContext = createContext();

const student = "학생";
const teacher = "선생님";

export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(teacher); // "학생" 또는 "선생님"
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부

  // 앱 시작 시 저장된 토큰 확인
  useEffect(() => {
    const loadToken = async () => {
      const { accessToken, role } = await getAuthData();
      if (accessToken) setIsLoggedIn(true);
      if (role) setUserRole(role);
    };
    loadToken();
  }, []);

  // 로그인 처리 함수
  const login = async (id, pw) => {
    try {
      const response = await apiPublic.post(`/api/auth/login`, {
        loginId: id,
        password: pw,
      });

      // 로그인 정보 저장
      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;
      const role = response.data.role == "STUDENT" ? student : teacher;
      saveAuthData(accessToken, refreshToken, role);
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
    removeAuthData();
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
