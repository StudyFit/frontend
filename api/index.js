import axios from "axios";
import { API_BASE_URL } from "@env";
import { getAuthData, updateAccessToken } from "@/contexts/AuthSecureStore";

// 기본 설정
const baseConfig = {
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
};

// 토큰 불필요한 요청 (로그인, 회원가입 등)
export const apiPublic = axios.create(baseConfig);

// 토큰 필요한 요청
export const api = axios.create(baseConfig);

// 요청 인터셉터에서 자동으로 토큰 붙이기
api.interceptors.request.use(
  async (config) => {
    const { accessToken } = await getAuthData();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터에서 토큰 필요한 요청에 accessToken이 만료되면 refreshToken으로 갱신 후 재요청
api.interceptors.response.use(
  (response) => response, // 정상 응답은 그대로 반환
  async (error) => {
    const originRequest = error.config;

    // 백엔드 수정되면 업데이트 필요
    if (error.response?.status === 403) {
      const { refreshToken } = await getAuthData();
      if (!refreshToken) return Promise.reject(error);

      try {
        const response = await apiPublic.post(`/api/auth/refresh`, {
          refreshToken,
        });
        const newAccessToken = response.data.accessToken;
        await updateAccessToken(newAccessToken);
        return api(originRequest);
      } catch (e) {
        await removeTokens(); // 리프레시 실패 -> 로그아웃 처리
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);
