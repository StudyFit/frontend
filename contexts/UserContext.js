import { api, apiPublic } from "@/api";
import { createContext, useState, useContext, useEffect } from "react";
import { getAuthData, removeAuthData, saveAuthData } from "./AuthSecureStore";
import { useRouter } from "expo-router";
import { RouterName } from "@/components";

const UserContext = createContext();

const student = "학생";
const teacher = "선생님";

export const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null); // "학생" 또는 "선생님"
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부
  const router = useRouter();

  // 앱 시작 시 저장된 토큰 확인
  useEffect(() => {
    const loadToken = async () => {
      const { accessToken, role } = await getAuthData();
      if (accessToken) setIsLoggedIn(true);
      if (role) setUserRole(role);
      setLoading(false);
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
      const accessToken = response.data.data.accessToken;
      const refreshToken = response.data.data.refreshToken;
      const role = response.data.data.role == "STUDENT" ? student : teacher;

      await saveAuthData(accessToken, refreshToken, role);
      setUserRole(role);
      setIsLoggedIn(true);
      return true;
    } catch (e) {
      // console.error(e.code);
      console.log(e.code);
      return false;
    }
  };

  // 로그아웃 처리 함수
  const logout = async () => {
    try {
      await api.post(`/api/auth/logout`);
      await removeAuthData();
      setUserRole(null);
      setIsLoggedIn(false);
      router.navigate(RouterName.loginPage);
    } catch (e) {
      console.log(e);
      // console.error(e);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userRole,
        setUserRole,
        loading,
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
