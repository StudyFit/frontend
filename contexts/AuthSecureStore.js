import * as SecureStore from "expo-secure-store";

// 토큰 + 역할 저장
export const saveAuthData = async (accessToken, refreshToken, role) => {
  try {
    await SecureStore.setItemAsync("accessToken", accessToken);
    await SecureStore.setItemAsync("refreshToken", refreshToken);
    await SecureStore.setItemAsync("role", role);
  } catch (err) {
    // console.error("토큰 저장 실패:", err);
    console.log("토큰 저장 실패:", err);
  }
};

// 토큰 업데이트
export const updateAccessToken = async (accessToken) => {
  try {
    await SecureStore.setItemAsync("accessToken", accessToken);
  } catch (err) {
    // console.error("엑세스 토큰 업데이트 실패:", err);
    console.log("엑세스 토큰 업데이트 실패:", err);
  }
};

export const removeAccessToken = async () => {
  try {
    await SecureStore.deleteItemAsync("accessToken");
  } catch (err) {
    // console.error(err);
    console.log("removeAccessToken", err);
  }
};

// 불러오기
export const getAuthData = async () => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  const refreshToken = await SecureStore.getItemAsync("refreshToken");
  const role = await SecureStore.getItemAsync("role");
  return { accessToken, refreshToken, role };
};

// 로그아웃
export const removeAuthData = async () => {
  await SecureStore.deleteItemAsync("accessToken");
  await SecureStore.deleteItemAsync("refreshToken");
  await SecureStore.deleteItemAsync("role");
};
